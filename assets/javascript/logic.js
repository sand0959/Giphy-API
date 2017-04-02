var buttonsHTML = '';
var tvShowArray = ['Friends', 'Breaking-Bad', 'Lost', 'Battlestar-Galactica', 'The-Sopranos', 'Pushing-Daisies', 'Halt-and-Catch-Fire', 'The-Walking-Dead', 'Game-of-Thrones', 'Supergirl', 'The-Flash', 'Arrow', 'Star-Wars-Rebels', 'Carnival', 'Legends-of-Tomorrow', 'Daredevil', 'Jessica-Jones', 'Iron-Fist', 'Luther', 'Parks-and-Rec', 'The-Office', 'Better-Call-Saul'];
var newTVshowValue;
var giphyKey = "dc6zaTOxFJmzC";
var searchShows;
var giphyHolder;
var giphyArray = [];

function generateButtons() {
    for (var i = 0; i < tvShowArray.length; i++) {
        buttonsHTML += "<button class='btn btn-lrg btn-primary tvshow-buttons' data-shows=" + tvShowArray[i] + ">" + tvShowArray[i] + "</button>";
    }
    $('#tvshows-buttons-container').html(buttonsHTML);
}

$(document).ready(function() {

    generateButtons();

    $('body').on('click', '#add-tvshow', function(event) {
        event.preventDefault();
        newTVshowValue = $('#tvshow-input').val();
        newButton = "<button class='btn btn-lrg btn-primary tvshow-buttons' data-shows=" + newTVshowValue + ">" + newTVshowValue + "</button>";
        $('#tvshows-buttons-container').append(newButton);
    });

    $('body').on('click', '.tvshow-buttons', function(event) {
        $('.giphy-div').empty();
        searchShows = $(this).attr('data-shows');
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchShows + "&limit=10" + "&api_key=dc6zaTOxFJmzC";
        console.log(queryURL);
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    console.log(response.data[i]);
                    $('.giphy-div').append("<div class='outer-container'><p class='title'>Rating: " + response.data[i].rating.toUpperCase() + "</p><div class='image-container'><img class='images-returned img-responsive center-block'" + "data-still='" + response.data[i].images.downsized_still.url + "'" + "data-animate='" + response.data[i].images.downsized.url + "'" + "data-state='still'" + "src='" + response.data[i].images.downsized_still.url + "'></div></div>");
                    giphyArray.push(response.data[i].images.downsized.url);
                }
            });

    });

    $('body').on('click', '.images-returned', function(event) {
        var state = $(this).attr('data-state');
        var ImageStill = $(this).attr('data-still');
        var ImageAnimate = $(this).attr('data-animate');
        if (state === 'still') {
            $(this).attr('src', ImageAnimate);
            $(this).attr('data-state', 'animate');
        }
        if (state !== "still") {
            $(this).attr('src', ImageStill);
            $(this).attr('data-state', 'still');
        }
    });

});
