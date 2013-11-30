$(document).ready(function() {
    
    var ianEmail=parseEmail();
    ianEmail.set();

    var toFlip=$('#toflip')
    var front=$('#front')
    var back=$('#back')

    var spinTime=500;

    var applyAnimation = function(now,fx) {
      if (fx.prop==='deg') {
          toFlip.css('-webkit-transform','rotateY('+fx.now+'deg)');
          toFlip.css('-moz-transform','rotateY('+fx.now+'deg)'); 
          toFlip.css('-ms-transform','rotateY('+fx.now+'deg)');
          toFlip.css('-o-transform','rotateY('+fx.now+'deg)');
          toFlip.css('transform','rotateY('+fx.now+'deg)');
      }
      else if (fx.prop==='height') {
            $('.card').css('height',fx.now+"px")
      }
      else {
            $('#toflip').css('top',fx.now+"px")
      }
    }

    var finishAnimation=function() {
        if (toFlip.hasClass("flipped")) {
            $({height:300,deg:90,top:95}).animate({
                    deg:0
                    , height:250
                    , top:120
                },
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
            $({height:300,deg:90,top:95}).animate({
                    deg:180
                    , height:250
                    , top:120
                },
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
        $({height:250,deg:0,top:120}).animate({
                height:300,
                deg:90,
                top:95
            },
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