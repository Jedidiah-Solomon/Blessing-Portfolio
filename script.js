document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("#navbar ul");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll("#navbar ul li a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  window.addEventListener("scroll", function () {
    const header = document.querySelector("#header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  const backToTopButton = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("active");
    } else {
      backToTopButton.classList.remove("active");
    }
  });

  backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("#navbar ul li a");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  const resumeTabs = document.querySelectorAll(".resume-tab");
  const resumeSections = document.querySelectorAll(".resume-section");

  resumeTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const target = this.getAttribute("data-target");

      resumeTabs.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");

      resumeSections.forEach((section) => {
        section.classList.remove("active");
        if (section.getAttribute("id") === target) {
          section.classList.add("active");
        }
      });
    });
  });

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const data = new FormData(contactForm);
      const action = contactForm.getAttribute("action");

      try {
        const response = await fetch(action, {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          formStatus.textContent =
            "Thank you. Your message has been sent successfully.";
          formStatus.className = "form-status success";
          contactForm.reset();
        } else {
          const resData = await response.json().catch(() => null);
          formStatus.textContent =
            resData && resData.errors
              ? resData.errors.map((err) => err.message).join(", ")
              : "Something went wrong. Please try again.";
          formStatus.className = "form-status error";
        }
      } catch (error) {
        formStatus.textContent = "Network error. Please try again later.";
        formStatus.className = "form-status error";
      }

      setTimeout(() => {
        formStatus.textContent = "";
        formStatus.className = "form-status";
      }, 5000);
    });
  }

  const copyrightYear = document.getElementById("copyright-year");
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});
