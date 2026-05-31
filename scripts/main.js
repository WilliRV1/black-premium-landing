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

  /* ──── DYNAMIC SCROLL PROGRESS BAR ──── */
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      scrollProgress.style.width = progress + '%';
    }, { passive: true });
  }

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

  /* ──── DYNAMIC VIEWERS (CRO) ──── */
  const viewersEl = document.getElementById('dynamic-viewers');
  if (viewersEl) {
    setInterval(() => {
      // Random number between 12 and 24
      const current = parseInt(viewersEl.innerText);
      const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
      let newVal = current + change;
      if (newVal < 10) newVal = 10;
      if (newVal > 28) newVal = 28;
      viewersEl.innerText = newVal;
    }, 6000);
  }

  /* ──── META & TIKTOK PIXEL: INITIATE CHECKOUT ──── */
  const formInputs = document.querySelectorAll('#order-form input, #order-form textarea');
  let checkoutInitiated = false;
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      if (!checkoutInitiated) {
        if (typeof fbq === 'function') fbq('track', 'InitiateCheckout');
        if (typeof ttq === 'object') ttq.track('InitiateCheckout');
        checkoutInitiated = true;
      }
    });
  });

  /* ──── FORM SUBMISSION → WHATSAPP & GOOGLE SHEETS ──── */
  const form = document.getElementById('order-form');

  form.addEventListener('submit', async (e) => {
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

    try {
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

      // 1. Enviar datos a Formspree en segundo plano (Fetch POST)
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        console.warn('Formspree responded with status:', response.status);
      }

      // 2. Disparar Evento de Purchase en el Pixel de Meta y TikTok
      let val = producto.includes("Combo") ? 169900 : 99900;
      
      if (typeof fbq === 'function') {
        fbq('track', 'Purchase', {
          value: val,
          currency: 'COP',
          content_name: producto
        });
      }
      
      if (typeof ttq === 'object') {
        ttq.track('PlaceAnOrder', {
          contents: [{
            content_name: producto,
            price: val,
            quantity: 1
          }],
          value: val,
          currency: 'COP'
        });
      }

      // 3. Ocultar formulario, mostrar modal de éxito con tracker
      form.style.display = 'none';
      const trust = document.querySelector('.form-trust');
      if (trust) trust.style.display = 'none';
      
      const successMsg = document.getElementById('success-msg');
      if (successMsg) successMsg.style.display = 'flex';

      // Animar entrada del mensaje de éxito
      gsap.from('#success-msg', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.5)'
      });

      // 4. Construir mensaje y URL de redirección a WhatsApp
      const wpMessage = `*NUEVO PEDIDO DESDE LA WEB*\n\n*Producto:* ${producto}\n*Cliente:* ${nombres} ${apellidos}\n*Teléfono:* ${telefono}\n*Ciudad:* ${ciudad}, ${departamento}\n*Dirección:* ${direccion}\n${notas ? '*Notas:* ' + notas + '\n' : ''}\n\n*Pago contra entrega.* ¡Hola! Confirmo mi pedido.`;
      const wpUrl = `https://wa.me/573136336446?text=${encodeURIComponent(wpMessage)}`;
      
      // Asignar al botón de respaldo manual
      const fallbackLink = document.getElementById('fallback-wa-link');
      if (fallbackLink) {
        fallbackLink.href = wpUrl;
        fallbackLink.target = '_blank';
      }

      // 5. Redirigir a WhatsApp automáticamente
      setTimeout(() => {
        window.open(wpUrl, '_blank');
      }, 2000);
      
    } catch (error) {
      console.error('Error al enviar pedido:', error);
      alert('Hubo un inconveniente al registrar el pedido en la base de datos. Serás redirigido a WhatsApp para gestionarlo directamente.');
      
      const wpMessageFallback = `*NUEVO PEDIDO (FALLBACK)*\n\n*Producto:* ${producto}\n*Cliente:* ${nombres} ${apellidos}\n*Teléfono:* ${telefono}\n*Ciudad:* ${ciudad}, ${departamento}\n*Dirección:* ${direccion}\n${notas ? '*Notas:* ' + notas + '\n' : ''}\n\n*Pago contra entrega.*`;
      window.open(`https://wa.me/573136336446?text=${encodeURIComponent(wpMessageFallback)}`, '_blank');
      
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
  
  // Meta & TikTok Pixel AddToCart Event
  let val = productName.includes("Combo") ? 169900 : 99900;
  
  if (typeof fbq === 'function') {
    fbq('track', 'AddToCart', {
      content_name: productName,
      value: val,
      currency: 'COP'
    });
  }

  if (typeof ttq === 'object') {
    ttq.track('AddToCart', {
      contents: [{
        content_name: productName,
        price: val,
        quantity: 1
      }],
      value: val,
      currency: 'COP'
    });
  }

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
