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

// function handleSubmit(e) {
//     e.preventDefault();
//     // Collect and submit data
// }

// document.querySelectorAll('.option-group').forEach(group => {
//     group.addEventListener('click', (e) => {
//         if (e.target.classList.contains('option-btn')) {
//             const isMultiSelect = group.id === 'select-services';

//             if (!isMultiSelect) {
//                 group.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
//             }

//             e.target.classList.toggle('selected');
//         }
//     });
// });

// document.querySelector('.send-btn').addEventListener('click', () => {
//     const selectedPlan = document.querySelector('#selected-plan .selected')?.dataset.value;
//     const selectedBudget = document.querySelector('#plan-budget .selected')?.dataset.value;
//     const selectedServices = [...document.querySelectorAll('#select-services .selected')].map(btn => btn.dataset.value);
//     const firstName = document.getElementById('first-name').value;
//     const lastName = document.getElementById('last-name').value;
//     const email = document.getElementById('email').value;
//     const message = document.getElementById('message').value;

//     console.log({ selectedPlan, selectedBudget, selectedServices, firstName, lastName, email, message });

//     // You can send this data using fetch() or Form submission
// });
// // Function to handle option selection
// // function setupOptionGroups() {
// //     const optionGroups = document.querySelectorAll('.option-group');

// //     optionGroups.forEach(group => {
// //         const buttons = group.querySelectorAll('.option-btn');

// //         buttons.forEach(button => {
// //             button.addEventListener('click', () => {
// //                 // Remove selected class from all buttons in this group
// //                 buttons.forEach(btn => btn.classList.remove('selected'));

// //                 // Add selected class to clicked button
// //                 button.classList.add('selected');
// //             });
// //         });
// //     });
// // }

// // // Initialize option groups
// // document.addEventListener('DOMContentLoaded', setupOptionGroups);


// Button selection logic
document.querySelectorAll('.option-group').forEach(group => {
    group.addEventListener('click', e => {
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

// EmailJS send logic
document.querySelector('.send-btn').addEventListener('click', function () {
    const selectedPlan = document.querySelector('#selected-plan .selected')?.dataset.value || '';
    const selectedBudget = document.querySelector('#plan-budget .selected')?.dataset.value || '';
    const selectedServices = [...document.querySelectorAll('#select-services .selected')]
        .map(btn => btn.dataset.value).join(', ');

    const templateParams = {
        first_name: document.getElementById("first-name").value,
        last_name: document.getElementById("last-name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        selected_plan: selectedPlan,
        selected_budget: selectedBudget,
        selected_services: selectedServices
    };

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
        .then(function (response) {
            alert("Message sent successfully!");
        }, function (error) {
            alert("Failed to send message. Error: " + JSON.stringify(error));
        });
});