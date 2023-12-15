var current_fs, next_fs, previous_fs;
var left, opacity, scale;
var animating = false;
console.log("register.js");
$(document).ready(function () {
  
  $(".submit").click(function () {
    if ($("[name='name']").val() == "") {
      alert("Name cannot be empty!");
      return false;
    }
    if ($("[name='username']").val() == "") {
      alert("Username cannot be empty!");
      return false;
    }
    if ($("[name='password']").val() == "") {
      alert("Password cannot be empty!");
      return false;
    }

    if ($("[name='reason']").val() == "") {
      alert("Reason cannot be empty!");
      return false;
    }
    $.ajax({
      type: "POST",
      url: "/apply",
      data: {
        username: $("[name='username']").val(),
        password: $("[name='password']").val(),
        name: $("[name='name']").val(),
        reason: $("[name='reason']").val(),
        role: $('input[name="role"]:checked', '#msform').val(),
      },
      success: function (data) {
        console.log(data);
          if (data == "Success") {
            alert("You have successfully registered! We will get back to you soon!");
          window.location.href = "/";
        } else {
          alert("Someone with your username has already registered!");
        }
      },
    });
  });
  
});
