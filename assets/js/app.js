var DefaultTopics = ["laugh", "cry", "confused", "bored", "joy", "anger", "sadness", "surprise", "monkey", "moustache"];

//render function to shows topics as buttons
function renderButtons(topics) {

    for (var i = 0; i < topics.length; i++) {
        var newbtn = $("<button>");
        //add class
        newbtn.addClass("Giffybtn");
        newbtn.addClass("btn btn-primary");
        //add a data attribute
        newbtn.attr("data-name", topics[i]);
        // set button as text
        newbtn.text(topics[i]);
        //append the button 'newbtn' to GifTopics div
        $("#GifTopics").append(newbtn);
    }
};

//function that displys the giffs based on button topic clicked
function displaygifs(topic) {
    //Clear the current giff (if present) before displaying new ones
    $("#GifView").empty();

    var queryURL = "https://api.giphy.com/v1/gifs/search?&q=" + topic + "&api_key=sNAsAw6hotDbmMczA3bvGK6asZB1nLRB&limit=10";
    console.log(queryURL);

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .then(function (response) {
            console.log("AJAX response: ");
            console.log(response);
            
            // Storing an array of results in the results variable
            var results = response.data;
            console.log("AJAX results data: ")
            console.log(results);
            
            // Looping over 10 result item
            for (var i = 0; i < results.length; i++) {
                // Creating a div 
                var gifDIV = $("<div>");
                
                // Storing the result item's rating
                var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);

                // Creating an image tag
                var TopicImage = $("<img>");

                TopicImage.attr({
                    "src": results[i].images.fixed_height.url,
                    "data-state": "still",
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url,
                    height: "200px",
                    width: "300px"
                });

                // Appending the TopicImage we created to the "gifDiv" div we created
                gifDIV.append(p);
                gifDIV.append(TopicImage);
                console.log(TopicImage);
                //console.log(gifDIV);               
                $("#GifView").append(gifDIV);
            }
        })
        .catch(function (error) {
            console.log("error");
            alert("System down! code is broken!")
        });
}

$(document).ready(function () {
    renderButtons(DefaultTopics);

    //Adding new Giphy topic    
    $("#SubmitBtn").on("click", function (event) {
        event.preventDefault();
        var topic = $("#addGIF").val();
        console.log(topic);
        //renderButtons([topic]);
        var newbtn = $("<button>");
        //add class
        newbtn.addClass("Giffybtn btn btn-primary");
        //add a data attribute
        newbtn.attr("data-name", topic);
        // set button as text
        newbtn.text(topic);
        //append the button 'newbtn' to GifTopics div
        $("#GifTopics").append(newbtn);
    });

    //$(".Giffybtn").on("click", ".button" ,function (event) {
    $(".DefTopics").on("click", ".Giffybtn", function (event) {
        event.preventDefault();
        //$("#GifView").empty();
        var topic = $(this).attr("data-name");
        console.log("Topic: " + topic)
        displaygifs(topic);
    });
});