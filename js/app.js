// progress bar
const progressBar = document.querySelector(".progress");

// input field containers
const containers = document.querySelectorAll("div.progress-step");

// name and surname fields and feedback messages
const nameAndSurname = document.querySelectorAll(".first-step-form input"),
      firstFeedMsg = document.querySelectorAll(".first-step-form .feedback-message");
// username and email fields and feedback messages
const usernameAndEmail = document.querySelectorAll(".second-step-form input"),
      secondFeedMsg = document.querySelectorAll(".second-step-form .feedback-message"),
      usernameRegex = /\W/;
// password and password confirmation fields, feedback messages, and show/hide password buttons
const passwordAndConfirmation = document.querySelectorAll(".third-step-form input"),
      thirdFeedMsg = document.querySelectorAll(".third-step-form .feedback-message"),
      togglePassBtns = document.querySelectorAll("button.toggle-password"),
      togglePassIcon = document.querySelectorAll("button.toggle-password i");

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
}

// setting button state
const setButtonState = () => {
  let buttonState;
  let container;
  containers.forEach(c => {
    if (!c.classList.contains("d-none")) {
      container = c;
    }
  });
  document.querySelectorAll(`.${container.classList[0]} .feedback-message`).forEach(message => {
    if (message.classList.contains("invalid-feedback"))
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
  });
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
  });
  if (currentIndex - 1 >= 0) {
    containers[currentIndex].classList.add("d-none");
    containers[currentIndex - 1].classList.remove("d-none");
  }
}

// validation function for name and surname fields
const firstValidation = () => {
  nameAndSurname.forEach((input, i) => {
    input.addEventListener("keyup", e => {
      if (e.target.value.length >= 2) {
        input.classList.replace("is-invalid", "is-valid");
        firstFeedMsg[i].classList.replace("invalid-feedback", "valid-feedback");
        firstFeedMsg[i].textContent = "Looks good.";
      } else {
        input.classList.replace("is-valid", "is-invalid");
        firstFeedMsg[i].classList.replace("valid-feedback", "invalid-feedback");
        firstFeedMsg[i].textContent = `Please, enter your ${input.getAttribute("name")}.`;
      }
      // invoking setButtonState function on each 'keyup' event
      setButtonState();
    });
  });
}

// validation function for username and email fields
const secondValidation = () => {
  usernameAndEmail.forEach((input, i) => {
    input.addEventListener("keyup", e => {
      if (i === 0) {
        if (e.target.value.match(usernameRegex) == null && e.target.value.length >= 3) {
          input.classList.replace("is-invalid", "is-valid");
          secondFeedMsg[i].classList.add("d-block");
          secondFeedMsg[i].classList.replace("invalid-feedback", "valid-feedback");
          secondFeedMsg[i].textContent = "Looks good.";
        } else {
          input.classList.replace("is-valid", "is-invalid");
          secondFeedMsg[i].classList.replace("valid-feedback", "invalid-feedback");
          secondFeedMsg[i].textContent = `Username must start with letter and can contain letters, numbers and underscore.`;
        }
      }
      if (i === 1) {
        if (e.target.value.indexOf('@') !== -1
        && e.target.value.split('@')[0].length > 0
        && e.target.value.slice(e.target.value.indexOf('@')).length >= 3) {
          input.classList.replace("is-invalid", "is-valid");
          secondFeedMsg[i].classList.add("d-block");
          secondFeedMsg[i].classList.replace("invalid-feedback", "valid-feedback");
          secondFeedMsg[i].textContent = "Looks good.";
        } else {
          input.classList.replace("is-valid", "is-invalid");
          secondFeedMsg[i].classList.replace("valid-feedback", "invalid-feedback");
          secondFeedMsg[i].textContent = `Enter an existing email address that belongs to you. Email must contain '@' character.`;
        }
      }
      // invoking setButtonState function on each 'keyup' event
      setButtonState();
    });
  });
}

// show and hide password on button's click event
togglePassBtns.forEach((button, i) => {
  button.addEventListener("click", e => {
    // showing and hiding password text
    passwordAndConfirmation[i].type === "password"
      ? passwordAndConfirmation[i].type = "text"
      : passwordAndConfirmation[i].type = "password";

      // changing button icon when showing and hiding password
      togglePassIcon[i].className.split(' ').indexOf("fa-eye") !== -1
      ? togglePassIcon[i].classList.replace("fa-eye", "fa-eye-slash")
      : togglePassIcon[i].classList.replace("fa-eye-slash", "fa-eye");
  });
});

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
  setButtonState();
});

// previous button's click event
previous.addEventListener("click", () => {
  // progress bar change
  if (Number(progressBar.style.width.split('%')[0]) >= 25) {
    progressBar.style.width = `${Number(progressBar.style.width.split('%')[0]) - 25}%`;
  }
  previousStep();
  toggleButtons();
  setButtonState();
});

// invoking validation functions below
firstValidation();  // name and surname fields' validation
secondValidation();  // username and email fields' validation




/** Testing Area Below **/
console.log(passwordAndConfirmation);
console.log(thirdFeedMsg);