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