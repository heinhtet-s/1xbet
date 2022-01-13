
    let indicator= document.getElementsByClassName("indicate");
    const slides = document.getElementById("slides");
       
    const allSlides = document.querySelectorAll(".slide");
    const slidesLength = allSlides.length;
    const slideWidth = allSlides[0].offsetWidth;

    let index = 0;
    let posX1;
    let posX2;
    let initialPosition;
    let finalPosition;

    let canISlide = true;

   

    const firstSlide = allSlides[0];
    const lastSlide = allSlides[allSlides.length - 1];

    const cloneFirstSlide = firstSlide.cloneNode(true);
    const cloneLastSlide = lastSlide.cloneNode(true);

    slides.appendChild(cloneFirstSlide);
    slides.insertBefore(cloneLastSlide, firstSlide);
    // const prev = document.getElementById("prev");
    // const next = document.getElementById("next");
    // next.addEventListener("click", () => switchSlide("next"));
    // prev.addEventListener("click", () => switchSlide("prev"));

    slides.addEventListener("transitionend", checkIndex);

    slides.addEventListener("mousedown", dragStart);

    slides.addEventListener("touchstart", dragStart);
    slides.addEventListener("touchmove", dragMove);
    slides.addEventListener("touchend", dragEnd);

    function dragStart(e) {
      e.preventDefault();
      initialPosition = slides.offsetLeft;

      if (e.type == "touchstart") {
        posX1 = e.touches[0].clientX;
      } else {
        posX1 = e.clientX;

        document.onmouseup = dragEnd;
        document.onmousemove = dragMove;
      }
    }

    function dragMove(e) {
      if (e.type == "touchmove") {
        posX2 = posX1 - e.touches[0].clientX;
        posX1 = e.touches[0].clientX;
      } else {
        posX2 = posX1 - e.clientX;
        posX1 = e.clientX;
      }

      slides.style.left = `${slides.offsetLeft - posX2}px`;
    }

    function dragEnd() {
      finalPosition = slides.offsetLeft;
      if (finalPosition - initialPosition < -100) {
        switchSlide("next", "dragging");
      } else if (finalPosition - initialPosition > 100) {
        switchSlide("prev", "dragging");
      } else {
        slides.style.left = `${initialPosition}px`;
      }

      document.onmouseup = null;
      document.onmousemove = null;
    }

    function switchSlide(arg, arg2) {
      slides.classList.add("transition");

      if (canISlide) {
        if (!arg2) {
          initialPosition = slides.offsetLeft;
        }
        if (arg == "next") {
          slides.style.left = `${initialPosition - slideWidth}px`;
          index++;
        } else {
          slides.style.left = `${initialPosition + slideWidth}px`;
          index--;
        }
      }

      canISlide = false;
    }

    function checkIndex() {
      slides.classList.remove("transition");

      if (index == -1) {
        slides.style.left = `-${slidesLength * slideWidth}px`;
        index = slidesLength - 1;
      }

      if (index == slidesLength) {
        slides.style.left = `-${1 * slideWidth}px`;
        index = 0;
      }
      for (let index = 0; index < indicator.length; index++) {
      console.log(indicator["index"]);
        indicator[index].classList.remove("active");
    }
           
        indicator[index].classList.add("active");
        
      canISlide = true;
    }
   
    function show(non){
           
   for (let index = 0; index < indicator.length; index++) {
     console.log(indicator["index"]);
       indicator[index].classList.remove("active");
   }
   slides.classList.add("transition");

//    slides.style.left = `${slides.offsetLeft - non*slideWidth}px`;
     slides.style.left = `-${(non+1) * slideWidth}px`;
     
          
       indicator[non].classList.add("active");
            
       index=non;
       old_no=non;
   }
