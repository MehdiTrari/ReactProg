import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Alphabets from './Alphabets';
import VowelsButton from './VowelsButton';

function App() {
  const [onlyVowels, setOnlyVowels] = useState(false);

  const toggleOnlyVowels = () => {
    setOnlyVowels(prevOnlyVowels => !prevOnlyVowels);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <VowelsButton onClick={toggleOnlyVowels} isOnlyVowels={onlyVowels} />
        <Alphabets onlyVowels={onlyVowels} />
        <input 
          type="text" 
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        {/* Ajout de l'iframe ici */}
        <iframe 
          width="110" 
          height="200" 
          src="https://www.myinstants.com/instant/allo-salem-27113/embed/" 
          frameBorder="0" 
          scrolling="no"
          title="Allo Salem Sound"
        />
      </header>
    </div>
  );
}

export default App;
