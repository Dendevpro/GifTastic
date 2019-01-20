$(document).ready(function () {

    // Array of GIF topics
    var topicsArr = [
        "Wake Up",
        "Sleep Walk",
        "Caffeine",
        "Runnig Late",
        "Traffic Jam",
        "Work",
        "Mind Blowing",
        "Clock",
        "Relief",
        "Sleepy"
    ];
    // Hides some HTML content before clicking the Topic Buttons
    $("#content").hide();

    // Creates the given buttons
    function createBtns() {

        // Gets the DIV and empty it out so there is not repeated buttons
        $("#new-btn-div").empty();
        // loops through the Topics Array
        for (var i = 0; i < topicsArr.length; i++) {
            // then saves the buttons as variables 
            var button = $("<button class='btn btn-outline-light'>");
            // and add a class 'topic'
            button.addClass('topic');
            // adds the 'data-name' attribute
            button.attr('data-name', topicsArr[i]);
            // adds the text to each button
            button.text(topicsArr[i]);
            // then appends the buttons to the Buttons DIV
            $("#new-btn-div").append(button);
        };
    }
    // calls the create button function on page load
    createBtns();

    // creates the on click function for each given button
    $(".topic").on('click', function () {
        // shows HTML that was hidden on page load
        // that now will be displaying the animated gifs
        // and a 'Add Button' card
        $("#content").show();
        // calls the function tha disables the add topic button
        btnDisable();
    })

    // handles Add Topic Button event
    $("#add-topic-btn").on("click", function () {
        // grabs the user input
        var userInput = $("#new-search").val().trim();
        // that input is now added to the array
        topicsArr.push(userInput);
        // the createBtns function is called, which makes buttons for all topics plus the user input
        createBtns();
        // btnDisable();
    })

    // disable "Add Topic Button" event 
    // if user doesn't input a string
    function btnDisable() {
        // add disable attribute to the add button 
        $("#add-topic-btn").attr('disabled', true);
        $('input').keyup(function () {
            var disable = false;
            $('input:text').each(function () {
                if (userInput.val() == "") {
                    disable = true;
                }
            });
            $('#add-topic-btn').prop('disabled', disable);
        });
    }

    $("#new-search").on('click', function () {
        btnDisable();
    })



    // function to display gifs
    function displayGifs() {
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=O7VANCGJjD1pHekcDTo9KuawCmmE3sKD";

        // creates ajax call
        $.ajax({ url: queryURL, method: "GET" }).done(function (response) {
            console.log(response.data);
            // save results as a variable
            var results = response.data;
            // for loop goes through each gif and adds these variables
            for (var i = 0; i < results.length; i++) {
                // creates a generic div to hold the results and save as variable
                var gifDiv = $("<div class='renderGif'>");
                // save topic image as variable
                var topicGif = $("<img>");

                // adds the attributes from the response.data 
                // source
                topicGif.attr('src', results[i].images.fixed_height.url);
                // the animated data
                topicGif.attr('data-animate', results[i].images.fixed_height.url);
                // sets up to load on the animated state
                topicGif.attr('data-state', 'animate');
                // adds a class to the Gif image DIV
                topicGif.addClass('gif');
                // adds the "data-still" state to the Gif images
                // so the user can stop the on going animation 
                topicGif.attr('data-still', results[i].images.fixed_height_still.url);
                // shows the rating
                var rating = results[i].rating;
                var p = $('<p>').text('Rating: ' + rating);
                p.addClass('label')
                gifDiv.append(p)
                gifDiv.append(topicGif)
                // $("#rating-div").preppend(p);
                $("#display-div").prepend(gifDiv);
            }
        });
    }

    // function for changing gifs states from animated to still and back
    $(document).on('click', '.gif', function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        };
    });

    // function for displaying gifs
    $(document).on("click", ".topic", displayGifs);

})
