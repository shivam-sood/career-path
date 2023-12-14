console.log("login.js");
$(document).ready(function () {
  if (localStorage.getItem("username")) {
    if (localStorage.getItem("role") == "Admin") {
      $("#name").html(
        "Hello Admin, " + localStorage.getItem("username") + ", How are you?"
      );
    } else
      window.location.href =
        "/dashboard/" + localStorage.getItem("role").toLowerCase();
  } else {
    window.location.href = "/";
  }
});
