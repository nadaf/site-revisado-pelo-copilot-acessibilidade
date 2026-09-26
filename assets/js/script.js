// ==========================================
// VOTO SUSTENTÁVEL E ACESSÍVEL - JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // MENU MOBILE TOGGLE
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            menuToggle.textContent = isExpanded ? '✕ Fechar' : '☰ Menu';
        });

        // Fecha o menu ao clicar em um link
        const menuItems = navLinks.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.textContent = '☰ Menu';
                }
            });
        });
    }

    // ==========================================
    // SMOOTH SCROLL PARA ÂNCORAS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Mover foco para o elemento alvo para acessibilidade
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            }
        });
    });

    // ==========================================
    // HIGHLIGHT DA PÁGINA ATUAL NO MENU
    // ==========================================
    const currentPage = window.location.pathname.split('/').pop();
    const navLinksAll = document.querySelectorAll('.nav-links a');
    
    navLinksAll.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // ==========================================
    // ACESSIBILIDADE - NAVEGAÇÃO POR TECLADO
    // ==========================================
    
    // Adicionar indicadores visuais de foco melhorados
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #FFD700';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // ==========================================
    // LEITURA ESTIMADA
    // ==========================================
    const contentContainer = document.querySelector('.container');
    if (contentContainer) {
        const text = contentContainer.textContent || contentContainer.innerText;
        const wordsPerMinute = 200;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        
        // Adicionar informação de tempo de leitura
        const readingTimeInfo = document.createElement('p');
        readingTimeInfo.className = 'reading-time';
        readingTimeInfo.style.cssText = 'font-size: 0.9rem; color: #666; font-style: italic; margin-bottom: 1rem;';
        readingTimeInfo.innerHTML = `<strong>⏱️ Tempo de leitura estimado:</strong> ${readingTime} minuto${readingTime > 1 ? 's' : ''}`;
        
        const firstHeading = contentContainer.querySelector('h1');
        if (firstHeading && firstHeading.nextSibling) {
            firstHeading.parentNode.insertBefore(readingTimeInfo, firstHeading.nextSibling);
        }
    }

    // ==========================================
    // BOTÃO VOLTAR AO TOPO
    // ==========================================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Voltar ao topo');
    backToTop.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: #FFD700;
        color: #0038A8;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(backToTop);
    
    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Função de scroll ao clicar
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTop.addEventListener('mouseenter', function() {
        this.style.background = '#0038A8';
        this.style.color = '#FFD700';
        this.style.transform = 'scale(1.1)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.background = '#FFD700';
        this.style.color = '#0038A8';
        this.style.transform = 'scale(1)';
    });

    // ==========================================
    // MELHORAR ACESSIBILIDADE DE IMAGENS
    // ==========================================
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Garantir que todas as imagens têm alt text
        if (!img.getAttribute('alt')) {
            img.setAttribute('alt', 'Imagem ilustrativa do conteúdo');
        }
        
        // Adicionar loading lazy para performance
        img.setAttribute('loading', 'lazy');
        
        // Adicionar role para imagens decorativas
        if (img.classList.contains('decorative')) {
            img.setAttribute('role', 'presentation');
            img.setAttribute('alt', '');
        }
    });

    // ==========================================
    // ANÚNCIO DE MUDANÇAS PARA LEITORES DE TELA
    // ==========================================
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // ==========================================
    // NAVEGAÇÃO POR TECLADO APRIMORADA
    // ==========================================
    document.addEventListener('keydown', function(e) {
        // Alt + H - Ir para o topo
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            announceToScreenReader('Navegando para o topo da página');
        }
        
        // Alt + F - Ir para o rodapé
        if (e.altKey && e.key === 'f') {
            e.preventDefault();
            const footer = document.querySelector('footer');
            if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
                announceToScreenReader('Navegando para o rodapé');
            }
        }
        
        // Alt + M - Focar no menu
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            const firstNavLink = document.querySelector('.nav-links a');
            if (firstNavLink) {
                firstNavLink.focus();
                announceToScreenReader('Navegando para o menu principal');
            }
        }
    });

    // ==========================================
    // AJUSTAR CONTRASTE (ACESSIBILIDADE)
    // ==========================================
    let highContrast = false;
    
    // Criar botão de alto contraste
    const contrastBtn = document.createElement('button');
    contrastBtn.innerHTML = '◐';
    contrastBtn.className = 'contrast-toggle';
    contrastBtn.setAttribute('aria-label', 'Alternar alto contraste');
    contrastBtn.style.cssText = `
        position: fixed;
        bottom: 6rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: #0038A8;
        color: #FFD700;
        border: 2px solid #FFD700;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(contrastBtn);
    
    contrastBtn.addEventListener('click', function() {
        highContrast = !highContrast;
        document.body.classList.toggle('high-contrast', highContrast);
        
        if (highContrast) {
            document.documentElement.style.setProperty('--azul-royal', '#0000CC');
            document.documentElement.style.setProperty('--amarelo-ouro', '#FFFF00');
            this.setAttribute('aria-pressed', 'true');
            announceToScreenReader('Alto contraste ativado');
        } else {
            document.documentElement.style.setProperty('--azul-royal', '#0038A8');
            document.documentElement.style.setProperty('--amarelo-ouro', '#FFD700');
            this.setAttribute('aria-pressed', 'false');
            announceToScreenReader('Alto contraste desativado');
        }
    });
    
    contrastBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    contrastBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // ==========================================
    // AUMENTAR/DIMINUIR TAMANHO DA FONTE
    // ==========================================
    let fontSize = 16;
    const minFontSize = 12;
    const maxFontSize = 24;
    
    // Criar controles de fonte
    const fontControls = document.createElement('div');
    fontControls.className = 'font-controls';
    fontControls.style.cssText = `
        position: fixed;
        bottom: 10rem;
        right: 2rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        z-index: 999;
    `;
    
    const increaseFontBtn = document.createElement('button');
    increaseFontBtn.innerHTML = 'A+';
    increaseFontBtn.className = 'font-btn';
    increaseFontBtn.setAttribute('aria-label', 'Aumentar tamanho da fonte');
    
    const decreaseFontBtn = document.createElement('button');
    decreaseFontBtn.innerHTML = 'A-';
    decreaseFontBtn.className = 'font-btn';
    decreaseFontBtn.setAttribute('aria-label', 'Diminuir tamanho da fonte');
    
    const fontBtnStyle = `
        width: 50px;
        height: 50px;
        background: #009B3A;
        color: #FFFFFF;
        border: 2px solid #FFD700;
        border-radius: 50%;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    `;
    
    increaseFontBtn.style.cssText = fontBtnStyle;
    decreaseFontBtn.style.cssText = fontBtnStyle;
    
    fontControls.appendChild(increaseFontBtn);
    fontControls.appendChild(decreaseFontBtn);
    document.body.appendChild(fontControls);
    
    increaseFontBtn.addEventListener('click', function() {
        if (fontSize < maxFontSize) {
            fontSize += 2;
            document.documentElement.style.fontSize = fontSize + 'px';
            announceToScreenReader(`Fonte aumentada para ${fontSize} pixels`);
        }
    });
    
    decreaseFontBtn.addEventListener('click', function() {
        if (fontSize > minFontSize) {
            fontSize -= 2;
            document.documentElement.style.fontSize = fontSize + 'px';
            announceToScreenReader(`Fonte diminuída para ${fontSize} pixels`);
        }
    });
    
    [increaseFontBtn, decreaseFontBtn].forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = '#007A2F';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = '#009B3A';
        });
    });

    // ==========================================
    // LOG DE AÇÕES PARA DEBUG
    // ==========================================
    console.log('%c🗳️ Voto Sustentável e Acessível', 'color: #FFD700; background: #0038A8; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%cSistema carregado com sucesso!', 'color: #009B3A; font-size: 14px;');
    console.log('Atalhos de teclado disponíveis:');
    console.log('- Alt + H: Ir para o topo');
    console.log('- Alt + F: Ir para o rodapé');
    console.log('- Alt + M: Focar no menu');

    // ==========================================
    // PERFORMANCE - Lazy Loading de Imagens
    // ==========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

});
