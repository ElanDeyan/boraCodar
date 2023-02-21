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

    /**
     * @param {Element | null} element
     */
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

    get actualInput() {
        return this.#actualInput;
    }

    get memory() {
        return this.#memory;
    }

    /**
     * @param {number | string} value
     */
    writeInput(value) {
        if (typeof value === "string") value = value.trim();
        if (!Number.isNaN(Number(value))) value = Number(value);
        if (value === ",") value = ".";
        if (
            !(
                value === "." &&
                this.#actualInput.some(
                    (/** @type {number | string} */ item) => item === ".",
                )
            )
        )
        console.log(this.#actualInput.includes(0, 0))
            if (
                this.#actualInput.includes(0, 0) &&
                this.#actualInput.length === 1
            )
                this.#actualInput.length = 0;
        this.#actualInput.push(value);
        // @ts-ignore
        this.resultScreen.textContent = `${this.#arrayToNumber(
            this.#actualInput,
        )}`;
        console.log(this.#actualInput);
    }

    /**
     * @param {(number | string)[]} arr
     */
    #arrayToNumber(arr) {
        console.log(Number(arr.join("")));
        return Number(arr.join(""));
    }

    #saveInMemory() {
        if (this.#memory.length > 0) this.#memory.length = 0;
        for (const item of this.#actualInput) {
            this.#memory.push(item);
        }
        this.#actualInput.length = 0;
    }

    /**
     * @param {string} value
     */
    #updateActualInput(value) {
        console.log(`${value}`, this.#actualInput);
        // const reservedStrings = [".", "-", '-'];
        this.#actualInput.length = 0;
        for (const char of `${value}`) {
            console.log(char, char === "-");
            if (char === "-" || char === ".") this.#actualInput.push(`${char}`);
            else this.#actualInput.push(Number(char));
        }
        console.log(this.#actualInput);
    }

    #lastOperation;

    /**
     * @param {string} operation
     * @param {string} numOfParameters
     */
    calc(operation, numOfParameters) {
        let result;
        switch (numOfParameters) {
            case "0":
                this.operations[operation]();
                break;
            case "1":
                if (this.#actualInput.length === 0 && this.#memory.length !== 0)
                    this.#actualInput = [...this.#memory];
                else if(this.#actualInput.length === 0 && this.#memory.length === 0) this.#actualInput = [0]
                result = this.operations[operation](
                    this.#arrayToNumber(this.#actualInput),
                );
                // @ts-ignore
                this.resultScreen.textContent = result;
                this.#updateActualInput(result);
                console.log("Memory: ", this.#memory);
                console.log("ActualInput: ", this.#actualInput);
                break;
            case "2":
                if (this.#memory.length === 0) {
                    this.#saveInMemory();
                    console.log("Memory: ", this.#memory);
                    this.#lastOperation = operation;
                    console.log(this.#lastOperation);
                } else {
                    if (operation === "equals") {
                        console.log(this.#lastOperation);
                        // @ts-ignore
                        let result = this.operations[this.#lastOperation](
                            this.#arrayToNumber(this.#memory),
                            this.#arrayToNumber(this.#actualInput),
                        );
                        console.log("Result: ", result);
                        // @ts-ignore
                        this.resultScreen.textContent = result;
                        // @ts-ignore
                        // this.operationHistory += `${this.#memory} ${this.#lastOperation} ${this.#actualInput}`
                        this.#updateActualInput(result);
                        this.#saveInMemory();
                        // this.#updateActualInput(result)
                        console.log("Memory: ", this.#memory);
                        console.log("ActualInput", this.#actualInput);
                    } else {
                        if (this.#lastOperation !== undefined) {
                          this.#lastOperation = operation;
                        console.log("Last Operation", this.#lastOperation);
                            console.log(this.#lastOperation);
                            // @ts-ignore
                            let result = this.operations[this.#lastOperation](
                                this.#arrayToNumber(this.#memory),
                                this.#arrayToNumber(this.#actualInput),
                            );
                            console.log("Result: ", result);
                            // @ts-ignore
                            this.resultScreen.textContent = result;
                            this.#updateActualInput(result);
                            this.#saveInMemory();
                            console.log("Memory: ", this.#memory);
                            console.log("ActualInput", this.#actualInput);
                        }
                        this.#lastOperation = operation;
                        console.log("Last Operation", this.#lastOperation);
                        
                    }
                }
                break;
            default:
                "Numero de parametros errado";
                break;
        }
    }

    operations = {
        CE: () => {
            // @ts-ignore
            this.resultScreen.textContent = 0;
            this.#actualInput.length = 0;
            this.#actualInput.push(0);
        },
        C: () => {
            // @ts-ignore
            this.resultScreen.textContent = 0;
            this.#actualInput.length = 0;
            // @ts-ignore
            this.operationHistory.textContent = "";
            this.#memory.length = 0;
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
        // equals: () => {},
        "plus-minus": (/** @type {number} */ num) => num * -1,
    };
}

export default Calculator;
