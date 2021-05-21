$(document).ready(function(){
    
    function modifyOffset() {
        var el, newPoint, newPlace, offset, siblings, k;
        width    = this.offsetWidth;
        newPoint = (this.value - this.getAttribute("min")) / (this.getAttribute("max") - this.getAttribute("min"));
        offset   = -1;
        if (newPoint < 0) { newPlace = 0;  }
        else if (newPoint > 1) { newPlace = width; }
        else { newPlace = width * newPoint + offset; offset -= newPoint;}
        siblings = this.parentNode.childNodes;
        for (var i = 0; i < siblings.length; i++) {
            sibling = siblings[i];
            if (sibling.id == this.id) { k = true; }
            if ((k == true) && (sibling.nodeName == "OUTPUT")) {
                outputTag = sibling;
            }
        }
        outputTag.style.left       = newPlace + "px";
        outputTag.style.marginLeft = offset + "%";
        outputTag.innerHTML        = this.value+'px';
    
        $('#in-para-txt p').css({fontSize:this.value+'px'});
    }
    
    function modifyInputs() {
        
        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].getAttribute("type") == "range") {
                inputs[i].onchange = modifyOffset;
    
                if ("fireEvent" in inputs[i]) {
                    inputs[i].fireEvent("onchange");
                } else {
                    var evt = document.createEvent("HTMLEvents");
                    evt.initEvent("change", false, true);
                    inputs[i].dispatchEvent(evt);
                }
            }
        }
    }
    
    modifyInputs();

   $('#collapse-button').click(function(){
        $('#myNavbar').collapse('toggle')
   })

   $('#type-text').keyup(function(){
       $('#in-para-txt p').text($(this).val())
   })
})

$(function () {

    $(".field-wrapper .field-placeholder").on("click", function () {
        $(this).closest(".field-wrapper").find("input").focus();
    });
    $(".field-wrapper input").on("keyup", function () {
        var value = $.trim($(this).val());
        if (value) {
            $(this).closest(".field-wrapper").addClass("hasValue");
        } else {
            $(this).closest(".field-wrapper").removeClass("hasValue");
        }
    });

});

