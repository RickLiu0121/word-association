import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AbcIcon from "@mui/icons-material/Abc";
import ButtonGroup from "@mui/material/ButtonGroup";
import { createTheme } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Typography from "@mui/material/Typography";

function App() {
  const [word, setWord] = useState("software");
  const [associations, setAssociations] = useState(null);

  const getAssociations = () => {
    fetch("http://localhost:3001/api/associations/" + word)
      .then((result) => result.json())
      .then((body) => {
        console.log(body);
        setAssociations(body);
      });
  };
  const clearTextfield = () => {
    setWord("");
  };
  const theme = createTheme({
    // typography: {
    //   h1: {
    //     marginTop: 5,
    //     marginBottom: 5,
    //   },
    //   h6: {
    //     marginBottom: 10,
    //   },
    // },
    spacing: 8,
  });
  return (
    <div className="app">
      <Typography variant="h2" sx={{ ml: 3 }}>
        Word Association Tool
      </Typography>
      <Typography variant="h6" sx={{ ml: 3, mb: 2 }}>
        The bigger the word, the strong its association with your search
      </Typography>
      <TextField
        // style={{ diplay: "inline" }}
        label="Required"
        id="standard-basic"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        sx={{ mr: 2, ml: 3 }}
      >
        {word}
      </TextField>
      <ButtonGroup>
        <Button
          variant="contained"
          color="secondary"
          onClick={getAssociations}
          size="large"
        >
          Find Associations
        </Button>
        <Button color="secondary" onClick={clearTextfield}>
          Clear field
        </Button>
      </ButtonGroup>
      {
        // Apply conditional rendering
        associations &&
          //Object.keys returns an array of a given objects' own enumerzble property names
          (Object.keys(associations).length === 0 ? (
            <p>No results</p>
          ) : (
            <div className="display-result">
              {/* Object.entries returns an array of the given object's string-key pair -> Nested Array */}
              {Object.entries(associations).map(([association, score]) => (
                <span
                  style={{ fontSize: (score * 1000) / 3 }}
                  key={association}
                >
                  {association}
                </span>
              ))}
            </div>
          ))
      }
    </div>
  );
}

export default App;
