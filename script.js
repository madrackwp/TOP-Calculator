const calcDisplay = document.querySelector(".calc-display input")
var backBtn = document.querySelector(".calc-back-btn")
const decimalBtn = document.querySelector("#calc-btn-decimal")
function add(a, b){
  return a + b;
}

function subtract(a, b){
  return a -b;
}

function divide(a, b){
  if (b === 0){
    window.alert("Zero division error! Try again")
    clearCalculator()
    return null
  } else {
    return a / b;
  }
}

function multiply(a, b){
  return a*b; 
}

let operatorCodes = {
  "add": 0,
  "subtract": 1,
  "multiply": 2,
  "divide": 3
}

function operate(operator, a ,b){
  var result;
  if (operator === "add"){
    result = add(a,b)
  } else if (operator === "subtract"){
    result = subtract(a,b)
  } else if (operator === "divide"){
    result = divide(a, b)
  } else {
    result = multiply(a, b)
  }
  if (result === null){
    calcDisplay.value = 0
  } else {
    calcDisplay.value = result
  }
  return result
}

var value1 = {
  value: null,
  awaitingInput: true,
  decimal: false
}
var value2 = {
  value: null,
  awaitingInput: true,
  decimal: false
}
var selectedOperator = null
// var value2AwaitInput = true

function clearCalculator(){
  value1 = null;
  value2 = null;
  calcDisplay.value= 0;
  selectedOperator = null
  value2AwaitInput = false
}
document.querySelector(".calc-clear").addEventListener("click", clearCalculator)

document.querySelectorAll(".calc-btns .calc-btns-num button").forEach(
  (button) => {
    button.addEventListener("click", ()=>{
      // console.log(button.innerHTML)
      if (selectedOperator === null){
        if (value1.value === null){
          value1.value = parseInt(button.innerHTML)
        } else {
          value1.value *= 10
          value1.value += parseInt(button.innerHTML)
        }
      } else {
        
        if (value2.awaitingInput){
          calcDisplay.value = 0
          value2.awaitingInput = false
        }
        value2.value *= 10
        value2.value += parseInt(button.innerHTML)
      }
      
      if (parseInt(calcDisplay.value) === 0){
        calcDisplay.value = button.innerHTML
      } else {
        calcDisplay.value += button.innerHTML
      }
    })
  }
)

document.querySelectorAll(".calc-btns-op button").forEach(
  (button)=>{
    button.addEventListener("click", ()=>{
      if (selectedOperator !== null){
        value1.value = operate(selectedOperator, value1.value, value2.value)
        value2.value = null
        calcDisplay.value = value1.value
        value2.awaitingInput = true
      } else {
        calcDisplay.value = 0;
      }
      if (button.id === "op-add"){
        selectedOperator = "add"
      } else if (button.id === "op-subtract"){
        selectedOperator = "subtract"
      } else if (button.id === "op-multiply"){
        selectedOperator = "multiply"
      } else {
        selectedOperator = "divide"
      }
    })
})

document.querySelector("#calc-eq").addEventListener("click", ()=>{
  if (value1.value === null || value2.value === null){
    window.alert("Missing numbers")
  } else{
    operate(selectedOperator, value1.value, value2.value)
  }
})

backBtn.addEventListener("click", ()=>{
  if (value1.value !== null && value2.awaitingInput === true){
    //Will remove subtrack from value1
    value1.value = backSpace(value1.value)
    calcDisplay.value = value1.value
  } else if (value2.value !== null){
    //Remove from value2
    value2.value = backSpace(value2.value)
    calcDisplay.value = value2.value
  }
})

function backSpace(valueField){
  if (valueField % 10 === 0){
    return 0
  } else {
    return parseInt(valueField/10)
  }
}