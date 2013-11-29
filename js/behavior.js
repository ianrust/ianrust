$(document).ready(runBehavior); 

$('#front').click(setEmail);

$('.flipper').click(flip);

function flip() {
    if (this.id==="flipped") {
        this.id="notflipped";
    }
    else {
        this.id="flipped";        
    }

}

function runBehavior() {
    setEmail();
};

function setEmail() {


    var requestStr = "http://randomword.setgetgo.com/get.php";
    var email;
    $.ajax({
        type: "GET",
        url: requestStr,
        dataType: "jsonp",        
        success: function (data) {
            email=RandomWordComplete(data);
            console.log(email);
        }
    });
};

function RandomWordComplete(data) {
    var email="mailto:"+data.Word.replace(/(\r\n|\n|\r)/gm)+"@ianru.st";
    return email
};