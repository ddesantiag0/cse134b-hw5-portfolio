document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const messageField = document.getElementById("message");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  const charCounter = document.getElementById("char-counter");
  const errorLog = [];

  function validateName() {
    const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
    if (!namePattern.test(nameField.value)) {
      nameError.textContent = "Only letters, spaces, apostrophes, and hyphens allowed.";
      nameError.style.display = "block";
      nameField.classList.add("invalid");
      errorLog.push({ field: "name", message: "Invalid characters in name field." });
      return false;
    }
    nameError.textContent = "";
    nameError.style.display = "none";
    nameField.classList.remove("invalid");
    return true;
  }

  function validateEmail() {
    if (!emailField.checkValidity()) {
      emailError.textContent = "Enter a valid email address.";
      emailError.style.display = "block";
      emailField.classList.add("invalid");
      errorLog.push({ field: "email", message: "Invalid email format." });
      return false;
    }
    emailError.textContent = "";
    emailError.style.display = "none";
    emailField.classList.remove("invalid");
    return true;
  }

  function validateMessage() {
    if (messageField.value.length < 10) {
      messageError.textContent = "Message must be at least 10 characters.";
      messageError.style.display = "block";
      messageField.classList.add("invalid");
      errorLog.push({ field: "message", message: "Message too short." });
      return false;
    }
    messageError.textContent = "";
    messageError.style.display = "none";
    messageField.classList.remove("invalid");
    return true;
  }

  messageField.addEventListener("input", function () {
    const remaining = 500 - messageField.value.length;
    charCounter.textContent = `${remaining} characters remaining`;
    charCounter.style.color = (remaining <= 50) ? "red" : "";
  });

  nameField.addEventListener("input", validateName);
  emailField.addEventListener("input", validateEmail);
  messageField.addEventListener("input", validateMessage);

  nameField.addEventListener("keypress", function (event) {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
    const key = String.fromCharCode(event.keyCode);
    if (!regex.test(key)) {
      event.preventDefault();
      nameError.textContent = "Invalid character entered.";
      nameError.style.display = "block";
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    errorLog.length = 0;
    const isValidName = validateName();
    const isValidEmail = validateEmail();
    const isValidMessage = validateMessage();

    if (!isValidName || !isValidEmail || !isValidMessage) {
      document.getElementById("form-errors").value = JSON.stringify(errorLog);
      return;
    }

    const formData = {
      name: nameField.value.trim(),
      email: emailField.value.trim(),
      message: messageField.value.trim(),
      possible_bot: "true"
    };

    fetch("https://httpbin.org/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(json => {
      alert("Message sent! I'll get back to you soon.");
      form.reset();
      charCounter.textContent = "500 characters remaining";
      charCounter.style.color = "";
    })
    .catch(err => {
      console.error("Error sending message:", err);
      alert("Oops, something went wrong. Please try again later.");
    });
  });
});
