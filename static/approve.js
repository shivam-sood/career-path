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
    
    $.ajax({
      type: "POST",
      url: "/get_data",
      data: {
        username: "tes",
        
      },
      success: function (data) {
        
        for (var i = 0; i < data.length; i++) {
          var row = `<tr>
          <td>${data[i].username}</td>
          <td>${data[i].password}</td>
          <td>${data[i].name}</td>
          <td>${data[i].role}</td>
          <td>${data[i].reason}</td>
          <td><button class="btn btn-primary" id="approve" value="${i}">Approve</button></td>
          <td><button class="btn btn-danger" id="reject" value="${i}">Reject</button></td>
          </tr>`;
            $("#table").append(row);
            console.log(row)
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
