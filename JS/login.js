// login.js
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const validEmail = 'abc@mail.com';
    const validPassword = '12345';

    if (email === validEmail && password === validPassword) {
        sessionStorage.setItem('isLoggedIn', true);
    console.log(sessionStorage.getItem('isLoggedIn'));
    
    setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    } else {
      alert('Falsche Email oder Passwort!');
    }
  }