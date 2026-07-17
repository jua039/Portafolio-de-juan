document.querySelectorAll('.typewriter-loop').forEach(el => {
    const text = el.dataset.text || '';
    let i = 0;
    let deleting = false;

    function tick() {
      if (!deleting) {
        i++;
        el.textContent = text.slice(0, i);
        if (i === text.length) {
          deleting = true;
          setTimeout(tick, 1400); // pausa con el texto completo
          return;
        }
      } else {
        i--;
        el.textContent = text.slice(0, i);
        if (i === 0) deleting = false;
      }
      setTimeout(tick, deleting ? 35 : 80);
    }
    tick();
  });

  // ============ FORMULARIO DE CONTACTO (localStorage) ============
  const STORAGE_KEY = 'contactMessages';
  const form = document.querySelector('.contact-form-card');

  if (form) {
    const emailInput = form.querySelector('#f-email');
    const nameInput = form.querySelector('#f-name');
    const messageInput = form.querySelector('#f-message');
    const submitBtn = form.querySelector('.form-submit');

    // Crea (si no existe) el elemento donde mostramos el mensaje de éxito
    let successMsg = form.querySelector('.form-success');
    if (!successMsg) {
      successMsg = document.createElement('p');
      successMsg.className = 'form-success';
      successMsg.textContent = '¡Mensaje enviado! Gracias por escribirme, te responderé pronto.';
      form.appendChild(successMsg);
    }

    function getMensajes() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      } catch (e) {
        return [];
      }
    }

    function guardarMensaje(mensaje) {
      const mensajes = getMensajes();
      mensajes.push(mensaje);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mensajes));
    }

    function mostrarExito() {
      successMsg.classList.add('is-visible');
      setTimeout(() => {
        successMsg.classList.remove('is-visible');
      }, 4000);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nuevoMensaje = {
        id: Date.now(),
        nombre: nameInput.value.trim(),
        email: emailInput.value.trim(),
        mensaje: messageInput.value.trim(),
        fecha: new Date().toISOString()
      };

      if (!nuevoMensaje.nombre || !nuevoMensaje.email || !nuevoMensaje.mensaje) {
        return;
      }

      guardarMensaje(nuevoMensaje);
      form.reset();
      mostrarExito();

      if (submitBtn) {
        const textoOriginal = submitBtn.textContent;
        submitBtn.textContent = 'Enviado ✓';
        submitBtn.disabled = true;
        setTimeout(() => {
          submitBtn.textContent = textoOriginal;
          submitBtn.disabled = false;
        }, 2500);
      }
    });
  }