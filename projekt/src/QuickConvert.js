import React, { useState } from 'react';


const QuickConvert = props => {
  let convert = require('convert-units');
  const volume = ["fl-oz", "cup", "pnt", "qt", "gal", "ml", "dl", "l"];
  const mass = ["oz", "lb", "mg", "g", "kg"];

  const [convertFrom, setConvertFrom] = useState("US-Custom");
  const [convertTo, setConvertTo] = useState("Metric");
  const [convertFromUnit, setConvertFromUnit] = useState("oz");
  const [convertToUnit, setConvertToUnit] = useState("mg");
  const [conversionAmount, setConversionAmount] = useState("0");
  const [conversionResult, setConversionResult] = useState("0");
  const [fromType, setFromType] = useState("mass");
  const [toType, setToType] = useState("mass");

  function changeConvertFrom(event) {
    setConvertFrom(event.target.value);
    convertTo === "US-Custom" ? setConvertToUnit("oz") : setConvertToUnit("mg");
  }
  function changeConvertTo(event) {
    setConvertTo(event.target.value);
  }
  function changeConvertFromUnit(event) {
    setConvertFromUnit(event.target.value);
    if (mass.indexOf(event.target.value) > -1) {
      setFromType("mass");
      if (toType === "volume") {
        convertTo === "US-Custom" ? setConvertToUnit("oz") : setConvertToUnit("mg");
        setToType("mass");
      }
    }
    else if (volume.indexOf(event.target.value) > -1) {
      setFromType("volume");
      if (toType === "mass") {
        convertTo === "US-Custom" ? setConvertToUnit("fl-oz") : setConvertToUnit("ml");
        setToType("volume");
      }
    }
  }
  function changeConvertToUnit(event) {
    setConvertToUnit(event.target.value);
    if (mass.indexOf(event.target.value) > -1) {
      setToType("mass");
    }
    else {
      setToType("volume");
    }
  }
  function changeConversionAmount(event) {
    setConversionAmount(event.target.value);
  }
  function doConvert() {
    setConversionResult(convert(conversionAmount).from(convertFromUnit).to(convertToUnit).toFixed(2));
  }
  function doSwap() {
    setConvertTo(convertFrom);
    setConvertFrom(convertTo);
    setConvertToUnit(convertFromUnit);
    setConvertFromUnit(convertToUnit);
  }

  return (
    <div className="green">
      <div className="super">
        <h1 className="header">Quick Convert</h1>
        <div className="box">
          <div className="box-in-box">
            <div className="quickConvert">
              <div className="daddyCool">
                <input type="text" className="textInput" onChange={changeConversionAmount}></input>
                <div className="child2">
                  {convertFrom === "US-Custom" &&
                    <select value={convertFromUnit} className="dropdown" onChange={changeConvertFromUnit}>
                      <option value="oz">Oz (Ounces)</option>
                      <option value="lb">lb (Pounds)</option>
                      <option value="fl-oz">fl oz (Fluid Ounces)</option>
                      <option value="cup">c (Cups)</option>
                      <option value="pnt">pt (Pints)</option>
                      <option value="qt">qt (Quarts)</option>
                      <option value="gal">gal (Gallons)</option>
                    </select>}
                  {convertFrom === "Metric" &&
                    <select value={convertFromUnit} className="dropdown" onChange={changeConvertFromUnit}>
                      <option value="mg">mg (Milligrams)</option>
                      <option value="g">g (Grams)</option>
                      <option value="kg">kg (Kilograms)</option>
                      <option value="ml">ml (Milliliters)</option>
                      <option value="dl">dl (Deciliters)</option>
                      <option value="l">l (Liters)</option>
                    </select>}
                </div>
                <div className="button" onClick={doSwap}><img alt = "swap" src = "SwapIcon.svg"></img></div>
                <input type="text" className="textInputGray" value={conversionResult} disabled></input>
                <div className="child2">
                  {convertTo === "US-Custom" && fromType === "mass" &&
                    <select value={convertToUnit} className="dropdown" onChange={changeConvertToUnit}>
                      <option value="oz">oz (Ounces)</option>
                      <option value="lb">lb (Pounds)</option>
                    </select>}
                  {convertTo === "US-Custom" && fromType === "volume" &&
                    <select value={convertToUnit} className="dropdown" onChange={changeConvertToUnit}>
                      <option value="fl-oz">fl oz (Fluid Ounces)</option>
                      <option value="cup">c (Cups)</option>
                      <option value="pnt">pt (Pints)</option>
                      <option value="qt">qt (Quarts)</option>
                      <option value="gal">gal (Gallons)</option>
                    </select>}
                  {convertTo === "Metric" && fromType === "mass" &&
                    <select value={convertToUnit} className="dropdown" onChange={changeConvertToUnit}>
                      <option value="mg">mg (Milligrams)</option>
                      <option value="g">g (Grams)</option>
                      <option value="kg">kg (Kilograms)</option>
                    </select>}
                  {convertTo === "Metric" && fromType === "volume" &&
                    <select value={convertToUnit} className="dropdown" onChange={changeConvertToUnit}>
                      <option value="ml">ml (Milliliters)</option>
                      <option value="dl">dl (Deciliters)</option>
                      <option value="l">l (Liters)</option>
                    </select>}
                </div>
              </div>
              <div className="quickConvert">
                <div className="fromToParent">
                  <div>
                    <h2 className="fromTo">From</h2>
                    <select value={convertFrom} className="dropdown2" onChange={changeConvertFrom}>
                      <option value="US-Custom">US-Custom</option>
                      <option value="Metric">Metric</option>
                    </select>
                  </div>
                  <div>
                    <h2 className="fromTo">To</h2>
                    <select value={convertTo} className="dropdown2" onChange={changeConvertTo}>
                      <option value="Metric">Metric</option>
                      <option value="US-Custom">US-Custom</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="convertButton" onClick={doConvert}>Convert!</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickConvert;