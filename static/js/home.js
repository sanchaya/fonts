$(document).ready(function () {
    //main funtion
    $(".right-nav > *").click(clickedForRipple);
    $('.slide-menu .slide-menu-item li').click(clickedForRipple);
    $('.dropbtn').click(clickedForDropdown)
    
    //clicked for font
    $('.fonts-cnt .font').click(clickedForRipple)

    //toggle of dark-light mode
    $('#dark-light-toggle').change(toggleDarkLight)

    $('.left-nav > :first-child').click(slideMenuClick)
    $('.slide-menu .header > :nth-child(2)').click(slideMenuClick)
    $('.slide-menu-baner .gap-filler').click(slideMenuClick)


    //checkbox click on icon for variable fonts
    $('.additional-toolbar > :last-child i').click(clickOnVariableFontCheck)

    intersectionObserverForSticky()

    customizingBarWork()



    /*----- javascript functionality to toolbar ----*/
    
    // search box
    search_box_functionality()

    // type box
    type_box_functionality()
    
    // font-size
    font_size_functionality()

    // refresh button
    $('.toolbar-refresh-box').click(refresh_btn)

    /*----- javascript functionality to additional toolbar ----- */

    // category
    additional_toolbar_category()
    
    // language
    additional_toolbar_language()

    // font properties
    additional_toolbar_font_properties()


    /*----- javascript fuctionality to cutomizing bar */
    // number of styles update
    $('.number-of-styles').text($('.number-of-styles').siblings('.font-prop-range').val())

    customizing_sort()


})

/* ADDITIONAL TOOLBAR FONT PROPERTIES */

function additional_toolbar_font_properties() {
    // category click event for make them active
    $('.additional-toolbar > :nth-child(3) .font-property').click(function(){
        if($('.font-prop-checkbox', this).prop('checked')){
            $(this).addClass('active')
            $('.font-prop-range', this).prop('disabled', false)
        }
        else{
            $(this).removeClass('active')
            $('.font-prop-range', this).prop('disabled', true)
        }

        add_modified_and_font_property_name()
    })

    // when reset button clicked all box check box should be checked
    
    $('.additional-toolbar > :nth-child(3) .reset-btn a').click(function(){
        let elements = $('.additional-toolbar > :nth-child(3) .font-property .font-prop-checkbox')
        elements.map(function(){
            $(this).prop('checked', false)

            // check box checked 
            $(this).parent().removeClass('active')

            // range disabling
            $(this).siblings('.font-prop-range').prop('disabled', true)
        })

        // update on the name of the dropdown
        add_modified_and_font_property_name()
    })

    // looking for move on slider (number of styles)
    $('#font-properties .dropdown-content > :first-child .font-prop-range').on('input', function(){
        let value = $(this).val()
        $('.number-of-styles').text(value)
    })

}

function add_modified_and_font_property_name(){
    // font-property item

    const ele = $('.additional-toolbar > :nth-child(3) .font-property.active')
    if(ele.length == 0){
        $('.additional-toolbar > :nth-child(3)').removeClass('modified')
        $('.additional-toolbar > :nth-child(3) .dropbtn-span').text('Font properties')
    }
    else{
        $('.additional-toolbar > :nth-child(3)').addClass('modified')
        let first_ele = ele.first().text().trim().replace(/[0-9]/g,'')
        let display = first_ele + " + " + (ele.length - 1)
        $('.additional-toolbar > :nth-child(3) .dropbtn-span').text(display.replace(' + 0', ''))
    }

    /** 
     *  FONT PROPERTY CHANGES
     * */ 
}

/* ADDITIONAL TOOLBAR FONT PROPERTIES END */




/*------- CUSTOMIZING BAR SORT */

function customizing_sort(){
    $('.customizer > :nth-child(2) > .dropdown > .dropdown-content > *').click(function(){    
        $(this).siblings().map(function(){
            $(this).removeClass('selected')
        })

        $(this).addClass('selected')
    })
}

/*------- CUSTOMIZING BAR SORT END */



/* ADDITIONAL TOOLBAR LANGUAGE */

function additional_toolbar_language(){
    $('#language > .dropdown-content > *').click(function(){
        if($(this).text().trim() == "All Languages"){
            $('#language').removeClass('modified')
            $('#language .dropbtn-span').text('Language')
        }else{
            $('#language').addClass('modified')
            $('#language .dropbtn-span').text($(this).text().trim())
        }
        
        $(this).siblings().map(function(){
            $(this).removeClass('selected')
        })

        $(this).addClass('selected')
    })
}

/* ADDITIONAL TOOLBAR LANGUAGE END */


/* ADDITIONAL TOOLBAR CATEGORY */

function additional_toolbar_category(){
    // category click event for make them active
    $('.additional-toolbar > :first-child .categories').click(function(){
        if($('input', this).prop('checked'))
            $(this).addClass('active')
        else
            $(this).removeClass('active')

        add_modified_and_category_name()
    })

    // when reset button clicked all box check box should be checked
    
    $('.additional-toolbar > :first-child .reset-btn a').click(function(){
        let elements = $('.additional-toolbar > :first-child .categories input')
        elements.map(function(){
            $(this).prop('checked', true)

            // check box checked 
            $(this).parent().addClass('active')
        })

        // update on the name of the dropdown
        add_modified_and_category_name()
    })
}

function add_modified_and_category_name(){
    // category item

    const ele = $('.additional-toolbar > :first-child .categories.active')
    if(ele.length == 0){
        $('.additional-toolbar > :first-child').addClass('modified')
        $('.additional-toolbar > :first-child .dropbtn-span').text('No categories selected')
    }
    else if(ele.length < 5){
        $('.additional-toolbar > :first-child').addClass('modified')
        let first_ele = ele.first().text().trim()
        let display = first_ele + " + " + (ele.length - 1)
        $('.additional-toolbar > :first-child .dropbtn-span').text(display.replace(' + 0', ''))
    }
    else if(ele.length == 5){
        $('.additional-toolbar > :first-child').removeClass('modified')
        $('.additional-toolbar > :first-child .dropbtn-span').text('Categories')
    }



    /** 
     *  CATEGORY CHANGES 
     * */ 
}

/* ADDITIONAL TOOLBAR CATEGORY END */



/* REFRESH BTN */

function refresh_btn(){
    // search box
    $('.toolbar-search-box .search').val('')
    $('.toolbar-search-box > :last-child').css('visibility', 'hidden')

    // typebox
    $('.toolbar-type-box .dropdown-content > :nth-child(2)').click()

    // font-size
    refreshSize(40)
}

/* REFRESH BTN END*/

/* FONT SIZE */

function font_size_functionality(){

    // load initial step
    refreshSize(40)

    // track slider event
    $('.toolbar-slider-box input').on('input', function(){refreshSize($(this).val())})

    // track event in font size dropdown
    $('.toolbar-slider-box .dropdown-content > *').click(function(){refreshSize($(this).text())})
}

function refreshSize(size){
    // checking size is between 8 to 300
    const sizeInt = parseInt(size)
    if(sizeInt > 7 && sizeInt < 301){
        // dropdown size changing
        $('.toolbar-slider-box .dropbtn-span').text(sizeInt + "px")

        // slider size changing
        $('.toolbar-slider-box input').val(sizeInt)

        // font-text size changing
        $('.font-text').css('font-size', sizeInt)
    }
}

/* FONT SIZE END */



/* TYPE BOX */
function type_box_functionality(){
    const typeBox = {
        Sentence: "ನಾವು ಅದನ್ನು ತಿಳಿದುಕೊಳ್ಳುವ ಮೊದಲು, ನಾವು ನೆಲವನ್ನು ತೊರೆದಿದ್ದೇವೆ.",
        Paragraph: "ಕೆಲವು ದೂರದ ಗೋಳದಲ್ಲಿ ಇಣುಕಿ ನೋಡುವುದರಿಂದ ನಮ್ಮ ಆಲೋಚನೆಗಳನ್ನು ಪವಿತ್ರ ಸಂಗೀತದ ಒತ್ತಡ, ಅಥವಾ ಉದಾತ್ತ ಚಿತ್ರ, ಅಥವಾ ಭವ್ಯ ಕವಿಗಳ ಹಾದಿಯಂತೆ ಬೆಳೆಸುವ ಶಕ್ತಿ ಇದೆ. ಇದು ಯಾವಾಗಲೂ ಒಂದು ಒಳ್ಳೆಯದನ್ನು ಮಾಡುತ್ತದೆ.",
        Alphabet: "abcdefghijklmnopqrstuvwxyz",
        Numerals: "0123456789"
    }
    
    // initial step to load sentence
    const implementing = "Sentence"
    $('.toolbar-type-box .dropbtn-span').text(implementing)
    $('.font-text').text(typeBox[implementing])

    // onclick action on respective key
    $('.toolbar-type-box .dropdown-content > *').click(function(){
        changeTypeboxText(this, typeBox)
    })

    // action if they type in input box
    $('.toolbar-type-box input').on("change paste keyup cut select input", changingTextInTypeBox)
}

var changingTextInTypeBox = () => {

    // check if input box is null
    if(!$(".toolbar-type-box input").val()){
        // select sentence 
        $('.toolbar-type-box .dropdown-content > :nth-child(2)').click() // sentence is second child

        return
    }

    // change dropdown value to custom
    $('.toolbar-type-box .dropbtn-span').text('Custom')

    // while typing sync the change in font showing box
    $('.font-text').text($(".toolbar-type-box input").val())  
} 

var changeTypeboxText = (ele, typeBox) => {
    const text = $(ele).text()

    // if text is custom, copy font text to input type box
    if(text == "Custom"){
        const input = $('.toolbar-type-box .dropbtn-span')
        const fontText = input.text()
        input.text("Custom")
        if(typeBox[fontText])
            $('.toolbar-type-box input').val(typeBox[fontText])
        
        $('.toolbar-type-box input').focus()
        return
    }

    if(typeBox[text]){
        $('.toolbar-type-box .dropbtn-span').text(text)
        $('.font-text').text(typeBox[text])
        $('.toolbar-type-box input').val("")
    }
}

/* TYPE BOX END */



/* SEARCH BOX */

function search_box_functionality() {
    // wrong button press to delete
    $('.toolbar-search-box > :last-child').click(function(){
        $(this).siblings('input').val('') // setting to null
        remove_wrong_btn()

        // focus on the search box
        $('.toolbar-search-box input').focus()
    })
    
    // hide wrong button on no data
    
    const box = $(".toolbar-search-box > input")
    // hiding function
    box.on("change paste keyup cut select input", remove_wrong_btn)
    
    // first time
    remove_wrong_btn() // while loading do for first to hide
}

function remove_wrong_btn(){
    const box = $(".toolbar-search-box > input")
    
    if(!box.val()){
        $('.toolbar-search-box > :last-child').css('visibility', 'hidden')
    }else{
        $('.toolbar-search-box > :last-child').css('visibility', 'visible')
    }  
}

/* SEARCH BOX END */





function customizingBarWork() {
    $('.customizing div > :first-child').click(function () {
        $(".customizing input[type='checkbox']").prop('checked', false)
        // fonts should be shown as grid
        $('.fonts-cnt').removeClass('list')
    })

    $('.customizing div > :last-child').click(function() {
        $(".customizing input[type='checkbox']").prop('checked', true)
        // fonts should be shown as list
        $('.fonts-cnt').addClass('list')
    })
}

function clickOnVariableFontCheck(){
    $('.additional-toolbar > :last-child input').prop('checked', false)
}

function intersectionObserverForSticky(){
    const sticky = document.querySelector("#sticky-toolbar")
    const observer = new IntersectionObserver( 
        ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
        {threshold: [1]}
      );
    observer.observe(sticky)
}

function caret_align(item){
    let icon_change = $('i',item)
    icon_change.attr('class', 'fas fa-caret-up')
    // let icon_changable = false
    // if(icon_change.attr('class') == "fas fa-caret-down")
    //     icon_changable = true

    // if(icon_changable)
    //     icon_change.attr('class', 'fas fa-caret-up')
    // else
    //     icon_change.attr('class', 'fas fa-caret-down')
}

function clickedForDropdown(e) {

    const dropdown_content = $(this).parent().children('.dropdown-content')
    const display = dropdown_content.css('display')

    // set all dropdown to close before dropdown
    reloadAllDropdown()

    if(display == 'none'){
        dropdown_content.css('display', 'block')
        caret_align(this)
    }

    // let display_set = 'none'
    // if(dropdown_content.css('display') == 'none')
    //     display_set = 'block'
    
    // dropdown_content.css('display', display_set)
    
    // Remove any old one   
    $(".ripple").remove();

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


// dropdown close

document.addEventListener('click', function(e){

    // console.log(e.target.className)
    const class_names = [
        'dropbtn',
        'fas fa-caret-up',
        'dropbtn-span',
        'categories-checkbox',
        'categories',
        'checkmark',
        'categories active',
        'reset-btn',
        'reset-btn-a',
        'font-property active',// font property
        'font-prop-checkbox',
        'font-prop-range',
        'font-property',
        'number-of-styles'
    ]

    if(!class_names.includes(e.target.className))
        reloadAllDropdown()


    // id of dropdown to be active when dropdown content opened
    const idOfElement = ["font-properties", "category-dropdown"]

    // dropdown active color when open
    idOfElement.forEach( (ele) => {
        const category = $('#'+ele+' .dropdown-content')
        if(category && category.css('display') == 'none')
            $('#'+ele).removeClass('active')
        else if(category && category.css('display') == 'block')
            $('#'+ele).addClass('active')
    })

})


// function to reload dropdown 
function reloadAllDropdown(){
    $('.dropdown-content').css('display', 'none')
    $('.dropbtn i').attr('class','fas fa-caret-down')
}