//@ts-check
"use strict";

import {
    inputButtons,
    operationButtons,
    resultScreen,
    operationHistory,
} from "./js/elements.js";

import Calculator from "./js/Calculator.js";

const myCalculator = new Calculator(inputButtons, operationButtons, resultScreen, operationHistory)

for (const key in myCalculator.inputButtons) {
  if (Object.hasOwnProperty.call(myCalculator.inputButtons, key)) {
    const element = myCalculator.inputButtons[key];
    const value = element.textContent
    element.addEventListener('click', () => {
      myCalculator.writeInput(value)
    })
  }
}

for (const key in myCalculator.operationButtons) {
  if (Object.hasOwnProperty.call(myCalculator.operationButtons, key)) {
    const element = myCalculator.operationButtons[key];
    const operation = element.dataset.value
    console.log(operation)
  }
}

// for (const key in operationButtons) {
//     if (Object.hasOwnProperty.call(operationButtons, key)) {
//         const element = operationButtons[key];
//         const numOfParameters = element.getAttribute("data-parameters");
//         const operation = element.getAttribute("data-value");
//         let result;
//         element.addEventListener("click", e => {
//             switch (numOfParameters) {
//                 case "0":
//                     if (operation === "CE")
//                         result = operations[operation](
//                             resultScreen,
//                             actualInput,
//                         );
//                     else
//                         result = operations[operation](
//                             resultScreen,
//                             actualInput,
//                             operationHistory,
//                             memory,
//                         );
//                     break;
//                 case "1":
//                     resultScreen.innerText = operations[operation](arrayToNumber(actualInput))
//                     updateActualInput(resultScreen.innerText, actualInput)
//                     break;

//                 case "2":
//                     saveInMemory(memory, actualInput)
//                     console.log(memory, actualInput)
//                     operationHistory.innerText = `${arrayToNumber(memory)} ${operation} `
//                     resultScreen.innerText = operations[operation](arrayToNumber(memory), arrayToNumber(actualInput))
//                     updateActualInput(resultScreen.innerText, actualInput)
//                     break;
//                 default:
//                     break;
//             }
//             console.log(actualInput)
//         });
//     }
// }
