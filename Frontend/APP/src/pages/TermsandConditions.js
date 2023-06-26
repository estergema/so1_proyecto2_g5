
import React,{useState} from 'react'
import '../css/terms.css';
//import { Link } from 'react-router-dom'
import { ProcessPage } from './ProcessPage';
import { DataPC } from './dataPC';

export const MainPaige = () => {
  const [selectedPage, setSelectedPage] = useState('page1');

  const handleButtonClick = (page) => {
    setSelectedPage(page);
  };


  return (
    <div>
      <header> <h1 className="titulo">GRUPO 5 </h1>   </header>
    <div className="button-container">
      <button
        className={selectedPage === 'page1' ? 'active' : ''}
        onClick={() => handleButtonClick('page1')}
      >
        Página 1
      </button>
      <button
        className={selectedPage === 'page2' ? 'active' : ''}
        onClick={() => handleButtonClick('page2')}
      >
        Página 2
      </button>
    </div>
    {selectedPage === 'page1' && <ProcessPage />}
    {selectedPage === 'page2' &&  <DataPC/>}
  </div>
  )
}
