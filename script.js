//Radiobox elements
let repayment = document.getElementById("repayment");
let interest = document.getElementById("interest");
let repay_div = document.getElementById("repay-div");
let interst_div = document.getElementById("interst-div");

let repaycmpSt = getComputedStyle(repay_div).backgroundColor;
let interestcmpSt = getComputedStyle(interst_div).backgroundColor;

//Clear all inputs
let clear_all = document.getElementById("clear-all");
let allInputs = document.getElementsByClassName("inputs");

//Button and form
let button = document.getElementById("button");
let my_form = document.getElementById("my-form");

//All errors
let errors = document.getElementsByClassName("errors");
let radioboxError = document.getElementById("radioError");

//All icons in inputs
let icons = document.getElementsByClassName("icons");

//Visible and hidden div
let right_half_start = document.getElementById("right-half-start");
let right_half_end = document.getElementById("right-half-hidden");

//Generated calculation
let generated_month = document.getElementById("generated-month");
let generated_total = document.getElementById("generated-total");

//Events for radioboxes
repayment.addEventListener("click", () => {
  if (
    repaycmpSt === "rgba(0, 0, 0, 0)" ||
    interestcmpSt === "rgba(0, 0, 0, 0)"
  ) {
    repay_div.style.backgroundColor = "hsla(61, 70%, 52%, .3)";
    repay_div.style.border = "2px solid hsl(61, 70%, 52%)";
    interst_div.style.backgroundColor = "hsl(0, 0%, 100%)";
    interst_div.style.border = "1px solid hsl(200, 26%, 54%)";
  }
});

interest.addEventListener("click", () => {
  if (
    interestcmpSt === "rgba(0, 0, 0, 0)" ||
    repaycmpSt === "rgba(0, 0, 0, 0)"
  ) {
    interst_div.style.backgroundColor = "hsla(61, 70%, 52%, .3)";
    interst_div.style.border = "2px solid hsl(61, 70%, 52%)";
    repay_div.style.backgroundColor = "hsl(0, 0%, 100%)";
    repay_div.style.border = "1px solid hsl(200, 26%, 54%)";
  }
});

//Clear all inputs
clear_all.addEventListener("click", () => {
  interst_div.style.backgroundColor = "hsl(0, 0%, 100%)";
  interst_div.style.border = "1px solid hsl(200, 26%, 54%)";
  repay_div.style.backgroundColor = "hsl(0, 0%, 100%)";
  repay_div.style.border = "1px solid hsl(200, 26%, 54%)";
  my_form.reset();
});

//Validation before submitting
button.addEventListener("click", (e) => {
  if (!interest.checked && !repayment.checked) {
    e.preventDefault();
    radioboxError.style.display = "block";
    radioboxError.innerHTML = "This field is required";
  } else {
    radioboxError.style.display = "none";
  }

  for (let i = 0; i < allInputs.length; i++) {
    if (allInputs[i].value === "") {
      e.preventDefault();
      errors[i].style.visibility = "visible";
      errors[i].innerHTML = "This field is required";
      allInputs[i].style.border = "1.5px solid hsl(4, 69%, 50%)";
      icons[i].style.backgroundColor = "hsl(4, 69%, 50%)";
      icons[i].style.color = "hsl(0, 0%, 100%)";
    } else if (
      i === 0 &&
      (allInputs[0].value < 1 || isNaN(allInputs[0].value))
    ) {
      e.preventDefault();
      errors[0].style.visibility = "visible";
      errors[0].innerHTML = "Must be a valid number";
      allInputs[0].style.border = "1.5px solid hsl(4, 69%, 50%)";
      icons[0].style.backgroundColor = "hsl(4, 69%, 50%)";
      icons[0].style.color = "hsl(0, 0%, 100%)";
    } else if (
      i === 1 &&
      (allInputs[1].value < 1 || isNaN(allInputs[1].value))
    ) {
      e.preventDefault();
      errors[1].style.visibility = "visible";
      errors[1].innerHTML = "Must be a valid number";
      allInputs[1].style.border = "1.5px solid hsl(4, 69%, 50%)";
      icons[1].style.backgroundColor = "hsl(4, 69%, 50%)";
      icons[1].style.color = "hsl(0, 0%, 100%)";
    } else if (
      i === 2 &&
      (allInputs[2].value < 0 || isNaN(allInputs[2].value))
    ) {
      e.preventDefault();
      errors[2].style.visibility = "visible";
      errors[2].innerHTML = "Must be a valid number";
      allInputs[2].style.border = "1.5px solid hsl(4, 69%, 50%)";
      icons[2].style.backgroundColor = "hsl(4, 69%, 50%)";
      icons[2].style.color = "hsl(0, 0%, 100%)";
    } else {
      errors[i].style.visibility = "hidden";
      allInputs[i].style.border = "1.5px solid hsl(200, 26%, 54%)";
      icons[i].style.backgroundColor = "hsl(202, 86%, 94%)";
      icons[i].style.color = "hsl(200, 24%, 40%)";
    }
  }
});

my_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let amount = allInputs[0].value;
  let term = allInputs[1].value;
  let rate = allInputs[2].value;

  let monthly = 0;
  let repay_over = 0;

  //Calculations
  if (interest.checked) {
    monthly = (amount * (rate / 100)) / 12;
    repay_over = Number(amount) + Number(monthly * (term * 12));
  } else if (repayment.checked) {
    let monthly_rate = rate / 12 / 100;
    let interim = monthly_rate * Math.pow(1 + monthly_rate, term * 12);
    let interim_bottom = Math.pow(1 + monthly_rate, term * 12) - 1;
    monthly = amount * (interim / interim_bottom);
    repay_over = Number(monthly * term * 12);
  }

  //Provide language-sensitive number formatting for commas in numbers
  const formatter = new Intl.NumberFormat("en-US");
  const formattedMonthly = formatter.format(monthly.toFixed(2));
  const formattedOver = formatter.format(repay_over.toFixed(2));

  right_half_start.style.display = "none";
  right_half_end.style.display = "block";

  generated_month.innerHTML = "$" + formattedMonthly;
  generated_total.innerHTML = "$" + formattedOver;
});
