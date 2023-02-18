//@ts-check
"use strict";
export class Calculator {
  /**
   * @param {Object} inputButtons
   * @param {Object} operationButtons
   * @param {Element | null} resultScreen
   * @param {Element | null} operationHistory
   */
  constructor(
    inputButtons,
    operationButtons,
    resultScreen,
    operationHistory,
  ) {
    if (this.#isNull(this.inputButtons)) {
      debugger;
    } else this.inputButtons = inputButtons;
    if (this.#isNull(this.operationButtons)) {
      debugger;
    } else this.operationButtons = operationButtons;
    if (this.#isNull(this.resultScreen)) {
      debugger;
    } else this.resultScreen = resultScreen;
    if (this.#isNull(this.operationHistory)) {
      debugger;
    } else this.operationHistory = operationHistory;
  }

  #isNull(element) {
    return element === null;
  }
  /**
   * @type {(number | string)[]}
   */
  #actualInput = new Array();
  /**
* @type {(number | string)[]}
*/
  #memory = new Array();

  /**
   * @param {number | string} value
   */
  writeInput(value) {
    if (typeof value === 'string') value = value.trim()
    if (!Number.isNaN(Number(value))) value = Number(value)
    if (value === ",") value = ".";
    if (
      !(
        value === "." &&
        this.#actualInput.some((/** @type {number | string} */ item) => item === ".")
      )
    )
      this.#actualInput.push(value);
    // @ts-ignore
    this.resultScreen.textContent = `${this.#arrayToNumber(this.#actualInput)}`;
    console.log(this.#actualInput)
  }

  /**
   * @param {any[]} arr
   */
  #arrayToNumber(arr) {
    return Number(arr.join(""));
  }

  /**
   * @param {any[]} memory
   * @param {string | any[]} actualInput
   */
  #saveInMemory(memory, actualInput) {
    for (const item of actualInput) {
      memory.push(item);
    }
    actualInput.length = 0;
  }

  /**
   * @param {any} value
   * @param {number[]} actualInput
   */
  #updateActualInput(value, actualInput) {
    console.log(value, actualInput);
    const reservedStrings = [".", "-"];
    actualInput.length = 0;
    for (const char of value) {
      if (!(char in reservedStrings)) actualInput.push(Number(char));
      else actualInput.push(char);
    }
  }

  static operations = {
    CE: (
            /** @type {{ innerText: number; }} */ output,
            /** @type {string | any[]} */ actualInput,
    ) => {
      output.innerText = 0;
      actualInput.length = 0;
    },
    C: (
            /** @type {{ innerText: number; }} */ output,
            /** @type {string | any[]} */ actualInput,
            /** @type {{ innerText: string; }} */ actualOperation,
            /** @type {string | any[]} */ memory,
    ) => {
      output.innerText = 0;
      actualInput.length = 0;
      actualOperation.innerText = "";
      memory.length = 0;
    },
    percent: (/** @type {number} */ num) => num / 100,
    divide: (
            /** @type {number} */ firstOp,
            /** @type {number} */ secondOp,
    ) => firstOp / secondOp,
    times: (
            /** @type {number} */ firstOp,
            /** @type {number} */ secondOp,
    ) => firstOp * secondOp,
    minus: (
            /** @type {number} */ firstOp,
            /** @type {number} */ secondOp,
    ) => firstOp - secondOp,
    plus: (/** @type {any} */ firstOp, /** @type {any} */ secondOp) =>
      firstOp + secondOp,
    equals: () => { },
    "plus-minus": (/** @type {number} */ num) => num * -1,
  };
}

export default Calculator;
