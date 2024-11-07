import { useEffect, useState, useRef  } from 'react';
import './App.css';

//Assets


//importando meu projeto
import Header from "./frontend/Header";
import Main from "./frontend/Main";
import Footer from "./frontend/Footer"

function App() {

  

  return (
    <div className="App">
      <Header />
      <Main />
      <div className=' w-full self-end'>
        <Footer />
      </div>
      
    </div>
  );
}

export default App;
