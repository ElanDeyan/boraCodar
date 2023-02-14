'use strict'

function writeInput(value, actualInput) {
  if (value === ',') value = '.'
  if (!(value === '.' && actualInput.some(item => item === '.'))) actualInput.push(value)
  return arrayToNumber(actualInput)
}

function arrayToNumber(arr) {
  return Number(arr.join(''))
}

function saveInMemory(memory, actualInput) {
  for (const item of actualInput) {
    memory.push(item)
  }
  actualInput.length = 0
}

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
  "CE": (output, actualInput) => {
    output.innerText = 0
    actualInput.length = 0
  },
  "C": (output, actualInput, actualOperation, memory) => {
    output.innerText = 0
    actualInput.length = 0
    actualOperation.innerText = ''
    memory.length = 0
  },
  "percent": (num) => num / 100,
  "divide": (firstOp, secondOp) => firstOp / secondOp,
  "times": (firstOp, secondOp) => firstOp * secondOp,
  "minus": (firstOp, secondOp) => firstOp - secondOp,
  "plus": (firstOp, secondOp) => firstOp + secondOp,
  "equals": () => {

  },
  "plus-minus": (num) => num * -1,
  
}

export {
  writeInput,
  arrayToNumber,
  saveInMemory,
  updateActualInput,
  operations
}