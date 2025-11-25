
// fireeeeee
const container = document.querySelector('.fire-container');

function createFlame() {
    const flame = document.createElement('div');
    flame.classList.add('fire');

    // random horizontal position
    flame.style.left = Math.random() * window.innerWidth + 'px';
    // random size
    flame.style.height = (20 + Math.random() * 40) + 'px';
    flame.style.width = (2 + Math.random() * 4) + 'px';
    // random animation duration
    flame.style.animationDuration = (3 + Math.random() * 4) + 's';
    
    container.appendChild(flame);

    // remove flame after animation
    setTimeout(() => {
        flame.remove();
    }, 7000);
}

// create flames continuously
setInterval(createFlame, 200);


// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if(target){
      target.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile menu after click
    const navMenu = document.getElementById("navMenu");
    if(navMenu.classList.contains('show')) navMenu.classList.remove('show');
  });
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// ===== FADE-IN ON SCROLL =====
const fadeSections = document.querySelectorAll('.content-section');
const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
        }
    });
});
fadeSections.forEach(sec => obs.observe(sec));

// ===== ACTIVE LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu li a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});


// ======= VIDEO GALLERY (FULLY FIXED) =======
document.addEventListener('DOMContentLoaded', () => {
  const mainVideo = document.getElementById("mainVideo");
  const mainSource = mainVideo.querySelector("source"); // ← FIXED
  const items = document.querySelectorAll(".video-item");

  items.forEach(item => {
    item.addEventListener("click", () => {

      const newVideo = item.getAttribute("data-video");

      // Ensure the current video stops (prevents transparency bug)
      mainVideo.pause();

      // Fade out
      mainVideo.style.opacity = 0;

      setTimeout(() => {
        // Update the ONLY <source> tag
        mainSource.src = newVideo;

        // Reload and play
        mainVideo.load();
        mainVideo.play();

        // Fade back in
        mainVideo.style.opacity = 1;
      }, 250);

      // Update active thumbnail
      document.querySelector(".video-item.active")?.classList.remove("active");
      item.classList.add("active");
    });
  });
});
