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
    
        $('.font-para p').css({fontSize:this.value+'px'});
        $('#in-para-txt p').css({fontSize:this.value+'px'});
        $('.custom-card-cnt p').css({fontSize:this.value+'px'});
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


    set_initial_text()

   
   $('#type-text').keyup(function(){
       input_to_para(this)
   })
})

var set_initial_text = () =>{
    $('#type-text').val("ಪಠ್ಯವನ್ನು ಟೈಪ್ ಮಾಡಿ")
    input_to_para($('#type-text'))
    //addClassInput($(".field-wrapper input"))
    addClassInput($('#type-text'))
}

var input_to_para = (ele) =>{
    $('.font-para p').text($(ele).val())
    $('.custom-card-cnt p').text($(ele).val())
    $('#in-para-txt p').text($(ele).val())
}

var addClassInput = (ele) =>{
    var value = $.trim($(ele).val());
    if (value) {
        $(ele).closest(".field-wrapper").addClass("hasValue");
    } else {
        $(ele).closest(".field-wrapper").removeClass("hasValue");
    }
}

$(function () {

    $(".field-wrapper .field-placeholder").on("click", function () {
        $(this).closest(".field-wrapper").find("input").focus();
    });
    $(".field-wrapper input").on("keyup", function () {
        addClassInput(this)
    });

});

