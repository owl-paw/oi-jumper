const cacheName = "i18n-cache-v1";

const languageFiles: { [index: string]: string } = {
  en: "./assets/en.json",
  zh: "./assets/zh.json",
};

function cacheLanguageFiles() {
  if ("caches" in window) {
    caches.open(cacheName).then((cache) => {
      Object.values(languageFiles).forEach((file: string) => {
        cache.add(file).catch((err) => {
          console.error(`Failed to cache ${file}: `, err);
        });
      });
    });
  }
}

function loadLanguage(lang: string) {
  document.documentElement.setAttribute("lang", lang);
  const url = languageFiles[lang];

  if ("caches" in window) {
    caches
      .match(url)
      .then(async (response) => {
        if (response) {
          return response.json();
        } else {
          const response_1 = await fetch(url);
          await caches.open(cacheName).then((cache) => cache.put(url, response_1.clone()));
          return await response_1.json();
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

function updateLanguageSwitcher(lang: string) {
  const selectedButton = document.getElementById(lang === "zh" ? "chn-btn" : "eng-btn") as HTMLButtonElement;
  selectedButton.setAttribute("checked", "checked");
}

import { updateFromId, updateFromName } from "./script.js";

function updatePageWithLanguageData(data: any) {
  updateFromId(), updateFromName();

  (document.getElementById("input-pid") as HTMLInputElement).placeholder = data.prob_id.input;
  (document.getElementById("submit-pid") as HTMLLinkElement).innerHTML = data.prob_id.btn;
  (document.getElementById("input-pna") as HTMLInputElement).placeholder = data.prob_name.input;
  (document.getElementById("submit-pna") as HTMLLinkElement).innerHTML = data.prob_name.btn;
  (document.getElementById("github") as HTMLLinkElement).innerHTML = data.settings.github;
  (document.getElementById("sponsor") as HTMLLinkElement).innerHTML = data.settings.sponsor;
  (document.getElementById("system-scheme") as HTMLInputElement).ariaLabel = data.settings.auto;
  (document.getElementById("light-scheme") as HTMLInputElement).ariaLabel = data.settings.light;
  (document.getElementById("dark-scheme") as HTMLInputElement).ariaLabel = data.settings.dark;
}

(document.getElementById("chn-btn") as HTMLInputElement).addEventListener("click", () => loadLanguage("zh"));
(document.getElementById("eng-btn") as HTMLInputElement).addEventListener("click", () => loadLanguage("en"));

function initLanguage() {
  const savedLang = localStorage.getItem("preferredLanguage") || "zh";
  loadLanguage(savedLang);
}

window.onload = () => (initLanguage(), cacheLanguageFiles());

const words: Array<string> = [
  "???",
  "css",
  "git",
  "svg",
  "time",
  "code",
  "love",
  "rage",
  "bugs",
  "html",
  "json",
  "music",
  "ideas",
  "faith",
  "atoms",
  "magic",
  "humor",
  "colors",
  "regret",
  "coffee",
  "dreams",
  "hatred",
  "vscode",
  "node.js",
  "science",
  "buttons",
  "respect",
  "madness",
  "quality",
  "daisyUI",
  "morality",
  "devotion",
  "tailwind",
  "stupidity",
  "sacrilege",
  "dark mode",
  "intensity",
  "community",
  "simplicity",
  "dedication",
  "randomness",
  "javascript",
  "efficiency",
  "melancholy",
  "[REDACTED]",
  "intelligence",
  "carelessness",
];

(document.getElementById("the-word") as HTMLSpanElement).innerHTML = words[Math.floor(Math.random() * words.length)];

document.addEventListener("DOMContentLoaded", function () {
  const themeButtons = document.querySelectorAll(".theme");

  function applyTheme(theme: string) {
    if (theme === "light") document.documentElement.setAttribute("data-theme", "light");
    else if (theme === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
  }

  function saveTheme(theme: string) {
    localStorage.setItem("theme", theme);
  }

  function loadIconColor() {
    const favicon = document.querySelector("link[rel='icon']");
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      favicon?.setAttribute("href", "./assets/icon-dark.svg");
    else favicon?.setAttribute("href", "./assets/icon.svg");
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
    if ((button as HTMLInputElement).value === savedTheme) (button as HTMLInputElement).checked = true;

    button.addEventListener("change", () => {
      const selectedTheme = (button as HTMLInputElement).value;
      applyTheme(selectedTheme);
      saveTheme(selectedTheme);
    });
  });

  loadIconColor();

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleSystemThemeChange);
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", handleSystemThemeChange);
});
