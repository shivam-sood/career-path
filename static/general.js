console.log("general.js");

$(document).ready(function () {

    console.log("general.js");

    $(".loader");
    {
        $(".loader").fadeOut("slow");
    }
    let elementsArray = document.querySelectorAll(".fade");
    window.addEventListener("scroll", fadeIn);
    function fadeIn() {
      for (var i = 0; i < elementsArray.length; i++) {
        var elem = elementsArray[i];
        var distInView =
          elem.getBoundingClientRect().top - window.innerHeight + 20;
        if (distInView < 0) {
          elem.classList.add("inView");
        } else {
          elem.classList.remove("inView");
        }
      }
    }
    fadeIn();


});
