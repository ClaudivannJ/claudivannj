const links = document.querySelectorAll('.menu-item');

links.forEach(link => {
    link.addEventListener("click", function(){
        links.forEach(link => {
            link.classList.remove('isActive');
        });
        this.classList.add('isActive');
    });
});


const titulo = document.getElementById('titulo-animado');
const nome = "Desenvolvedor FullStack  ";
let index = 0;
let isDeleting = false;

function typeEffect() {
    if (!isDeleting && index <= nome.length) {   
        titulo.textContent = nome.slice(0, index++);
    } else if (isDeleting && index >= 0) {
        titulo.textContent = nome.slice(0, index--);
    }

    if (index === nome.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000);
    } else if (index === -1) {
        isDeleting = false;
        index = 0;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

typeEffect();


const capa = document.getElementById("capa");
const setaRolagem = document.getElementById("seta-rolagem");

setaRolagem.addEventListener("click", () => {
    capa.classList.add("capa-oculta");
});

let lastScroll = 0;
window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 50) {
        capa.classList.add("capa-oculta");
    } else if (currentScroll < lastScroll && currentScroll < 50) {
        capa.classList.remove("capa-oculta");
    }

    lastScroll = currentScroll;
});

const toggleButton = document.getElementById('toggleTheme');
const themeIcon = document.getElementById('themeIcon');

function applySystemThemesPreference() {
    console.log('Verificando a preferência do sistema...');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('dark')
        document.body.classList.add('dark-mode');
        themeIcon.src = './img/sol.png';
        themeIcon.alt = 'Tema Escuro';
    } else {
        console.log('light')
        document.body.classList.remove('dark-mode');
        themeIcon.src = './img/lua.png';
        themeIcon.alt = 'Tema Claro';
    }
}

// Chama a função ao carregar a página
applySystemThemesPreference();

// Adiciona um listener para mudanças na preferência do sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySystemThemesPreference);

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        themeIcon.src = './img/sol.png';
        themeIcon.alt = 'Tema Escuro';
    } else {
        themeIcon.src = './img/lua.png';
        themeIcon.alt = 'Tema Claro';
    }
});
