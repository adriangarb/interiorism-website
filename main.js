import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all.js";
import Lenis from "@studio-freight/lenis";
import "./index.scss";
// // GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
// Lenis
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
const menuToggle = document.getElementById("menu-toggle");
const contentDiv = document.getElementsByClassName(
  "navbar__container__barContainer"
)[0];
gsap.to("body", {
  height: "100vh",
  overflowY: "hidden",
  duration: 0,
});
gsap.to(window, {
  duration: 0.05,
  scrollTo: 0,
  ease: "power4.out",
});
lenis.stop();
function startLoader() {
  let counterElement = document.querySelector(".count p");
  let currentValue = 0;
  function updatCounter() {
    if (currentValue < 100) {
      let increment = Math.floor(Math.random() * 10) + 1;
      currentValue = Math.min(currentValue + increment, 100);
      counterElement.textContent = currentValue;

      let delay = Math.floor(Math.random() * 200) + 25;
      setTimeout(updatCounter, delay);
    }
  }
  updatCounter();
}
startLoader();
// gsap.to(".count", { opacity: 0, delay: 3.5, duration: 0.5 });
gsap.to(".loader__loader2", {
  left: "-100vw",
  ease: "power4.inOut",
  duration: 2,
  delay: 3.75,
});
gsap.to(".loader__loader1", {
  left: "-100vw",
  ease: "power4.inOut",
  duration: 2,
  delay: 4,
});
gsap.from(".navbar", {
  y: 150,
  duration: 2,
  delay: 5.5,
  opacity: 0,
  ease: "power3.out",
  stagger: {
    each: 0.5,
  },
});
gsap.to("body", {
  height: "100%",
  overflow: "auto",
  delay: 5,
  onComplete: () => lenis.start(),
});

menuToggle.addEventListener("change", function (e) {
  document.body.classList.toggle("menu-open", this.checked);
  contentDiv.classList.toggle("menu-open", this.checked);
  if (this.checked) {
    // lenis.stop()
    gsap.to("body", {
      overflow: "hidden",
      height: "100vh",
      maxHeight: "100vh",
    });
  } else {
    lenis.start();
    gsap.to("body", {
      overflow: "visible",
      duration: 0.5,
      cursor: "auto",
    });
  }
});
