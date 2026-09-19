document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#modified').textContent = document.lastModified;

const menu = document.querySelector('#menu');
const nav = document.querySelector('#nav');

menu.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menu.textContent = isOpen ? '✕' : '☰';
  menu.setAttribute('aria-expanded', isOpen);
});