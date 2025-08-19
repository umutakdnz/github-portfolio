// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const downloadCvBtn = document.getElementById('download-cv');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active nav link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth' // Smooth scroll animation
            });
        }
    });
});

// Add scroll indicator click functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth' // Smooth scroll for scroll indicator only
            });
        }
    });
}

// CV Download functionality
downloadCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = 'assets/documents/UmutAkdeniz_CV.pdf';
    link.download = 'UmutAkdeniz_CV.pdf';
    
    // Show download notification
    showNotification('CV indiriliyor...', 'success');
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
        showNotification('CV başarıyla indirildi!', 'success');
    }, 1000);
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Lütfen tüm alanları doldurunuz.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Geçerli bir email adresi giriniz.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        showNotification('Mesajınız başarıyla gönderildi!', 'success');
        contactForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification function
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        backdrop-filter: blur(10px);
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-triangle';
        case 'warning': return 'exclamation-circle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#6366f1';
    }
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animations
const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-content, .contact-item, .education-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Enhanced Education Cards Animation
const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Animate skills tags
                const skillTags = entry.target.querySelectorAll('.skill-tag');
                skillTags.forEach((tag, tagIndex) => {
                    setTimeout(() => {
                        tag.style.opacity = '1';
                        tag.style.transform = 'translateX(0) scale(1)';
                    }, tagIndex * 100);
                });
                
                // Animate logo with special effect
                const logo = entry.target.querySelector('.education-logo');
                if (logo) {
                    setTimeout(() => {
                        logo.style.transform = 'scale(1) rotate(0deg)';
                        logo.style.opacity = '1';
                    }, 300);
                }
                
                // Animate badge with pulse effect
                const badge = entry.target.querySelector('.education-badge');
                if (badge) {
                    setTimeout(() => {
                        badge.style.transform = 'scale(1)';
                        badge.style.opacity = '1';
                    }, 500);
                }
            }, index * 200);
        }
    });
}, { threshold: 0.3 });

// Initialize education cards animations
const educationCards = document.querySelectorAll('.education-card');
educationCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) scale(0.95)';
    card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // Initialize skill tags
    const skillTags = card.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateX(-20px) scale(0.9)';
        tag.style.transition = 'all 0.4s ease';
    });
    
    // Initialize logo
    const logo = card.querySelector('.education-logo');
    if (logo) {
        logo.style.transform = 'scale(0.8) rotate(-10deg)';
        logo.style.opacity = '0.7';
        logo.style.transition = 'all 0.5s ease';
    }
    
    // Initialize badge
    const badge = card.querySelector('.education-badge');
    if (badge) {
        badge.style.transform = 'scale(0.8)';
        badge.style.opacity = '0.8';
        badge.style.transition = 'all 0.4s ease';
    }
    
    educationObserver.observe(card);
});

// Typing effect for hero title
function typeWriter(element, texts, speed = 100) {
    let textIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (textIndex < texts.length) {
            if (charIndex < texts[textIndex].length) {
                if (texts[textIndex].charAt(charIndex) === '<') {
                    // Skip HTML tags
                    let tagEnd = texts[textIndex].indexOf('>', charIndex);
                    if (tagEnd !== -1) {
                        element.innerHTML += texts[textIndex].substring(charIndex, tagEnd + 1);
                        charIndex = tagEnd + 1;
                    } else {
                        element.innerHTML += texts[textIndex].charAt(charIndex);
                        charIndex++;
                    }
                } else {
                    element.innerHTML += texts[textIndex].charAt(charIndex);
                    charIndex++;
                }
                setTimeout(type, speed);
            } else {
                textIndex++;
                charIndex = 0;
                if (textIndex < texts.length) {
                    setTimeout(type, speed);
                }
            }
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const texts = [
            'Merhaba, Ben ',
            '<span class="gradient-text">Umut</span>'
        ];
        heroTitle.innerHTML = '';
        setTimeout(() => {
            typeWriter(heroTitle, texts, 80);
        }, 1000);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Yükleniyor...</p>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white; /* Beyaz arka plan */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        color: #1e3a8a; /* Koyu lacivert metin */
    `;
    
    loader.querySelector('.loader-content').style.cssText = `
        text-align: center;
    `;
    
    loader.querySelector('.loader-spinner').style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(30, 58, 138, 0.3); /* Koyu lacivert */
        border-top: 3px solid #1e3a8a; /* Koyu lacivert */
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem auto;
    `;
    
    // Add spinner animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }, 1500);
});

// Skills animation on scroll
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0) scale(1)';
            }, index * 100);
        }
    });
}, { threshold: 0.5 });

skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px) scale(0.9)';
    item.style.transition = 'all 0.4s ease';
    skillObserver.observe(item);
});

// Scroll to top button functionality
const scrollToTopBtn = document.getElementById('scroll-to-top');

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top when button is clicked
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll behavior for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth' // Smooth scroll
            });
        }
    });
});

// Copy email functionality
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = element.innerHTML;
        element.innerHTML = '<i class="fas fa-check"></i> Kopyalandı!';
        element.style.color = '#10b981';
        
        setTimeout(() => {
            element.innerHTML = originalText;
            element.style.color = '';
        }, 2000);
    });
}

// Add click handlers for contact info
document.addEventListener('DOMContentLoaded', () => {
    const emailElements = document.querySelectorAll('[href^="mailto:"]');
    emailElements.forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                copyToClipboard(el.getAttribute('href').replace('mailto:', ''), el);
            }
        });
    });
});

// Error handling for missing elements
function safeQuerySelector(selector, callback) {
    const element = document.querySelector(selector);
    if (element && typeof callback === 'function') {
        callback(element);
    }
}

// Lazy loading for better performance
const lazyElements = document.querySelectorAll('[data-lazy]');
const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            element.src = element.dataset.lazy;
            element.classList.remove('lazy');
            lazyObserver.unobserve(element);
        }
    });
});

lazyElements.forEach(el => lazyObserver.observe(el));

// Education card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const educationCards = document.querySelectorAll('.education-card');
    
    educationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Animate skill tags on hover
            const skillTags = card.querySelectorAll('.skill-tag');
            skillTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-3px) scale(1.05)';
                }, index * 50);
            });
            
            // Add glow effect to badge
            const badge = card.querySelector('.education-badge');
            if (badge) {
                badge.style.boxShadow = '0 0 20px rgba(30, 58, 138, 0.4)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset skill tags
            const skillTags = card.querySelectorAll('.skill-tag');
            skillTags.forEach(tag => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
            
            // Reset badge glow
            const badge = card.querySelector('.education-badge');
            if (badge) {
                badge.style.boxShadow = '';
            }
        });
    });
});

// Preloader for better user experience
function createPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">UA</div>
            <div class="preloader-bar">
                <div class="preloader-progress"></div>
            </div>
        </div>
    `;
    
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white; /* Beyaz arka plan */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        color: #1e3a8a; /* Koyu lacivert metin */
    `;
    
    const styles = `
        .preloader-content {
            text-align: center;
        }
        .preloader-logo {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 2rem;
            animation: pulse 2s infinite;
        }
        .preloader-bar {
            width: 200px;
            height: 4px;
            background: rgba(30, 58, 138, 0.3); /* Koyu lacivert açık ton */
            border-radius: 2px;
            overflow: hidden;
        }
        .preloader-progress {
            height: 100%;
            background: #1e3a8a; /* Koyu lacivert */
            border-radius: 2px;
            animation: loading 2s ease-in-out;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(preloader);
    
    return preloader;
}

// Initialize preloader
const preloader = createPreloader();

window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 500);
    }, 2000);
});

// Education logo image error handling
document.addEventListener('DOMContentLoaded', () => {
    const educationLogos = document.querySelectorAll('.education-logo img');
    
    educationLogos.forEach(logo => {
        logo.addEventListener('error', function() {
            // Create a fallback icon if image fails to load
            const fallbackIcon = document.createElement('div');
            fallbackIcon.innerHTML = '<i class="fas fa-university" style="font-size: 2rem; color: var(--primary-color);"></i>';
            fallbackIcon.style.cssText = `
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--bg-secondary);
            `;
            
            this.parentNode.replaceChild(fallbackIcon, this);
        });
        
        // Add loading effect
        logo.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        logo.style.opacity = '0';
        logo.style.transition = 'opacity 0.3s ease';
    });
});

// Enhanced scroll animations for education section
const educationSection = document.querySelector('#education');
if (educationSection) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate section title
                const title = entry.target.querySelector('.section-title');
                const line = entry.target.querySelector('.section-line');
                
                if (title) {
                    title.style.opacity = '1';
                    title.style.transform = 'translateY(0)';
                }
                
                if (line) {
                    setTimeout(() => {
                        line.style.width = '80px';
                        line.style.opacity = '1';
                    }, 300);
                }
            }
        });
    }, { threshold: 0.2 });
    
    sectionObserver.observe(educationSection);
    
    // Initialize section elements
    const title = educationSection.querySelector('.section-title');
    const line = educationSection.querySelector('.section-line');
    
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        title.style.transition = 'all 0.6s ease';
    }
    
    if (line) {
        line.style.width = '0';
        line.style.opacity = '0';
        line.style.transition = 'all 0.8s ease';
    }
}

// Add special effects for scholarship badge
document.addEventListener('DOMContentLoaded', () => {
    const scholarshipBadges = document.querySelectorAll('.education-badge.scholarship');
    
    scholarshipBadges.forEach(badge => {
        // Add floating animation
        setInterval(() => {
            if (badge.matches(':hover')) return;
            
            badge.style.transform = 'translateY(-2px)';
            setTimeout(() => {
                badge.style.transform = 'translateY(0)';
            }, 1000);
        }, 3000);
        
        // Add click interaction
        badge.addEventListener('click', () => {
            showNotification('🏆 Burslu eğitim programı!', 'success');
        });
    });
});

// Performance optimization: Debounced scroll handler
let scrollTimeout;
function handleScroll() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        // Optimized scroll handling code here
        updateActiveNavLinks();
        updateScrollToTopButton();
    }, 10);
}

function updateActiveNavLinks() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

function updateScrollToTopButton() {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

// Replace the existing scroll listeners with the optimized version
window.removeEventListener('scroll', () => {});
window.addEventListener('scroll', handleScroll, { passive: true });

// Console message for developers
console.log('%cUmut Akdeniz Portfolio', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cDeveloped with ❤️ using HTML, CSS & JavaScript', 'color: #64748b; font-size: 14px;');
console.log('%cGitHub: https://github.com/umutakdnz', 'color: #10b981; font-size: 12px;');
console.log('%cEducation section enhanced with modern card design!', 'color: #1e3a8a; font-size: 12px;');