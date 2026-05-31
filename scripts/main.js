/* ══════════════════════════════════════════════════
   BLACK PREMIUM — Main Script
   GSAP Animations · Form Logic · Interactions
   ══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──── GSAP + ScrollTrigger ──── */
  gsap.registerPlugin(ScrollTrigger);

  /* ──── NAVBAR SCROLL ──── */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = current;
  }, { passive: true });

  /* ──── HERO ENTRANCE ──── */
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .from('.hero-badge', { y: 30, opacity: 0, duration: 0.8, delay: 0.3 })
    .from('.hero h1', { y: 50, opacity: 0, duration: 1 }, '-=0.4')
    .from('.hero-sub', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
    .from('.hero-actions .btn', {
      y: 20, opacity: 0,
      stagger: 0.15, duration: 0.6
    }, '-=0.4')
    .from('.stat', {
      y: 20, opacity: 0,
      stagger: 0.1, duration: 0.5
    }, '-=0.3')
    .from('.stat-divider', { scaleY: 0, opacity: 0, duration: 0.4 }, '-=0.4')
    .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.2');

  /* ──── SCROLL REVEAL ──── */
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el) => {
    const delay = parseFloat(el.dataset.delay) || 0;
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: delay,
      ease: 'power2.out',
      onComplete: () => {
        el.classList.add('active');
      }
    });
  });

  /* ──── TRUST BAR ──── */
  gsap.from('.trust-item', {
    scrollTrigger: {
      trigger: '.trust-bar',
      start: 'top 92%'
    },
    y: 15,
    opacity: 0,
    stagger: 0.07,
    duration: 0.5,
    ease: 'power2.out'
  });

  /* ──── BENEFIT CARDS ──── */
  gsap.from('.benefit-card', {
    scrollTrigger: {
      trigger: '.benefits-grid',
      start: 'top 82%'
    },
    y: 30,
    opacity: 0,
    stagger: 0.08,
    duration: 0.6,
    ease: 'power2.out'
  });

  /* ──── TESTIMONIAL CARDS ──── */
  gsap.from('.testimonial-card', {
    scrollTrigger: {
      trigger: '.testimonials-grid',
      start: 'top 82%'
    },
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power2.out'
  });

  /* ──── STEPS ──── */
  gsap.from('.step', {
    scrollTrigger: {
      trigger: '.apply-steps',
      start: 'top 82%'
    },
    x: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.7,
    ease: 'power2.out'
  });

  /* ──── COMBO CARD PARALLAX GLOW ──── */
  const comboCard = document.querySelector('.combo-card');
  if (comboCard) {
    comboCard.addEventListener('mousemove', (e) => {
      const glow = comboCard.querySelector('.combo-glow');
      if (!glow) return;
      const rect = comboCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.left = (x - 150) + 'px';
      glow.style.top = (y - 150) + 'px';
    });
  }

  /* ──── FORM SUBMISSION → WHATSAPP ──── */
  const form = document.getElementById('order-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const producto = document.getElementById('producto').value;

    if (!nombre || !telefono || !ciudad || !direccion || !producto) return;

    const msg = encodeURIComponent(
      `🛒 *NUEVO PEDIDO — BLACK PREMIUM*\n\n` +
      `👤 Nombre: ${nombre}\n` +
      `📱 Celular: ${telefono}\n` +
      `🏙️ Ciudad: ${ciudad}\n` +
      `📍 Dirección: ${direccion}\n` +
      `📦 Producto: ${producto}\n\n` +
      `✅ Pago contra entrega`
    );

    const waUrl = `https://wa.me/573136336446?text=${msg}`;

    // Show success
    form.style.display = 'none';
    const trust = document.querySelector('.form-trust');
    if (trust) trust.style.display = 'none';
    document.getElementById('success-msg').style.display = 'flex';

    // Animate success
    gsap.from('#success-msg', {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.5)'
    });

    // Open WhatsApp
    setTimeout(() => window.open(waUrl, '_blank'), 700);
  });

  /* ──── WA BUTTON URL UPDATE ──── */
  const productoSelect = document.getElementById('producto');
  const waBtn = document.getElementById('wa-order-btn');

  productoSelect.addEventListener('change', () => {
    const prod = encodeURIComponent(productoSelect.value);
    waBtn.href =
      `https://wa.me/573136336446?text=Hola%2C%20quiero%20pedir%3A%20${prod}%20🚗`;
  });

  /* ──── SMOOTH SCROLL ──── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navH = navbar.offsetHeight;
        const y = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  /* ──── AUTOPLAY Y PAUSA DE VIDEOS POR SCROLL ──── */
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        // Entra a la pantalla -> Inicia la reproducción
        video.play().catch(() => {
          // Si el navegador bloquea el autoplay por tener audio,
          // lo silenciamos automáticamente para que el video ruede visualmente
          video.muted = true;
          video.play().catch(() => {});
        });
      } else {
        // Sale de la pantalla -> Pausa la reproducción
        video.pause();
      }
    });
  }, { threshold: 0.5 }); // Se activa cuando al menos el 50% del video es visible

  document.querySelectorAll('video').forEach(v => videoObserver.observe(v));

  /* ──── AUDIO AL HACER HOVER EN VIDEOS ──── */
  document.querySelectorAll('video:not(.hero-video)').forEach(video => {
    video.addEventListener('mouseenter', () => {
      video.muted = false; // Activa el audio al poner el mouse encima
    });
    
    video.addEventListener('mouseleave', () => {
      video.muted = true; // Lo silencia al quitar el mouse
    });
  });

  /* ──── FAQ ACCORDION ──── */
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const content = btn.nextElementSibling;
      const isActive = item.classList.contains('active');
      
      // Cerrar todos
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-content').style.maxHeight = null;
      });

      // Si no estaba activo, abrirlo
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
});

/* ──── GLOBAL: SELECT PRODUCT FROM CARD ──── */
function selectProduct(btn) {
  const productName = btn.dataset.product;
  const radios = document.querySelectorAll('input[name="producto"]');
  radios.forEach(radio => {
    if (radio.value === productName) {
      radio.checked = true;
      radio.dispatchEvent(new Event('change'));
    }
  });

  // Scroll to form
  const section = document.getElementById('pedir');
  const navH = document.getElementById('navbar').offsetHeight;
  const y = section.getBoundingClientRect().top + window.scrollY - navH;
  window.scrollTo({ top: y, behavior: 'smooth' });

  // Highlight flash
  const wrapper = document.querySelector('.form-wrapper');
  wrapper.classList.add('highlight');
  setTimeout(() => wrapper.classList.remove('highlight'), 1800);
}
