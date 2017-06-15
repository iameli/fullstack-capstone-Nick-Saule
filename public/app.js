$(document).ready(function() {

    const endpointURL = '/shows';


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
                        
                               <h3>${show.title} returns ${show.returns}</h3> <input type="text" placeholder="new date" class="newReturns"><br><br>
							    <div id="buttonsinside"><button data-updateID="${show.id}" class="btn btn-success" type="button">Update</button>
								<button data-mongoID="${show.id}" class="btn btn-danger" type="button">Delete</button></div> <br>
                               <p>${show.overview}</p>
                               <img src =${show.image} />   <br><br><br> 
                                        
                            </div>`;

            $('.container').append(showTemplate);
			
			
        });
    });
}
 /////////////////////POST/////////////////////////////////////
    $('#AddButton').on('click', function(e) {
		console.log("BUTTON CONTAINER CLICKED");
		let newObject = {
			title: $('.title').val(),
			returns: $('.returns').val()
		};
		fetch(`/shows`, {
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
//////////////////////////DELETE//////////////////////////////

	$('.container').on('click','.btn-danger', function () {
		let showID = $(this).attr('data-mongoID')
		fetch(`/shows/${showID}`, {
			method: 'DELETE'
		})
		.then(res => {
			if( res.status === 204) {
				listShows();
			}
		});
	});


////////////////////UPDATE//////////////////////////////

 $('.container').on('click','.btn-success', function () {
    event.preventDefault();
        let showIDup = $(this).attr('data-updateID');
        let newObjectup= {
			id: showIDup,
            returns:$('.newReturns').val()
        }
		console.log(newObjectup);
        fetch(`/shows/${showIDup}`,{
            method:'PUT',
			headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify(newObjectup)
        })
        .then(res => {
            if (res.status === 201) {
                    listShows();
                    console.log('I sent the request');
                } else {
                    alert('something went wrong, try again')
                }
            })
        })


 $(function() {
        listShows();
    });


 });
