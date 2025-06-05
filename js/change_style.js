const checkBtn = document.getElementById('check-5');
const body = document.body;

if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light-theme');
  checkBtn.checked = true;
}

checkBtn.addEventListener('change', () => {
  if (checkBtn.checked) {
      body.classList.add('light-theme');
      localStorage.setItem('theme', 'light'); // 保存使用者偏好
  } else {
      body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark'); // 保存使用者偏好
  }
})
