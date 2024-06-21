gsap.registerPlugin(ScrollTrigger);

const pageContainer = document.querySelector(".container")

const scroller = new LocomotiveScroll({
  el: pageContainer,
  smooth: true
})


scroller.on("scroll", ScrollTrigger.update)

ScrollTrigger.scrollerProxy(pageContainer, {
  scrollTop(value){
    return arguments.length 
    ? scroller.scrollTo(value, 0, 0)
    : scroller.scroll.instance.scroll.y
  },
  getBoundingClientRect(){
    return {
      left:0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    }
  },
  pinType: pageContainer.style.transform ? "transform" : "fixed"
})


window.addEventListener("load", function() {
  let pinWrap = document.querySelector(".pin-wrap")
  let pinWrapWidth = pinWrap.offsetWidth;
  let horizontalScrollLength = pinWrapWidth - window.innerWidth;

  gsap.to(".pin-wrap", {
    scrollTrigger:{
      scroller: pageContainer,
      scrub: true,
      trigger: "#sectionPin",
      pin: true,
      start: "top top",
      end: pinWrapWidth,
    },
    x: -horizontalScrollLength,
  })

  ScrollTrigger.addEventListener("refresh", () => scroller.update())

  ScrollTrigger.refresh();
})

const tl = gsap.timeline({
  scrollTrigger:{
    trigger: ".anima",
    scroller: pageContainer,
    start: "top 45%",
    end: "bottom 30%",
    markers:true,
    scrub: 2,
  }
})

tl.fromTo(".anima", { scale: 1 }, { scale: 2.5 })
tl.fromTo(".anima", { opacity: 1 }, { opacity: 0 })