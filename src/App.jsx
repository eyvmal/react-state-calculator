import "./App.css"
import {useEffect, useState} from "react";

function App() {
  // Arrays of the buttons used in the calculator
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'clear', 'ANS'];
  const operators = ['+', '-', '*', '/'];
  
  const [firstNumber, setFirstNumber] = useState('0');
  const [secondNumber, setSecondNumber] = useState('0');
  const [operator, setOperator] = useState('+');
  const [answer, setAnswer] = useState(0);
  const [prevAnswer, setPrevAnswer] = useState('0');

  // Method to handle click on the numpads
  const handleClick = (setter, number, buttonLabel) => {
    if (buttonLabel === '.' && number.includes(buttonLabel)) return // Ignore if the number already has a decimal point
    if (buttonLabel === 'clear') {
      setter('0')
    } else if (buttonLabel === 'ANS') {
      setter(`${prevAnswer}`)
    } else {
      setter(number === '0' && buttonLabel !== '.' ? `${buttonLabel}` : number + `${buttonLabel}`) // Remove leading zeros if conditions are met
    }
  }

  // Auto update the answer when either the numbers or the operator is changed
  useEffect(() => {
    setAnswer(parseFloat(eval(`${firstNumber} ${operator} ${secondNumber}`).toFixed(2)))
  }, [firstNumber, operator, secondNumber]);

  const saveAnswer = () => {
    setPrevAnswer(`${answer}`)
  }
  
  return (
    <div className="calculator">
      <div className="panel">
        <p>{firstNumber}</p>
        <div className="numbers">
          {buttons.map((buttonLabel, index) => (
              <button key={index} onClick={() => handleClick(setFirstNumber, firstNumber, buttonLabel)}>{buttonLabel}</button>
          ))}
        </div>
      </div>

      <div className="panel">
        <p>+</p>
        <div className="numbers">
          {operators.map((buttonLabel, index) => (
              <button key={index} onClick={() => handleClick(setOperator(buttonLabel))}>{buttonLabel}</button>
          ))}
        </div>
      </div>

      <div className="panel">
        <p>{secondNumber}</p>
        <div className="numbers">
          {buttons.map((buttonLabel, index) => (
              <button key={index} onClick={() => handleClick(setSecondNumber, secondNumber, buttonLabel)}>{buttonLabel}</button>
          ))}
        </div>
      </div>
      <div className="panel answer">
        <p>{answer}</p>
        <div>
          <button>=</button>
          <button onClick={() => saveAnswer()}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default App
