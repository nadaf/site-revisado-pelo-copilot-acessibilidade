(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const header = document.querySelector('.site-header');
    const menuButton = document.querySelector('.nav-toggle');
    const menuPanel = document.querySelector('.nav-panel');
    const contrastButton = document.querySelector('.contrast-toggle');
    const backToTop = document.querySelector('.back-to-top');

    document.documentElement.classList.add('js-ready');

    const closeMenu = (returnFocus = false) => {
        if (!menuButton || !menuPanel) return;
        menuPanel.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Abrir menu');
        menuButton.querySelector('i').className = 'bi bi-list';
        if (returnFocus) menuButton.focus();
    };

    if (menuButton && menuPanel) {
        menuButton.addEventListener('click', () => {
            const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', String(!isOpen));
            menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
            menuButton.querySelector('i').className = isOpen ? 'bi bi-list' : 'bi bi-x-lg';
            menuPanel.classList.toggle('is-open', !isOpen);
        });
        menuPanel.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuPanel.classList.contains('is-open')) closeMenu(true);
        });
        document.addEventListener('click', (event) => {
            if (menuPanel.classList.contains('is-open') && !menuPanel.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 991) closeMenu();
        });
    }

    if (contrastButton) {
        contrastButton.addEventListener('click', () => {
            const enabled = document.body.classList.toggle('high-contrast');
            contrastButton.setAttribute('aria-pressed', String(enabled));
            contrastButton.setAttribute('aria-label', enabled ? 'Desativar alto contraste' : 'Ativar alto contraste');
        });
    }

    const updateScrollState = () => {
        const hasScrolled = window.scrollY > 24;
        header?.classList.toggle('is-scrolled', hasScrolled);
        backToTop?.classList.toggle('is-visible', window.scrollY > 480);
    };
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
        document.querySelector('.brand')?.focus({ preventScroll: true });
    });

    const animateCounter = (element) => {
        const target = Number(element.dataset.count);
        if (!Number.isFinite(target)) return;
        const decimals = Number(element.dataset.decimals || 0);
        const prefix = element.dataset.prefix || '';
        const suffix = element.dataset.suffix || '';
        const formatter = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
        if (reducedMotion) {
            element.textContent = `${prefix}${formatter.format(target)}${suffix}`;
            return;
        }
        const start = performance.now();
        const duration = 1250;
        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = `${prefix}${formatter.format(target * eased)}${suffix}`;
            if (progress < 1) window.requestAnimationFrame(tick);
        };
        window.requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
        document.querySelectorAll('.reveal').forEach((element, index) => {
            element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
            revealObserver.observe(element);
        });

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('[data-count]').forEach((counter) => counterObserver.observe(counter));
    } else {
        document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
        document.querySelectorAll('[data-count]').forEach(animateCounter);
    }
})();
