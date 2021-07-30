$(document).ready(function(){

    dropdownHelper()
    hideAllConjuncts()
    showInitialConjuncts()
    clickActionOnDropdown()
    //dropdownOverHidden()

    $('#collapse-button').click(function(){
        $('#myNavbar').collapse('toggle')
   })


   // hover on font
   $('.rd-familypage').hover(onHover, onLeave)
})

function dropdownOverHidden(){
    $('.dropdown').on('show.bs.dropdown', function() {
        $('body').append($('.dropdown').css({
          position: 'absolute',
          left: $('.dropdown').offset().left,
          top: $('.dropdown').offset().top
        }).detach());
      });      
}

var dropdownHelper = () => {
    $('.dropdown-toggle').dropdown();
}

var hideAllConjuncts = () =>{
    $('.conjuncts-cnt').each(function(){
        $(this).prop('hidden',true)
    })
}

var showInitialConjuncts = () =>{
    $('#toggleFor0').prop('hidden',false)
}

var clickActionOnDropdown = () =>{
    $('.dropdown-menu li a').click(function(){
        $('.dropdown button').html($(this).text()+"  <span class='caret'></span>")
        let id = $(this).attr('for')
        hideAllConjuncts()
        $('#'+id).prop('hidden',false)
    })
}



/*----------------- hover of each font ---------------------- */

function onHover(){
    $(this).parent().css('box-shadow', '0px 4px 8px 0px rgba(0, 0, 0, 0.2)')
}

function onLeave(){
    $(this).parent().css('box-shadow', 'none')
}