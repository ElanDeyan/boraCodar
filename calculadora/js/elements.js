//@ts-check
"use strict";

const operationHistory = document.querySelector('.operation')
const resultScreen = document.querySelector('.output .result')

const allButtons = document.querySelectorAll('.keyboard button')

const buttonsObj = new Object()

for (const button of allButtons) {
  // @ts-ignore
  const buttonValue = button.dataset.value
  buttonsObj[buttonValue] = button
}

const operationButtons = new Object()
const inputButtons = new Object()

for (const key in buttonsObj) {
  if (Object.hasOwnProperty.call(buttonsObj, key)) {
    const element = buttonsObj[key]
    if (element.getAttribute('data-role') !== 'input') operationButtons[key] = element
    else inputButtons[key] = element
  }
}


export {
  operationHistory,
  resultScreen,
  allButtons,
  operationButtons,
  inputButtons
}