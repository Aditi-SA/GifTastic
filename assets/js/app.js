$(document).ready(function () {
    var topics = ["laugh", "cry", "confused", "love", "bored", "joy", "anger", "sadness", "surprise", "monkey"];

    //render function to display topics
    function renderButtons() {
        $("#Topic-gifbtn").empty();

        for (var i = 0; i < topics.length; i++) {
            var btn = $("<button>");
            btn.addClass("giphybtn btn btn-outline-primary btn-sm");
            btn.attr("data-name", topics[i]);
            btn.text(topics[i]);
            $("#Topic-gifbtn").append(btn);
        }
    };
    renderButtons();


    //Adding new Giphy topic    
    $("#Gifsubmit").on("click", function (event) {
        event.preventDefault();
        var topic = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=sNAsAw6hotDbmMczA3bvGK6asZB1nLRB&limit=15";  //dc6zaTOxFJmzC&limit=20"; 

        //Debug pupose only
        console.log(queryURL);
        console.log(topic);

        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            // After the data comes back from the API
            .then(function (response) {
                console.log(response);
                // Storing an array of results in the results variable
                var results = response.data;

                // Looping over 10 result item
                for (var i = 0; i < results.length; i++) {
                    // Creating a div with the class "item"
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
                        "data-animate": results[i].images.fixed_height.url
                    });

                    // Appending the TopicImage we created to the "gifDiv" div we created
                    gifDiv.append(TopicImage);
                    gifDIV.append(p);

                    $("#gif-view").prepend(gifdiv);
                    console.log(TopicImage);
                }
            })
            .catch(function (error) {
                console.log("error");
                alert("Grrr!! its broken!")
            });
    });

    //Set the gif 
    $(".gif").on("click", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


});