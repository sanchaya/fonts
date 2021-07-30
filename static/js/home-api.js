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
    const ele = $('.font-text').first()
    const text = ele.text().trim().trim()
    const fontSize = ele.css('font-size')
    $('.font-text').text(text)
    $('.font-text').css('font-size', fontSize)
}

var appendCard = (res) => {
    let appender = ''
    $('#loading-gif').remove()
    for(let i=0;i<res.data.length;i++){
        // appender += "<div class='custom-card'><div class='hover-show'><a href='/family/"+res.data[i].link+"'>"+res.data[i].family+"</a></div><div class='custom-card-cnt'><h4><b>"+res.data[i].family+"</b></h4><hr><p style='font-family:"+res.data[i].font+",recursive;'>ಕನ್ನಡ ಒಂದು ಸುಂದರ ಭಾಷೆ. ನೀವು ಭಾಷೆಯ ಫಾಂಟ್ ಅನ್ನು ಬದಲಾಯಿಸಬಹುದು</p><hr><a role='button' class='btn btn-primary' href='/family/"+res.data[i].link+"'>Go</a></div></div>"
        appender += '<a href="/family/'+res.data[i].link+'"><div class="font"><div class="header"><h4 class="family-name">'+res.data[i].family+'</h4><span class="developer-name">Author Name</span><span class="n-styles">12 styles</span></div><div class="font-text" style="font-family:'+res.data[i].font+', recursive;">Almost before we know it, we had left the ground</div></div></a>'
    }
    if(!res.isLastPage)
        appender += "<div id='loading-gif'><img src='/img/loading.gif'/></div>"
    $('.fonts-cnt').append(appender)
    changeTextNFont()
    page += 1
}