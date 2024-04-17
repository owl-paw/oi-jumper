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
