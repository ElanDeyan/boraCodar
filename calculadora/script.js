const actualOperation = document.querySelector('.operation')
const output = document.querySelector('.output .result')

const buttons = document.querySelectorAll('.keyboard button')

const buttonsObj = new Object()
const operandMemory = new Array()
const actualInput = new Array()

const operations = {
  CE: () => {
    output.innerText = ''
    actualInput.length = 0
  },
  C: () => {
    output.innerText = ''
    actualInput.length = 0
    actualOperation.innerText = ''
  },
  percent: (num) => {
    return num / 100
  },
  divide: (firstOp, secondOp) => {
    return firstOp / secondOp
  },
  times: (firstOp, secondOp) => { },
  minus: (firstOp, secondOp) => { },
  plus: (firstOp, secondOp) => { },
  equals: () => { },
  plusMinus: (num) => { }
}

for (const button of buttons) {
  const buttonValue = button.getAttribute('data-value')
  buttonsObj[buttonValue] = button
}

const operationButtons = new Object()

for (const key in buttonsObj) {
  if (Object.hasOwnProperty.call(buttonsObj, key)) {
    const element = buttonsObj[key]
    if (element.getAttribute('data-role') !== 'input') operationButtons[key] = element
  }
}

for (const key in operationButtons) {
  if (Object.hasOwnProperty.call(operationButtons, key)) {
    const element = operationButtons[key]
    element.addEventListener('click', e => {
      // console.log(e.target.getAttribute('data-value'))
      const operation = e.target.getAttribute('data-value')
      const numOfParameters = e.target.getAttribute('data-parameters')
      let result;
      switch (numOfParameters) {
        case '0':
          result = Number(operations[operation]())
          break;
        case '1':
          result = Number(operations[operation](Number(output)))
        default:
          break;
      }
      output.innerText = Number(operations[operation](output.innerText))
    })
  }
}

for (const key in buttonsObj) {
  if (Object.hasOwnProperty.call(buttonsObj, key)) {
    const element = buttonsObj[key]
    element.addEventListener('click', () => {
      if (element.getAttribute('data-role') === 'input') output.innerHTML = writeInput(element.innerText)
    })

  }
}

function writeInput(value) {
  if (value === ',') value = '.'
  if (value === ',' && actualInput.some(item => item === '.')) return
  actualInput.push(value)
  return arrayToNumber(actualInput)
}

function arrayToNumber(arr) {
  return Number(arr.join(''))
}