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
    if ($("#stage_number").val() == "") {
      alert("Stage Number cannot be empty!");
      return false;
      }
        if ($("#grades").val() == "") {
            alert("grades  cannot be empty!");
            return false;
      }
        if ($("#Duration").val() == "") {
            alert("Duration cannot be empty!");
            return false;
      }
        if ($("#Income_source").val() == "") {
            alert("Income_source cannot be empty!");
            return false;
      }
        if ($("#Annual_income").val() == "") {
            alert("Annual_income cannot be empty!");
            return false;
      }
        if ($("#Family").val() == "") {
            alert("Family cannot be empty!");
            return false;
      }
        if ($("#guidance_source").val() == "") {
            alert("guidance_source cannot be empty!");
            return false;
      }
        if ($("#insights").val() == "") {
            alert("insights cannot be empty!");
            return false;
      }
        if ($("#next_stage").val() == "") {
            alert("next_stage cannot be empty!");
            return false;
      }
        if ($("#suggestion").val() == "") {
            alert("suggestion cannot be empty!");
            return false;
      }
      
    
    $.ajax({
      type: "POST",
      url: "/make_form/" + username,
      data: {
        username: username,
        
      },
      success: function (data) {
        var tr =
          `<tr>
            <td>` +
          $("#stage_number").val() +
          `</td>
            <td>` +
          $("#grades").val() +
          `</td>
            <td>` +
          $("#Duration").val() +
          `</td>
            <td>` +
          $("#Income_source").val() +
          `</td>
            <td>` +
          $("#Annual_income").val() +
          `</td>
            <td>` +
          $("#Family").val() +
          `</td>
            <td>` +
          $("#guidance_source").val() +
          `</td>
            <td>` +
          $("#insights").val() +
          `</td>
            <td>` +
          $("#next_stage").val() +
          `</td>
            <td>` +
          $("#suggestion").val() +
          `</td>
            <td>
          
        </tr>`;

        $("#table").append(tr);

        // $("#table").append(tr);
        $("#stage_number").val("");
          $("#grades").val("");
          $("#Duration").val("");
          $("#Income_source").val("");
          $("#Annual_income").val("");
          $("#Family").val("");
          $("#guidance_source").val("");
          $("#insights").val("");
          $("#next_stage").val("");
          $("#suggestion").val("");
        
      },
    });
  });
});
