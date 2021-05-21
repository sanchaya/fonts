$(document).ready(function(){
    hideAllConjuncts()
    showInitialConjuncts()
    clickActionOnDropdown()

    $('#collapse-button').click(function(){
        $('#myNavbar').collapse('toggle')
   })
})

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