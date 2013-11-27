$(document).ready(runBehavior); 

$('#front').click(setEmail);

$('.flipper').click(flip)

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

    $.ajax({
        type: "GET",
        url: requestStr,
        dataType: "jsonp",
        jsonpCallback: 'RandomWordComplete'
    });
};

function RandomWordComplete(data) {
    $('#randomword').text(data.Word.replace(/(\r\n|\n|\r)/gm,""));
};