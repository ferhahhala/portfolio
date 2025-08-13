'use strict';

// helper
const elementToggleFunc = function (elem) { if (elem) elem.classList.toggle("active"); }

// SIDEBAR
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// TESTIMONIALS / MODAL
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal elements
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
  // lock/unlock scroll when modal opened
  document.body.style.overflow = modalContainer && modalContainer.classList.contains('active') ? 'hidden' : '';
}

// init modal click on testimonials
if (testimonialsItem.length > 0) {
  testimonialsItem.forEach(item => {
    item.addEventListener("click", function () {
      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title = this.querySelector("[data-testimonials-title]");
      const text = this.querySelector("[data-testimonials-text]");

      if (modalImg && avatar) {
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt || '';
      }
      if (modalTitle && title) modalTitle.innerHTML = title.innerHTML;
      if (modalText && text) modalText.innerHTML = text.innerHTML;

      testimonialsModalFunc();
    });
  });
}

if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

// close modal on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalContainer && modalContainer.classList.contains('active')) {
    testimonialsModalFunc();
  }
});

// CUSTOM SELECT & FILTER
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === "all") {
      item.classList.add("active");
    } else if (selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// select items click
if (selectItems.length > 0) {
  selectItems.forEach(si => {
    si.addEventListener("click", function () {
      const selectedValue = this.innerText.trim().toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText.trim();
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  });
}

// large-screen filter buttons
let lastClickedBtn = filterBtn && filterBtn.length > 0 ? filterBtn[0] : null;
if (filterBtn && filterBtn.length > 0) {
  filterBtn.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      const selectedValue = this.innerText.trim().toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText.trim();
      filterFunc(selectedValue);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });
}

// ensure initial filter state (show all by default)
filterFunc("all");

// CONTACT FORM validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (formInputs.length > 0 && form) {
  formInputs.forEach(input => {
    input.addEventListener("input", function () {
      if (form.checkValidity()) {
        if (formBtn) formBtn.removeAttribute("disabled");
      } else {
        if (formBtn) formBtn.setAttribute("disabled", "");
      }
    });
  });
}

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const mapping = {
  "a propre": "about",
  "resume": "resume",
  "portfolio": "portfolio",
  "certificats": "certificats",
  "contact": "contact"
};

if (navigationLinks.length > 0 && pages.length > 0) {
  navigationLinks.forEach(navLink => {
    navLink.addEventListener("click", () => {
      const target = mapping[navLink.innerText.trim().toLowerCase()];
      pages.forEach((page, i) => {
        if (page.dataset.page === target) {
          page.classList.add("active");
          navigationLinks[i].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          page.classList.remove("active");
          navigationLinks[i].classList.remove("active");
        }
      });
    });
  });
}

