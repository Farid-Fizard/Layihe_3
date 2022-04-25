const boxes = document.querySelectorAll(".boxes");
const boxList_L = document.querySelectorAll(".boxL");
const boxList_R = document.querySelectorAll(".boxR");
let inputs = document.querySelectorAll("input");
let currencyInfo = document.querySelectorAll(".currency");
let currencyL = currencyInfo[0];
let currencyR = currencyInfo[1];
let inputL = inputs[0];
let inputR = inputs[1];
let from = "RUB";
let to = "USD";
let value = inputL.value;

action();
inputL.addEventListener("keyup", () => {
    let checked = true;
    let temp = "";
    inputL.value = inputL.value.replace(/\s+/g, "")
    for (let i = 0; i < inputL.value.length; i++) {
        if (isNaN(inputL.value[i])) checked = false;
    }
    if (checked) {
        value = inputL.value;
        temp = Number(inputL.value).toLocaleString("fi-FI");
    } else {
        inputL.value = inputL.value.replace(",", ".")
        temp = inputL.value;
        value = inputL.value;
    }
    inputL.value = temp;
    action();
});

function underTextChanger() {
    //for left
    fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
        .then((resp) => {
            if (resp.status != 200) {}
            return resp.json();
        })
        .then((data) => {
                // inputların dəyərlərinin anlıq olaraq dəyişdirilməsi
                if (value.length != 0) inputR.value = (value * data.rates[`${to}`]).toFixed(4);

                // altyazının anlıq olaraq dəyişdirilməsi
                currencyL.textContent = `1 ${from} = ${data.rates[`${to}`].toFixed(4)} ${to}`;
    })
    .catch(err =>  alert("NO INTERNET CONNECTION "))
  //for right
  fetch(`https://api.exchangerate.host/latest?base=${to}&symbols=${from}`)
    .then((resp) => resp.json())
    .then((data) => {
      // altyazının anlıq olaraq dəyişdirilməsi
      currencyR.textContent = `1 ${to} = ${data.rates[`${from}`].toFixed(4)} ${from}`;
    });
}
function action() {
  if (from != to){
  underTextChanger();
  // Left boxes changer
  boxList_L[0].addEventListener("click", () => {
    removerL();
    boxList_L[0].classList.add("clicked");
    from = `${boxList_L[0].textContent}`;
  });
  boxList_L[1].addEventListener("click", () => {
    removerL();
    boxList_L[1].classList.add("clicked");
    from = `${boxList_L[1].textContent}`;
  });
  boxList_L[2].addEventListener("click", () => {
    removerL();
    boxList_L[2].classList.add("clicked");
    from = `${boxList_L[2].textContent}`;
  });
  boxList_L[3].addEventListener("click", () => {
    removerL();
    boxList_L[3].classList.add("clicked");
    from = `${boxList_L[3].textContent}`;
  });

  //remove clicked class (in left class)
  function removerL() {
    boxList_L.forEach((item) => {
      item.classList.remove("clicked");
    });
  }

  // Right boxes changer
  boxList_R[0].addEventListener("click", () => {
    removerR();
    boxList_R[0].classList.add("clicked");
    to = boxList_R[0].textContent;
  });
  boxList_R[1].addEventListener("click", () => {
    removerR();
    boxList_R[1].classList.add("clicked");
    to = boxList_R[1].textContent;
  });
  boxList_R[2].addEventListener("click", () => {
    removerR();
    boxList_R[2].classList.add("clicked");
    to = boxList_R[2].textContent;
  });
  boxList_R[3].addEventListener("click", () => {
    removerR();
    boxList_R[3].classList.add("clicked");
    to = boxList_R[3].textContent;
  });

  //remove clicked class ( in Right boxes)
  function removerR() {
    boxList_R.forEach((item) => {
      item.classList.remove("clicked");
    });
  }

  //təkrarlanma üçün
  boxes.forEach((item) =>
    item.addEventListener("click", () => {
      if (from != to){ underTextChanger();
        inputR.value = "";
      }
      else{ 
        CurrencyError();
         }
    })
  );
  }
  else{ 
    CurrencyError();
  }
}


function CurrencyError(){

  currencyL.textContent = "same currency";
  currencyR.textContent = "same currency";
  inputR.value = "Same currency !";
}