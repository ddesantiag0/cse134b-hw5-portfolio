document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // If no theme is saved, auto-detect OS preference
    let currentTheme = localStorage.getItem("theme");
    if (!currentTheme) {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    applyTheme(currentTheme);

    // Event listener for theme toggle button
    themeToggle.addEventListener("click", function () {
        // Toggle theme
        currentTheme = currentTheme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", currentTheme);
        applyTheme(currentTheme);
    });

    // Function to apply the theme to the page
    function applyTheme(theme) {
        if (theme === "light") {
            body.classList.add("light-theme");
            themeToggle.textContent = "☀️"; // Display sun icon for light mode active
        } else {
            body.classList.remove("light-theme");
            themeToggle.textContent = "🌙"; // Display moon icon for dark mode active
        }
    }
});