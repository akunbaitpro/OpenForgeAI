document.addEventListener("DOMContentLoaded", () => {
  // Counter Animation
  const animateCount = (el, target, duration) => {
    let start = 0, range = target - start, startTime = null;
    
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const val = Math.floor((progress / duration) * range);
      el.innerText = val.toLocaleString('en-US');
      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        el.innerText = target.toLocaleString('en-US');
      }
    }
    requestAnimationFrame(step);
  };

  // Scroll Animation System
  const setupScrollAnimation = (element, {
    yStart = 20,
    duration = 0.6,
    delay = 0,
    resetOnExit = true
  } = {}) => {
    element.style.opacity = '0';
    element.style.transform = `translateY(${yStart}px)`;
    element.style.transition = 'none';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          element.style.transition = 'none';
          element.style.opacity = '0';
          element.style.transform = `translateY(${yStart}px)`;
          
          void element.offsetWidth;
          
          element.style.transition = `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`;
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          
          if (element.id === 'counterBox') {
            const counterEl = document.getElementById("counterValue");
            if (counterEl && counterEl.innerText === "0") {
              animateCount(counterEl, 1000000000, 2000);
            }
          }
        } else if (resetOnExit) {
          element.style.transition = 'none';
          element.style.opacity = '0';
          element.style.transform = `translateY(${yStart}px)`;
          
          if (element.id === 'counterBox') {
            const counterEl = document.getElementById("counterValue");
            if (counterEl) counterEl.innerText = "0";
          }
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(element);
  };

  // Enhanced Copy Function
  const copyBtn = document.getElementById("copyTokenBtn");
  const tokenAddress = document.getElementById("tokenAddress");
  
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(tokenAddress.innerText).then(() => {
      copyBtn.classList.add("copied");
      copyBtn.style.transform = "scale(0.9)";
      
      setTimeout(() => {
        copyBtn.style.transform = "scale(1)";
        setTimeout(() => copyBtn.classList.remove("copied"), 1800);
      }, 200);
    }).catch(err => {
      console.error("Failed to copy: ", err);
      
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = tokenAddress.innerText;
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand("copy");
        copyBtn.classList.add("copied");
        setTimeout(() => copyBtn.classList.remove("copied"), 2000);
      } catch (err) {
        console.error("Fallback copy failed: ", err);
      }
      
      document.body.removeChild(textArea);
    });
  });

  // Smooth Scroll to Roadmap
  document.getElementById("roadmapButton").addEventListener("click", e => {
    e.preventDefault();
    const roadmapSection = document.getElementById("roadmap");
    
    roadmapSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    
    // Trigger roadmap box animations
    document.querySelectorAll('.roadmap-box').forEach((box, index) => {
      box.style.transition = 'none';
      box.style.opacity = '0';
      box.style.transform = 'translateY(40px)';
      void box.offsetWidth;
      
      box.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
      box.style.opacity = '1';
      box.style.transform = 'translateY(0)';
    });
  });

  // Initialize all animations
  setupScrollAnimation(document.getElementById("heroTitle"), {
    yStart: 30,
    duration: 0.8,
    delay: 0.1
  });
  
  setupScrollAnimation(document.getElementById("heroDescription"), {
    yStart: 30,
    duration: 0.8,
    delay: 0.3
  });
  
  setupScrollAnimation(document.getElementById("roadmapButton"), {
    yStart: 20,
    duration: 0.6,
    delay: 0.5
  });
  
  document.querySelectorAll('.feature-box').forEach((box, index) => {
    setupScrollAnimation(box, {
      yStart: 20,
      duration: 0.6,
      delay: index * 0.2
    });
  });
  
  document.querySelectorAll('.roadmap-box').forEach((box, index) => {
    setupScrollAnimation(box, {
      yStart: 40,
      duration: 0.6,
      delay: index * 0.15
    });
  });
  
  const futureText = document.getElementById("roadmapFutureText");
  if (futureText) {
    setupScrollAnimation(futureText, {
      yStart: 30,
      duration: 0.8,
      delay: 0.6
    });
  }
});