import React, { useState } from 'react';


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
    function doConvert() {
      setConversionResult(convert(conversionAmount).from(convertFromUnit).to(convertToUnit));
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
                        <option value="oz">Ounces</option>
                        <option value="lb">Pounds</option>
                        <option value="fl-oz">Fluid Ounces</option>
                        <option value="cup">Cups</option>
                        <option value="pnt">Pints</option>
                        <option value="qt">Quarts</option>
                        <option value="gal">Gallons</option>
                      </select>}
                    {convertFrom === "Metric" &&
                      <select value={convertFromUnit} className="dropdown" onChange={changeConvertFromUnit}>
                        <option value="mg">Milligrams</option>
                        <option value="g">Grams</option>
                        <option value="kg">Kilograms</option>
                        <option value="ml">Milliliters</option>
                        <option value="dl">Deciliters</option>
                        <option value="l">Liters</option>
                      </select>}
                  </div>
                  <div className="button" onClick={doSwap}>Swap</div>
                  <input type="text" className="textInputGray" value={conversionResult} disabled></input>
                  <div className="child2">
                    {convertTo === "US-Custom" &&
                      <select value={convertToUnit} className="dropdown" onChange={changeConvertToUnit}>
                        <option value="oz">Ounces</option>
                        <option value="lb">Pounds</option>
                        <option value="fl-oz">Fluid Ounces</option>
                        <option value="cup">Cups</option>
                        <option value="pnt">Pints</option>
                        <option value="qt">Quarts</option>
                        <option value="gal">Gallons</option>
                      </select>}
                    {convertTo === "Metric" &&
                      <select value={convertToUnit} className="dropdown" onChange={changeConvertToUnit}>
                        <option value="mg">Milligrams</option>
                        <option value="g">Grams</option>
                        <option value="kg">Kilograms</option>
                        <option value="ml">Milliliters</option>
                        <option value="dl">Deciliters</option>
                        <option value="l">Liters</option>
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