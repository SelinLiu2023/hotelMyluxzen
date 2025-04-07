import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import assetsHome from "../../assets/img/imgHome/AssetsHome.js";
import "../../styles/Home.css";

const Hero = () => {
  const heroRef = useRef(null);
  const xValue = useRef(0);
  const yValue = useRef(0);
  const rotateDegree = useRef(0);
  const [parallaxEnabled, setParallaxEnabled] = useState(false);
  const hasAnimated = useRef(false);


  // Fonction pour initialiser les positions des éléments avant animation
  const initializeParallax = () => {
    const heroSection = heroRef.current;
    if (!heroSection) return;

    const elements = heroSection.querySelectorAll(".animation");

    elements.forEach((el) => {
      let speedX = el.dataset.speedx || 0;
      let speedY = el.dataset.speedy || 0;
      let speedZ = el.dataset.speedz || 0;
      let rotateSpeed = el.dataset.rotation || 0;

      el.style.transform = `perspective(2800px) translateZ(${speedZ * 100}px) 
                            rotateY(${rotateDegree.current * rotateSpeed}deg)
                            translateX(calc(-50% + ${xValue.current * speedX}px)) 
                            translateY(calc(-50% + ${yValue.current * speedY}px))`;
    });
  };

  // Fonction qui met à jour l'effet parallaxe en fonction du mouvement de la souris
  const updateParallax = (e) => {
    if (!parallaxEnabled) return;

    xValue.current = e.clientX - window.innerWidth / 2;
    yValue.current = e.clientY - window.innerHeight / 2;
    rotateDegree.current = (xValue.current / (window.innerWidth / 2)) * 20;

    const heroSection = heroRef.current;
    if (!heroSection) return;

    const elements = heroSection.querySelectorAll(".animation");
    const h1 = heroSection.querySelector("h1");
    const h2 = heroSection.querySelector("h2");

    elements.forEach((el) => {
      if (el === h1 || el === h2) return;

      let speedX = el.dataset.speedx || 0;
      let speedY = el.dataset.speedy || 0;
      let speedZ = el.dataset.speedz || 0;
      let rotateSpeed = el.dataset.rotation || 0;

      el.style.transform = `perspective(2300px) translateZ(${speedZ * 100}px) 
                            rotateY(${rotateDegree.current * rotateSpeed}deg)
                            translateX(calc(-50% + ${xValue.current * speedX}px)) 
                            translateY(calc(-50% + ${yValue.current * speedY}px))`;
    });

    h1.style.transform = `translateX(${xValue.current * 0.03}px) translateY(${yValue.current * 0.03}px)`;
    h2.style.transform = `translateX(${xValue.current * 0.04}px) translateY(${yValue.current * 0.04}px)`;
  };

  useEffect(() => {
    console.log("Animation useEffect executed");

    const heroSection = heroRef.current;
    if (!heroSection) return;

    const h1 = heroSection.querySelector("h1");
    const h2 = heroSection.querySelector("h2");

    if (hasAnimated.current) {
      setParallaxEnabled(true);
      return;
    }

    // Initialiser le parallaxe avant animation
    initializeParallax();

    // Cacher les titres au départ (mais PAS les images)
    gsap.set([h1, h2], { opacity: 0 });

    gsap.fromTo(
      h2,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 1.5,
      }
    );

    gsap.fromTo(
      h1,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 2,
        onComplete: () => {
          hasAnimated.current = true;
          setParallaxEnabled(true);
        },
      }
    );

    return () => {
      window.removeEventListener("mousemove", updateParallax);
    };
  }, []);

  useEffect(() => {
    if (parallaxEnabled) {
      window.addEventListener("mousemove", updateParallax);
    }

    return () => {
      window.removeEventListener("mousemove", updateParallax);
    };
  }, [parallaxEnabled]);


  return (
    <div className="hero-container" ref={heroRef}>
    <main>
  <div className="vignette hide"></div>

  {/* Ne pas mettre de scrollspeed ici */}
  <img src={assetsHome.background} loading="lazy" data-speedx="0" data-speedy="0.2" data-speedz="0" data-rotation="0" className="animation bg-img" />

  <img src={assetsHome.fog_7} data-scrollspeed="0.05" data-speedx="0.27" data-speedy="0.32" data-speedz="0" data-rotation="0.1" className="animation fog-7" />
  <img src={assetsHome.mountain_10} loading="lazy" data-scrollspeed="0.07" data-speedx="0.195" data-speedy="0.305" data-speedz="0" data-rotation="0.2" className="animation mountain-10" />
  <img src={assetsHome.fog_6} data-scrollspeed="0.04" data-speedx="0" data-speedy="0.28" data-speedz="0" data-rotation="0.05" className="animation fog-6" />
  <img src={assetsHome.mountain_9} data-scrollspeed="0.09" data-speedx="0.125" data-speedy="0.155" data-speedz="0.15" data-rotation="0.15" className="animation mountain-9" />
  <img src={assetsHome.mountain_8} loading="lazy" data-scrollspeed="0.1" data-speedx="0.1" data-speedy="0.11" data-speedz="0" data-rotation="0.05" className="animation mountain-8" />
  <img src={assetsHome.fog_5} data-scrollspeed="0.06" data-speedx="0.16" data-speedy="0.105" data-speedz="0" data-rotation="0.08" className="animation fog-5" />
  <img src={assetsHome.mountain_7} loading="lazy" data-scrollspeed="0.11" data-speedx="0.1" data-speedy="0.1" data-speedz="0" data-rotation="0.12" className="animation mountain-7" />

  <div className="text animation">
    <h2>Welcome to</h2>
    <h1>MyLuXZeN</h1>
  </div>

  <img src={assetsHome.mountain_6} loading="lazy" data-scrollspeed="0.12" data-speedx="0.065" data-speedy="0.05" data-speedz="0.05" data-rotation="0.1" className="animation mountain-6" />
  <img src={assetsHome.fog_4} data-scrollspeed="0.07" data-speedx="0.135" data-speedy="0.1" data-speedz="0" data-rotation="0.07" className="animation fog-4" />
  <img src={assetsHome.mountain_5} loading="lazy" data-scrollspeed="0.14" data-speedx="0.08" data-speedy="0.04" data-speedz="0.13" data-rotation="0.15" className="animation mountain-5" />
  <img src={assetsHome.fog_3} data-scrollspeed="0.06" data-speedx="0.11" data-speedy="0.018" data-speedz="0" data-rotation="0.05" className="animation fog-3" />
  <img src={assetsHome.mountain_4} loading="lazy" data-scrollspeed="0.15" data-speedx="0.059" data-speedy="0.024" data-speedz="0" data-rotation="0.1" className="animation mountain-4" />
  <img src={assetsHome.mountain_3} loading="lazy" data-scrollspeed="0.18" data-speedx="0.04" data-speedy="0.018" data-speedz="0.32" data-rotation="0.2" className="animation mountain-3" />
  <img src={assetsHome.fog_2} data-scrollspeed="0.07" data-speedx="0.15" data-speedy="0.0115" data-speedz="0" data-rotation="0.1" className="animation fog-2" />
  <img src={assetsHome.mountain_2} loading="lazy" data-scrollspeed="0.2" data-speedx="0.0235" data-speedy="0.013" data-speedz="0.42" data-rotation="0.2" className="animation mountain-2" />
  <img src={assetsHome.mountain_1} loading="lazy" data-scrollspeed="0.22" data-speedx="0.027" data-speedy="0.018" data-speedz="0.53" data-rotation="0.25" className="animation mountain-1" />
  <img src={assetsHome.sun_rays} className="sun-rays hide" />
  <img src={assetsHome.fog_1} data-scrollspeed="0.05" data-speedx="0" data-speedy="0.01" data-speedz="0" data-rotation="0.1" className="animation fog-1" />
</main>

  </div>
);
};

export default Hero;
/*import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import assetsHome from "../../assets/img/imgHome/AssetsHome.js"; // ✅ Import des assets
import "../../styles/Home.css"; // ✅ Assure-toi que ce fichier CSS est bien lié

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const heroSection = heroRef.current;
    const elements = heroSection.querySelectorAll(".animation");
    const bgImage = heroSection.querySelector(".bg-img");

    let xValue = 0, yValue = 0, rotateDegree = 0;

    function updateParallax(cursorX) {
      elements.forEach(el => {
        let speedX = el.dataset.speedx || 0;
        let speedY = el.dataset.speedy || 0;
        let speedZ = el.dataset.speedz || 0;
        let rotateSpeed = el.dataset.rotation || 0;

        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = (cursorX - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

        el.style.transform = `perspective(2300px) translateZ(${zValue * speedZ}px) 
                              rotateY(${rotateDegree * rotateSpeed}deg)
                              translateX(calc(-50% + ${-xValue * speedX}px)) 
                              translateY(calc(-50% + ${yValue * speedY}px))`;
      });

      // ✅ S'assurer que l'image de background couvre toujours tout l'écran
      if (bgImage) {
        bgImage.style.width = `max(100%, 200vw)`;
        bgImage.style.height = `max(100%, 200vh)`;
      }
    }

    function initializeParallax() {
      elements.forEach(el => {
        let speedX = el.dataset.speedx || 0;
        let speedY = el.dataset.speedy || 0;
        let speedZ = el.dataset.speedz || 0;
        let rotateSpeed = el.dataset.rotation || 0;

        el.style.transform = `perspective(2300px) translateZ(${speedZ * 100}px) 
                              rotateY(${rotateDegree * rotateSpeed}deg)
                              translateX(calc(-50% + ${xValue * speedX}px)) 
                              translateY(calc(-50% + ${yValue * speedY}px))`;
      });
    }

    initializeParallax();

    gsap.set(elements, { y: 200, opacity: 0 });
    gsap.to(elements, {
      y: 0,
      opacity: 1,
      duration: 2,
      ease: "power3.out",
      stagger: 0.2,
      onComplete: () => {
        parallaxEnabled = true;
      }
    });

    window.addEventListener("mousemove", (e) => {
      xValue = e.clientX - window.innerWidth / 2;
      yValue = e.clientY - window.innerHeight / 2;
      rotateDegree = (xValue / (window.innerWidth / 2)) * 20;
      updateParallax(e.clientX);
    });

    return () => {
      window.removeEventListener("mousemove", updateParallax);
    };
  }, []);

  return (
    <div className="hero-container" ref={heroRef}>
      <main>
        <div className="vignette hide"></div>
        <img src={assetsHome.background} data-speedx="0" data-speedy="0.2" data-speedz="0" className="animation bg-img" />
        <img src={assetsHome.fog_7} data-speedx="0.27" data-speedy="0.32" data-speedz="0" className="animation fog-7" />
        <img src={assetsHome.mountain_10} data-speedx="0.195" data-speedy="0.305" data-speedz="0" className="animation mountain-10" />
        <img src={assetsHome.fog_6} data-speedx="0" data-speedy="0.28" data-speedz="0" className="animation fog-6" />
        <img src={assetsHome.mountain_9} data-speedx="0.125" data-speedy="0.155" data-speedz="0.15" className="animation mountain-9" />
        <img src={assetsHome.mountain_8} data-speedx="0.1" data-speedy="0.11" data-speedz="0" className="animation mountain-8" />
        <img src={assetsHome.fog_5} data-speedx="0.16" data-speedy="0.105" data-speedz="0" className="animation fog-5" />
        <img src={assetsHome.mountain_7} data-speedx="0.1" data-speedy="0.1" data-speedz="0" className="animation mountain-7" />
        <div className="text animation" data-speedx="0.07" data-speedy="0.07" data-speedz="0">
          <h2>Welcome to</h2>
          <h1>MyLuXZeN</h1>
        </div>
        <img src={assetsHome.mountain_6} data-speedx="0.065" data-speedy="0.05" data-speedz="0.05" className="animation mountain-6" />
        <img src={assetsHome.fog_4} data-speedx="0.135" data-speedy="0.1" data-speedz="0" className="animation fog-4" />
        <img src={assetsHome.mountain_5} data-speedx="0.08" data-speedy="0.04" data-speedz="0.13" className="animation mountain-5" />
        <img src={assetsHome.fog_3} data-speedx="0.11" data-speedy="0.018" data-speedz="0" className="animation fog-3" />
        <img src={assetsHome.mountain_4} data-speedx="0.059" data-speedy="0.024" data-speedz="0" className="animation mountain-4" />
        <img src={assetsHome.mountain_3} data-speedx="0.04" data-speedy="0.018" data-speedz="0.32" className="animation mountain-3" />
        <img src={assetsHome.fog_2} data-speedx="0.15" data-speedy="0.0115" data-speedz="0" className="animation fog-2" />
        <img src={assetsHome.mountain_2} data-speedx="0.0235" data-speedy="0.013" data-speedz="0.42" className="animation mountain-2" />
        <img src={assetsHome.mountain_1} data-speedx="0.027" data-speedy="0.018" data-speedz="0.53" className="animation mountain-1" />
        <img src={assetsHome.sun_rays} className="sun-rays hide" />
        <img src={assetsHome.fog_1} data-speedx="0" data-speedy="0.01" data-speedz="0" className="animation fog-1" />
      </main>
    </div>
  );
};

export default Hero;*/