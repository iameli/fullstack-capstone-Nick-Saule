$(document).ready(function() {

    const endpointURL = 'http://localhost:8080/shows';
    const showURL= 'https://www.themoviedb.org/documentation/api';

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
                               <p>${show.title} + ${show.date}</p>               
                            </div>`;
            $('body').append(showTemplate);

        });
    });
}

var show;
var getShow = function(searchQuery) {
    const query{
        api_key:'40c781f4f82334b037fc6d9c33cc1c58',
        query: ''
    }
    };

function getFromApi('search', searchQuery)
        .then( item => {
            artist = item.artists.items[0];
              
            let artistId = item.artists.items[0].id;
               
            return  getFromApi(`artists/${artistId}/related-artists`);
        })
        .then( item =>{
            
            console.log('before', artist);
            
            artist.related = item.artists;
            
            console.log('that', artist);



function movieURL(searchQuery, position) {
    getData(movieURL)
    .then(shows =>{
        
    })




    $(function() {
        listShows();
    });

// const showTemplate
// function getRecentStatusUpdates(callbackFn) {
//     // we use a `setTimeout` to make this asynchronous
//     // as it would be with a real AJAX call.
// 	setTimeout(function(){ callbackFn(MOCK_STATUS_UPDATES)}, 1);
// }

// this function stays the same when we connect
// to real API later
// function displayStatusUpdates(data) {
//     for (index in data.statusUpdates) {
// 	   $('body').append(
//         '<p>' + data.statusUpdates[index].title + 'and Date is:' + data.statusUpdates[index].date + '</p>');
//     }
// }

// // this function can stay the same even when we
// // are connecting to real API
// function getAndDisplayStatusUpdates() {
// 	getRecentStatusUpdates(displayStatusUpdates);
// }

// //  on page load do this
// $(function() {
// 	getAndDisplayStatusUpdates();
// })
});