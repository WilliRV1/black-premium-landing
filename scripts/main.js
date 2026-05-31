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

  /* ──── PRODUCT CARDS ──── */
  gsap.from('.product-card', {
    scrollTrigger: {
      trigger: '.products-grid',
      start: 'top 82%'
    },
    y: 30,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
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

  /* ──── COMBO CARD ANIMATION ──── */
  gsap.from('.combo-card', {
    scrollTrigger: {
      trigger: '#combo',
      start: 'top 80%'
    },
    scale: 0.95,
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
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

    const nombres = document.getElementById('nombres').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const departamento = document.getElementById('departamento').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const notas = document.getElementById('notas').value.trim();
    const producto = document.querySelector('input[name="producto"]:checked').value;

    if (!nombres || !apellidos || !telefono || !departamento || !ciudad || !direccion || !correo || !producto) return;

    const SCRIPT_URL = 'https://formspree.io/f/xaqkzbvo';
    
    const btnSubmit = document.getElementById('btn-submit');
    const originalText = btnSubmit.innerHTML;
    btnSubmit.innerHTML = 'Procesando Pedido... ⏳';
    btnSubmit.disabled = true;

    // 1. Armar el mensaje de WhatsApp
    let msgStr = `🛒 *NUEVO PEDIDO — BLACK PREMIUM*\n\n` +
      `👤 Nombres: ${nombres}\n` +
      `👥 Apellidos: ${apellidos}\n` +
      `📱 Celular: ${telefono}\n` +
      `🗺️ Departamento: ${departamento}\n` +
      `🏙️ Ciudad: ${ciudad}\n` +
      `📍 Dirección: ${direccion}\n` +
      `📧 Correo: ${correo}\n` +
      `📦 Producto: ${producto}\n\n`;

    if (notas) {
      msgStr += `📝 Notas: ${notas}\n\n`;
    }
    msgStr += `✅ Pago contra entrega`;

    const waMsg = encodeURIComponent(msgStr);
    const waUrl = `https://wa.me/573136336446?text=${waMsg}`;

    try {
      // 2. Enviar datos a Google Sheets (Silencioso)
      const formData = new FormData();
      formData.append('Nombres', nombres);
      formData.append('Apellidos', apellidos);
      formData.append('Telefono', telefono);
      formData.append('Departamento', departamento);
      formData.append('Ciudad', ciudad);
      formData.append('Direccion', direccion);
      formData.append('Correo', correo);
      formData.append('Notas', notas);
      formData.append('Producto', producto);
      formData.append('Fecha', new Date().toLocaleString());

      // No esperamos (await) obligatoriamente para no retrasar el WhatsApp
      fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).catch(err => console.log('Error Formspree:', err));

      // 3. Mostrar éxito y abrir WhatsApp
      form.style.display = 'none';
      const trust = document.querySelector('.trust-badges');
      if (trust) trust.style.display = 'none';
      
      const successMsg = document.getElementById('success-msg');
      successMsg.style.display = 'flex';

      // Animate success
      gsap.from('#success-msg', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.5)'
      });

      // Abrir WhatsApp
      setTimeout(() => window.open(waUrl, '_blank'), 700);
      
    } catch (error) {
      alert('Hubo un error al enviar el pedido. Por favor contáctanos al WhatsApp de soporte.');
      btnSubmit.innerHTML = originalText;
      btnSubmit.disabled = false;
    }
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
