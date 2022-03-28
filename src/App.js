import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import Synonym from "./components/Synonym"
import Rhyming from "./components/Rhyming"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [query, setQuery] = useState("");
    const [state, setState] = useState('start')
    const inputRef = useRef("");
    const [savedWordsArray, setSavedWordsArray] = useState([]);

    // useEffect(() => {
    //     console.log('Something happened')
    // }, [savedWordsArray.length]);

    const handleRhyming = () => {
        setQuery(inputRef.current.value)
        setState('rhyming')
    }

    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            console.log('press');
            handleRhyming();
        }
    };

    const handleSynonym = () => {
        setQuery(inputRef.current.value)
        setState('synonym')
    }

    const addToSavedWords = (word) => {
        setSavedWordsArray(oldArray => [...oldArray, word]);
    }


  return (
      <main className="container">
        <h1 className="row">Rhyme Finder (579 Problem Set 6)</h1>
          <h4>My source code repo: https://github.com/Zhou-Xun/si-579-hw6/tree/master</h4>
        <div className="row">
          <div className="col">Saved words: <span id="saved_words">
              {savedWordsArray.join(",")}
          </span></div>
        </div>
        <div className="row">
          <div className="input-group col">
            <input ref={inputRef} className="form-control" type="text" placeholder="Enter a word"
                   onKeyDown={handleKeypress}/>
            <button type="button" className="btn btn-primary" onClick={handleRhyming}>Show rhyming words</button>
            <button type="button" className="btn btn-secondary" onClick={handleSynonym}>Show synonyms</button>
          </div>
        </div>
          {state === 'start' &&
          <>
              <div className="row">
              <h2 className="col"></h2>
          </div>
              <div className="output row">
              <output className="col"></output>
              </div>
          </>
          }
          {state === 'rhyming' && <Rhyming query={query} saveWord={(word)=>addToSavedWords(word)}/>}
          {state === 'synonym' && <Synonym query={query} saveWord={(word)=>addToSavedWords(word)}/>}
      </main>
  );
};

export default App;
