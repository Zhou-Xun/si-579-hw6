import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <main className="container">
        <h1 className="row">Rhyme Finder (579 Problem Set 5)</h1>
        <div className="row">
          <div className="col">Saved words: <span id="saved_words"></span></div>
        </div>
        <div className="row">
          <div className="input-group col">
            <input className="form-control" type="text" placeholder="Enter a word"/>
            <button type="button" className="btn btn-primary">Show rhyming words</button>
            <button type="button" className="btn btn-secondary">Show synonyms</button>
          </div>
        </div>
        <div className="row">
          <h2 className="col"></h2>
        </div>
        <div className="output row">
          <output className="col"></output>
        </div>
      </main>
  );
}

export default App;
