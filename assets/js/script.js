document.addEventListener("DOMContentLoaded", function () {
  // Containers
  const loginFormContainer = document.getElementById("login-form");
  const signupFormContainer = document.getElementById("signup-form");
  const showSignup = document.getElementById("show-signup");
  const showLogin = document.getElementById("show-login");

  // Actual forms
  const loginFormEl = document.getElementById("loginForm");
  const signupFormEl = document.getElementById("signupForm");

  // Toggle password checkbox
  const togglePasswordCheckbox = document.getElementById("toggle-password");

  // ---- Toggling between Sign In and Sign Up containers ----
  if (showSignup) {
    showSignup.addEventListener("click", function (event) {
      event.preventDefault();
      loginFormContainer.classList.add("hidden");
      signupFormContainer.classList.remove("hidden");
    });
  }

  if (showLogin) {
    showLogin.addEventListener("click", function (event) {
      event.preventDefault();
      signupFormContainer.classList.add("hidden");
      loginFormContainer.classList.remove("hidden");
    });
  }

  // ---- Show/Hide Password Logic ----
  if (togglePasswordCheckbox) {
    togglePasswordCheckbox.addEventListener("change", function () {
      const signupPassword = document.getElementById("signup-password");
      const confirmPassword = document.getElementById("confirm-password");

      if (this.checked) {
        // Show passwords as text
        signupPassword.type = "text";
        confirmPassword.type = "text";
      } else {
        // Hide passwords as password
        signupPassword.type = "password";
        confirmPassword.type = "password";
      }
    });
  }

  // ---- Sign Up Logic ----
  if (signupFormEl) {
    signupFormEl.addEventListener("submit", function (event) {
      event.preventDefault();

      const firstName = document.getElementById("first-name").value.trim();
      const lastName = document.getElementById("last-name").value.trim();
      const email = document.getElementById("signup-email").value.trim();
      const password = document.getElementById("signup-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      const subscribe = document.getElementById("subscribe").checked;

      // Validate name (letters, spaces, apostrophes, hyphens only)
      const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
      if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
        alert("Names must only contain letters, spaces, apostrophes, and hyphens. No numbers or symbols allowed.");
        return;
      }

      // Validate email format: must include @ and end with .com, .net, .edu, .org, .gov, or .io
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|net|edu|org|gov|io)$/i;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address ending with .com, .net, .edu, .org, .gov, or .io.");
        return;
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }

      // Retrieve existing users or empty array
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        alert("An account with this email already exists.");
        return;
      }

      // Create new user object
      const newUser = {
        firstName,
        lastName,
        email,
        password,
        subscribe
      };

      // Save user data to localStorage
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // If subscribed, simulate sending a "Welcome" email
      if (subscribe) {
        // In a real app, you'd call a backend service to actually send an email
        alert(`Welcome email sent to ${email}!\n\nThank you for subscribing.`);
      }

      alert("Account created successfully!");
      signupFormEl.reset();

      // Switch to login form
      signupFormContainer.classList.add("hidden");
      loginFormContainer.classList.remove("hidden");
    });
  }

  // ---- Login Logic ----
  if (loginFormEl) {
    loginFormEl.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;

      let users = JSON.parse(localStorage.getItem("users")) || [];
      const matchedUser = users.find(user => user.email === email);

      if (!matchedUser) {
        alert("No account found with that email. Please create one.");
        return;
      }

      if (matchedUser.password === password) {
        alert("Login successful!");
        loginFormEl.reset();
      } else {
        alert("Invalid password. Please try again.");
      }
    });
  }
});
