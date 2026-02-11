export function initCarousel() {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-track img");
  const nextBtn = document.querySelector(".btn-next");
  const prevBtn = document.querySelector(".btn-prev");

  if (!track || !slides.length || !nextBtn || !prevBtn) return;

  let currentIndex = 0;

  function render() {
    const slideWidth = track.parentElement.clientWidth;

    // console.log("Index:", currentIndex);
    // console.log("Total slides:", slides.length); 
    // console.log("Width:", slideWidth);
    // console.log("Transform:", -currentIndex * slideWidth);

    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function setIndex(newIndex) {
    // if (newIndex >= slides.length) currentIndex = 0;
    // else if (newIndex < 0) currentIndex = slides.length - 1;
    // else currentIndex = newIndex;

    // versi lebih singkat
    currentIndex = (newIndex + slides.length) % slides.length;

    render();
  }

  function next() {
    setIndex(currentIndex + 1);
  }

  function prev() {
    setIndex(currentIndex - 1);
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
  window.addEventListener("resize", render);

  render();
}
