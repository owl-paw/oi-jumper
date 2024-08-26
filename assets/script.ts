const inputPid = document.getElementById("input-pid") as HTMLInputElement;
const inputPna = document.getElementById("input-pna") as HTMLInputElement;
const submitPid = document.getElementById("submit-pid") as HTMLButtonElement;
const submitPna = document.getElementById("submit-pna") as HTMLButtonElement;
const selectPid = document.getElementById("select-pid") as HTMLSelectElement;
const selectPna = document.getElementById("select-pna") as HTMLSelectElement;
const catchPhraseHash = "816280b1928a963b53a78bfe4aea8275a07972b0bc9dd05e65448e3a57cb8ae1";

async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

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

function concatenateFromId(jdg: string, txt: string) {
  if (jdg === "lg") {
    let baseUrl = "https://www.luogu.com.cn/problem/";
    if (txt[0] !== "P" && txt[0] !== "B") baseUrl = baseUrl + "P";
    return baseUrl + txt;
  }

  if (jdg === "lib") {
    const probId = txt[0] === "#" ? txt.substring(1) : txt;
    return `https://loj.ac/p/${probId}`;
  }

  if (jdg === "cf") {
    const match = probIdRule.cf.exec(txt) as RegExpExecArray;
    if (!match[3]) return `https://codeforces.com/problemset/problem/${match[1]}/${match[2]}`;
    return `https://codeforces.com/problemset/problem/${match[1]}/${match[2]}${match[3]}`;
  }

  if (jdg === "uoj") {
    const probId = txt[0] === "#" ? txt.substring(1) : txt;
    return `https://uoj.ac/problem/${probId}`;
  }

  if (jdg === "bz") {
    let baseUrl = "https://new.bzoj.org:88/p/";
    if (txt[0] !== "P") baseUrl = baseUrl + "P";
    return baseUrl + txt;
  }

  if (jdg === "pku") return `http://poj.org/problem?id=${txt}`;
  if (jdg === "hdu") return `https://acm.hdu.edu.cn/showproblem.php?pid=${txt}`;
  if (jdg === "vj") return `https://vjudge.net/problem/${txt}`;
  if (jdg === "at") return `https://www.luogu.com.cn/remoteJudgeRedirect/atcoder/${txt}`;
  if (jdg === "sp") return `https://www.spoj.com/problems/${txt}/`;
  if (jdg === "dm") return `https://dmoj.ca/problem/${txt}`;
  return "#";
}

function concatenateFromName(jdg: string, txt: string) {
  if (jdg === "lg") return `https://www.luogu.com.cn/problem/list?keyword=${txt}&type=B|P&page=1`;
  if (jdg === "lib") return `https://loj.ac/p?keyword=${txt}`;
  if (jdg === "bz") return `https://new.bzoj.org:88/p?q=${txt}`;
  if (jdg === "acw") return `https://www.acwing.com/problem/search/1/?search_content=${txt}`;
  if (jdg === "dm") return `https://dmoj.ca/problems/?search=${txt}`;
  if (jdg === "uoj") return `https://uoj.ac/problems?search=${txt}`;

  const lang = document.documentElement.lang;
  if (jdg === "cf") return `https://www.${lang === "zh" ? "bing" : "google"}.com/search?q=${txt}+site%3Acodeforces.com`;
  if (jdg === "at") return `https://www.${lang === "zh" ? "bing" : "google"}.com/search?q=${txt}+site%3Aatcoder.jp`;

  return "#";
}

export async function updateFromId() {
  const text = inputPid.value;

  if (!text) {
    inputPid.classList.remove("input-error");
    submitPid.classList.add("btn-disabled");
    submitPid.classList.remove("btn-active");
    submitPid.setAttribute("tabindex", "-1");
    submitPid.setAttribute("target", "_self");
    submitPid.setAttribute("href", "#");
    return;
  }

  let re = selectPid.value in probIdRule ? probIdRule[selectPid.value] : /\S*/;

  if ((await sha256(text)) === catchPhraseHash) {
    inputPid.classList.remove("input-error");
    submitPid.classList.add("btn-active");
    submitPid.classList.remove("btn-disabled");
    submitPid.setAttribute("tabindex", "0");

    submitPid.setAttribute("target", "_blank");
    if (document.documentElement.lang === "zh")
      submitPid.setAttribute("href", "https://www.bilibili.com/video/BV1GJ411x7h7");
    else submitPid.setAttribute("href", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    return;
  }

  if (re.test(text)) {
    inputPid.classList.remove("input-error");
    submitPid.classList.add("btn-active");
    submitPid.classList.remove("btn-disabled");
    submitPid.setAttribute("tabindex", "0");
    submitPid.setAttribute("target", "_blank");
    submitPid.setAttribute("href", concatenateFromId(selectPid.value, text));
  } else {
    inputPid.classList.add("input-error");
    submitPid.classList.add("btn-disabled");
    submitPid.classList.remove("btn-active");
    submitPid.setAttribute("tabindex", "-1");
    submitPid.setAttribute("target", "_self");
    submitPid.setAttribute("href", "#");
  }
}

export async function updateFromName() {
  const text = inputPna.value;

  if (!text) {
    submitPna.classList.add("btn-disabled");
    submitPna.classList.remove("btn-active");
    submitPna.setAttribute("tabindex", "-1");
    submitPna.setAttribute("target", "_self");
    submitPna.setAttribute("href", "#");
  } else {
    submitPna.classList.add("btn-active");
    submitPna.classList.remove("btn-disabled");
    submitPna.setAttribute("tabindex", "0");
    submitPna.setAttribute("target", "_blank");
    submitPna.setAttribute("href", concatenateFromName(selectPna.value, text));
  }
}

inputPid.addEventListener("keydown", (event) => event.key === "Enter" && submitPid.click());
inputPid.addEventListener("input", () => updateFromId());
selectPid.addEventListener("change", () => updateFromId());

inputPna.addEventListener("keydown", (event) => event.key === "Enter" && submitPna.click());
inputPna.addEventListener("input", () => updateFromName());
selectPna.addEventListener("change", () => updateFromName());
