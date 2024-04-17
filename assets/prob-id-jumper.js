const inputBox = document.getElementById('input-box-prob-id');
const submitButton = document.getElementById('submit-button');
const judgeSelector = document.getElementById('judge-selector-prob-id');

submitButton.addEventListener('click', function () {
  const inputValue = inputBox.value;
  if (!inputValue) {
    alert('Please enter a valid problem ID.');
    return;
  }

  if (inputValue === '114514') {
    window.location.href = 'https://www.bilibili.com/video/BV1GJ411x7h7/';
    return;
  }

  if (judgeSelector.value === 'lg') {
    const re = /^[BP]?\d{4,5}$/;
    if (re.test(inputValue)) {
      var baseUrl = 'https://www.luogu.com.cn/problem/'
      if (inputValue[0] !== 'P' && inputValue[0] !== 'B') baseUrl = baseUrl + 'P';
      window.open(baseUrl + inputValue, '_blank');
      return;
    }
  } else if (judgeSelector.value === 'lib') {
    const re = /^[#]?\d{1,5}$/
    if (re.test(inputValue)) {
      var probId = inputValue;
      if (inputValue[0] === '#') probId = inputValue.substring(1);
      window.open('https://loj.ac/p/' + probId, '_blank');
      return;
    }
  } else if (judgeSelector.value === 'cf') {
    const re = /^(\d{1,4})([a-zA-Z])$/;
    if (re.test(inputValue)) {
      const match = re.exec(inputValue);
      window.open('https://codeforces.com/problemset/problem/' + match[1] + '/' + match[2], '_blank');
      return;
    }
  } else if (judgeSelector.value === 'uoj') {
    const re = /^[#]?\d{1,3}$/;
    if (re.test(inputValue)) {
      var probId = inputValue;
      if (inputValue[0] === '#') probId = inputValue.substring(1);
      window.open('https://uoj.ac/problem/' + probId, '_blank');
      return;
    }
  } else if (judgeSelector.value === 'pku') {
    const re = /^[#]?\d{4}$/;
    if (re.test(inputValue)) {
      var probId = inputValue;
      window.open('http://poj.org/problem?id=' + probId, '_blank');
      return;
    }
  } else if (judgeSelector.value === 'hdu') {
    const re = /^[#]?\d{4}$/;
    if (re.test(inputValue)) {
      var probId = inputValue;
      window.open('https://acm.hdu.edu.cn/showproblem.php?pid=' + probId, '_blank');
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
