$('#front').click(setEmail);

$('.flipper').click(flip)

var getEmail = setEmail()

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
    getemail();
};

function setEmail() {
    var requestStr = "http://randomword.setgetgo.com/get.php";

    $.ajax({
        type: "GET",
        url: requestStr,
        dataType: "jsonp",
        jsonpCallback: 'RandomWordComplete'
    });

    email_string=
};

function RandomWordComplete(data) {
    return (data.Word.slice(0,-2)+'@ianru.st');
};