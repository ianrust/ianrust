$(document).ready(function() {
    
    var ianEmail=parseEmail();
    ianEmail.set();

    var toFlip=$('#toflip')
    var card=$('.card')
    var front=$('#front')
    var back=$('#back')
    var header=$('#header')

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
      else if (fx.prop==='top') {
            toFlip.css('top',fx.now+"px")
      }
      else if (fx.prop==='width') {
            console.log(fx.now);
            toFlip.css('width',fx.now+"px");
            card.css('width',fx.now+"px");
            card.css('margin-left',-fx.now/2+"px");
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
            front.css('z-index',3);
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
            back.css('z-index',3);
            front.css('z-index',1);
            toFlip.switchClass("notflipped","flipped");
            ianEmail.set();   
        }
    }

    var finishBanner = function() {
        console.log("gothere")
        $({deg:90}).animate({
            deg:0
        },
        {
              step: applyAnimation
            , duration:spinTime
        });
        back.css('z-index',1);
        back.css('display','none');
        front.css('z-index',1);
        front.css('display','none');
        header.css('z-index',3);
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

    $('.tobanner').unbind('click').click(function() {
        $({height:250,top:120,deg:180,width:450}).animate({
              height:50
            , deg:90
            , top:0
            , width: window.innerWidth
        },
        {
              step: applyAnimation
            , complete:finishBanner
            , duration:spinTime
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
