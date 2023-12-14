
console.log("login.js");
$(document).ready(function () {
  if (localStorage.getItem("username")) {
    window.location.href = "/dashboard/" + localStorage.getItem("role").toLowerCase();
  }
});
