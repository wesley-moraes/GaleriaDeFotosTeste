import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

//Alert Toaster
import AlertToast from './AlertToast';


const Main = () => {

    //Salvar imagem
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState();

    //Controle para renderizar as imagens novamente
    const [refresh, setRefresh] = useState(false);

    //Verifica id
    const [verifyID, setVerifyID] = useState();

    //Consumo Cat API
    const [catApi, setCatApi] = useState([]);

    //GET dados da base de dados
    const [dadosDB, setDadosDB] = useState([]);

    //Modal Photo
    const [urlModal, setUrlModal] = useState();
    const [showModalPhoto, setShowModalPhoto] = useState(false);

    //Toaster
    const [showToaster, setShowToaster] = useState(false);
    const [toastMessage, setToastMessage] = useState();
    const [showToast, setShowToast] = useState(false);
    const [bgToaster, setBgToaster] = useState();
    const [titleToaster, setTitleToaster] = useState();

    // Component Toaster de Alerts de erros ou falhas
    const showToastMessage = (message) => {
        setToastMessage(message);
        setShowToast(true);
    };

    //Preparando o arquivo no front
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const allowedExtension = ['.jpg', '.png'];

            const selectedFileExtension = file.name.split('.').pop().toLowerCase();
            const nameFile = file.name.split('.').shift().toLowerCase();
            setFileName(nameFile);

            //console.log("name file: " + nameFile);
            if (allowedExtension.includes('.' + selectedFileExtension)) {
                setSelectedFile(file);
            } else {
                setSelectedFile(null);
                //setValidateError('Selecione um arquivo .jpg ou .png');
                fileInputRef.current.value = '';
                showToastMessage('Selecione um arquivo .jpg ou .png!');
                setBgToaster('warning');
                setTitleToaster('Formato de arquivo incorreto!');
                setShowToaster(true);
                setFileName('');
            }
        }
    };

    //Preparacao do arquivo para o backend e enviando
    const handleUpload = async () => {

        //Verifica se o ID já existe
        const formData = new FormData();
        formData.append('file', selectedFile);

        if (selectedFile) {
            const responseId = await fetch("http://localhost/galeriadefotosteste/verificaid.php", {
                method: 'POST',
                body: formData
            });

            // Aguardando o JSON da resposta
            const responseDataId = await responseId.json();
            setVerifyID(responseDataId);

            if (responseDataId.value === true) {
                showToastMessage(responseDataId.message);
                setBgToaster('dark');
                setTitleToaster('Imagem repetida!');
                setShowToaster(true);
                setFileName('');
            } else {//Se nao existir o id entao pode fazer o procedimento para inserior no banco de dados
                const response = await fetch("http://localhost/galeriadefotosteste/uploadimg.php", {
                    method: 'POST',
                    body: formData
                });

                fileInputRef.current.value = '';
                showToastMessage('A imagem foi salva e está disponível na galeria');
                setBgToaster('success');
                setTitleToaster('Tudo Pronto!');
                setShowToaster(true);
                setFileName('');

                //Renderiza o app
                setRefresh(!refresh);
            }
        } else { //Se não tiver selecionado nenhum arquivo
            showToastMessage('Por favor selecione um arquivo!');
            setBgToaster('danger');
            setTitleToaster('Atençãos!');
            setShowToaster(true);
            return;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost/galeriadefotosteste/getdb.php");
            const data = await response.json();
            setDadosDB(data);
        };
        fetchData();
    }, [refresh]);

    //Consumo da API dos gatos
    const fetchCatApi = async () => {

        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await response.json();

        setCatApi(data);

        //Insere no banco de dados
        const cat = data[0];
        const newData = {
            id: cat.id,
            url: cat.url
        };

        const responseCat = await fetch("http://localhost/galeriadefotosteste/insereCatApi.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        });
        const dataCat = await responseCat.json();
        if(dataCat.existsCat === true){
            showToastMessage(dataCat.message); /*Trabalhando com mensagens vinda do backend */
            setBgToaster('success');
            setTitleToaster(dataCat.title);
            setShowToaster(true);
        }

        //Atualiza a pagina
        setDadosDB(prevDados => [...prevDados, newData]);
    };

    /*Modal ao clicar na imagem */
    const handleShowModalPhoto = (url) => {
        setUrlModal(url);
        setShowModalPhoto(true);
    }
    const handleClose = () => setShowModalPhoto(false);

    //Busca imagens na API
    useEffect(() => {
        fetchCatApi();
        setRefresh(!refresh);
    }, []);

    //Get DB - para preencher a galeria
    useEffect(() => {
        fetch("http://localhost/galeriadefotosteste/getdb.php")
            .then(response => response.json())
            .then(data => {
                setDadosDB(data);
            })
    }, []);

    return (

        <main className='
            flex justify-center
            w-full mt-8 mb-8 sm:mt-16 sm:mb-16
        '>

            <div className='
                flex items-center flex-col
                w-full sm:w-4/5 p-3 sm:p-0 
            '>{/*Container */}
                <div className='
                    containerInputImage
                    '>

                    <div className='boxSaveImage flex flex-col justify-center sm:flex-none sm:flex-row sm:justify-center'>
                        <input type="file" id="file-upload" ref={fileInputRef} onChange={handleFileChange} />
                        <label htmlFor="file-upload" className="customFileUpload ">
                            Adicionar uma nova imagem
                            <input
                                type='text'
                                readOnly="readOnly"
                                placeholder="fotoGallery"
                                className='fileName text-center sm:text-left'
                                value={fileName && (fileName)}
                            />
                        </label>

                        <Button variant="dark" className="mt-4 sm:mt-0" onClick={handleUpload}>Salvar</Button>

                    </div>
                </div>

                <div className='
                    containerGallery
                    flex flex-row flex-wrap justify-between 
                    w-full mt-10 sm:mt-16 '>
                    {dadosDB.map(dado => (
                        <div key={dado.id} className='boxPhoto grow'>
                            <img
                                src={dado.url}
                                alt={dado.id}
                                onClick={() => handleShowModalPhoto(dado.url)} />
                        </div>
                    ))}
                </div>
            </div>

            <AlertToast
                message = {toastMessage}
                show = {showToast}
                onClose={() => setShowToast(false)}
                contextualBg = {bgToaster}
                titleToaster = {titleToaster}
            />

            <Modal show={showModalPhoto} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className='flex w-full h-full justify-center items-center'>
                        <img src={urlModal} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </main>
    )
}

export default Main;