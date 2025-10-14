// public/redirect.js
(function() {
  var path = window.location.pathname;
  if (path === '/404.html') {
    window.location.href = '/';
  }
})();