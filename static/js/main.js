const slides = Array.from(document.querySelectorAll(".slide"));
const slider = document.querySelector(".slider");
const buttons = document.querySelectorAll(".buttons div");
const dotEl = document.querySelector(".dots");
console.log(dotEl);
let timeoutId;
// console.log(slides);

function getNextPrev() {
  const activeSlide = document.querySelector(".slide.active");
  //   console.log(activeSlide);
  const activeIndex = slides.indexOf(activeSlide);

  // next
  if (activeIndex === slides.length - 1) {
    console.log("match");
    next = slides[0];
  } else {
    next = slides[activeIndex + 1];
  }
  //previous
  if (activeIndex === 0) {
    previous = slides[slides.length - 1];
  } else {
    previous = slides[activeIndex - 1];
  }

  return [next, previous];
}

function getPosition() {
  const activeSlide = document.querySelector(".slide.active");
  const activeIndex = slides.indexOf(activeSlide);
  const [next, previous] = getNextPrev();

  slides.forEach((slide, index) => {
    if (index === activeIndex) {
      slide.style.transform = "translateX(0)";
    } else if (slide === previous) {
      slide.style.transform = "translateX(-100%)";
    } else if (slide === next) {
      slide.style.transform = "translateX(100%)";
    } else {
      slide.style.transform = "translateX(100%)";
    }

    slide.addEventListener("transitionend", () => {
      slide.classList.remove("top");
    });
  });
}

getPosition();

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("next")) getNextSlide();
    else if (button.classList.contains("previous")) getPrevSlide();
  });
});

function getNextSlide() {
  clearTimeout(timeoutId);
  const current = document.querySelector(".slide.active");
  const [next, prev] = getNextPrev();

  if (current.classList.contains("top")) {
    return;
  }

  next.classList.add("top");
  current.classList.add("top");
  current.classList.remove("active");
  current.style.transform = "translate(-100%)";
  next.style.transform = "translate(0%)";
  next.classList.add("active");

  getPosition();
  getActiveDots();
  autoLoop();
}
function getPrevSlide() {
  clearTimeout(timeoutId);
  const current = document.querySelector(".slide.active");
  const [next, prev] = getNextPrev();

  if (current.classList.contains("top")) {
    return;
  }

  prev.classList.add("top");
  current.classList.add("top");
  current.classList.remove("active");
  current.style.transform = "translate(100%)";
  prev.style.transform = "translate(0%)";
  prev.classList.add("active");

  getPosition();
  getActiveDots();
  autoLoop();
  console.log("getting the next slide ");
}

// dots
slides.forEach((slide) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dotEl.appendChild(dot);
});

function getActiveDots() {
  const allDots = document.querySelectorAll(".dots .dot");
  const activeSlide = document.querySelector(".slide.active");
  const activeIndex = slides.indexOf(activeSlide);

  allDots.forEach((dot) => {
    dot.classList.remove("active");
  });

  allDots[activeIndex].classList.add("active");
}

function functionalDots() {
  const allDots = document.querySelectorAll(".dots .dot");

  allDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      getDotSlide(index);
    });
  });
}
function getDotSlide(index) {
  clearTimeout(timeoutId);
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slides[index].classList.add("active");
  getPosition();
  getActiveDots();
  autoLoop();
}
function autoLoop() {
  timeoutId = setTimeout(() => {
    getNextSlide();
  }, 5000);
}
functionalDots();
getActiveDots();
autoLoop();
