var current_fs, next_fs, previous_fs;
var left, opacity, scale;
var animating = false;
console.log("register.js");
$(document).ready(function () {
    if (localStorage.getItem("username")) {
      if (localStorage.getItem("role") == "Seeker") {
        $.ajax({
          type: "POST",
          url: "/find/seeker",
          data: {
            username: localStorage.getItem("username"),
          },
          success: function (data) {
              console.log(data, "ts");
              if (data == "Error") {
                  alert("Error in finding data!");
                  window.location.href = "/";
                  return;
              }
              $("[name='username']").val(data.username);
                $("[name='pass']").val(data.password);
                $("[name='name']").val(data.name);
                $("[name='phone']").val(data.phone);
                $("[name='dob']").val(data.dob);
                $("[name='address']").val(data.current_location);
                $("[name='highest_edu']").val(data.highest_qualification);
                $("[name='status']").val(data.current_status);
            
          },
        });
      } else
        window.location.href =
          "/dashboard/" + localStorage.getItem("role").toLowerCase();
    } else {
      window.location.href = "/";
    }
  $(".next").click(function () {
    
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    next_fs.show();
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now, mx) {
          scale = 1 - (1 - now) * 0.2;
          left = now * 50 + "%";
          opacity = 1 - now;
          current_fs.css({
            transform: "scale(" + scale + ")",
            position: "absolute",
          });
          next_fs.css({ left: left, opacity: opacity });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        easing: "easeInOutBack",
      }
    );
  });
  $(".submit").click(function () {
    $.ajax({
      type: "POST",
      url: "/update/seeker",
      data: {
        username: $("[name='username']").val(),
        password: $("[name='pass']").val(),
        name: $("[name='name']").val(),
        phone: $("[name='phone']").val(),
        dob: $("[name='dob']").val(),
        address: $("[name='address']").val(),
        highest_qualification: $("[name='highest_edu']").val(),
        current_status: $("[name='status']").val(),
        current_location: $("[name='address']").val(),
      },
      success: function (data) {
        console.log(data);
          if (data == "Success") {
            alert("Profile updated successfully!");
          window.location.href = "/";
        } else {
          alert("Error in making changes!");
        }
      },
    });
  });
  $(".previous").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    previous_fs.show();
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now, mx) {
          scale = 0.8 + (1 - now) * 0.2;
          left = (1 - now) * 50 + "%";
          opacity = 1 - now;
          current_fs.css({ left: left });
          previous_fs.css({
            transform: "scale(" + scale + ")",
            opacity: opacity,
          });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        easing: "easeInOutBack",
      }
    );
  });
});
