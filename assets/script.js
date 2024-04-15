const inputBox = document.getElementById('input-box');
const submitButton = document.getElementById('submit-button');
const judgeSelector = document.getElementById('judge-selector');
const darkModeToggler = document.getElementById('dark-mode-toggler');

darkModeToggler.addEventListener('click', function () {
  document.body.classList.toggle('dark');
  const isDarkMode = document.body.classList.contains('dark');
  localStorage.setItem('darkModePreference', isDarkMode);
  if (isDarkMode) {
    darkModeToggler.textContent = 'Toggle Light Mode';
  } else {
    darkModeToggler.textContent = 'Toggle Dark Mode';
  }
});

function loadDarkModePreference() {
  const storedPreference = localStorage.getItem('darkModePreference');
  if (storedPreference === 'true') {
    document.body.classList.add('dark');
    darkModeToggler.textContent = 'Toggle Light Mode';
  } else {
    darkModeToggler.textContent = 'Toggle Dark Mode';
  }
}

loadDarkModePreference();

submitButton.addEventListener('click', function () {
  const inputValue = inputBox.value;
  if (!inputValue) {
    alert('Please enter a valid problem ID.');
    return;
  }

  if (judgeSelector.value === 'lg') {
    const re = /^[BP]?\d{4,5}$/;
    if (re.test(inputValue)) {
      var baseUrl = 'https://www.luogu.com.cn/problem/'
      if (inputValue[0] !== 'P' && inputValue[0] !== 'B') baseUrl = baseUrl + 'P';
      window.location.href = baseUrl + inputValue;
      return;
    }
  } else if (judgeSelector.value === 'lib') {
    const re = /^[#]?\d{1,5}$/
    if (re.test(inputValue)) {
      var probId = inputValue;
      if (inputValue[0] === '#') probId = inputValue.substring(1);
      window.location.href = 'https://loj.ac/p/' + probId;
      return;
    }
  } else if (judgeSelector.value === 'cf') {
    const re = /^(\d{1,4})([a-zA-Z])$/;
    if (re.test(inputValue)) {
      const match = re.exec(inputValue);
      window.location.href = 'https://codeforces.com/problemset/problem/' + match[1] + '/' + match[2];
      return;
    }
  }

  alert('Please enter a valid problem ID.');
});

inputBox.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    submitButton.click();
  }
});
