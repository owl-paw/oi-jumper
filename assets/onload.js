const cacheName = "i18n-cache-v1";

const languageFiles = {
  en: "./assets/en.json",
  zh: "./assets/zh.json",
};

function cacheLanguageFiles() {
  if ("caches" in window) {
    caches.open(cacheName).then((cache) => {
      Object.values(languageFiles).forEach((file) => {
        cache.add(file).catch((err) => {
          console.error(`Failed to cache ${file}: `, err);
        });
      });
    });
  }
}

function loadLanguage(lang) {
  document.documentElement.setAttribute("lang", lang);
  const url = languageFiles[lang];

  if ("caches" in window) {
    caches
      .match(url)
      .then((response) => {
        if (response) {
          return response.json();
        } else {
          return fetch(url).then((response) => {
            caches.open(cacheName).then((cache) => cache.put(url, response.clone()));
            return response.json();
          });
        }
      })
      .then((data) => {
        updatePageWithLanguageData(data);
        localStorage.setItem("preferredLanguage", lang);
        updateLanguageSwitcher(lang);
      })
      .catch((error) => {
        console.error("Error loading language data: ", error);
      });
  } else {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        updatePageWithLanguageData(data);
        localStorage.setItem("preferredLanguage", lang);
        updateLanguageSwitcher(lang);
      });
  }
}

function updateLanguageSwitcher(lang) {
  const selectedButton = document.getElementById(lang === "zh" ? "chn-btn" : "eng-btn");
  selectedButton.setAttribute("checked", "checked");
}

function updatePageWithLanguageData(data) {
  document.getElementById("input-pid").placeholder = data.prob_id.input;
  document.getElementById("submit-pid").innerHTML = data.prob_id.btn;
  document.getElementById("input-pna").placeholder = data.prob_name.input;
  document.getElementById("submit-pna").innerHTML = data.prob_name.btn;
  document.getElementById("github").innerHTML = data.settings.github;
  document.getElementById("sponsor").innerHTML = data.settings.sponsor;
  document.getElementById("system-scheme").setAttribute("aria-label", data.settings.auto);
  document.getElementById("light-scheme").setAttribute("aria-label", data.settings.light);
  document.getElementById("dark-scheme").setAttribute("aria-label", data.settings.dark);
  document.getElementById("more-info-toggler").innerHTML =
    document.getElementById("more-info").style.visibility === "hidden" ? data.settings.open : data.settings.collapse;
}

function initLanguage() {
  const savedLang = localStorage.getItem("preferredLanguage") || "zh";
  loadLanguage(savedLang);
}

window.onload = function () {
  initLanguage();
  cacheLanguageFiles();
};

const words = [
  "???",
  "time",
  "code",
  "love",
  "rage",
  "bugs",
  "faith",
  "atoms",
  "magic",
  "humor",
  "regret",
  "coffee",
  "dreams",
  "hatred",
  "science",
  "respect",
  "madness",
  "morality",
  "devotion",
  "stupidity",
  "sacrilege",
  "dedication",
  "randomness",
  "javascript",
  "[REDACTED]",
  "intelligence",
];

function randomizeWord() {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  document.getElementById("the-word").innerHTML = randomWord;
}

randomizeWord();

document.addEventListener("DOMContentLoaded", function () {
  const themeButtons = document.querySelectorAll(".theme-controller");

  function applyTheme(theme) {
    if (theme === "light") document.documentElement.setAttribute("data-theme", "light");
    else if (theme === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
  }

  function saveTheme(theme) {
    localStorage.setItem("theme", theme);
  }

  function loadIconColor() {
    const favicon = document.querySelector("link[rel='icon']");
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      favicon.setAttribute("href", "./assets/icon-dark.svg");
    else favicon.setAttribute("href", "./assets/icon.svg");
  }

  function handleSystemThemeChange() {
    const currentTheme = localStorage.getItem("theme") || "default";
    if (currentTheme === "default") {
      loadIconColor();
      applyTheme("default");
    }
  }

  const savedTheme = localStorage.getItem("theme") || "default";
  applyTheme(savedTheme);

  themeButtons.forEach((button) => {
    if (button.value === savedTheme) button.checked = true;

    button.addEventListener("change", function () {
      const selectedTheme = this.value;
      applyTheme(selectedTheme);
      saveTheme(selectedTheme);
    });
  });

  loadIconColor();

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleSystemThemeChange);
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", handleSystemThemeChange);
});
