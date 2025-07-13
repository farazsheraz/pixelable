// const menuToggle = document.getElementById("menuToggle");
// const nav = document.querySelector(".mobileMenu");
// const body = document.body;

// menuToggle.addEventListener("click", () => {
//     const isOpen = nav.classList.toggle("open");
//     menuToggle.classList.toggle("open");
//     body.classList.toggle("menu-open", isOpen);
// });

const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".mobileMenu");
const body = document.body;
const menuLinks1 = document.querySelectorAll(".mobileMenu a");

menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.classList.toggle("open");
    body.classList.toggle("menu-open", isOpen);
});

// Close menu when a menu item is clicked
menuLinks1.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.classList.remove("open");
        body.classList.remove("menu-open");
    });
});







//BACK2TOP
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            console.log(response);
        }, function (error) {
            alert("Failed to send message. Error: " + JSON.stringify(error));
            console.error(error);
        });
});

//BANNER OBJECTS ANIMATION GSAP
// Floating up and down
gsap.to(".object2", {
    x: 10,
    y: -10,
    rotation: 5,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
});

// Rotation for a dynamic ring effect
gsap.to(".object1", {
    rotation: 360,
    duration: 15,
    repeat: -1,
    ease: "linear",
    transformOrigin: "50% 50%"
});

// Subtle scaling pulse
gsap.to(".object4", {
    scale: 1.05,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
});

// Side to side floating
gsap.to(".object3", {
    x: 15,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

gsap.to(".lamp", {
    scrollTrigger: {
        trigger: ".work",
        start: "top 75%",
        toggleActions: "play none none none"
    },
    scale: 1.2,
    boxShadow: "0 0 30px 10px yellow",
    duration: 0.5,
    yoyo: true,
    repeat: 1
});

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".project").forEach((project, i) => {
    gsap.fromTo(project,
        {
            scale: 0,
            y: 100,
            opacity: 0
        },
        {
            scrollTrigger: {
                trigger: ".work", // Replace with your actual section selector
                start: "top 80%",
                toggleActions: "play reverse play reverse",
                scrub: false,
            },
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: i * 0.1
        }
    );
});

//SERVICE LIST
$('.serviceListMob').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    dots: true,
    autoplay: true,
    prevArrow: "<img src='./assets/img/prev.svg' alt='prevBtn' class='prev'/>",
    nextArrow: "<img src='./assets/img/next.svg' alt='nextBtn' class='next'/>"
});

//MOUSE SCROLL 
document.querySelectorAll(".scrollMouse").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
        const targetSelector = trigger.getAttribute("data-target");
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    });
});

const sections = document.querySelectorAll("section");
const menuLinks = document.querySelectorAll(".mobileMenu a");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (pageYOffset >= sectionTop - 60) {
            currentSection = section.getAttribute("id");
        }
    });

    menuLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});

//TABS

document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll("ul.tabs li");
    const tabContents = document.querySelectorAll(".tab-content");

    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            const tabId = this.getAttribute("data-tab");

            // Remove 'current' from all tabs and contents
            tabs.forEach(t => t.classList.remove("current"));
            tabContents.forEach(c => c.classList.remove("current"));

            // Add 'current' to clicked tab and corresponding content
            this.classList.add("current");
            document.getElementById(tabId).classList.add("current");
        });
    });
});


//PRICING

document.addEventListener("DOMContentLoaded", function () {

    const select = document.getElementById("planSelector");
    const plans = document.querySelectorAll(".mobilePlans .plan");

    // Function to show only the selected plan
    function showPlan(selected) {
        plans.forEach(plan => {
            if (plan.classList.contains(selected)) {
                plan.classList.add("active");
            } else {
                plan.classList.remove("active");
            }
        });
    }

    // Show default selected option on page load
    if (select) {
        showPlan(select.value);

        // Listen for dropdown change
        select.addEventListener("change", function () {
            showPlan(this.value);
        });
    }


    //FOR MOBILE IMG

    if (window.innerWidth <= 768) {
        const imageMap = {
            '.scrollMouse img': 'assets/img/mouseMob.svg',
            '.aboutUs img': 'assets/img/abt-shape-mob.png',
            '.objects .object3': 'assets/img/Object3Mob.png'
            // Add more selectors and their mobile image URLs as needed
        };

        for (const selector in imageMap) {
            document.querySelectorAll(selector).forEach(img => {
                // img.src = imageMap[selector];
                img.src = imageMap[selector] + '?v=' + Date.now(); // cache-busting trick

            });
        }
    }

});


const customSelect = document.getElementById('customDropdown');
const optionsList = document.getElementById('planOptions');
const selectedText = document.getElementById('selectedText');
const selectedIcon = document.getElementById('selectedIcon');
const plans = document.querySelectorAll('.mobilePlans .plan');

// Plan display function (your original logic)
function showPlan(selectedValue) {
    plans.forEach(plan => {
        if (plan.classList.contains(selectedValue)) {
            plan.classList.add('active');
        } else {
            plan.classList.remove('active');
        }
    });
}

// Initial default
showPlan('silver');

// Toggle dropdown
customSelect.addEventListener('click', () => {
    optionsList.style.display = optionsList.style.display === 'block' ? 'none' : 'block';
});

// Option selection handler
optionsList.addEventListener('click', function (e) {
    const li = e.target.closest('li');
    if (li) {
        const label = li.textContent.trim();
        const icon = li.getAttribute('data-icon');
        const value = li.getAttribute('data-value');

        selectedText.textContent = label;
        selectedIcon.src = icon;

        // Highlight the selected item
        document.querySelectorAll('#planOptions li').forEach(el => el.classList.remove('selected'));
        li.classList.add('selected');

        showPlan(value); // Call your original function
        // document.querySelector('#planOptions li[data-value="silver"]').classList.add('selected');

        optionsList.style.display = 'none';
    }
});

// Close if clicked outside
document.addEventListener('click', function (e) {
    if (!customSelect.contains(e.target) && !optionsList.contains(e.target)) {
        optionsList.style.display = 'none';
    }
});
