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

    // Function to validate name (no numbers, only letters, spaces, apostrophes, hyphens)
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

    // Function to validate email
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

    // Function to validate message length
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

    // Character Counter for Message
    messageField.addEventListener("input", function () {
        const remaining = 500 - messageField.value.length;
        charCounter.textContent = `${remaining} characters remaining`;
        if (remaining <= 50) {
            charCounter.style.color = "red";
        } else {
            charCounter.style.color = "";
        }
    });

    // Input validation on keyup
    nameField.addEventListener("input", validateName);
    emailField.addEventListener("input", validateEmail);
    messageField.addEventListener("input", validateMessage);

    // Prevent invalid characters in the name field
    nameField.addEventListener("keypress", function (event) {
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
        const key = String.fromCharCode(event.keyCode);
        if (!regex.test(key)) {
            event.preventDefault();
            nameError.textContent = "Invalid character entered.";
            nameError.style.display = "block";
        }
    });

    // Prevent form submission if validation fails
    form.addEventListener("submit", function (event) {
        errorLog.length = 0; // Clear previous errors
        const isValidName = validateName();
        const isValidEmail = validateEmail();
        const isValidMessage = validateMessage();

        if (!isValidName || !isValidEmail || !isValidMessage) {
            event.preventDefault(); // Stop form submission
            document.getElementById("form-errors").value = JSON.stringify(errorLog);
        }
    });
});
