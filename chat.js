$(document).ready(function() {
    $("#chatform").on("submit", function(e) {
        e.preventDefault();
        let userInput = $("#userinput").val();
        $("#chatbox").append("<p>You: " + userInput + "</p>");

        $.ajax({
            url: 'YOUR_LAMBDA_ENDPOINT',
            type: 'post',
            data: JSON.stringify({ message: userInput }),
            contentType: 'application/json',
            success: function(data) {
                let botResponse = data.response;
                $("#chatbox").append("<p>Bot: " + botResponse + "</p>");
            },
            error: function() {
                $("#chatbox").append("<p>Error while getting response.</p>");
            }
        });

        $("#userinput").val('');
    });
});
