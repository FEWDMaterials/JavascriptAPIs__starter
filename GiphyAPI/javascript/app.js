const APP_KEY = "dc6zaTOxFJmzC";

// ?q=funny+cat&
const API_BASE = 'http://api.giphy.com/v1/gifs/search';
const API_ARG = 'api_key='+APP_KEY;

// $('.js-search').on('click', function() {})
document.querySelector('.js-search').addEventListener('click', function( e ) {
	const val = document.querySelector('.js-search-term').value;

	console.log( val );
	const apiEndpoint = API_BASE + '?q=' + val + '&' + API_ARG
	// http://api.giphy.com/v1/gifs/search ?q= [USER_INPUT]  & api_key=[APP_KEY]
	// -----------------------------------                     -----------------
	//			API_BASE 											API_ARG

	console.log( apiEndpoint );

	const request = new XMLHttpRequest();  
	request.open('GET', apiEndpoint, true);  
	request.onload = function(e) {  
		
		const searchResults = JSON.parse( e.currentTarget.response );
		var imagesArray = searchResults.data.map(function( currentImage ) {
			const { url, width, height } = currentImage.images.downsized_medium;

			return {
				url,
				width,
				height,
			};

			/*
			also a reasonable way to do this
			const returnable = currentImage.images.downsized_medium;
			console.log( returnable );

			const newObject = {
				url: returnable.url,
				width: returnable.width,
				height: returnable.height,
			};
			console.log( newObject );
			*/
		});
		displayData( imagesArray );
	} 
	request.send();
});

function displayData( data ) {
	const imageHolder = document.querySelector('.js-imageHolder');
	imageHolder.innerHTML = "";

	data.forEach(( currentImage ) => {
		const { url, width, height } = currentImage;

		const html = `
			<img src="${url}" height ="${ height }" width="${ width }">
		`;
		imageHolder.innerHTML += html;
	});

	/*
	data.forEach(function( currentImage ) {

	});
	*/	

	// const { url, width, height } = data[ 0 ];
	// const imageHolder = document.querySelector('.js-imageHolder');

	// const html = `
	// 	<img src="${url}" height ="${ height }" width="${ width }">
	// `;
	// imageHolder.innerHTML = html;
	
	// OLD WAY
	// const img = document.createElement('img');
	// img.setAttribute('src', url);
	// img.setAttribute('height', height);
	// img.setAttribute('width', width);

	// const imageHolder = document.querySelector('.js-imageHolder');
	// imageHolder.innerHTML = "";
	// imageHolder.appendChild( img );
}
