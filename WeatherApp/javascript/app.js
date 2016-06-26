function sendWeatherRequest( location, callbackFunction ) {
	let apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&appid=fcc1f25c9ca1e6acf7be757cab5290db'
	
	const request = new XMLHttpRequest();
	request.open('GET', apiUrl, true);  
	request.onload = callbackFunction;
	request.send();
}

// sendWeatherRequest('oakland, usa', function(e) {
	
// 	const data = JSON.parse( e.currentTarget.response ).name;

// 	console.log( data );

// 	sendWeatherRequest('nyc,usa', function(e) {
// 		const data = JSON.parse( e.currentTarget.response ).name;

// 		console.log( data );

// 		sendWeatherRequest('hong kong,ca', function(e) {
// 			const data = JSON.parse( e.currentTarget.response ).name;

// 			console.log( data );
// 		});
// 	});

// });

/*
.then()
.catch()
*/


function promiseWeatherRequest( location ) {
	return new Promise(function( resolve, reject ) {
		let apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&appid=fcc1f25c9ca1e6acf7be757cab5290db'
	
		// const request = new XMLHttpRequest();
		// request.open('GET', apiUrl, true);  
		// request.onload = function(e) {
		// 	const data = JSON.parse( e.currentTarget.response ).name;
		// 	resolve(data);
		// }
		// request.send();
		sendWeatherRequest( location, function(e){
			const data = JSON.parse( e.currentTarget.response );
			resolve(data);
		});

	});	

}


promiseWeatherRequest('nyc, usa')
.then(function( theData ) {
	console.log('inside the then', theData);
	console.log( theData );
	const arr = [];
	arr.push( theData );

	return promiseWeatherRequest('oakland, usa').then(function(theSecondData){
		arr.push( theSecondData );
		return arr;
	});
})
.then(function(theArr){
	console.log(theArr);
});

// .then(function(theData){
// 	console.log('this is the 2nd one', theData);
// 	return promiseWeatherRequest('hong kong, ca');

// })
// .then(function(theData){
// 	console.log(theData);
// 	return 'ta da!'
// })
// .then(function(theData){
// 	console.log( theData ); 
// })


const nycPromise = promiseWeatherRequest('nyc,usa');
const oaklandPromise = promiseWeatherRequest('oakland,usa');
const orlandoPromise = promiseWeatherRequest('orlando,usa');
Promise.all([nycPromise, oaklandPromise, orlandoPromise]).then(function(all){
	console.log(all);
});








