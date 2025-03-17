document.addEventListener("DOMContentLoaded", () => {
    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById("back-to-top");
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove("hidden");
      } else {
        backToTopBtn.classList.add("hidden");
      }
    });
  
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  
    // --- Login / Signup Feedback ---
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
  
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent actual submission
        alert("Login successful (demo)!");
        // You can optionally redirect or clear the form here.
      });
    }
  
    if (signupForm) {
      signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Account created successfully (demo)!");
        // Optionally, hide the signup form or show a success message.
      });
    }
  });
  