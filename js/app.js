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

// next step function for hiding and showing input containers
const nextStep = () => {
  let currentIndex;
  containers.forEach((container, index) => {
    if (!container.classList.contains("d-none")) {
      currentIndex = index;
    }
  })
  if (currentIndex + 1 < containers.length) {
    containers[currentIndex].classList.add("d-none");
    containers[currentIndex + 1].classList.remove("d-none");
  }
}

// previous step function for hiding and showing input containers
const previousStep = () => {
  let currentIndex;
  containers.forEach((container, index) => {
    if (!container.classList.contains("d-none")) {
      currentIndex = index;
    }
  })
  if (currentIndex - 1 >= 0) {
    containers[currentIndex].classList.add("d-none");
    containers[currentIndex - 1].classList.remove("d-none");
  }
}

// next button's click event
next.addEventListener("click", () => {
  // progress bar change
  if (Number(progressBar.style.width.split('%')[0]) < 100) {
    progressBar.style.width = `${Number(progressBar.style.width.split('%')[0]) + 25}%`;
  }
  nextStep();
});

// previous button's click event
previous.addEventListener("click", () => {
  // progress bar change
  if (Number(progressBar.style.width.split('%')[0]) >= 25) {
    progressBar.style.width = `${Number(progressBar.style.width.split('%')[0]) - 25}%`;
  }
  previousStep();
});




/** Testing Area Below **/
console.log(containers);