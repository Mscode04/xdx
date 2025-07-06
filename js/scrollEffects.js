// Parallax Effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax background effects
    const parallaxElements = document.querySelectorAll('[data-parallax="scroll"]');
    
    parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed')) || 0.3;
        
        gsap.to(el, {
            y: (i, target) => scrollY * speed,
            ease: "none",
            scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
    
    // Animate elements on scroll with GSAP
    gsap.utils.toArray('[data-scroll]').forEach(element => {
        const direction = element.getAttribute('data-direction') || 'up';
        const distance = element.getAttribute('data-distance') || 50;
        const duration = element.getAttribute('data-duration') || 1;
        const delay = element.getAttribute('data-delay') || 0;
        
        let animationProps = {};
        
        switch(direction) {
            case 'up':
                animationProps = { y: distance, opacity: 0 };
                break;
            case 'down':
                animationProps = { y: -distance, opacity: 0 };
                break;
            case 'left':
                animationProps = { x: distance, opacity: 0 };
                break;
            case 'right':
                animationProps = { x: -distance, opacity: 0 };
                break;
            case 'scale':
                animationProps = { scale: 0.8, opacity: 0 };
                break;
            default:
                animationProps = { y: distance, opacity: 0 };
        }
        
        gsap.from(element, {
            ...animationProps,
            duration: duration,
            delay: delay,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // More complex animations for hero section
    const heroTitleLines = gsap.utils.toArray('.title-line');
    
    heroTitleLines.forEach((line, i) => {
        gsap.from(line, {
            y: 100,
            opacity: 0,
            duration: 1,
            delay: i * 0.2,
            ease: "power3.out"
        });
    });
    
    // Research card stagger animation
    const researchCards = gsap.utils.toArray('.research-card');
    
    gsap.from(researchCards, {
        y: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: '.research-grid',
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    // About section animation
    gsap.from('.about-text', {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-section',
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    gsap.from('.about-image', {
        x: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-section',
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    // Glow effect animation
    const glowEffect = document.querySelector('.glow-effect');
    if (glowEffect) {
        gsap.to(glowEffect, {
            scale: 1.1,
            opacity: 0.7,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
});