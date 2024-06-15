let sliderButton = document.querySelectorAll('.slider-button');
let sliderContainer = document.querySelector('.slider-container');

for (let i = 0; i < sliderButton.length; i++) {
  sliderButton[i].addEventListener('click', function () {
    const slideWidth = sliderContainer.offsetWidth;
    const translateValue = -slideWidth * i;

    sliderContainer.style.transform = `translateX(${translateValue}px)`;

    sliderButton.forEach(btn => btn.classList.remove('active'));
    sliderButton[i].classList.add('active');
  });
}
