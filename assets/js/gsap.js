// Initialize GSAP
document.addEventListener('DOMContentLoaded', () => {
  // Animate on scroll
  gsap.registerPlugin(ScrollTrigger);

  // Global animations
  gsap.utils.toArray('[data-animate]').forEach(el => {
    const delay = el.dataset.delay || 0;
    gsap.from(el, {
      opacity: 0,
      y: el.dataset.animate.includes('down') ? -30 : 
         el.dataset.animate.includes('up') ? 30 : 0,
      x: el.dataset.animate.includes('left') ? 30 : 
         el.dataset.animate.includes('right') ? -30 : 0,
      duration: 1,
      delay: parseFloat(delay),
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Particle canvas
  initParticles();
});

// Floating particles animation
function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['rgba(108,77,246,0.8)', 'rgba(255,125,5,0.8)', 'rgba(0,240,255,0.8)'];

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.life = 100;
    }
    update() {
      if (this.life > 0) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
      } else {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}