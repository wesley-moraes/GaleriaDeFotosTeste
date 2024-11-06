import { useEffect, useState, useRef } from 'react';
//import { isCompositeComponent } from 'react-dom/test-utils';



const Main = () => {

    //Salvar imagem
    const fileInputRef = useRef(null);
    const [validationError, setValidateError] = useState(null);
    const [imageLink, setimageLink] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState();

    //Verifica id
    const [verifyID, setVerifyID] = useState();

    //Consumo Cat API
    const [catApi, setCatApi] = useState([]);
    const [loaded, setLoaded] = useState(false); // Estado para verificar se já carregou

    //GET dados da base de dados
    const [dadosDB, setDadosDB] = useState([]);


    //Preparando o arquivo no front
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const allowedExtension = ['.jpg', '.png'];
            
            const selectedFileExtension = file.name.split('.').pop().toLowerCase();
            const nameFile = file.name.split('.').shift().toLowerCase();
            setFileName(nameFile);

            console.log("name file: " + nameFile);
            if (allowedExtension.includes('.' + selectedFileExtension)) {
                setSelectedFile(file);
                setValidateError(null)
            }
            else {
                setSelectedFile(null);
                setValidateError('Selecione um arquivo .jpg ou .png');
                fileInputRef.current.value = '';
            }
        } else {

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
            console.log(responseDataId);

            if (responseDataId.value === true) {
                setValidateError(responseDataId.message);
            } else {//Se nao existir o id entao pode fazer o procedimento para inserior no banco de dados
                const response = await fetch("http://localhost/galeriadefotosteste/uploadimg.php", {
                    method: 'POST',
                    body: formData
                });

                const responseData = await response.json();
                setimageLink(responseData.image_link);
                setValidateError(responseData.message);
                console.log(responseData);
                fileInputRef.current.value = '';
            }

        } else {
            setValidateError('Por favor selecione um arquivo!')
        }

    }

    //Consumo da API
    const fetchCatApi = async () => {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await response.json();

        setCatApi(data);
        console.log("catApi:", data);

        //Insere no banco de dados
        const cat = data[0];
        //console.log("cat" , cat );
        const newData = {
            id: cat.id,
            url: cat.url
        };
        console.log("new data: ", newData);

        const responseCat = await fetch("http://localhost/galeriadefotosteste/insereCatApi.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        });
        const dataCat = await responseCat.json();
        console.log("dataCat: ", dataCat);
        console.log(dataCat.message, "... São eles - id: ", dataCat.id, "e url: ", dataCat.url);

    };

    useEffect(() => {
        //console.log("loaded:" , loaded)
        if (!loaded) { //Desafio com o useEffect renderizando duas vezes.
            setLoaded(true);
        } else {
            fetchCatApi();
        }

    }, [loaded]);

    //Get DB - para preencher a galeria
    useEffect(() => {
        fetch("http://localhost/galeriadefotosteste/getdb.php")
            .then(response => response.json())
            .then(data => {
                setDadosDB(data);
            })
    });

    {/*
    //Teste de conexao! 
  const [conexao, setConexao] = useState();
  useEffect(() =>{
    fetch("http://localhost/galeriadefotosteste/conexaodb.php")
    .then(response => response.text())
    .then(data =>{
      setConexao(data);
      console.log(data);
    })
    .catch(error => console.error("Erro em estabelecer conexao com o banco", error));
  }, []);

  */}

    return (
        <main className='
            flex justify-center
            w-full mt-16 mb-16

        '>
            <div className='
                flex items-center flex-col
                
                w-4/5
            '>{/*Container */}
                <div className='containerInputImage'>
                    
                    <div className='boxSaveImage'>
                        <input type="file" id="file-upload" ref={fileInputRef} onChange={handleFileChange} />
                        <label for="file-upload" class="custom-file-upload ">
                            Adicionar uma nova imagem 
                            <input 
                                type='text' 
                                readonly="readonly" 
                                placeholder="Arquivo"
                                className='fileName'
                                value={fileName&& (fileName)}    
                            />
                        </label>

                        <button className="btn-20" onClick={handleUpload}><span>Salvar</span></button>
                        
                        {validationError && (
                            <p>{validationError}</p>
                        )}
                        
                    </div>
                </div>

                    <div className='
                    containerGallery
                    flex flex-row flex-wrap justify-between 
                    w-full mt-16 '>
                        {dadosDB.map(dados => (
                            <div className='boxPhoto grow'>
                                <img src={dados.url} alt={dados.id} />
                            </div>

                        ))}


                    </div>
                </div>
            
        </main>
    )
}

export default Main;