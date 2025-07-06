// Loading Screen Animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const mainContent = document.querySelector('.main-content');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        loadingProgress.style.width = `${Math.min(progress, 100)}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.pointerEvents = 'none';
                mainContent.style.opacity = '1';
                
                // Initialize animations after loading
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    initAnimations();
                }, 1000);
            }, 500);
        }
    }, 100);
    
    // Initially hide main content
    mainContent.style.opacity = '0';
});

// Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                document.querySelector('.nav-links').classList.remove('active');
                document.querySelector('.menu-icon').classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Initialize all animations when page loads
function initAnimations() {
    // Animate hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    
    heroTitle.classList.add('slide-up');
    heroSubtitle.classList.add('slide-up', 'delay-1');
    heroCta.classList.add('slide-up', 'delay-2');
    
    // Initialize counter animation when about section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats-grid')) {
                    animateCounters();
                }
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[data-scroll]').forEach(el => {
        observer.observe(el);
    });
    
    // Initialize navbar animations
    initNavbarAnimations();
    
    // Initialize 3D tech sphere if available
    if (document.getElementById('techSphere')) {
        init3DTechSphere();
    }
    
    // Initialize particle system if available
    if (document.getElementById('particles-js')) {
        initParticleSystem();
    }
    
    // Enhanced hover effects for tech buttons
    const techButtons = document.querySelectorAll('.tech-button');
    
    techButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            gsap.to(button.querySelector('.button-hover'), {
                x: x - rect.width/2,
                y: y - rect.height/2,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
}

// Enhanced Navbar Animation
function initNavbarAnimations() {
    // Underline animation
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const underline = link.querySelector('.link-underline');
            gsap.to(underline, {
                width: '100%',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                const underline = link.querySelector('.link-underline');
                gsap.to(underline, {
                    width: '0%',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// 3D Tech Sphere in Hero Section
function init3DTechSphere() {
    const canvas = document.getElementById('techSphere');
    if (!canvas) return;
    
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create tech sphere
    const geometry = new THREE.SphereGeometry(3, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        color: 0x6e45e2,
        emissive: 0x1a1a2e,
        specular: 0x88d3ce,
        shininess: 50,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x88d3ce, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add floating tech elements inside sphere
    const techElements = new THREE.Group();
    
    for (let i = 0; i < 50; i++) {
        const size = Math.random() * 0.1 + 0.05;
        const geometry = new THREE.IcosahedronGeometry(size, 0);
        const material = new THREE.MeshBasicMaterial({ 
            color: Math.random() > 0.5 ? 0x6e45e2 : 0x88d3ce,
            transparent: true,
            opacity: 0.7
        });
        
        const element = new THREE.Mesh(geometry, material);
        
        // Random position within sphere
        const radius = Math.random() * 2.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        element.position.x = radius * Math.sin(phi) * Math.cos(theta);
        element.position.y = radius * Math.sin(phi) * Math.sin(theta);
        element.position.z = radius * Math.cos(phi);
        
        element.userData = {
            speed: Math.random() * 0.01 + 0.005,
            direction: new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).normalize()
        };
        
        techElements.add(element);
    }
    
    sphere.add(techElements);
    
    // Position camera
    camera.position.z = 5;
    
    // Mouse interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = {
            x: e.offsetX,
            y: e.offsetY
        };
    });
    
    window.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaMove = {
            x: e.offsetX - previousMousePosition.x,
            y: e.offsetY - previousMousePosition.y
        };
        
        sphere.rotation.y += deltaMove.x * 0.01;
        sphere.rotation.x += deltaMove.y * 0.01;
        
        previousMousePosition = {
            x: e.offsetX,
            y: e.offsetY
        };
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate sphere slowly when not interacting
        if (!isDragging) {
            sphere.rotation.y += 0.002;
            sphere.rotation.x += 0.001;
        }
        
        // Animate floating elements
        techElements.children.forEach(element => {
            element.position.add(
                element.userData.direction.clone().multiplyScalar(element.userData.speed)
            );
            
            // Keep elements within sphere
            if (element.position.length() > 2.5) {
                element.position.normalize().multiplyScalar(2.5);
                element.userData.direction.negate();
            }
        });
        
        renderer.render(scene, camera);
    }
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
    
    animate();
}

// Particle System for Hero Background
function initParticleSystem() {
    if (!document.getElementById('particles-js')) return;
    
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#39FF14"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#6e45e2",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
}


// Blog Carousel Functionality
function initBlogCarousels() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        const carousel = card.querySelector('.carousel-slides');
        const slides = card.querySelectorAll('.slide');
        const dots = card.querySelectorAll('.dot');
        const prevBtn = card.querySelector('.carousel-prev');
        const nextBtn = card.querySelector('.carousel-next');
        
        let currentIndex = 0;
        
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentIndex);
            });
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        }
        
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        // Auto-rotate carousel
        let interval = setInterval(nextSlide, 5000);
        
        card.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        card.addEventListener('mouseleave', () => {
            interval = setInterval(nextSlide, 5000);
        });
    });
    
    // Main carousel navigation
    const carouselContainer = document.querySelector('.carousel-container');
    const prevNav = document.querySelector('.carousel-nav-prev');
    const nextNav = document.querySelector('.carousel-nav-next');
    
    if (carouselContainer && prevNav && nextNav) {
        const cardWidth = document.querySelector('.blog-card').offsetWidth;
        const gap = 30;
        const scrollAmount = cardWidth + gap;
        
        prevNav.addEventListener('click', () => {
            carouselContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        nextNav.addEventListener('click', () => {
            carouselContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
}

// Update the initAnimations function to include blog carousels
function initAnimations() {
    // Previous initialization code...
    
    // Initialize blog carousels
    initBlogCarousels();
}



// Team Section Hover Effects
function initTeamHoverEffects() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            gsap.to(card, {
                rotationX: angleX,
                rotationY: angleY,
                transformPerspective: 1000,
                transformOrigin: "center center",
                ease: "power1.out",
                duration: 0.5
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                ease: "power1.out",
                duration: 0.5
            });
        });
    });
}

// Update the initAnimations function to include team hover effects
function initAnimations() {
    // Previous initialization code...
    
    // Initialize team hover effects
    initTeamHoverEffects();
}




// Product Card Hover Effects
function initProductHoverEffects() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            gsap.to(card, {
                rotationX: angleX,
                rotationY: angleY,
                transformPerspective: 1000,
                transformOrigin: "center center",
                ease: "power1.out",
                duration: 0.5
            });
            
            // Parallax effect for product image
            const image = card.querySelector('.product-image img');
            const moveX = (centerX - x) / 20;
            const moveY = (centerY - y) / 20;
            
            gsap.to(image, {
                x: moveX,
                y: moveY,
                ease: "power1.out",
                duration: 0.5
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                ease: "power1.out",
                duration: 0.5
            });
            
            // Reset image position
            const image = card.querySelector('.product-image img');
            gsap.to(image, {
                x: 0,
                y: 0,
                ease: "power1.out",
                duration: 0.5
            });
        });
    });
}

// Update the initAnimations function to include product hover effects
function initAnimations() {
    // Previous initialization code...
    
    // Initialize product hover effects
    initProductHoverEffects();
}



// Testimonials Carousel
function initTestimonialsCarousel() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (!track || !cards.length) return;
    
    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let currentIndex = 0;
    
    // Set active card
    function updateCarousel() {
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Scroll to center the active card
        const cardWidth = cards[0].offsetWidth;
        const gap = 30;
        const scrollPos = (cardWidth + gap) * currentIndex - (track.offsetWidth / 2 - cardWidth / 2);
        
        gsap.to(track, {
            scrollLeft: scrollPos,
            duration: 0.7,
            ease: "power2.out"
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }
    
    // Auto-rotate carousel
    let interval = setInterval(nextSlide, 6000);
    
    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 6000);
    }
    
    // Button events
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    // Touch/swipe support
    let startX, moveX;
    let isDragging = false;
    
    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - track.offsetLeft;
        track.style.cursor = 'grabbing';
        resetInterval();
    });
    
    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        moveX = e.pageX - track.offsetLeft;
        const walk = (moveX - startX) * 2;
        track.scrollLeft = track.scrollLeft - walk;
    });
    
    window.addEventListener('mouseup', () => {
        isDragging = false;
        track.style.cursor = 'grab';
    });
    
    // Initialize
    updateCarousel();
    
    // Add hover effect to cards
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 50;
            const angleY = (centerX - x) / 40;
            
            gsap.to(card, {
                rotationX: angleX,
                rotationY: angleY,
                transformPerspective: 1000,
                transformOrigin: "center center",
                ease: "power1.out",
                duration: 0.001
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                ease: "power1.out",
                duration: 0.001
            });
        });
    });
}

// Update the initAnimations function to include testimonials carousel
function initAnimations() {
    // Previous initialization code...
    
    // Initialize testimonials carousel
    initTestimonialsCarousel();
}



// About Section Counter Animation
function animateAboutCounters() {
    const counters = document.querySelectorAll('.metric-value');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateAboutCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Initialize About Section Animations
function initAboutAnimations() {
    const aboutSection = document.querySelector('.about-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateAboutCounters();
            }
        });
    }, { threshold: 0.1 });
    
    if (aboutSection) {
        observer.observe(aboutSection);
    }
    
    // Image hover effect
    const imageContainer = document.querySelector('.about-image .image-container');
    if (imageContainer) {
        imageContainer.addEventListener('mousemove', (e) => {
            const rect = imageContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            gsap.to(imageContainer, {
                rotationX: angleX,
                rotationY: angleY,
                transformPerspective: 1000,
                ease: "power1.out",
                duration: 0.5
            });
        });
        
        imageContainer.addEventListener('mouseleave', () => {
            gsap.to(imageContainer, {
                rotationX: 0,
                rotationY: 0,
                ease: "power1.out",
                duration: 0.5
            });
        });
    }
}

// Update the initAnimations function
function initAnimations() {
    // Previous initialization code...
    
    // Initialize about section animations
    initAboutAnimations();
}





// Quantum Particles Initialization
function initQuantumParticles() {
  const container = document.getElementById('quantum-particles');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  
  // Create quantum particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 500;
  
  const posArray = new Float32Array(particleCount * 3);
  for(let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x88d3ce,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  
  camera.position.z = 5;
  
  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.x += 0.001;
    particlesMesh.rotation.y += 0.001;
    
    // Respond to mouse movement
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Handle resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// Cybernetic Entity Interaction
function initCyberneticEntity() {
  const entity = document.getElementById('cybernetic-entity');
  const core = entity.querySelector('.entity-core');
  const visor = entity.querySelector('.visor-glass');
  
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // Head tracking
    entity.style.transform = `
      translateY(${(y - 0.5) * -20}px)
      rotateX(${(y - 0.5) * 10}deg)
      rotateY(${(x - 0.5) * -10}deg)
    `;
    
    // Core pulse on mouse movement
    core.style.boxShadow = `
      0 0 30px rgba(110, 69, 226, 0.7),
      inset 0 0 40px rgba(136, 211, 206, 0.4)
    `;
    
    // Visor glow
    visor.style.boxShadow = `
      0 0 30px rgba(136, 211, 206, 0.7),
      inset 0 0 50px rgba(136, 211, 206, 0.5)
    `;
    
    setTimeout(() => {
      core.style.boxShadow = `
        0 0 20px rgba(110, 69, 226, 0.5),
        inset 0 0 30px rgba(136, 211, 206, 0.3)
      `;
      visor.style.boxShadow = `
        0 0 20px rgba(136, 211, 206, 0.5),
        inset 0 0 30px rgba(136, 211, 206, 0.3)
      `;
    }, 200);
  });
  
  // Energy orbs animation
  const orbs = entity.querySelectorAll('.energy-orb');
  orbs.forEach((orb, i) => {
    setInterval(() => {
      orb.style.transform = `translate(-50%, -50%) scale(${1 + Math.random() * 0.3})`;
      orb.style.opacity = 0.5 + Math.random() * 0.5;
    }, 1000 + i * 500);
  });
}

// Text Animation
function animateCyberText() {
  gsap.registerPlugin(ScrollTrigger);
  

  
  // Subtitle animation
  gsap.from('.cyber-subtitle', {
    x: -50,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: "power2.out"
  });
  
  // Button animations
  gsap.from('.cyber-btn', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    delay: 0.9,
    ease: "back.out(1.7)"
  });
  
  // Data stream animation
  const streamLines = document.querySelectorAll('.stream-line');
  streamLines.forEach((line, i) => {
    gsap.to(line, {
      duration: 8 + i * 2,
      backgroundPosition: `0 ${window.innerHeight * 2}px`,
      repeat: -1,
      ease: "none"
    });
  });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  initQuantumParticles();
  initCyberneticEntity();
  animateCyberText();
});