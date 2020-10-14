import throttle from 'lodash/throttle';

const sections = document.querySelectorAll('[data-section]');
const navLinks = document.querySelectorAll('[data-nav-link]');

const links = [...navLinks].map((link) => {
  const rect = link.getBoundingClientRect();

  return {
    elem: link,
    href: link.getAttribute("href"),
    top: rect.top,
    bottom: rect.bottom,
    height: rect.height,
    currentSection: null,
    crossing: false,
    topScroll: () => rect.top + window.scrollY,
    bottomScroll: () => rect.bottom + window.scrollY,
  };
});
let boundaries = [...sections].map((section) => section.getBoundingClientRect().top + window.scrollY);

// Link is considered in a section if its top position is within section boundaries
const getCurrentSection = (topScroll) => {
  const index = boundaries.findIndex((b) => b > topScroll);

  return index !== -1 ? index - 1 : boundaries.length - 1;
};

const updateNav = () => {
  let crossed = false;

  links.forEach((link, index) => {
    const currSection = getCurrentSection(link.topScroll());

    if (link.topScroll() < boundaries[currSection + 1] && link.bottomScroll() > boundaries[currSection + 1]) {
      // Link is intersecting a boundary

      const percentCross = ((boundaries[currSection + 1] - link.topScroll()) / link.height) * 100;
      link.elem.setAttribute('data-cross', Math.round(percentCross));
      if (!link.crossing) {
        link.crossing = true;
      }
    } else if (link.crossing) {
      // Link is now no longer intersecting a boundary
      link.crossing = false;
      link.elem.removeAttribute('data-cross');
    }

    if (link.currentSection != currSection) {
      // Link has moved to a different section
      link.currentSection = currSection;
      navLinks[index].setAttribute('data-section', sections[currSection].id);
      
      if (links.every((link) => link.currentSection === links[0].currentSection)) {
        // Move active link when all nav links in new section
        document.querySelector('[data-nav-link].is-active').classList.remove('is-active');
        links[links[0].currentSection].elem.classList.add('is-active');
      }
    }
  });
}

const onResize = () => {
  boundaries = [...sections].map((section) => section.getBoundingClientRect().top + window.scrollY);
  updateNav();
};

const initNav = () => {
  window.addEventListener('scroll', throttle(updateNav, 50));
  window.addEventListener('resize', throttle(onResize, 200));
  onResize();
};

export default initNav;