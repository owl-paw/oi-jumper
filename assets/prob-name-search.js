const inputBoxProbName = document.getElementById('input-box-prob-name');
const submitButtonProbName = document.getElementById('submit-button-prob-name');
const listFrame = document.getElementById('prob-list-frame');

listFrame.textContent = '';

submitButtonProbName.addEventListener('click', function () {
  const inputValue = inputBoxProbName.value;
  const formedUrl = `https://www.luogu.com.cn/problem/list?keyword=${inputValue}&type=B|P&page=1&_contentOnly=1`
  fetch(formedUrl).then(Response => Response.json()).then(
    data => {
      const problemList = data.currentData.problems.result;
      console.log(problemList);

      if (problemList.length === 0) {
        listFrame.textContent = ''
        alert('Relevant problems not found.');
        return;
      }

      const resultCount = Math.min(problemList.length, 8);
      console.log(resultCount);

      listFrame.textContent = '';

      for (var i = 0; i < resultCount; ++i) {
        const newProb = document.createElement('div');
        const newLink = document.createElement('a');
        newLink.textContent = '[洛谷 ' + problemList[i].pid + '] —— ' + problemList[i].title;
        newLink.classList.add('prob-info');
        newLink.href = 'https://www.luogu.com.cn/problem/' + problemList[i].pid;
        newLink.target = '_blank';
        newProb.appendChild(newLink);
        listFrame.appendChild(newProb);
      }
    }
  )
});

inputBoxProbName.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    submitButtonProbName.click();
  }
});
