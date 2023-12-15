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
        window.location.href = "/make_story/" + prompt("Enter username");

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
            for (var i = 0; i < data.length; i++) {
                var row = `<tr>
                <td>${data[i]}</td>
                <td><button class="show_story" val='${data[i]}' name='${data[i]}'>View their story</button></td>
                <td><button class="send_approval" val='${data[i]}' name='${data[i]}'>Send for Approval</td>
                <td>${stati[i]}</td>
                <td></td>
                </tr>`;
                $("#table_head").append(row);
                
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
