document.addEventListener("DOMContentLoaded", function () {
 
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-links a");
 
  window.addEventListener("scroll", function () {
    var scrollY = window.scrollY;
    var current = "";
 
    sections.forEach(function (sec) {
      if (scrollY >= sec.offsetTop - 80) current = sec.id;
    });
 
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  });
 
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
 
  function getSubmissions() {
    try { return JSON.parse(localStorage.getItem("submissions")) || []; }
    catch (e) { return []; }
  }
 
  function saveSubmission(entry) {
    var all = getSubmissions();
    all.push(entry);
    localStorage.setItem("submissions", JSON.stringify(all));
  }
 
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
 
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
 
      if (!name || !email || !message) {
        status.textContent = "fill everything in :)";
        status.className = "error";
        return;
      }
 
      if (!email.includes("@") || !email.includes(".")) {
        status.textContent = "that email doesn't look right";
        status.className = "error";
        return;
      }
 
      saveSubmission({ name, email, message, timestamp: new Date().toISOString() });
 
      status.textContent = "got it, " + name + "! talk soon.";
      status.className = "";
      form.reset();
 
      setTimeout(function () { status.textContent = ""; }, 5000);
    });
  }
 
});
 