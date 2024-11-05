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
    //const formData = new FormData();
    //formData.append('file', selectedFile);
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
