"use strict";

import {
    inputButtons,
    operationButtons,
    resultScreen,
    operationHistory,
} from "./js/elements.js";
import { actualInput, memory } from "./js/logic/logic.js";
import {
    writeInput,
    operations,
    arrayToNumber,
    updateActualInput,
    saveInMemory,
} from "./js/logic/functions.js";

for (const key in inputButtons) {
    if (Object.hasOwnProperty.call(inputButtons, key)) {
        const element = inputButtons[key];
        const value = element.innerText;
        element.addEventListener("click", () => {
            resultScreen.innerText = writeInput(value, actualInput);
            console.log(actualInput, resultScreen);
        });
    }
}

for (const key in operationButtons) {
    if (Object.hasOwnProperty.call(operationButtons, key)) {
        const element = operationButtons[key];
        const numOfParameters = element.getAttribute("data-parameters");
        const operation = element.getAttribute("data-value");
        let result;
        element.addEventListener("click", e => {
            switch (numOfParameters) {
                case "0":
                    if (operation === "CE")
                        result = operations[operation](
                            resultScreen,
                            actualInput,
                        );
                    else
                        result = operations[operation](
                            resultScreen,
                            actualInput,
                            operationHistory,
                            memory,
                        );
                    break;
                case "1":
                    resultScreen.innerText = operations[operation](arrayToNumber(actualInput))
                    updateActualInput(resultScreen.innerText, actualInput)
                    break;

                case "2":
                    saveInMemory(memory, actualInput)
                    console.log(memory, actualInput)
                    operationHistory.innerText = `${arrayToNumber(memory)} ${operation} `
                    resultScreen.innerText = operations[operation](arrayToNumber(memory), arrayToNumber(actualInput))
                    updateActualInput(resultScreen.innerText, actualInput)
                    break;
                default:
                    break;
            }
            console.log(actualInput)
        });
    }
}
