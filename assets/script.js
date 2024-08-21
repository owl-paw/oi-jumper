function openLink(url) {
  var popUp = window.open(url);
  if (!popUp || popUp.closed || typeof popUp.closed == "undefined") {
    const alert = document.getElementById("pba");
    alert.showModal();
  }
}

const probIdRule = {
  lg: /^[BP]?\d{4,5}$/,
  lib: /^[#]?\d{1,5}$/,
  cf: /^(\d{1,4})([a-zA-Z])([1-9]?)$/,
  uoj: /^[#]?\d{1,3}$/,
  pku: /^[#]?\d{4}$/,
  hdu: /^[#]?\d{4}$/,
  bz: /^[P]?\d{3,5}$/,
};

const inputPid = document.getElementById("input-pid");
const inputPna = document.getElementById("input-pna");
const submitPid = document.getElementById("submit-pid");
const submitPna = document.getElementById("submit-pna");

submitPid.addEventListener("click", () => {
  const selectPid = document.getElementById("select-pid");
  const text = inputPid.value;

  if (!text) {
    const alert = document.getElementById("iid");
    alert.showModal();
    return;
  }

  if (text === "114514") {
    window.location.href = "https://www.bilibili.com/video/BV1GJ411x7h7/";
    return;
  }

  if (selectPid.value === "lg") {
    const re = probIdRule.lg;
    if (re.test(text)) {
      var baseUrl = "https://www.luogu.com.cn/problem/";
      if (text[0] !== "P" && text[0] !== "B") baseUrl = baseUrl + "P";
      openLink(baseUrl + text);
    }
  } else if (selectPid.value === "lib") {
    const re = probIdRule.lib;
    if (re.test(text)) {
      var probId = text;
      if (text[0] === "#") probId = text.substring(1);
      openLink("https://loj.ac/p/" + probId);
    }
  } else if (selectPid.value === "cf") {
    const re = probIdRule.cf;
    if (re.test(text)) {
      const match = re.exec(text);
      if (!match[3]) openLink("https://codeforces.com/problemset/problem/" + match[1] + "/" + match[2]);
      else openLink("https://codeforces.com/problemset/problem/" + match[1] + "/" + match[2] + match[3]);
    }
  } else if (selectPid.value === "uoj") {
    const re = probIdRule.uoj;
    if (re.test(text)) {
      var probId = text;
      if (text[0] === "#") probId = text.substring(1);
      openLink("https://uoj.ac/problem/" + probId);
    }
  } else if (selectPid.value === "pku") {
    const re = probIdRule.pku;
    if (re.test(text)) {
      var probId = text;
      openLink("http://poj.org/problem?id=" + probId);
    }
  } else if (selectPid.value === "hdu") {
    const re = probIdRule.hdu;
    if (re.test(text)) {
      var probId = text;
      openLink("https://acm.hdu.edu.cn/showproblem.php?pid=" + probId);
    }
  } else if (selectPid.value === "bz") {
    const re = probIdRule.bz;
    if (re.test(text)) {
      var baseUrl = "https://new.bzoj.org:88/p/";
      if (text[0] !== "P") baseUrl = baseUrl + "P";
      openLink(baseUrl + text);
    }
  } else if (selectPid.value === "sp") openLink(`https://www.spoj.com/problems/${text}/`);
  else if (selectPid.value === "dm") openLink(`https://dmoj.ca/problem/${text}`);
  else if (selectPid.value === "vj") openLink(`https://vjudge.net/problem/${text}`);
});

inputPid.addEventListener("keydown", (event) => {
  if (event.key === "Enter") submitPid.click();
});

inputPid.addEventListener("input", () => {
  const selectPid = document.getElementById("select-pid");
  const text = inputPid.value;

  if (!text) {
    inputPid.classList.remove("input-error");
    submitPid.classList.add("btn-disabled");
    submitPid.classList.remove("btn-active");
    submitPid.setAttribute("tabindex", "-1");
    return;
  }

  var reg = selectPid.value in probIdRule ? probIdRule[selectPid.value] : /[\s\S]*/;

  if (!text !== "114514" && !reg.test(text)) {
    inputPid.classList.add("input-error");
    submitPid.classList.add("btn-disabled");
    submitPid.classList.remove("btn-active");
    submitPid.setAttribute("tabindex", "-1");
  } else {
    inputPid.classList.remove("input-error");
    submitPid.classList.add("btn-active");
    submitPid.classList.remove("btn-disabled");
    submitPid.setAttribute("tabindex", "0");
  }
});

submitPna.addEventListener("click", () => {
  const selectPna = document.getElementById("select-pna");
  const text = inputPna.value;

  if (!text) {
    const alert = document.getElementById("itm");
    alert.showModal();
    return;
  }

  var tar;

  if (selectPna.value === "lg") tar = `https://www.luogu.com.cn/problem/list?keyword=${text}&type=B|P&page=1`;
  else if (selectPna.value === "lib") tar = `https://loj.ac/p?keyword=${text}`;
  else if (selectPna.value === "bz") tar = `https://new.bzoj.org:88/p?q=${text}`;
  else if (selectPna.value === "acw") tar = `https://www.acwing.com/problem/search/1/?search_content=${text}`;
  else if (selectPna.value === "dm") tar = `https://dmoj.ca/problems/?search=${text}`;
  else if (selectPna.value === "uoj") tar = `https://uoj.ac/problems?search=${text}`;
  else if (selectPna.value === "cf") tar = `https://www.google.com/search?q=${text}+site%3Acodeforces.com`;
  else if (selectPna.value === "at") tar = `https://www.google.com/search?q=${text}+site%3Aatcoder.jp`;

  openLink(tar);
});

inputPna.addEventListener("keydown", (event) => {
  if (event.key === "Enter") submitPna.click();
});

inputPna.addEventListener("input", () => {
  const inputValue = inputPna.value;

  if (!inputValue) {
    submitPna.classList.add("btn-disabled");
    submitPna.classList.remove("btn-active");
    submitPna.setAttribute("tabindex", "-1");
  } else {
    submitPna.classList.add("btn-active");
    submitPna.classList.remove("btn-disabled");
    submitPna.setAttribute("tabindex", "0");
  }
});

const moreInfoBtn = document.getElementById("more-info-toggler");
const moreInfo = document.getElementById("more-info");

function toggleMoreInfo() {
  if (moreInfo.style.visibility === "hidden") {
    moreInfo.style.visibility = "visible";
    moreInfoBtn.innerHTML = document.documentElement.lang === "en" ? "Hide Settings" : "收起设置";
  } else {
    moreInfo.style.visibility = "hidden";
    moreInfoBtn.innerHTML = document.documentElement.lang === "en" ? "Show Settings" : "展开设置";
  }
}
