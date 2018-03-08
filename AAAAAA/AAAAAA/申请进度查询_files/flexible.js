! function(e, t) {
  function i() {
    var t = r.getBoundingClientRect().width,
      i = t / 7.5;
    r.style.fontSize = i + "px", p.rem = e.rem = i
  }
  var a = e.document,
    r = a.documentElement,
    n = a.querySelector('meta[name="viewport"]'),
    o = a.querySelector('meta[name="flexible"]'),
    l = 0,
    m = 0,
    p = t.flexible || (t.flexible = {});
  if (n) {
    var d = n.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
    d && (m = parseFloat(d[1]), l = parseInt(1 / m))
  } else if (o) {
    var s = o.getAttribute("content");
    if (s) {
      var c = s.match(/initial\-dpr=([\d\.]+)/),
        f = s.match(/maximum\-dpr=([\d\.]+)/);
      c && (l = parseFloat(c[1]), m = parseFloat((1 / l).toFixed(2))), f && (l = parseFloat(f[1]), m = parseFloat((1 / l).toFixed(2)))
    }
  }
  if (!l && !m) {
    var u = (e.navigator.appVersion.match(/android/gi), e.navigator.appVersion.match(/iphone/gi)),
      h = (e.navigator.appVersion.match(/ipad/gi), e.devicePixelRatio);
    l = u ? h >= 3 && (!l || l >= 3) ? 2 : h >= 2 && (!l || l >= 2) ? 2 : 1 : 1, m = 1 / l
  }
  if (r.setAttribute("data-dpr", l), !n)
    if (n = a.createElement("meta"), n.setAttribute("name", "viewport"), n.setAttribute("content", "initial-scale=" + m + ", maximum-scale=" + m + ", minimum-scale=" + m + ", user-scalable=no"), r.firstElementChild) r.firstElementChild.appendChild(n);
    else {
      var v = a.createElement("div");
      v.appendChild(n), a.write(v.innerHTML)
    }
    "complete" === a.readyState ? a.body.style.fontSize = 14 * l + "px" : a.addEventListener("DOMContentLoaded", function(e) {
    a.body.style.fontSize = 14 * l + "px"
  }, !1), i(), p.dpr = e.dpr = l, p.refreshRem = i, p.rem2px = function(e) {
    var t = parseFloat(e) * this.rem;
    return "string" == typeof e && e.match(/rem$/) && (t += "px"), t
  }, p.px2rem = function(e) {
    var t = parseFloat(e) / this.rem;
    return "string" == typeof e && e.match(/px$/) && (t += "rem"), t
  }
}(window, window.lib || (window.lib = {}));