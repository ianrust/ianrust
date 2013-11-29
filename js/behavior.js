$(document).ready(function() {
    
    var ianEmail=parseEmail();
    ianEmail.set();

    var toFlip=$('#toflip')
    var front=$('#front')
    var back=$('#back')

    var spinTime=500;

    var applyAnimation = function(now,fx) {        
      toFlip.css('-webkit-transform','rotateY('+now+'deg)');
      toFlip.css('-moz-transform','rotateY('+now+'deg)'); 
      toFlip.css('-ms-transform','rotateY('+now+'deg)');
      toFlip.css('-o-transform','rotateY('+now+'deg)');
      toFlip.css('transform','rotateY('+now+'deg)');
    }

    var finishAnimation=function() {
        if (toFlip.hasClass("flipped")) {
            toFlip.animate({deg:0},
                {
                    step:applyAnimation,
                    duration:spinTime
                });
            back.css('z-index',1);
            front.css('z-index',2);
            toFlip.switchClass("flipped","notflipped");
            ianEmail.get();
        }
        else {
            toFlip.animate({deg:180},
                {
                    step:applyAnimation,
                    duration:spinTime
                });
            back.css('z-index',2);
            front.css('z-index',1);
            toFlip.switchClass("notflipped","flipped");
            ianEmail.set();   
        }
    }

    $('.flipButton').unbind('click').click(function() {
        console.log(toFlip.hasClass("flipped"))
        toFlip.animate({deg:90},
            {
                step:applyAnimation,
                complete:finishAnimation,
                duration:spinTime
            });
    });

}
); 



function parseEmail() {

    var requestStr = "http://randomword.setgetgo.com/get.php";
    var email="wat";

    function RandomWordComplete(data) {
        var email="mailto:"+data.Word.slice(0,-2)+"@ianru.st";
        return email
    };

    return  { 
        set: function() {$.ajax({
                type: "GET",
                url: requestStr,
                dataType: "jsonp",        
                success: function (data) {
                    email=RandomWordComplete(data);
                }   
            });
        },
        get: function() {
            $('#emailLink').attr('href',email)
        }
    }

}