$(document).ready(function() {

    const endpointURL = 'http://localhost:8080/shows';


    currentShows=[];

function getData(query) {
	return fetch(query)
		.then(response => {
			return response.json();
		})
}

    function listShows(){
        getData(endpointURL)
    .then(shows => {
        $('.container').html('');
        shows.forEach(show => {
            let showTemplate= `<div class="show-container"> 
                               <h3>${show.title} Returns on ${show.returns}</h3>
                               <p>${show.overview}</p>
                               <img src =${show.image} />               
                            </div>`;

                    

            $('.container').append(showTemplate);
         
        });
    });
}

    $('#button-container').on('click', function(e) {

		let newObject = {
			title: $('.title').val(),
			returns: $('.returns').val()
		};
		fetch(`http://localhost:8080/shows`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newObject)
			})
			.then(res => {
				listShows();
			})
	})

 $(function() {
        listShows();
    });
});
