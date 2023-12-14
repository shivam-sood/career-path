console.log("login.js");
$(document).ready(function () {
  

  $.ajax({
    type: "POST",
    url: "/get_story/" + username,
    data: {
      username: username,
    },
      success: function (data) {
        console.log(data);
      for (var i = 0; i < data.length; i++) {
        var row = `<tr>
          <td>${data[i].username}</td>
          <td>${data[i].time_line}</td>
          <td>${data[i].stage_name}</td>
          <td>${data[i].stage_description}</td>
          
          </tr>`;
        $("#table").append(row);
        // console.log(row);
      }
      $("#approve").click(function () {
        console.log("approve_data");
        x = $(this).val();

        $.ajax({
          type: "POST",
          url: "/approve",
          data: {
            username: data[x].username,
            password: data[x].password,
            name: data[x].name,
            role: data[x].role,
          },
          success: function (data) {
            location.reload();
            // console.log(data);
            // window.location.href = "/approve_data";
          },
        });
      });

      $("#reject").click(function () {
        console.log("reject");
        x = $(this).val();

        $.ajax({
          type: "POST",
          url: "/reject_data",
          data: {
            username: data[x].username,
          },
          success: function (data) {
            location.reload();
            console.log(data);
            // window.location.href = "/approve_data";
          },
        });
      });
    },
  });
});
