(function () {
  var body = document.body;
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('#site-nav');

  if (toggle && nav) {
    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      nav.classList.remove('is-open');
      body.classList.remove('menu-open');
    }

    toggle.addEventListener('click', function () {
      var opening = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(opening));
      toggle.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
      nav.classList.toggle('is-open', opening);
      body.classList.toggle('menu-open', opening);
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 760) closeMenu();
    }, { passive: true });
  }

  var copyButton = document.querySelector('[data-copy]');
  if (copyButton) {
    copyButton.addEventListener('click', function () {
      var command = copyButton.getAttribute('data-copy');
      var original = copyButton.textContent;
      function showCopied() {
        copyButton.textContent = 'Copied';
        copyButton.classList.add('copied');
        window.setTimeout(function () {
          copyButton.textContent = original;
          copyButton.classList.remove('copied');
        }, 1700);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(command).then(showCopied).catch(function () {});
        return;
      }

      var field = document.createElement('textarea');
      field.value = command;
      field.style.position = 'fixed';
      field.style.opacity = '0';
      body.appendChild(field);
      field.select();
      try {
        if (document.execCommand('copy')) showCopied();
      } finally {
        field.remove();
      }
    });
  }

  document.documentElement.classList.add('js-ready');
  var revealItems = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

  revealItems.forEach(function (item) { observer.observe(item); });
}());
