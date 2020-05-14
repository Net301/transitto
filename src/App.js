import React, {useCallback} from 'react';
import './App.css';
import {useTransition} from './lib/useTransition.js'
function App() {
  const colorCallback = useCallback(() => {
    console.log("finishedcolor");
  }, [])

  const textCallback = useCallback(() => {
    console.log("finishedText");
  }, [])

  const numberCallback = useCallback(() => {
    console.log("finishedNumbers");
  }, [])

  const opacityCallback = useCallback(() => {
    console.log("finished Opacity");
  }, [])

  const color = useTransition("#dd66ff", "#ffcc99", 0.2, colorCallback);
  const fontSize = useTransition(20,100,0.5, numberCallback);
  const text = useTransition("", "Hello World!",4, textCallback);
  const opacity = useTransition(0, 1, 0.5, opacityCallback);
  const movement = useTransition(0,90, 2, ()=>console.log("md"));
  return (
    <div className="App">
      <div style = {{position:'absolute',fontSize, color, opacity}}>{text}</div>
      <div style={{position:'absolute', height:'20px', width:'20px', borderRadius:'10px', backgroundColor:'green', top:movement+'vh', left:movement+'vw'}}>
        &nbsp;
      </div>
    </div>
  );
}

export default App;
