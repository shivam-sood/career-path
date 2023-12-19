
console.log("login.js");
$(document).ready(function () {
  if (localStorage.getItem("username")) {
    window.location.href = "/dashboard/" + localStorage.getItem("role").toLowerCase();
  }
  
  $("[name='gform_submit']").click(function () {
    $("[name='gform_name']").val("")
    $("[name='gform_email']").val("")
    $("[name='gform_message']").val("")
    alert("Thank you for the feedback. We will get back to you soon.");
    return false;
  });
});
