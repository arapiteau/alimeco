$(document).ready(function() {

    
    let productChoice = $('#productChoice');
    $(productChoice).on('keyup', function() {
        let researchTerm = $(this).val();
        console.log(researchTerm);
        $.ajax({
            url: 'productsearch.php',
            type: 'POST',
            data: 'researchTerm='+researchTerm,
            dataType: 'json',
            success: function(response) {
                console.log(response);
                console.log($(productChoice));
                $(productChoice).parent().parent().append('<div id="searchResults"></div>');
                let top = $(productChoice).offset().top,
                    left = $(productChoice).offset().left,
                    height = $(productChoice).height(),
                    width = $(productChoice).width();
                var boxTop = top + height,
                    boxLeft = left;

                $('#searchResults').css('position', 'absolute').css('top', boxTop).css('left', boxLeft).css('padding-top', '15px')
                    .css('background-color', 'white').css('border','1px black solid');
                $('#searchResults').empty();
                console.log($('#searchResults'));
                $('#searchResults').append('<ul id="searchResultsList"></ul>');
                let searchResultsList = $('#searchResultsList');
                for (i = 0; i < 7; i++) {
                    $('#searchResultsList').append('<li>'+response[i].nom+'</li>');
                }             
            }
        });
    });

});