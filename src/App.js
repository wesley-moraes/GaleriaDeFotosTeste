import { useEffect, useState } from 'react';
import './App.css';

function App() {

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

  return (
    <div className="App">
      {conexao}
      <header className='headerGallery'>
        <div>
          <img />
          <h1>Galeria de Fotos</h1>
        </div>
      </header>
      <main>
        <div className='containerInputImage'>
          <div className='boxSaveImage'>
            <input type='file'/>
            <button>Salvar Imagem</button>
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
