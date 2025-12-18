document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Icon transition
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Scroll Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Smooth Scrolling for Anchor Links (Polite fallback if CSS scroll-behavior fails)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentNode;

            // Optional: Close other open items (accordion behavior)
            /* 
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            */

            item.classList.toggle('active');
        });
    });

    // Chatbot Logic
    const chatWindow = document.getElementById('chatWindow');
    const chatToggle = document.getElementById('chatToggle');
    const closeChat = document.getElementById('closeChat');
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');

    if (chatToggle && chatWindow) {
        // Toggle Chat Window
        function toggleChat() {
            chatWindow.classList.toggle('active');
        }

        chatToggle.addEventListener('click', toggleChat);
        if (closeChat) closeChat.addEventListener('click', toggleChat);

        // Send Message
        function sendMessage() {
            const messageText = chatInput.value.trim();
            if (messageText) {
                // Add User Message
                addMessage(messageText, 'user-message');
                chatInput.value = '';

                // Simulate Bot Response
                setTimeout(() => {
                    const responses = [
                        "Thank you for your message! Our artisan team will get back to you shortly.",
                        "That's a great choice! Would you like more details on customization?",
                        "We can certainly help with that. Are you interested in a specific wood type?",
                        "Namaste! Feel free to ask about our custom sizes."
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addMessage(randomResponse, 'bot-message');
                }, 1000);
            }
        }

        function addMessage(text, className) {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('message', className);
            msgDiv.innerText = text;
            chatBody.appendChild(msgDiv);
            chatBody.scrollTop = chatBody.scrollHeight; // Auto scroll to bottom
        }

        if (sendBtn) sendBtn.addEventListener('click', sendMessage);
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }
});
