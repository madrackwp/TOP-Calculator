const calcDisplay = document.querySelector(".calc-display")


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
  if (operator === "add"){
    calcDisplay.innerHTML = add(a,b)
  } else if (operator === "subtract"){
    calcDisplay.innerHTML = subtract(a,b)
  } else if (operator === "divide"){
    calcDisplay.innerHTML = divide(a, b)
  } else {
    calcDisplay.innerHTML = multiply(a, b)
  }
}

var value1 = 0
var value2 = 0
var selectedOperator = null

document.querySelector(".calc-clear").addEventListener("click", ()=>{
  value1 = 0;
  value2 = 0;
  calcDisplay.innerHTML = " ";
})

document.querySelectorAll(".calc-btns .calc-btns-num button").forEach(
  (button) => {
    button.addEventListener("click", ()=>{
      // console.log(button.innerHTML)
      if (selectedOperator === null){
        value1 *= 10
        value1 += parseInt(button.innerHTML)
      } else {
        value2 *= 10
        value2 += parseInt(button.innerHTML)
      }
      calcDisplay.innerHTML += button.innerHTML
    })
  }
)

document.querySelectorAll(".calc-btns-op button").forEach(
  (button)=>{
    button.addEventListener("click", ()=>{
      if (button.id === "op-add"){
        selectedOperator = "add"
      } else if (button.id === "op-subtract"){
        selectedOperator = "subtract"
      } else if (button.id === "op-multiply"){
        selectedOperator = "multiply"
      } else {
        selectedOperator = "divide"
      }
      calcDisplay.innerHTML = " ";
    })
})

document.querySelector("#calc-eq").addEventListener("click", ()=>{
  operate(selectedOperator, value1, value2)
})