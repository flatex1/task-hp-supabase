let scrollBtn = document.querySelector('.scroll-btn');
let outlineBtn = document.querySelector('.outline-btn');

scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
});


outlineBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 1875,
    behavior: "smooth"
  });
});
