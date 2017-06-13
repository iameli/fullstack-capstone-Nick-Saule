



// $(document).ready(function() {

//     const endpointURL = 'http://localhost:8080/shows';
/

//     currentShows=[];

// function getData(query) {
// 	return fetch(query)
// 		.then(response => {
// 			return response.json();
// 		})
// }

//     function listShows(){
//         getData(endpointURL)
//     .then(shows => {
//         $('body').html('');
//         shows.forEach(show => {
//             let showTemplate= `<div class="show-container"> 
//                                <p>${show.title} + ${show.date}</p>               
//                             </div>`;
//             $('body').append(showTemplate);

//         });
//     });
// }

// var show;
// var getShow = function(searchQuery) {
//     const query{
//         api_key:'40c781f4f82334b037fc6d9c33cc1c58',
//         query: ''
//     }
//     };

// function getFromApi('search', searchQuery)
//         .then( item => {
//             artist = item.artists.items[0];
              
//             let artistId = item.artists.items[0].id;
               
//             return  getFromApi(`artists/${artistId}/related-artists`);
//         })
//         .then( item =>{
            
//             console.log('before', artist);
            
//             artist.related = item.artists;
            
//             console.log('that', artist);



// function movieURL(searchQuery, position) {
//     getData(movieURL)
//     .then(shows =>{
        
//     })




//     $(function() {
//         listShows();
//     });

// });