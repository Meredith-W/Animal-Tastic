(function() {

    
    var animals = ['cat', 'hamster', 'koala', 'puppies'];

    $(document.body).on('click', '.button-animal', function(){
        
        var animal = $(this).data('animal');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $('#gifs-area').empty();

        $.ajax({
                url: queryURL,   
                method: 'GET'    
            })
            .done(function(response) {  
              
                var results = response.data;
                
              
                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $('<div class="giphy-style">');
                    var p = $('<p>').text("Rating: " + results[i].rating.toUpperCase());
                    var animalImage = $('<img>');

                    animalImage.attr('src', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-still', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-animate', results[i].images.fixed_height.url);
                    animalImage.attr('data-state', 'still');
                    animalImage.addClass('click-animal');
                    animalDiv.append(p);
                    animalDiv.append(animalImage);

                    $('#gifs-area').append(animalDiv);
                   
                }

            });
    });

    $(document.body).on('click','.click-animal', function(){

        var state = $(this).attr('data-state'); 
    
        if ( state == 'still')  {  
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else { 
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }    
    });

    function renderButtons()    { 
         
        $('#buttons-area').empty();
        
        for (var i = 0; i < animals.length; i++){

            var a = $('<button>') 

            a.addClass('button-animal'); 
            a.attr('data-animal', animals[i]); 
            a.text(animals[i]); 

            $('#buttons-area').append(a); 
        }
    }

    // 

    $('#addAnimal').on('click', function(){

        var newAnimal = $('#animal-input').val().trim();

        if (animals.indexOf(newAnimal) > -1)    {
            alert("'" + newAnimal + "' already added. Please add a new animal!!");
        } else {
            animals.push(newAnimal);
            
            renderButtons();
        }

        $('#animal-input').val('');

        return false;
    })

    // 
    renderButtons();
    
})();