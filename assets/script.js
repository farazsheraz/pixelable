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

//FORM
// Handle option selection
document.querySelectorAll('.option-group').forEach(group => {
    group.addEventListener('click', e => {
        // ✅ Prevent button from refreshing the page
        e.preventDefault();

        if (!e.target.classList.contains('option-btn')) return;

        const isMultiSelect = group.id === 'select-services';
        if (!isMultiSelect) {
            group.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');
        } else {
            e.target.classList.toggle('selected');
        }
    });
});

// Initialize EmailJS
emailjs.init("EeX_Lw6kUGFJwxmfI"); // ✅ Your public key

// Helper: Validate email format
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Handle send button click
document.querySelector('.send-btn').addEventListener('click', function () {
    const selectedPlan = document.querySelector('#selected-plan .selected')?.dataset.value || '';
    const selectedBudget = document.querySelector('#plan-budget .selected')?.dataset.value || '';
    const selectedServices = [...document.querySelectorAll('#select-services .selected')]
        .map(btn => btn.dataset.value).join(', ');

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // ✅ Validation
    if (!firstName || !lastName || !email) {
        alert("Please fill in all required fields: First name, Last name, and Email.");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!selectedPlan || !selectedBudget || !selectedServices) {
        alert("Please select a Plan, Budget, and at least one Service.");
        return;
    }

    // EmailJS template params
    const templateParams = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        message: message,
        selected_plan: selectedPlan,
        selected_budget: selectedBudget,
        selected_services: selectedServices
    };

    // ✅ Send email
    emailjs.send("service_6vyywcp", "template_kvw784g5", templateParams)
        .then(function (response) {
            alert("Message sent successfully!");
        }, function (error) {
            alert("Failed to send message. Error: " + JSON.stringify(error));
            console.error(error);
        });
});
