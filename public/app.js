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
                               <h3>${show.title} Returns on ${show.returns}</h3><div id="button-update"><button class="button update" type="submit">Update</button><div id="button-delete"><button class="button delete" type="submit">Delete</button>
                               <p>${show.overview}</p>
                               <img src =${show.image} />               
                            </div>`;

                    

            $('.container').append(showTemplate);
			
        });
    });
}

    $('#AddButton').on('click', function(e) {
		console.log("BUTTON CONTAINER CLICKED");
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

	$('.container').on('click','.delete', function () {
		console.log('LOOK HERE!!!',`${showId}`);
		let showID = this._id;
		fetch(`http://localhost:8080/shows/${showID}`, {
			method: 'DELETE'
		})
		.then(res => {
			// console.log(res);
			if( res.status === 204) {
				listShows();
			}
		});
	});



 $(function() {
        listShows();
    });
});
