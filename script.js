  AOS.init({ duration: 800, once: true });
    document.getElementById('menu-btn').onclick = () => {
      document.getElementById('mobile-menu').classList.toggle('hidden');
    };
    
    const counters = document.querySelectorAll(".counter");
  const speed = 1; // smaller = faster

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (count < target) {
          counter.innerText = count + increment;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  // Run when section is visible
  const statsSection = document.getElementById("stats");
  let started = false;
  window.addEventListener("scroll", () => {
    const sectionPos = statsSection.getBoundingClientRect().top;
    if (!started && sectionPos < window.innerHeight - 100) {
      animateCounters();
      started = true;
    }
  });

  // ✅ Testimonials Carousel
  const slides = document.querySelectorAll(".testimonial-slide");
  const buttons = document.querySelectorAll(".testimonial-btn");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.add("hidden");
      slide.classList.add("opacity-0");
      buttons[i].classList.remove("bg-blue-600");
      buttons[i].classList.add("bg-gray-400", "dark:bg-gray-600");
    });
    slides[index].classList.remove("hidden");
    setTimeout(() => slides[index].classList.remove("opacity-0"), 50);
    buttons[index].classList.add("bg-blue-600");
  }

  buttons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      currentIndex = i;
      showSlide(i);
    });
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 5000);

  showSlide(currentIndex);


    const contactForm = document.getElementById("contact-form");
  const formAlert = document.getElementById("form-alert");

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // stop default submit
    formAlert.classList.remove("hidden");
    formAlert.textContent = "Sending...";
    formAlert.className = "mb-6 p-4 rounded-lg font-medium bg-yellow-100 text-yellow-700";


try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formAlert.textContent = "✅ Message sent successfully!";
        formAlert.className = "mb-6 p-4 rounded-lg font-medium bg-green-100 text-green-700";
        contactForm.reset();
      } else {
        formAlert.textContent = "❌ Oops! Something went wrong.";
        formAlert.className = "mb-6 p-4 rounded-lg font-medium bg-red-100 text-red-700";
      }
    } catch (error) {
      formAlert.textContent = "❌ Network error. Try again later.";
      formAlert.className = "mb-6 p-4 rounded-lg font-medium bg-red-100 text-red-700";
    }

  });
