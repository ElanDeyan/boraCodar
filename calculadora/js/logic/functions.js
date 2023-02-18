//@ts-check
"use strict";

/**
 * @param {string} value
 * @param {any[]} actualInput
 */
function writeInput(value, actualInput) {
  if (value === ',') value = '.'
  if (!(value === '.' && actualInput.some((/** @type {string} */ item) => item === '.'))) actualInput.push(value)
  return arrayToNumber(actualInput)
}

/**
 * @param {any[]} arr
 */
function arrayToNumber(arr) {
  return Number(arr.join(''))
}

/**
 * @param {any[]} memory
 * @param {string | any[]} actualInput
 */
function saveInMemory(memory, actualInput) {
  for (const item of actualInput) {
    memory.push(item)
  }
  actualInput.length = 0
}

/**
 * @param {any} value
 * @param {number[]} actualInput
 */
function updateActualInput(value, actualInput) {
  console.log(value, actualInput)
  const reservedStrings = ['.','-']
  actualInput.length = 0
  for (const char of value) {
    if(!(char in reservedStrings)) actualInput.push(Number(char))
    else actualInput.push(char)
  }
}

const operations = {
  "CE": (/** @type {{ innerText: number; }} */ output, /** @type {string | any[]} */ actualInput) => {
    output.innerText = 0
    actualInput.length = 0
  },
  "C": (/** @type {{ innerText: number; }} */ output, /** @type {string | any[]} */ actualInput, /** @type {{ innerText: string; }} */ actualOperation, /** @type {string | any[]} */ memory) => {
    output.innerText = 0
    actualInput.length = 0
    actualOperation.innerText = ''
    memory.length = 0
  },
  "percent": (/** @type {number} */ num) => num / 100,
  "divide": (/** @type {number} */ firstOp, /** @type {number} */ secondOp) => firstOp / secondOp,
  "times": (/** @type {number} */ firstOp, /** @type {number} */ secondOp) => firstOp * secondOp,
  "minus": (/** @type {number} */ firstOp, /** @type {number} */ secondOp) => firstOp - secondOp,
  "plus": (/** @type {any} */ firstOp, /** @type {any} */ secondOp) => firstOp + secondOp,
  "equals": () => {

  },
  "plus-minus": (/** @type {number} */ num) => num * -1,
  
}

export {
  writeInput,
  arrayToNumber,
  saveInMemory,
  updateActualInput,
  operations
}