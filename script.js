const calcDisplay = document.querySelector(".calc-display input")

function add(a, b){
  return a + b;
}

function subtract(a, b){
  return a -b;
}

function divide(a, b){
  return a / b;
}

function multiply(a, b){
  return a*b; 
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
  calcDisplay.value = result
  return result
}

var value1 = 0
var value2 = 0
var selectedOperator = null

document.querySelector(".calc-clear").addEventListener("click", ()=>{
  value1 = 0;
  value2 = 0;
  calcDisplay.value= 0;
  selectedOperator = null
})

document.querySelectorAll(".calc-btns .calc-btns-num button").forEach(
  (button) => {
    button.addEventListener("click", ()=>{
      // console.log(button.innerHTML)
      if (selectedOperator === null){
        value1 *= 10
        value1 += parseInt(button.innerHTML)
      } else {
        calcDisplay.value = 0
        value2 *= 10
        value2 += parseInt(button.innerHTML)
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
        value1 = operate(selectedOperator, value1, value2)
        value2 = 0
        calcDisplay .value = value1
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
  operate(selectedOperator, value1, value2)
})