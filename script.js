document.querySelectorAll('.copy').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var el = document.getElementById(btn.getAttribute('data-target'));
    var text = el.textContent.trim();
    function selectIt() {
      var r = document.createRange();
      r.selectNodeContents(el);
      var s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
      btn.textContent = 'Selected';
    }
    try {
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'Copied';
      }, selectIt);
    } catch (e) { selectIt(); }
    setTimeout(function () { btn.textContent = 'Copy'; }, 1800);
  });
});

try {
  var links = {};
  document.querySelectorAll('.nav a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && links[e.target.id]) {
        Object.keys(links).forEach(function (k) { links[k].removeAttribute('aria-current'); });
        links[e.target.id].setAttribute('aria-current', 'true');
      }
    });
  }, { rootMargin: '-35% 0px -60% 0px' });
  Object.keys(links).forEach(function (id) {
    var s = document.getElementById(id);
    if (s) io.observe(s);
  });
} catch (e) {}
