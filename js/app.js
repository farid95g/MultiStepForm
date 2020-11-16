// progress bar
const progressBar = document.querySelector(".progress");

// input field containers
const containers = document.querySelectorAll("div.progress-step");

// previous and next buttons
const previous = document.getElementById("previousStep"),
      next = document.getElementById("nextStep");

// preventing form reloading the poge on submit
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
});

// next button's click event
next.addEventListener("click", () => {
  // progress bar change
  if (Number(progressBar.style.width.split('%')[0]) < 100) {
    progressBar.style.width = `${Number(progressBar.style.width.split('%')[0]) + 25}%`;
  }
});

// previous button's click event
previous.addEventListener("click", () => {
  // progress bar change
  if (Number(progressBar.style.width.split('%')[0]) >= 25) {
    progressBar.style.width = `${Number(progressBar.style.width.split('%')[0]) - 25}%`;
  }
});




/** Testing Area Below **/
// console.log(Number(progressBar.style.width.split('%')[0]));