import './App.css';

function App() {
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
