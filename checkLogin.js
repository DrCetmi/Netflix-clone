function checkLogin() {
    // sessionStorage'de kullanıcının giriş durumunu kontrol et
    var isLoggedIn = sessionStorage.getItem('isLoggedIn');
  
    // Eğer kullanıcı giriş yapmışsa, index.html sayfasına yönlendir
    if (isLoggedIn) {
      window.location.href = 'index.html';
    }
  }
  
  // checkLogin fonksiyonunu sayfa yüklendiğinde çağır
  checkLogin();
  