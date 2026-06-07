/**
 * TechGlaz - Shared JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Setting (Locked to Light)
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-theme', 'light');

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (mobileMenuBtn.querySelector('i')) {
                    mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
                }
            });
        });
    }

    // 4. Scroll Animations (Fade In)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 5. Counter Animation
    const counterElements = document.querySelectorAll('.counter-value');
    
    if (counterElements.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterElements.forEach(el => counterObserver.observe(el));
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // ms
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.innerText = target;
            }
        };
        
        updateCounter();
    }
    
    // 6. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherIcon = otherItem.querySelector('.faq-icon i');
                    if (otherIcon) otherIcon.className = 'fa-solid fa-plus';
                });
                
                if (!isActive) {
                    item.classList.add('active');
                    const icon = item.querySelector('.faq-icon i');
                    if (icon) icon.className = 'fa-solid fa-minus';
                }
            });
        }
    });

    // 7. Scroll Progress Bar
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'scroll-progress-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBarContainer.appendChild(progressBar);
    document.body.prepend(progressBarContainer);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // 8. Back to Top Button
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 9. Page Transition Animations
    document.body.classList.add('page-transition-enter');
    
    document.querySelectorAll('a').forEach(link => {
        // Exclude anchor links, external links, and target="_blank"
        if (link.hostname === window.location.hostname && !link.hash && link.target !== "_blank") {
            link.addEventListener('click', e => {
                e.preventDefault();
                const targetUrl = link.href;
                document.body.classList.remove('page-transition-enter');
                document.body.classList.add('page-transition-exit');
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 300); // Wait for exit animation to finish
            });
        }
    });

    // 10. Theme-Aware Images (Locked to Light)
    function updateThemeAwareImages() {
        const images = document.querySelectorAll('.theme-aware-img');
        images.forEach(img => {
            const lightSrc = img.getAttribute('data-light-src');
            if (lightSrc) {
                img.src = lightSrc;
            }
        });
    }

    // Call it initially
    updateThemeAwareImages();

    // 11. WhatsApp Floating CTA Button (Feature 4)
    const waFloatBtn = document.createElement('a');
    waFloatBtn.className = 'whatsapp-float';
    waFloatBtn.href = 'https://wa.me/916204696995?text=Hi%20TechGlaz!%20%F0%9F%91%8B%20I%27d%20like%20to%20enquire%20about%20a%20project.';
    waFloatBtn.target = '_blank';
    waFloatBtn.rel = 'noopener noreferrer';
    waFloatBtn.id = 'wa-float-btn';
    waFloatBtn.setAttribute('aria-label', 'Chat on WhatsApp');
    waFloatBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i><span>Get a Quote</span>';
    document.body.appendChild(waFloatBtn);
    // Show after 2s delay so it doesn't distract on initial load
    setTimeout(() => waFloatBtn.classList.add('visible'), 2000);

    // 12. Global Toast Notification System (Feature 10)
    window.showToast = function(message) {
        let toast = document.getElementById('global-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'global-toast';
            toast.className = 'toast-notification';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> ${message}`;
        toast.classList.add('show');
        if (window.toastTimeout) clearTimeout(window.toastTimeout);
        window.toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
    };

    // 13. WhatsApp Quick Order Modal (Feature 11)
    window.openWhatsAppModal = function(itemName, itemPrice) {
        let overlay = document.getElementById('wa-modal-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'wa-modal-overlay';
            overlay.className = 'wa-modal-overlay';
            overlay.innerHTML = `
                <div class="wa-modal">
                    <div class="wa-modal-header">
                        <div>
                            <h3 class="wa-modal-title">Quick Order</h3>
                            <p class="wa-modal-subtitle">Choose your plan for <strong id="wa-modal-item-name"></strong></p>
                        </div>
                        <button class="wa-close-btn" id="wa-close-btn"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="wa-plan-options">
                        <div class="wa-plan-option selected" data-plan="Standard">
                            <div>
                                <div class="wa-plan-name">Standard Plan</div>
                                <div class="wa-plan-desc">Code + Docs + Setup Guide</div>
                            </div>
                            <div class="wa-plan-price" id="wa-modal-price-std"></div>
                        </div>
                        <div class="wa-plan-option" data-plan="Premium">
                            <div>
                                <div class="wa-plan-name">Premium Plan</div>
                                <div class="wa-plan-desc">Standard + Live Explanation + Viva Prep</div>
                            </div>
                            <div class="wa-plan-price" id="wa-modal-price-prm"></div>
                        </div>
                    </div>
                    <button class="wa-send-btn" id="wa-send-btn"><i class="fa-brands fa-whatsapp"></i> Continue to WhatsApp</button>
                </div>
            `;
            document.body.appendChild(overlay);

            // Modal Events
            document.getElementById('wa-close-btn').addEventListener('click', () => overlay.classList.remove('active'));
            overlay.addEventListener('click', (e) => { if(e.target === overlay) overlay.classList.remove('active'); });
            
            const options = overlay.querySelectorAll('.wa-plan-option');
            options.forEach(opt => {
                opt.addEventListener('click', () => {
                    options.forEach(o => o.classList.remove('selected'));
                    opt.classList.add('selected');
                });
            });

            document.getElementById('wa-send-btn').addEventListener('click', () => {
                const selectedPlan = overlay.querySelector('.wa-plan-option.selected').dataset.plan;
                const name = document.getElementById('wa-modal-item-name').textContent;
                const msg = encodeURIComponent(`Hi TechGlaz! 👋\nI'd like to order the project:\n*${name}*\n\nI am interested in the *${selectedPlan} Plan*.\nPlease share the payment details and next steps.`);
                window.open(`https://wa.me/916204696995?text=${msg}`, '_blank');
                overlay.classList.remove('active');
            });
        }

        // Set dynamic content
        document.getElementById('wa-modal-item-name').textContent = itemName;
        const pNum = parseInt(itemPrice);
        document.getElementById('wa-modal-price-std').textContent = '₹' + pNum.toLocaleString('en-IN');
        document.getElementById('wa-modal-price-prm').textContent = '₹' + (pNum + 1500).toLocaleString('en-IN'); // Premium is base + 1500
        
        // Reset selection to Standard
        const options = overlay.querySelectorAll('.wa-plan-option');
        options.forEach(o => o.classList.remove('selected'));
        options[0].classList.add('selected');

        // Show modal
        overlay.classList.add('active');
    };

});
