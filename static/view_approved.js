console.log("login.js");
$(document).ready(function () {
  

  $.ajax({
    type: "POST",
    url: "/view_approved",
    data: {
      username: "tes",
    },
    success: function (data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        var row = `<tr>
                <td>${data[i]}</td>
                <td><button class="show_story" val='${data[i]}'>${data[i]}</button></td>
                

                </tr>`;
        $("#table").append(row);
      }
      $(".show_story").click(function () {
        console.log("show_story");
        x = $(this)[0].textContent;
        console.log($(this)[0].textContent);
        // window.location.href = "/show_story/" + x;
        window.open("/get_story/" + x);
      });
      
    },
  });
});
