var current_fs, next_fs, previous_fs;
var left, opacity, scale;
var animating = false;
console.log("login.js");
$(document).ready(function () {
  
  $("#login").click(function () {
    $.ajax({
      type: "POST",
      url: "/login_attempt",
      data: {
        username: $("[name='username']").val(),
        password: $("[name='password']").val(),
      },
      success: function (data) {
        console.log(data);
          if (data == "Seeker") {
              localStorage.setItem("username", $("[name='username']").val());
              localStorage.setItem("role", "Seeker");
          window.location.href = "/dashboard/seeker";
          } 
          else if (data == "Admin") {
              localStorage.setItem("username", $("[name='username']").val());
                localStorage.setItem("role", "Admin");
            window.location.href = "/dashboard/admin";
          }
          else if (data == "Moderator") {
              localStorage.setItem("username", $("[name='username']").val());
                localStorage.setItem("role", "Moderator");
            window.location.href = "/dashboard/moderator";
          }
          else if (data == "Collector") {
                localStorage.setItem("username", $("[name='username']").val());
                    localStorage.setItem("role", "Collector");
            window.location.href = "/dashboard/collector";
          }
        else {
            alert("Invalid credentials!");
          }
      },
    });
  });
  
});
