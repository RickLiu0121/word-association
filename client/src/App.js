import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useState } from "react";

function App() {
  const [word, setWord] = useState("software");
  const [associations, setAssociations] = useState(null);

  const getAssociations = () => {
    fetch("http://localhost:3001/api/associations/" + word)
      .then((result) => result.json())
      .then((body) => {
        //console.log(body);
        setAssociations(body);
      });
  };

  return (
    <div className="app">
      <h1>Word Associations Map</h1>
      <input value={word} onChange={(e) => setWord(e.target.value)} />
      <button onClick={getAssociations}>Find Associations</button>

      {
        // Apply conditional rendering
        associations &&
          //Object.keys returns an array of a given objects' own enumerzble property names
          (Object.keys(associations).length === 0 ? (
            <p>No results</p>
          ) : (
            <div>
              {/* Object.entries returns an array of the given object's string-key pair -> Nested Array */}
              {Object.entries(associations).map(([association, score]) => (
                <span key={association}>{association}</span>
              ))}
            </div>
          ))
      }
    </div>
  );
}

export default App;
