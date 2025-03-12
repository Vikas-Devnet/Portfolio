window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');

    // Show Loader
    function showLoader() {
        loader.style.display = 'flex';
    }

    // Hide Loader
    function hideLoader() {
        loader.style.display = 'none';
    }

    // Load Navbar
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        fetch('navbar.html')
            .then(response => response.text())
            .then(data => navbarContainer.innerHTML = data)
            .catch(error => console.error('Error loading navbar:', error));
    }

    // Load Footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => footerContainer.innerHTML = data)
            .catch(error => console.error('Error loading footer:', error));
    }

    // Form Submission with EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            showLoader();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            const responseMessage = document.getElementById('responseMessage');

            if (!name || !email || !phone || !message) {
                responseMessage.textContent = 'All fields are required.';
                responseMessage.style.color = 'red';
                hideLoader();
                return;
            }

            emailjs.send("service_cklxvge", "template_3e9aca6", {
                name: name,
                email: email,
                phone: phone,
                message: message,
                reply_to: email
            }, "ufC5AOc_YjyoDmPr1")
            .then(() => {
                responseMessage.textContent = 'Message sent successfully!';
                responseMessage.style.color = 'green';
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                responseMessage.textContent = 'Failed to send the message. Please get the mail .';
                responseMessage.style.color = 'red';
            })
            .finally(() => {
                hideLoader(); 
            });
        });
    }
});
