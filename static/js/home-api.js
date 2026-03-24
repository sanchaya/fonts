var page = 1

var timer

$(document).ready(function(){

    ajaxToJson('')

    $('.search').keyup(function(){
        page = 1
        $('.fonts-cnt').html('').fadeIn()
        let val = $(this).val()
        ajaxToJson(val)
    })
    
})


$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
           const search = $('.search').val()
           ajaxToJson(search)
    }
});

var ajaxToJson = (val) =>{
    $.ajax({  
        url:'/getFonts',  
        method:'get',  
        dataType:'json',  
        data:{'val':val, 'page': page},  
        success:function(response){  
            appendCard(response)
        },  
        error:function(response){  
            displayError()  
        }  
    }); 
}

var displayError = () =>{
    $('.fonts-cnt').html("<h2 style='text-align:center;'> An error occured</h2>")
    $('.search').val("")
}

var changeTextNFont = () => {

    const typeBox = {
        Sentence: "ನಾವು ಅದನ್ನು ತಿಳಿದುಕೊಳ್ಳುವ ಮೊದಲು, ನಾವು ನೆಲವನ್ನು ತೊರೆದಿದ್ದೇವೆ.",
        Paragraph: "ಕೆಲವು ದೂರದ ಗೋಳದಲ್ಲಿ ಇಣುಕಿ ನೋಡುವುದರಿಂದ ನಮ್ಮ ಆಲೋಚನೆಗಳನ್ನು ಪವಿತ್ರ ಸಂಗೀತದ ಒತ್ತಡ, ಅಥವಾ ಉದಾತ್ತ ಚಿತ್ರ, ಅಥವಾ ಭವ್ಯ ಕವಿಗಳ ಹಾದಿಯಂತೆ ಬೆಳೆಸುವ ಶಕ್ತಿ ಇದೆ. ಇದು ಯಾವಾಗಲೂ ಒಂದು ಒಳ್ಳೆಯದನ್ನು ಮಾಡುತ್ತದೆ.",
        Alphabet: "abcdefghijklmnopqrstuvwxyz",
        Numerals: "0123456789"
    }

    const implementing = $('.toolbar-type-box .dropbtn-span').text().trim()
    if(Object.keys(typeBox).includes(implementing)){
        $('.toolbar-type-box .dropbtn-span').text(implementing)
        $('.font-text').text(typeBox[implementing])
    }else if(implementing == "Custom"){
        const value = $('#type').val()
        $('.font-text').text(value)
    }

    // font size
    const fontSize = $('.toolbar-slider-box input').val()
    $('.font-text').css('font-size', fontSize + "px")
}

var XofNFamily = (res) => {
    const text = res.showingFamily + " of " + res.totalFamily + " family"
    $('.customizer > :first-child').text(text)
}

var appendCard = (res) => {
    let appender = ''
    $('#loading-gif').remove()
    for(let i=0;i<res.data.length;i++){
        const author = res.data[i].author
        const foundry = res.data[i].foundry
        const licenseType = res.data[i].licenseType || 'Unknown'
        
        let authorInfo = ''
        if (author && author !== 'Unknown' && foundry && foundry !== 'Unknown') {
            authorInfo = '<span class="developer-name">' + author + ' • ' + foundry + '</span>'
        } else if (author && author !== 'Unknown') {
            authorInfo = '<span class="developer-name">' + author + '</span>'
        } else if (foundry && foundry !== 'Unknown') {
            authorInfo = '<span class="developer-name">' + foundry + '</span>'
        } else {
            authorInfo = '<span class="developer-name">Author Name</span>'
        }
        
        const licenseClass = licenseType === 'Open Source' ? 'license-open' : 'license-proprietary'
        const licenseLabel = licenseType === 'Open Source' ? 'Open Source' : 'Proprietary'
        
        appender += '<a href="/family/'+res.data[i].link+'"><div class="font"><div class="header"><h4 class="family-name">'+res.data[i].family+'</h4>'+authorInfo+'<span class="'+licenseClass+'">'+licenseLabel+'</span><span class="n-styles">'+res.data[i].styles+' styles</span></div><div class="font-text" style="font-family:&quot;'+res.data[i].font+'&quot;, recursive;">Almost before we know it, we had left the ground</div></div></a>'
    }
    if(!res.isLastPage)
        appender += "<div id='loading-gif'><img src='/img/loading.gif'/></div>"
    $('.fonts-cnt').append(appender)
    
    // font container ripple effect
    $('.fonts-cnt .font').click(clickedForRipple)

    changeTextNFont()
    XofNFamily(res)
    page += 1
}