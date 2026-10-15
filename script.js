/* Mide PhoneFix interactive features */
"use strict";

const repairServices = [
  { name: "Screen & display", keywords: ["screen", "display", "cracked", "touch"], guide: "₦8,000–₦45,000+" },
  { name: "Charging & battery", keywords: ["charging", "battery", "power", "port"], guide: "₦5,000–₦25,000+" },
  { name: "Software support", keywords: ["software", "update", "system", "error"], guide: "₦3,000–₦15,000+" },
  { name: "Speaker & microphone", keywords: ["speaker", "microphone", "sound", "audio"], guide: "₦4,000–₦18,000+" }
];

function setCurrentYear() {
  const yearElement = document.querySelector("#current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function setupMobileNavigation() {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-nav");

  if (!menuButton || !navigation) return;

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.innerHTML = isOpen ? 'Close <span aria-hidden="true">×</span>' : 'Menu <span aria-hidden="true">☰</span>';
  });
}

function setupServiceSearch() {
  const searchInput = document.querySelector("#service-search");
  const serviceCards = Array.from(document.querySelectorAll(".service-detail"));

  if (!searchInput || serviceCards.length === 0) return;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    serviceCards.forEach((card) => {
      const matches = card.textContent.toLowerCase().includes(query);
      card.hidden = !matches;
    });

    let emptyMessage = document.querySelector("#no-services-message");
    if (!emptyMessage) {
      emptyMessage = document.createElement("p");
      emptyMessage.id = "no-services-message";
      emptyMessage.className = "notice-box";
      emptyMessage.setAttribute("role", "status");
      emptyMessage.textContent = "No services match that search. Try a different word.";
      document.querySelector("#service-list").append(emptyMessage);
    }
    emptyMessage.hidden = serviceCards.some((card) => !card.hidden);
  });
}

function setupChooseServiceButtons() {
  const chooseButtons = document.querySelectorAll(".choose-service");
  const serviceSelect = document.querySelector("#repair-type");
  const repairForm = document.querySelector("#repair-form");

  chooseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!serviceSelect || !repairForm) return;

      const chosenService = button.dataset.service;
      const matchingOption = Array.from(serviceSelect.options).find((option) => option.value === chosenService || option.textContent === chosenService);

      if (matchingOption) {
        serviceSelect.value = matchingOption.value || matchingOption.textContent;
      }
      repairForm.scrollIntoView({ behavior: "smooth", block: "start" });
      serviceSelect.focus({ preventScroll: true });
    });
  });
}

function readSavedRequests() {
  try {
    return JSON.parse(localStorage.getItem("midePhoneFixRequests")) || [];
  } catch (error) {
    return [];
  }
}

function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
}

function setupRepairForm() {
  const form = document.querySelector("#repair-form");
  const message = document.querySelector("#repair-message");
  const savedNote = document.querySelector("#saved-request-note");

  if (!form || !message) return;

  const previousRequests = readSavedRequests();
  if (savedNote && previousRequests.length > 0) {
    savedNote.hidden = false;
    savedNote.textContent = `This browser has ${previousRequests.length} saved repair request${previousRequests.length === 1 ? "" : "s"}.`;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const request = {
      name: String(formData.get("name")).trim(),
      phone: String(formData.get("phone")).trim(),
      model: String(formData.get("model")).trim(),
      service: String(formData.get("service")),
      details: String(formData.get("details")).trim(),
      contact: String(formData.get("contact")),
      createdAt: new Date().toISOString()
    };

    if (request.details.length < 10) {
      message.className = "form-message error";
      message.textContent = "Please add a little more detail about the problem.";
      return;
    }

    const requests = readSavedRequests();
    requests.push(request);
    const saved = saveToLocalStorage("midePhoneFixRequests", requests);

    if (saved) {
      message.className = "form-message success";
      message.textContent = `Thanks, ${request.name}. Your repair request has been saved in this browser. This demo has not sent it to a shop.`;
      form.reset();
      if (savedNote) {
        savedNote.hidden = false;
        savedNote.textContent = `This browser has ${requests.length} saved repair request${requests.length === 1 ? "" : "s"}.`;
      }
    } else {
      message.className = "form-message error";
      message.textContent = "This browser could not save the request. Please check browser storage settings.";
    }
  });
}

function setupApprenticeshipForm() {
  const form = document.querySelector("#application-form");
  const message = document.querySelector("#application-message");

  if (!form || !message) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const applicant = {
      name: String(formData.get("name")).trim(),
      age: Number(formData.get("age")),
      phone: String(formData.get("phone")).trim(),
      experience: String(formData.get("experience")),
      goal: String(formData.get("goal")).trim(),
      createdAt: new Date().toISOString()
    };

    if (applicant.age < 14 || applicant.age > 80 || applicant.goal.length < 10) {
      message.className = "form-message error";
      message.textContent = "Please check your age and add more detail about your learning goal.";
      return;
    }

    let applications = [];
    try {
      applications = JSON.parse(localStorage.getItem("midePhoneFixApplications")) || [];
    } catch (error) {
      applications = [];
    }

    applications.push(applicant);
    const saved = saveToLocalStorage("midePhoneFixApplications", applications);

    if (saved) {
      message.className = "form-message success";
      message.textContent = `Thank you, ${applicant.name}. Your interest has been saved in this browser only. This demo has not sent an application to anyone.`;
      form.reset();
    } else {
      message.className = "form-message error";
      message.textContent = "Your interest could not be saved in this browser. Please check storage settings.";
    }
  });
}

function showServiceCountInConsole() {
  const serviceNames = repairServices.map((service) => service.name);
  const softwareServices = repairServices.filter((service) => service.keywords.includes("software"));
  repairServices.forEach((service) => {
    // This is a small demonstration of iterating through service objects.
    if (service.guide.length === 0) {
      console.warn(`No guide estimate has been added for ${service.name}.`);
    }
  });
  console.info(`Mide PhoneFix service guide loaded: ${serviceNames.join(", ")}.`);
  console.info(`Software-related categories: ${softwareServices.length}.`);
}

document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  setupMobileNavigation();
  setupServiceSearch();
  setupChooseServiceButtons();
  setupRepairForm();
  setupApprenticeshipForm();
  showServiceCountInConsole();
});
