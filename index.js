if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then((registration) => {
                console.log('ServiceWorker registered: ', registration);
            })
            .catch((error) => {
                console.error('ServiceWorker registration failed: ', error);
            });
    });
}


const links = document.querySelectorAll('.menu-item');

links.forEach(link => {
    link.addEventListener("click", function () {
        links.forEach(link => {
            link.classList.remove('isActive');
        });
        this.classList.add('isActive');
    });
});

const capa = document.getElementById("capa");
const setaRolagem = document.getElementById("seta-rolagem");
let isCapaVisible = true;
let touchStartY;

window.addEventListener("touchstart", (event) => {
    touchStartY = event.touches[0].clientY;
});

window.addEventListener("touchmove", (event) => {
    const currentY = event.touches[0].clientY;

    if (touchStartY - currentY > 100 && isCapaVisible) {

        capa.classList.add("capa-oculta");
        isCapaVisible = false;
    } else if (currentY - touchStartY > 150 && !isCapaVisible) {

        capa.classList.remove("capa-oculta");
        isCapaVisible = true;
    }
});


setaRolagem.addEventListener("click", () => {
    if (isCapaVisible) {
        capa.classList.add("capa-oculta");
        isCapaVisible = false;

    } else {
        capa.classList.remove("capa-oculta");
        isCapaVisible = true;

    }
});
const toggleButton = document.getElementById('toggleTheme');
const themeIcon = document.getElementById('themeIcon');

function applySystemThemesPreference() {
    console.log('Verificando a preferência do sistema...');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('dark')
        document.body.classList.add('dark-mode');
        themeIcon.src = './img/sol.webp';
        themeIcon.alt = 'Tema Escuro';
    } else {
        console.log('light')
        document.body.classList.remove('dark-mode');
        themeIcon.src = './img/lua.webp';
        themeIcon.alt = 'Tema Claro';
        themeIcon.style.width = '20px';
        themeIcon.style.height = '20px';
    }
}

applySystemThemesPreference();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySystemThemesPreference);

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        themeIcon.src = './img/sol.webp';
        themeIcon.alt = 'Tema Escuro';
    } else {
        themeIcon.src = './img/lua.webp';
        themeIcon.alt = 'Tema Claro';
    }
});

const menuMobile = document.querySelector('#menuIcon');
const menu = document.querySelector('.menu');

function updateMenuIcon() {
    const isDarkMode = document.body.classList.contains('dark-mode');

    if (menu.classList.contains('active')) {

        menuMobile.src = './img/x.webp';
        menuMobile.style.width = "20px"
        menuMobile.style.height = "20px"

        if (isDarkMode) {
            menuMobile.style.filter = 'invert(100%)';
        } else {
            menuMobile.style.filter = 'none';

        }
    } else {

        menuMobile.src = './img/menu.webp';
        menuMobile.style.filter = 'none';
        menuMobile.style.width = "30px"
        menuMobile.style.height = "30px"
    }
}

menuMobile.addEventListener('click', (event) => {
    event.preventDefault();
    menu.classList.toggle('active');
    updateMenuIcon();
});

function createTypeEffect(element, text) {
    let index = 0;
    let isDeleting = false;

    function type() {
        const cursor = '<span class="cursor">|</span>'; // Cursor como um elemento HTML

        if (!isDeleting && index <= text.length) {
            // Adiciona o cursor ao final do texto
            element.innerHTML = text.slice(0, index++) + cursor;
        } else if (isDeleting && index >= 0) {
            // Remove o cursor durante a deleção
            element.innerHTML = text.slice(0, index--) + cursor;
        }

        if (index === text.length) {
            isDeleting = true;
            setTimeout(type, 1000);
        } else if (index === -1) {
            isDeleting = false;
            index = 0;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    type();
}

// Elementos e textos para aplicar o efeito de digitação
const messageElement = document.getElementById('message-animated');
createTypeEffect(messageElement, "Se alguém conseguir, eu consigo! Se ninguém conseguir, serei o primeiro! ");
