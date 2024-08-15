const theWord = document.getElementById("the-word");

function randomizeWord() {
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
  const randomWord = words[Math.floor(Math.random() * words.length)];
  theWord.textContent = randomWord;
}

randomizeWord();

document.addEventListener("DOMContentLoaded", function () {
  const themeButtons = document.querySelectorAll(".theme-controller");

  function applyTheme(theme) {
    if (theme === "light")
      document.documentElement.setAttribute("data-theme", "light");
    else if (theme === "dark")
      document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
  }

  function saveTheme(theme) {
    localStorage.setItem("theme", theme);
  }

  function loadIconColor() {
    const favicon = document.querySelector("link[rel='icon']");
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      favicon.setAttribute("href", "./assets/icon-dark.svg");
    } else {
      favicon.setAttribute("href", "./assets/icon.svg");
    }
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
    if (button.value === savedTheme) {
      button.checked = true;
    }

    button.addEventListener("change", function () {
      const selectedTheme = this.value;
      applyTheme(selectedTheme);
      saveTheme(selectedTheme);
    });
  });

  loadIconColor();

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", handleSystemThemeChange);
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", handleSystemThemeChange);
});

const inputBoxProbId = document.getElementById("input-box-prob-id");
const inputBoxProbName = document.getElementById("input-box-prob-name");
const submitButtonProbId = document.getElementById("submit-button-prob-id");
const submitButtonProbName = document.getElementById("submit-button-prob-name");

function openLink(url) {
  var popUp = window.open(url);
  if (!popUp || popUp.closed || typeof popUp.closed == "undefined") {
    const alert = document.getElementById("page-blocked-alert");
    alert.showModal();
  }
}

submitButtonProbId.addEventListener("click", function () {
  const judgeSelectorProbId = document.getElementById("judge-selector-prob-id");
  const inputValue = inputBoxProbId.value;

  if (!inputValue) {
    const alert = document.getElementById("invalid-id");
    alert.showModal();
    return;
  }

  if (inputValue === "114514") {
    window.location.href = "https://www.bilibili.com/video/BV1GJ411x7h7/";
    return;
  }

  if (judgeSelectorProbId.value === "lg") {
    const re = /^[BP]?\d{4,5}$/;
    if (re.test(inputValue)) {
      var baseUrl = "https://www.luogu.com.cn/problem/";
      if (inputValue[0] !== "P" && inputValue[0] !== "B")
        baseUrl = baseUrl + "P";
      openLink(baseUrl + inputValue);
      return;
    }
  } else if (judgeSelectorProbId.value === "lib") {
    const re = /^[#]?\d{1,5}$/;
    if (re.test(inputValue)) {
      var probId = inputValue;
      if (inputValue[0] === "#") probId = inputValue.substring(1);
      openLink("https://loj.ac/p/" + probId);
      return;
    }
  } else if (judgeSelectorProbId.value === "cf") {
    const re = /^(\d{1,4})([a-zA-Z])([1-9]?)$/;
    if (re.test(inputValue)) {
      const match = re.exec(inputValue);
      if (!match[3])
        openLink(
          "https://codeforces.com/problemset/problem/" +
            match[1] +
            "/" +
            match[2],
        );
      else
        openLink(
          "https://codeforces.com/problemset/problem/" +
            match[1] +
            "/" +
            match[2] +
            match[3],
        );
      return;
    }
  } else if (judgeSelectorProbId.value === "uoj") {
    const re = /^[#]?\d{1,3}$/;
    if (re.test(inputValue)) {
      var probId = inputValue;
      if (inputValue[0] === "#") probId = inputValue.substring(1);
      openLink("https://uoj.ac/problem/" + probId);
      return;
    }
  } else if (judgeSelectorProbId.value === "pku") {
    const re = /^[#]?\d{4}$/;
    if (re.test(inputValue)) {
      var probId = inputValue;
      openLink("http://poj.org/problem?id=" + probId);
      return;
    }
  } else if (judgeSelectorProbId.value === "hdu") {
    const re = /^[#]?\d{4}$/;
    if (re.test(inputValue)) {
      var probId = inputValue;
      openLink("https://acm.hdu.edu.cn/showproblem.php?pid=" + probId);
      return;
    }
  } else if (judgeSelectorProbId.value === "bz") {
    const re = /^[P]?\d{3,5}$/;
    if (re.test(inputValue)) {
      var baseUrl = "https://new.bzoj.org:88/p/";
      if (inputValue[0] !== "P") baseUrl = baseUrl + "P";
      openLink(baseUrl + inputValue);
      return;
    }
  } else if (judgeSelectorProbId.value === "sp") {
    openLink(`https://www.spoj.com/problems/${inputValue}/`);
    return;
  } else if (judgeSelectorProbId.value === "dm") {
    openLink(`https://dmoj.ca/problem/${inputValue}`);
    return;
  }

  const alert = document.getElementById("invalid-id");
  alert.showModal();
});

inputBoxProbId.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    submitButtonProbId.click();
  }
});

submitButtonProbName.addEventListener("click", function () {
  const judgeSelectorProbName = document.getElementById(
    "judge-selector-prob-name",
  );
  const inputValue = inputBoxProbName.value;

  if (!inputValue) {
    const alert = document.getElementById("invalid-term");
    alert.showModal();
    return;
  }

  var formedUrl;

  if (judgeSelectorProbName.value === "lg") {
    formedUrl = `https://www.luogu.com.cn/problem/list?keyword=${inputValue}&type=B|P&page=1`;
  } else if (judgeSelectorProbName.value === "lib") {
    formedUrl = `https://loj.ac/p?keyword=${inputValue}`;
  } else if (judgeSelectorProbName.value === "bz") {
    formedUrl = `https://new.bzoj.org:88/p?q=${inputValue}`;
  } else if (judgeSelectorProbName.value === "acw") {
    formedUrl = `https://www.acwing.com/problem/search/1/?search_content=${inputValue}`;
  } else if (judgeSelectorProbName.value === "dm") {
    formedUrl = `https://dmoj.ca/problems/?search=${inputValue}`;
  } else if (judgeSelectorProbName.value === "uoj") {
    formedUrl = `https://uoj.ac/problems?search=${inputValue}`;
  } else if (judgeSelectorProbName.value === "cf") {
    formedUrl = `https://www.google.com/search?q=${inputValue}+site%3Acodeforces.com`;
  } else if (judgeSelectorProbName.value === "at") {
    formedUrl = `https://www.google.com/search?q=${inputValue}+site%3Aatcoder.jp`;
  }

  openLink(formedUrl);
});

inputBoxProbName.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    submitButtonProbName.click();
  }
});

const moreInfoBtn = document.getElementById("more-info-toggler");
const moreInfo = document.getElementById("more-info");

function toggleMoreInfo() {
  if (moreInfo.style.visibility === "hidden") {
    moreInfo.style.visibility = "visible";
    moreInfoBtn.innerHTML = "Less Info";
  } else {
    moreInfo.style.visibility = "hidden";
    moreInfoBtn.innerHTML = "More Info";
  }
}
