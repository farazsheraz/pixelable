const buttons = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".feature-content");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove all actives
        buttons.forEach(btn => btn.classList.remove("active"));
        contents.forEach(content => content.classList.remove("active"));

        // Add active to current
        button.classList.add("active");
        document.getElementById(button.dataset.target).classList.add("active");
    });
});
