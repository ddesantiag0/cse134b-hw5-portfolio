document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Get saved theme from localStorage (default: dark mode)
    let currentTheme = localStorage.getItem("theme") || "dark";
    applyTheme(currentTheme);

    // Event listener for theme toggle
    themeToggle.addEventListener("click", function () {
        currentTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(currentTheme);
        localStorage.setItem("theme", currentTheme);
    });

    // Function to apply the theme
    function applyTheme(theme) {
        if (theme === "light") {
            body.classList.add("light-theme");
            themeToggle.textContent = "☀️"; // Sun icon for dark mode option
        } else {
            body.classList.remove("light-theme");
            themeToggle.textContent = "🌙"; // Moon icon for light mode option
        }
    }
});
