document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("#navbar ul");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll("#navbar ul li a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Sticky Header
  window.addEventListener("scroll", function () {
    const header = document.querySelector("#header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Back to Top Button
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

  // Active Navigation Link
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#navbar ul li a");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

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

  // Career Path Toggle
  const envBtn = document.getElementById("env-btn");
  const hrBtn = document.getElementById("hr-btn");
  const envDesc = document.getElementById("env-desc");
  const hrDesc = document.getElementById("hr-desc");
  const envAbout = document.getElementById("env-about");
  const hrAbout = document.getElementById("hr-about");

  envBtn.addEventListener("click", function () {
    envBtn.classList.add("active");
    hrBtn.classList.remove("active");
    envDesc.classList.add("active");
    hrDesc.classList.remove("active");
    envAbout.classList.add("active");
    hrAbout.classList.remove("active");
  });

  hrBtn.addEventListener("click", function () {
    hrBtn.classList.add("active");
    envBtn.classList.remove("active");
    hrDesc.classList.add("active");
    envDesc.classList.remove("active");
    hrAbout.classList.add("active");
    envAbout.classList.remove("active");
  });

  // Resume Tabs
  const resumeTabs = document.querySelectorAll(".resume-tab");
  const resumeSections = document.querySelectorAll(".resume-section");

  resumeTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const target = this.getAttribute("data-target");

      resumeTabs.forEach((tab) => tab.classList.remove("active"));
      this.classList.add("active");

      resumeSections.forEach((section) => {
        section.classList.remove("active");
        if (section.getAttribute("id") === target) {
          section.classList.add("active");
        }
      });
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Simple validation
      if (!name || !email || !subject || !message) {
        formStatus.textContent = "Please fill in all fields.";
        formStatus.className = "form-status error";
        return;
      }

      // In a real application, you would send this data to a server
      // For this demo, we'll just show a success message
      formStatus.textContent =
        "Thank you! Your message has been sent successfully.";
      formStatus.className = "form-status success";

      // Reset form
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        formStatus.textContent = "";
        formStatus.className = "form-status";
      }, 5000);
    });
  }

  // Initialize the page with the first tab active
  if (resumeTabs.length > 0 && resumeSections.length > 0) {
    resumeTabs[0].classList.add("active");
    resumeSections[0].classList.add("active");
  }
});

// Form

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = new FormData(form);
  const action = form.getAttribute("action");

  try {
    const response = await fetch(action, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      status.textContent = "Message sent successfully!";
      status.style.color = "green";
      form.reset();
    } else {
      const resData = await response.json();
      if (resData.errors) {
        status.textContent = resData.errors.map((e) => e.message).join(", ");
      } else {
        status.textContent = "Oops! Something went wrong.";
      }
      status.style.color = "red";
    }
  } catch (error) {
    status.textContent = "Network error. Please try again later.";
    status.style.color = "red";
  }
});
