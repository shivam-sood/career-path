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
  $("#add_row").click(function () {
    var prmpt = prompt("Enter username");
    if (prmpt == "" || prmpt == null)
    {
      alert("Please enter a username");
      return false;
      }
        window.location.href = "/make_story/" + prmpt;

    });
    $.ajax({
        type: "POST",
        url: "/get_stories",
        data: {
            username: "tes",
        
        },
        success: function (datas) {
            // console.log(stati);
            data = datas[0];
          stati = datas[1];
          reason_if_rejected = datas[2];
          for (var i = 0; i < reason_if_rejected.length; i++)
          {
            if (stati[i] == "Rejected")
              reason_if_rejected[i] = "Reason: " + reason_if_rejected[i];
            }
            for (var i = 0; i < data.length; i++) {
                var row = `<tr>
                <td>${data[i]}</td>
                <td><button class="show_story" val='${data[i]}' name='${data[i]}'>View their story</button></td>
                <td><button class="send_approval" val='${data[i]}' name='${data[i]}'>Send for Approval</td>
                <td>${stati[i]}</td>
                <td>${reason_if_rejected[i]}</td>
                </tr>`;
              $("#table_head").append(row);
              if (stati[i] != "Not sent")
              {
                console.log(data[i] + " disabled", stati[i]);
                $("[name='" + data[i] + "']").attr("disabled", true);
                $("[name='" + data[i] + "']"+".send_approval").css("background-color", "grey");
                }
                
            }
            
            
            
            $(".show_story").click(function () {
                console.log("show_story");
                x = $(this)[0].name;
                console.log($(this)[0].name);
                // window.location.href = "/show_story/" + x;
                window.open("/get_story/" + x);
            });
            $(".send_approval").click(function () {
                console.log($(this).closest("td").next().text());
                if ($(this).closest("td").next().text() == "Approved") {
                  alert("Already approved!");
                  return false;
                }
                if ($(this).closest("td").next().text() == "Sent") {
                  alert("Already sent");
                  return false;
              }
              if ($(this).closest("td").next().text() == "Rejected") {
                alert("Already rejected");
                return false;
            }
                $.ajax({
                    type: "POST",
                    url: "/send_approval/" + $(this)[0].name,
                    data: {
                        username: $(this)[0].name,
                    },
                    success: function (data) {
                        console.log(data);
                        location.reload();
                    },
                });
            });
        },
    });
});
