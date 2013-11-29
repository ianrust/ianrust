$(document).ready(function() {
    
    var ianEmail=parseEmail();
    ianEmail.set();

    toFlip=$('#toflip')

    $('.flipButton').unbind('click').click(function() {
        console.log(toFlip.hasClass("flipped"))
        if (toFlip.hasClass("flipped")) {
            toFlip.switchClass("flipped","notflipped");
            ianEmail.get();
        }
        else {
            toFlip.switchClass("notflipped","flipped");
            ianEmail.set();   
        }
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