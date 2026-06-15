const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 38, 240)}ms`;
  observer.observe(item);
});

const hero = document.querySelector(".hero");
const heroVideo = document.querySelector(".hero-video");

const updateHero = () => {
  if (!hero || !heroVideo) return;
  const progress = Math.min(window.scrollY / hero.offsetHeight, 1);
  heroVideo.style.transform = `scale(${1.04 + progress * 0.07}) translate3d(0, ${progress * 24}px, 0)`;
};

updateHero();
window.addEventListener("scroll", updateHero, { passive: true });

const filterButtons = document.querySelectorAll(".filter-button");
const workItems = document.querySelectorAll(".work-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    workItems.forEach((item) => {
      const categories = item.dataset.category.split(" ");
      item.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
    });
  });
});
