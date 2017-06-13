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
        $('body').html('');
        shows.forEach(show => {
            let showTemplate= `<div class="show-container"> 
                               <h3>${show.title} Returns on ${show.returns}</h3>
                               <p>${show.overview}</p>
                               <img src =${show.image} />               
                            </div>`;
            $('body').append(showTemplate);

        });
    });
}


    $(function() {
        listShows();
    });

});