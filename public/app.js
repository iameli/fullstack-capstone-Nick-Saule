$(document).ready(function() {
    const shows =[
        {
            'id': '1111111',
            'title': 'Game of Thrones.',
            'image': 'aaaaaa',
            'date': 'September 2017',
        },
        {
            'id': '2222222',
            'title': 'Stranger Things',
            'image': 'bbbbbbb',
            'date': 'October 2017'
        }    
    ];

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
                               <p>${shows[0].title}</p>               
                            </div>`;
            $('body').append(showTemplate);

        });
    });
    }

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