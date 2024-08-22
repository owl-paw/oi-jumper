const probIdRule: { [index: string]: RegExp } = {
  lg: /^[BP]?\d{4,5}$/,
  lib: /^[#]?\d{1,5}$/,
  cf: /^(\d{1,4})([a-zA-Z])([1-9]?)$/,
  uoj: /^[#]?\d{1,3}$/,
  pku: /^[#]?\d{4}$/,
  hdu: /^[#]?\d{4}$/,
  bz: /^[P]?\d{3,5}$/,
  vj: /^\S+-\S+$/,
  at: /^\S+_\S+$/,
};

const inputPid = document.getElementById("input-pid") as HTMLInputElement;
const inputPna = document.getElementById("input-pna") as HTMLInputElement;
const submitPid = document.getElementById("submit-pid") as HTMLButtonElement;
const submitPna = document.getElementById("submit-pna") as HTMLButtonElement;
const catchPhraseHash = "816280b1928a963b53a78bfe4aea8275a07972b0bc9dd05e65448e3a57cb8ae1";

async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

submitPid.addEventListener("click", async () => {
  const selectPid = document.getElementById("select-pid") as HTMLSelectElement;
  const text = inputPid.value;

  if ((await sha256(text)) === catchPhraseHash) {
    if (document.documentElement.lang === "zh") window.open("https://www.bilibili.com/video/BV1GJ411x7h7");
    else window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    return;
  }

  if (selectPid.value === "lg") {
    const re = probIdRule.lg;
    if (re.test(text)) {
      var baseUrl = "https://www.luogu.com.cn/problem/";
      if (text[0] !== "P" && text[0] !== "B") baseUrl = baseUrl + "P";
      window.open(baseUrl + text);
    }
  } else if (selectPid.value === "lib") {
    const re = probIdRule.lib;
    if (re.test(text)) {
      var probId = text;
      if (text[0] === "#") probId = text.substring(1);
      window.open(`https://loj.ac/p/${probId}`);
    }
  } else if (selectPid.value === "cf") {
    const re = probIdRule.cf;
    if (re.test(text)) {
      const match = re.exec(text) as RegExpExecArray;
      if (!match[3]) window.open(`https://codeforces.com/problemset/problem/${match[1]}/${match[2]}`);
      else window.open(`https://codeforces.com/problemset/problem/${match[1]}/${match[2]}${match[3]}`);
    }
  } else if (selectPid.value === "uoj") {
    const re = probIdRule.uoj;
    if (re.test(text)) {
      var probId = text;
      if (text[0] === "#") probId = text.substring(1);
      window.open(`https://uoj.ac/problem/${probId}`);
    }
  } else if (selectPid.value === "pku") {
    const re = probIdRule.pku;
    if (re.test(text)) window.open(`http://poj.org/problem?id=${text}`);
  } else if (selectPid.value === "hdu") {
    const re = probIdRule.hdu;
    if (re.test(text)) window.open(`https://acm.hdu.edu.cn/showproblem.php?pid=${text}`);
  } else if (selectPid.value === "bz") {
    const re = probIdRule.bz;
    if (re.test(text)) {
      var baseUrl = "https://new.bzoj.org:88/p/";
      if (text[0] !== "P") baseUrl = baseUrl + "P";
      window.open(baseUrl + text);
    }
  } else if (selectPid.value === "vj") {
    const re = probIdRule.vj;
    if (re.test(text)) window.open(`https://vjudge.net/problem/${text}`);
  } else if (selectPid.value === "at") {
    const re = probIdRule.at;
    if (re.test(text)) window.open(`https://www.luogu.com.cn/remoteJudgeRedirect/atcoder/${text}`);
  } else if (selectPid.value === "sp") {
    window.open(`https://www.spoj.com/problems/${text}/`);
  } else if (selectPid.value === "dm") {
    window.open(`https://dmoj.ca/problem/${text}`);
  }
});

inputPid.addEventListener("keydown", (event) => {
  if (event.key === "Enter") submitPid.click();
});

inputPid.addEventListener("input", async () => {
  const selectPid = document.getElementById("select-pid") as HTMLSelectElement;
  const text = inputPid.value;

  if (!text) {
    inputPid.classList.remove("input-error");
    submitPid.classList.add("btn-disabled");
    submitPid.classList.remove("btn-active");
    submitPid.setAttribute("tabindex", "-1");
    return;
  }

  var reg = selectPid.value in probIdRule ? probIdRule[selectPid.value] : /[\s\S]*/;

  if (!reg.test(text) && (await sha256(text)) !== catchPhraseHash) {
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
  const selectPna = document.getElementById("select-pna") as HTMLSelectElement;
  const text = inputPna.value;

  if (selectPna.value === "lg") window.open(`https://www.luogu.com.cn/problem/list?keyword=${text}&type=B|P&page=1`);
  else if (selectPna.value === "lib") window.open(`https://loj.ac/p?keyword=${text}`);
  else if (selectPna.value === "bz") window.open(`https://new.bzoj.org:88/p?q=${text}`);
  else if (selectPna.value === "acw") window.open(`https://www.acwing.com/problem/search/1/?search_content=${text}`);
  else if (selectPna.value === "dm") window.open(`https://dmoj.ca/problems/?search=${text}`);
  else if (selectPna.value === "uoj") window.open(`https://uoj.ac/problems?search=${text}`);
  else if (selectPna.value === "cf") {
    if (document.documentElement.lang === "zh")
      window.open(`https://www.bing.com/search?q=${text}+site%3Acodeforces.com`);
    else window.open(`https://www.google.com/search?q=${text}+site%3Acodeforces.com`);
  } else if (selectPna.value === "at") {
    if (document.documentElement.lang === "zh") window.open(`https://www.bing.com/search?q=${text}+site%3Aatcoder.jp`);
    else window.open(`https://www.google.com/search?q=${text}+site%3Aatcoder.jp`);
  }
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
