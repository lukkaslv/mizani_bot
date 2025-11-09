// Простая анимация появления элементов при скролле
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.project, .hero h1, .hero p, .hero .btn');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('appear');
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
});
