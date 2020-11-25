// progress bar
const progressBar = document.querySelector(".progress");

// main container and input field containers
const mainContainer = document.querySelector("form > div"),
      containers = document.querySelectorAll("div.progress-step");

// name and surname fields and feedback messages
const nameAndSurname = document.querySelectorAll(".first-step-form input"),
      firstFeedMsg = document.querySelectorAll(".first-step-form .feedback-message");
// username and email fields and feedback messages
const usernameAndEmail = document.querySelectorAll(".second-step-form input"),
      secondFeedMsg = document.querySelectorAll(".second-step-form .feedback-message"),
      usernameRegex = /\W/;
// password and password confirmation fields, feedback messages, and show/hide password buttons
const passAndConfirm = document.querySelectorAll(".third-step-form input"),
      thirdFeedMsg = document.querySelectorAll(".third-step-form .feedback-message"),
      togglePassBtns = document.querySelectorAll("button.toggle-password"),
      passIconWrapper = document.querySelectorAll("button.toggle-password span"),
      togglePassIcon = document.querySelectorAll("button.toggle-password i");
// birthday and phone number fields, feedback messages, and show/hide password buttons
const birthdayAndPhone = document.querySelectorAll(".fourth-step-form input"),
      fourthFeedMsg = document.querySelectorAll(".fourth-step-form .feedback-message");

// previous and next buttons
const previous = document.getElementById("previousStep"),
      next = document.getElementById("nextStep");

// showing and hiding buttons
const toggleButtons = () => {
  if (containers[0].classList.contains("active")) {
    previous.classList.add("invisible");
  } else if (containers[containers.length - 2].classList.contains("active")) {
    next.classList.remove("invisible");
    next.innerHTML = "Submit<i class='fas fa-paper-plane ml-2'></i>";
    console.log("fourth element")
  } else if (containers[containers.length - 1].classList.contains("active")) {
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
    if (c.classList.contains("active")) {
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
    if (container.classList.contains("active")) {
      currentIndex = index;
    }
  });
  if (currentIndex + 1 < containers.length) {
    let pos = (currentIndex + 1) * 20;
    console.log(pos)
    containers[currentIndex].classList.remove("active");
    containers[currentIndex].classList.add("animate__bounceOutLeft");
    mainContainer.style.transform = `translateX(${-pos}%)`;
    containers[currentIndex + 1].classList.remove("animate__bounceOutRight");
    containers[currentIndex + 1].classList.add("active", "animate__bounceInRight");
  }
}

// previous step function for hiding and showing input containers
const previousStep = () => {
  let currentIndex;
  containers.forEach((container, index) => {
    if (container.classList.contains("active")) {
      currentIndex = index;
    }
  });
  if (currentIndex - 1 >= 0) {
    let pos = (currentIndex - 1) * 20;
    console.log(pos)
    containers[currentIndex].classList.remove("active");
    containers[currentIndex].classList.add("animate__bounceOutRight");
    mainContainer.style.transform = `translateX(${-pos}%)`;
    containers[currentIndex - 1].classList.remove("animate__bounceOutLeft", "animate__bounceInRight");
    containers[currentIndex - 1].classList.add("active", "animate__bounceInLeft");
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
        if (e.target.value.match(usernameRegex) == null && e.target.value.length >= 4) {
          input.classList.replace("is-invalid", "is-valid");
          secondFeedMsg[i].classList.add("d-block");
          secondFeedMsg[i].classList.replace("invalid-feedback", "valid-feedback");
          secondFeedMsg[i].textContent = "Looks good.";
        } else {
          input.classList.replace("is-valid", "is-invalid");
          secondFeedMsg[i].classList.replace("valid-feedback", "invalid-feedback");
          secondFeedMsg[i].textContent = `Username must start with letter, can contain letters, numbers and underscore, and must contain at least 4 characters.`;
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
    passAndConfirm[i].type === "password"
      ? passAndConfirm[i].type = "text"
      : passAndConfirm[i].type = "password";

    // adding animation for the show and hide password icons
    passIconWrapper[i].className.split(' ').indexOf("is-shown") === -1
      ? passIconWrapper[i].classList.add("is-shown")
      : passIconWrapper[i].classList.remove("is-shown");
  });
  button.addEventListener("mouseenter", e => {
    passIconWrapper[i].className.split(' ').indexOf("is-shown") !== -1
      ? passIconWrapper[i].style.transform = "translateX(0)"
      : passIconWrapper[i].style.transform = "translateX(-50%)";
  });
  button.addEventListener("mouseleave", e => {
    passIconWrapper[i].className.split(' ').indexOf("is-shown") !== -1
      ? passIconWrapper[i].style.transform = "translateX(-50%)"
      : passIconWrapper[i].style.transform = "translateX(0)";
  });
});

// validation function for password and password confirmation fields
const thirdValidation = () => {
  passAndConfirm.forEach((input, i) => {
    input.addEventListener("keyup", e => {
      if (i === 0) {
        if (e.target.value.length >= 8
          && e.target.value.match(/[A-Z]/) != null
          && e.target.value.match(/[0-9]/) != null
          && e.target.value.match(/\W/) != null) {
          input.classList.replace("is-invalid", "is-valid");
          thirdFeedMsg[i].classList.add("d-block");
          thirdFeedMsg[i].classList.replace("invalid-feedback", "valid-feedback");
          thirdFeedMsg[i].textContent = "Looks good.";
        } else {
          input.classList.replace("is-valid", "is-invalid");
          thirdFeedMsg[i].classList.replace("valid-feedback", "invalid-feedback");
          thirdFeedMsg[i].textContent = `Password must contain at least 1 uppercase letter, 1 number, and 1 non-alphanumeric character. The minimum length of the password must be 8 characters.`;
        }
        localStorage.setItem("password", e.target.value);
      }
      if (i === 1) {
        if (e.target.value === localStorage.getItem("password")) {
          input.classList.replace("is-invalid", "is-valid");
          thirdFeedMsg[i].classList.add("d-block");
          thirdFeedMsg[i].classList.replace("invalid-feedback", "valid-feedback");
          thirdFeedMsg[i].textContent = "Looks good.";
        } else {
          input.classList.replace("is-valid", "is-invalid");
          thirdFeedMsg[i].classList.replace("valid-feedback", "invalid-feedback");
          thirdFeedMsg[i].textContent = `Password confirmation field must contain same value as password field.`;
        }
      }
      // invoking setButtonState function on each 'keyup' event
      setButtonState();
    });
  });
}

// validation function for birthday and phone number fields
const fourthValidation = () => {
  birthdayAndPhone.forEach((input, i) => {
    if (i === 0) {
      input.addEventListener("change", e => {
        let date = e.target.value.split('-');
        let birthday = `${date[2]} ${new Date(date[0], date[1] - 1, date[2]).toLocaleString('en-us', { month: 'long' })} ${date[0]}`;
        if (e.target.value !== undefined){
          input.classList.replace("is-invalid", "is-valid");
          fourthFeedMsg[i].classList.add("d-block");
          fourthFeedMsg[i].classList.replace("invalid-feedback", "valid-feedback");
          fourthFeedMsg[i].textContent = "Looks good.";
        } else {
          input.classList.replace("is-valid", "is-invalid");
          fourthFeedMsg[i].classList.replace("valid-feedback", "invalid-feedback");
          fourthFeedMsg[i].textContent = `Select your birthday date.`;
        }
        console.log(e.target.value)
        // invoking setButtonState function on each 'keyup' event
        setButtonState();
      });
      input.addEventListener("keyup", e => {
        if (e.target.value === ""){
          input.classList.replace("is-valid", "is-invalid");
          fourthFeedMsg[i].classList.replace("valid-feedback", "invalid-feedback");
          fourthFeedMsg[i].textContent = `Select your birthday date.`;
        }
        console.log(e.target.value)
        // invoking setButtonState function on each 'keyup' event
        setButtonState();
      });
    }
    if (i === 1) {
      input.addEventListener("focus", e => {
        if (e.target.value === "")
          e.target.value = "+994 ";
      });
      input.addEventListener("blur", e => {
        if (e.target.value.length <= 5)
          e.target.value = "";
      });
      input.addEventListener("keydown", e => {
        if ([7, 11, 14].indexOf(e.target.value.length) !== -1 && e.keyCode !== 8) {
          e.target.value += ' ';
        }
      });
      input.addEventListener("keyup", e => {
        if (e.target.value.length === 17 && e.target.value.match(e.target.getAttribute("pattern"))) {
          input.classList.replace("is-invalid", "is-valid");
          fourthFeedMsg[i].classList.add("d-block");
          fourthFeedMsg[i].classList.replace("invalid-feedback", "valid-feedback");
          fourthFeedMsg[i].textContent = "Looks good.";
        } else if (e.target.value.length < 17) {
          input.classList.replace("is-valid", "is-invalid");
          fourthFeedMsg[i].classList.replace("valid-feedback", "invalid-feedback");
          fourthFeedMsg[i].textContent = `Enter your phone number.`;
        }
        // invoking setButtonState function on each 'keyup' event
        setButtonState();
      });
    }
  });
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

// function for keydown of enter key
document.addEventListener("keydown", e => {
  if (e.key === "Enter") {  // .keyCode is deprecated, so key is recommended to use
    next.click();
    e.preventDefault();
  }
});

// invoking validation functions below
firstValidation();  // name and surname fields' validation
secondValidation();  // username and email fields' validation
thirdValidation();  // password and password confirmation fields' validation
fourthValidation();  // birthday and phone number fields' validation




/** Testing Area Below **/
console.log(birthdayAndPhone);
console.log(fourthFeedMsg);
// localStorage.removeItem("password");