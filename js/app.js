// progress bar
const progressBar = document.querySelector(".progress");

// input field containers
const containers = document.querySelectorAll("div.progress-step");

// previous and next buttons
const previous = document.getElementById("previousStep"),
      next = document.getElementById("nextStep");

// showing and hiding buttons
const toggleButtons = () => {
  if (!containers[0].classList.contains("d-none")) {
    previous.classList.add("invisible");
  } else if (!containers[containers.length - 2].classList.contains("d-none")) {
    next.classList.remove("invisible");
    next.innerHTML = "Submit<i class='fas fa-paper-plane ml-2'></i>";
    console.log("fourth element")
  } else if (!containers[containers.length - 1].classList.contains("d-none")) {
    next.classList.add("invisible");
    console.log("fifth element")
  } else {
    previous.classList.remove("invisible");
    next.classList.remove("invisible");
    next.innerHTML = "Next<i class='fas fa-arrow-right ml-2'></i>";
  }
};

// setting button state
const setButtonState = () => {
  let buttonState;
  let container;
  containers.forEach(c => {
    if (!c.classList.contains("d-none")) {
      container = c;
    }
  })
  document.querySelectorAll(`.${container.classList[0]} input`).forEach(input => {
    if (input.value.length === 0)
      buttonState = false;
  });
  buttonState === undefined ? next.disabled = false : next.disabled = true;
}

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

// adding some functionality on DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  toggleButtons();
  setButtonState();
});

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
  nextStep();
  toggleButtons();
});

// previous button's click event
previous.addEventListener("click", () => {
  // progress bar change
  if (Number(progressBar.style.width.split('%')[0]) >= 25) {
    progressBar.style.width = `${Number(progressBar.style.width.split('%')[0]) - 25}%`;
  }
  previousStep();
  toggleButtons();
});




/** Testing Area Below **/
console.log(containers);