import { useEffect, useState, useRef  } from 'react';
import './App.css';

function App() {

  //Salvar imagem
  const fileInputRef = useRef(null);
  const [validationError, setValidateError] = useState(null);
  const [imageLink, setimageLink] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  //Verifica id
  const [verifyID, setVerifyID] = useState();

  //Consumo Cat API
  const [catApi, setCatApi] = useState([]);
  const [loaded, setLoaded] = useState(false); // Estado para verificar se já carregou

  //Preparando o arquivo no front
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if(file){
      const allowedExtension = ['.jpg', ',png'];
      const selectedFileExtension = file.name.split('.').pop().toLowerCase();
      if(allowedExtension.includes('.' + selectedFileExtension)){
        setSelectedFile(file);
        setValidateError(null)
      }
      else{
        setSelectedFile(null);
        setValidateError('Selecione um arquivo .jpg ou .png');
        fileInputRef.current.value = '';
      }
    }else{

    }
  };

  //Preparacao do arquivo para o backend e enviando
  const handleUpload = async() =>{

    //Verifica se o ID já existe
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    if(selectedFile){
      const responseId = await fetch("http://localhost/galeriadefotosteste/verificaid.php",{
        method: 'POST',
        body: formData
      });
    
      // Aguardando o JSON da resposta
      const responseDataId = await responseId.json();
      setVerifyID(responseDataId);
      console.log(responseDataId);

      if(responseDataId.value === true){
        setValidateError(responseDataId.message);
      }else{//Se nao existir o id entao pode fazer o procedimento para inserior no banco de dados
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
      
    }else{
      setValidateError('Por favor selecione um arquivo!')
    }
    
  }

  //Consumo da API
  const fetchCatApi = async () => {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();
    
    setCatApi(data);
    console.log("catApi:" , data);
    
    //Insere no banco de dados
    const cat = data[0];
    //console.log("cat" , cat );
    const newData = {
      id: cat.id,
      url: cat.url
    };
    console.log("new data: " , newData);

    const responseCat = await fetch("http://localhost/galeriadefotosteste/insereCatApi.php", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(newData)
    });
    const dataCat = await responseCat.json();
    console.log("dataCat: ", dataCat);
    console.log(dataCat.message , "... São eles - id: ", dataCat.id, "e url: ", dataCat.url);
    
  };
  
  useEffect(() => {
    //console.log("loaded:" , loaded)
    if(!loaded){ //Desafio com o useEffect renderizando duas vezes.
      setLoaded(true);
    }else{
      fetchCatApi();
    }
    
  }, [loaded]);
  

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
    <div className="App">
      
      <header className='headerGallery'>
        <div>
          <img />
          <h1>Galeria de Fotos</h1>
        </div>
      </header>
      <main>
      <div>
        <p>Apagar:</p>
        {catApi.map((cat) => (
          <p key={cat.id}>{cat.id}</p>
        ))}
      </div>
        <div className='containerInputImage'>
          <div className='boxSaveImage'>
            <input type="file" ref={fileInputRef} onChange={handleFileChange}/>
            <button onClick={handleUpload}>Salvar</button>
            {validationError &&(
              <p>{validationError}</p>
            )}
          </div>
        </div>
        
        <div className='containerGallery'>
          <div>
            <p>Imagens</p>
          </div>
        </div>

      </main>
      <footer className='footerGallery'>
        <p>Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default App;
