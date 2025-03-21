// Parallax background effect
const parallaxBg = document.getElementById('parallax-bg');
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    parallaxBg.style.transform = `translate(${mouseX * 30}px, ${mouseY * 30}px)`;
});

// Form switching functionality
const container = document.querySelector(".container");
const signUpBtn = document.querySelector("#sign-up-btn");
const signInBtn = document.querySelector("#sign-in-btn");

signUpBtn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

signInBtn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

// Form validation and animations
const forms = document.querySelectorAll("form");
forms.forEach(form => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isValid = true;
        
        // Validate inputs
        const inputs = form.querySelectorAll("input");
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
                const field = input.parentElement;
                field.classList.add("shake");
                setTimeout(() => field.classList.remove("shake"), 820);
            }
        });
        
        if (isValid) {
            // Simulate successful login/signup
            const btn = form.querySelector(".btn");
            btn.style.background = "linear-gradient(45deg, #00ff00, #00cc00)";
            btn.textContent = "Success!";
            setTimeout(() => {
                btn.style.background = "";
                btn.textContent = form.classList.contains("sign-in-form") ? "Login" : "Sign Up";
            }, 2000);
        }
    });
});

// Input validation helper
function validateInput(input) {
    const value = input.value.trim();
    
    switch(input.type) {
        case "email":
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        case "password":
            return value.length >= 6;
        default:
            return value.length > 0;
    }
}

// Auto-fill detection
const inputs = document.querySelectorAll("input");
inputs.forEach(input => {
    input.addEventListener("animationstart", (e) => {
        if (e.animationName === "onAutoFillStart") {
            input.parentElement.classList.add("autofilled");
        }
    });
    
    input.addEventListener("animationcancel", (e) => {
        if (e.animationName === "onAutoFillCancel") {
            input.parentElement.classList.remove("autofilled");
        }
    });
});

// Add entrance animations
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".panel, form, .input-field, .btn");
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add("fade-in");
        }, index * 100);
    });
});