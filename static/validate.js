console.log("login.js");
$(document).ready(function () {
  if (localStorage.getItem("username")) {
    if (localStorage.getItem("role") == "Moderator") {
    } else
      window.location.href =
        "/dashboard/" + localStorage.getItem("role").toLowerCase();
  } else {
    window.location.href = "/";
  }
  
    $.ajax({
        type: "POST",
        url: "/get_sent_stories",
        data: {
            username: "tes",
        },
        success: function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var row = `<tr>
                <td>${data[i]}</td>
                <td><button class="show_story" val='${data[i]}' name='${data[i]}'>View Story</button></td>
                <td><button class="finally_approve" val='${data[i]}' name='${data[i]}'>Approve</td>
                <td><button class="finally_reject" val='${data[i]}' name='${data[i]}'>Deny</button></td>

                </tr>`;
                $("#table").append(row);
            }
            $(".show_story").click(function () {
              console.log("show_story");
              x = $(this)[0].name;
              console.log($(this)[0].name);
              // window.location.href = "/show_story/" + x;
              window.open("/get_story/" + x);
            });
            $(".finally_approve").click(function () {
              console.log("approve_data");
              x = $(this)[0].name;
              console.log($(this)[0].name);
              $.ajax({
                type: "POST",
                url: "/finally_approve",
                data: {
                  username: x,
                },
                success: function (data) {
                  location.reload();
                  // console.log(data);
                  // window.location.href = "/approve_data";
                },
              });
                
            });
            $(".finally_reject").click(function () {
              console.log("reject");
              x = $(this)[0].name;
              console.log($(this)[0].name);
              $.ajax({
                type: "POST",
                url: "/finally_reject",
                data: {
                  username: x,
                },
                success: function (data) {
                  location.reload();
                  console.log(data);
                  // window.location.href = "/approve_data";
                },
              });
            });
     
        }
    });
});
