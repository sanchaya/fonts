$(document).ready(function() {
    $(".right-nav > *").click(clickedForRipple);
    $('.slide-menu .slide-menu-item li').click(clickedForRipple);

    //toggle of dark-light mode
    $('#dark-light-toggle').change(toggleDarkLight)

    $('.left-nav > :first-child').click(slideMenuClick)
    $('.slide-menu .header > :nth-child(2)').click(slideMenuClick)
    $('.slide-menu-baner .gap-filler').click(slideMenuClick)
})

function slideMenuClick(){
    const slide_menu = $('.slide-menu')
    if(slide_menu.hasClass('open')){
        slide_menu.removeClass('open')
        slide_menu.parent().removeClass('open')
        //slide_menu.siblings().css('flex-grow', '0')
        //slide_menu.parent().css('width', 'auto')
    }else{
        slide_menu.addClass('open')
        slide_menu.parent().addClass('open')
        //slide_menu.siblings().css('flex-grow', '1')
        //slide_menu.parents().css('width', '100%')
    }
}

function toggleDarkLight(){
    const has = $(this).parent().hasClass('dark')
    if(has){
        $(this).parent().removeClass('dark')
        $('body').removeClass('dark')

        // changing logo for light
        $('.app-icon').attr('src', 'img/app-icon-light.png')
    }else{
        $(this).parent().addClass('dark')
        $('body').addClass('dark')

        // changing logo for dark
        $('.app-icon').attr('src', 'img/app-icon-dark.png')
    }
}

function clickedForRipple(e) {

    // Remove any old one   
    $(".ripple").remove();

    // remove all active
    $(this).parent().children().removeClass('active')

    // add active class
    $(this).addClass('active')

    $('')
    // Setup
    var posX = $(this).offset().left,
        posY = $(this).offset().top,
        buttonWidth = $(this).width(),
        buttonHeight = $(this).height();

    // Add the element
    $(this).prepend("<span class='ripple'></span>");

    // Make it round!
    if (buttonWidth >= buttonHeight) {
        buttonHeight = buttonWidth;
    } else {
        buttonWidth = buttonHeight;
    }

    // Get the center of the element
    var x = e.pageX - posX - buttonWidth / 2;
    var y = e.pageY - posY - buttonHeight / 2;


    // Add the ripples CSS and start the animation
    $(".ripple").css({
        width: buttonWidth,
        height: buttonHeight,
        top: y + 'px',
        left: x + 'px'
    }).addClass("rippleEffect");
}