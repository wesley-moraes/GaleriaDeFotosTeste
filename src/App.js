import { useEffect, useState, useRef  } from 'react';
import './App.css';

//Assets


//importando meu projeto
import Header from "./frontend/Header";
import Main from "./frontend/Main";

function App() {

  

  return (
    <div className="App">
      <Header />
      <Main />

      <footer className='footerGallery'>
        <p>Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default App;
