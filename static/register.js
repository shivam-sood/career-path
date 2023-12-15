var current_fs, next_fs, previous_fs; 
var left, opacity, scale; 
var animating = false; 
console.log("register.js");
$(document).ready(function () {
    $(".next").click(function () {
        
        if ($("[name='pass']").val() != $("[name='cpass']").val()) {
            alert("Passwords do not match!");
            return false;
      }
      if ($("[name='pass']").val() == "") {
        alert("Password cannot be empty!");
        return false;
      }
      


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
      if ($("[name='username']").val() == "") {
        alert("Username cannot be empty!");
        return false;
      }

      if ($("[name='name']").val() == "") {
        alert("Name cannot be empty!");
        return false;
      }
      if ($("[name='phone']").val() == "") {
        alert("Phone number cannot be empty!");
        return false;
      }
      if ($("[name='dob']").val() == "") {
        alert("Date of birth cannot be empty!");
        return false;
      }
      if ($("[name='address']").val() == "") {
        alert("Address cannot be empty!");
        return false;
      }
      if ($("[name='highest_edu']").val() == "") {
        alert("Highest qualification cannot be empty!");
        return false;
      }
      if ($("[name='status']").val() == "") {
        alert("Current status cannot be empty!");
        return false;
      }
      if ($("[name='current_location']").val() == "") {
        alert("Current location cannot be empty!");
        return false;
      }
        $.ajax({
            type: "POST",
            url: "/register/seeker",
            data: {
                "username": $("[name='username']").val(),
                "password": $("[name='pass']").val(),
                "name": $("[name='name']").val(),
                "phone": $("[name='phone']").val(),
                "dob": $("[name='dob']").val(),
                "address": $("[name='address']").val(),
                "highest_qualification": $("[name='highest_edu']").val(),
                "current_status": $("[name='status']").val(),
                "current_location": $("[name='address']").val(),
            },
            success: function (data) {
                console.log(data);
                if (data == "Success") {
                    window.location.href = "/login";
                }
                else
                {
                 alert("Username already exists!");   
                    }
                    
            },
        }
        );
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

