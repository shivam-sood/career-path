console.log("login.js");
$(document).ready(function () {
  if (localStorage.getItem("username")) {
    if (localStorage.getItem("role") == "Collector") {
      
    } else
      window.location.href =
        "/dashboard/" + localStorage.getItem("role").toLowerCase();
  } else {
    window.location.href = "/";
  }

    var i = 0;
    $("#submit").click(function () {

        window.location.href = "/forms";
    });
    $("#add_row").click(function () {
        $.ajax({
          type: "POST",
          url: "/make_story/" + username,
          data: {
            username: username,
            timeline: $("#timeline").val(),
            stage_name: $("#stage_name").val(),
            stage_description: $("#description").val(),
          },
            success: function (data) {
                var tr = `<tr>
            <td>`+$('#timeline').val()+`</td>
            <td>`+$("#stage_name").val()+`</td>
            <td>`+$("#description").val()+`</td>
            <td><button class="btn btn-primary" id="add_row"></button></td>
        </tr>`;
                
                $("#table").append(tr);

                // $("#table").append(tr);
                $("#timeline").val("");
                $("#stage_name").val("");
                $("#description").val("");

          },
        });
        

    });
});
