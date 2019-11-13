import React, {useState} from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <QuickConvert />
    </div>
  );
}



const QuickConvert = props => {
  let convert = require('convert-units');

  const [convertFrom, setConvertFrom] = useState("US-Custom");
  const [convertTo, setConvertTo] = useState("Metric");
  const [convertFromUnit, setConvertFromUnit] = useState("oz");
  const [convertToUnit, setConvertToUnit] = useState("mg");
  const [conversionAmount, setConversionAmount] = useState("0");
  const [conversionResult, setConversionResult] = useState("0");

  function changeConvertFrom(event) {
    setConvertFrom(event.target.value);
  }
  function changeConvertTo(event) {
    setConvertTo(event.target.value);
  }
  function changeConvertFromUnit(event) {
    setConvertFromUnit(event.target.value);
  }
  function changeConvertToUnit(event) {
    setConvertToUnit(event.target.value);
  }
  function changeConversionAmount(event) {
    setConversionAmount(event.target.value);
  }
  function doConvert(event) {
    setConversionAmount(event.target.value);
    setConversionResult(convert(conversionAmount).from(convertFromUnit).to(convertToUnit));
  }

  return(
    <div className="quickConvert">
      <h1 className="header">Quick Convert</h1>

      <h2>From</h2>
      <select className="selectFrom" onChange={changeConvertFrom}>
        <option value="US-Custom">US-Custom</option>
        <option value="Metric">Metric</option>
      </select>

      <h2>To</h2>
      <select className="selectTo" onChange={changeConvertTo}>
        <option value="Metric">Metric</option>
        <option value="US-Custom">US-Custom</option>
      </select>

      <div>
        <input type="text" className="textInput" onChange={changeConversionAmount}></input>
        {convertFrom === "US-Custom" &&
        <select className="selectFromUnit" onChange={changeConvertFromUnit}>
          <option value="oz">Ounces</option>
          <option value="lb">Pounds</option>
          <option value="fl-oz">Fluid Ounces</option>
          <option value="cup">Cups</option>
          <option value="pnt">Pints</option>
          <option value="qt">Quarts</option>
          <option value="gal">Gallons</option>
        </select>}
        {convertFrom === "Metric" &&
        <select className="selectFromUnit" onChange={changeConvertFromUnit}>
          <option value="mg">Milligrams</option>
          <option value="g">Grams</option>
          <option value="kg">Kilograms</option>
          <option value="ml">Milliliters</option>
          <option value="dl">Deciliters</option>
          <option value="l">Liters</option>
        </select>}

        <button className="button" onClick={doConvert}>Convert!</button>

        <input type="text" className="textInput" value={conversionResult} disabled></input>
        {convertTo === "US-Custom" &&
        <select className="selectFromUnit" onChange={changeConvertToUnit}>
          <option value="oz">Ounces</option>
          <option value="lb">Pounds</option>
          <option value="fl-oz">Fluid Ounces</option>
          <option value="cup">Cups</option>
          <option value="pnt">Pints</option>
          <option value="qt">Quarts</option>
          <option value="gal">Gallons</option>
        </select>}
        {convertTo === "Metric" &&
        <select className="selectFromUnit" onChange={changeConvertToUnit}>
          <option value="mg">Milligrams</option>
          <option value="g">Grams</option>
          <option value="kg">Kilograms</option>
          <option value="ml">Milliliters</option>
          <option value="dl">Deciliters</option>
          <option value="l">Liters</option>
        </select>}
      </div>
    </div>
  )
};

export default App;
