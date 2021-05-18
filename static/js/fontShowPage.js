$(document).ready(function(){
    console.log("document ready")
    ajaxToJson('')
    $('input.form-control').keyup(function(){
        let val = $(this).val()
        ajaxToJson(val)
    })
})

var ajaxToJson = (val) =>{
    $.ajax({  
        url:'/getFonts',  
        method:'get',  
        dataType:'json',  
        data:{'val':val},  
        success:function(response){  
            appendCard(response)
        },  
        error:function(response){  
            displayError()  
        }  
    }); 
}

var displayError = () =>{
    $('div.container.showPage').html("<h2 style='text-align:center;'> An error occured</h2>")
}

var appendCard = (res) => {
    let appender = ''
    for(let i=0;i<res.length;i++){
        appender += "<div class='custom-card'><div class='custom-card-cnt'><h4><b>"+res[i].font+"</b></h4><hr><p style='font-family:"+res[i].font+",recursive;'>ಕನ್ನಡ ಒಂದು ಸುಂದರ ಭಾಷೆ. ನೀವು ಭಾಷೆಯ ಫಾಂಟ್ ಅನ್ನು ಬದಲಾಯಿಸಬಹುದು</p><hr><a role='button' class='btn btn-primary' href='/fonts/"+res[i].name+"'>Go</a></div></div>"
    }
    $('div.container.showPage').html(appender)
}