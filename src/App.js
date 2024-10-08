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
      </header>
    </div>
  );
}

export default App;
