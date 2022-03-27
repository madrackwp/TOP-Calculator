const calcDisplay = document.querySelector(".calc-display input")
const backBtn = document.querySelector(".calc-back-btn")
const decimalBtn = document.querySelector("#calc-btn-decimal")
const calcClearBtn = document.querySelector(".calc-clear")
const numBtns = document.querySelectorAll(".calc-btns .calc-btns-num button")
const opBtns = document.querySelectorAll(".calc-btns-op button")
const eqBtn = document.querySelector("#calc-eq")
var selectedOperator = null
var value2;
var value1;

function add(a, b){
  return parseFloat(a) + parseFloat(b);
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

function clearCalculator(){
  value1 = {
    value: null, //Float/int
    awaitingInput: true,
    decimal: false,
    decimalPoint: 10
  }
  value2 = {
    value: null,
    awaitingInput: true,
    decimal: false,
    decimalPoint: 10
  }
  calcDisplay.value= 0;
  selectedOperator = null
  // value2AwaitInput = false
}

function backSpace(valueField){
  if (valueField.value.split("").pop() === "."){
    valueField.decimal = false
  } 
  valueField.value = valueField.value.slice(0,-1)
  return valueField
}

calcClearBtn.addEventListener("click", clearCalculator)

numBtns.forEach((button) =>{
  button.addEventListener("click", ()=>{
    if (value1.awaitingInput === true){
      if (value1.value === null){
        value1.value = button.innerHTML
      } else {
        value1.value += button.innerHTML
      }
      calcDisplay.value = value1.value
    } else {
      if (value2.value === null){
        value2.value = button.innerHTML
      } else {
        value2.value += button.innerHTML
      }
      calcDisplay.value = value2.value
    }
    
  })
})

opBtns.forEach(
  (button)=>{
    button.addEventListener("click", ()=>{
      if (selectedOperator !== null){
        value1.value = operate(selectedOperator, value1.value, value2.value)
        value2.value = null
        calcDisplay.value = value1.value
        value2.awaitingInput = true
      } else {
        calcDisplay.value = 0;
        value1.awaitingInput = false
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

eqBtn.addEventListener("click", ()=>{
  if (value1.value === null || value2.value === null){
    window.alert("Missing numbers")
  } else{
    operate(selectedOperator, value1.value, value2.value)
  }
})

backBtn.addEventListener("click", ()=>{
  if (value1.awaitingInput === true ){
    //Will remove subtrack from value1
    value1 = backSpace(value1)
    calcDisplay.value = value1.value
  } else {
    //Remove from value2
    value2 = backSpace(value2)
    calcDisplay.value = value2.value
  }
})

decimalBtn.addEventListener("click", ()=>{
  if (value1.value === null){
    //This condition is when no values have been inputted and that means its a 0.XXX type of input
    value1.decimalPoint = true
  } else if (value1.value !== null && value1.decimal === false){
    //Adding a decimal to value1
    value1.decimalPoint = true
  } else if (value1.value !== null && value1.decimal === true){
    //Throw an error as there is already a decimal
    window.alert("Already a floating point number")
  } else if (value2.value === null){
    //Add a decimal to 0
    value2.decimalPoint = true
  } else if (value2.value !== null && value2.decimal === false){
    //Add a decimal to value2
    value2.decimalPoint = true
  } else {
    //Throw the same error as before
    window.alert("Already a floating point number")
  }
})

clearCalculator()