const url = 'http://localhost:3000/movies';
const sampleText =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure dolor inreprehenderit in voluptate velit esse cillum dolore eu fugiat nullapariatur. Excepteur sint occaecat cupidatat non proident, sunt inculpa qui officia deserunt mollit anim id est laborum.';



async function fetchMovies() {
	const response = await fetch(url);
	const movies = await response.json();
	console.log(movies);
	movies.sort((a, b) => a.Genre.localeCompare(b.Genre));

	movies.forEach((movie) => {
		
        const col = document.createElement('div');
		col.classList.add('col-12', 'col-md-4');
		const row = document.getElementById('row');
		row.insertAdjacentElement('beforeend', col);

		const card = document.createElement('article');
		card.classList.add('card', 'zoom', 'text-center');
		col.append(card);

		const cardHeader = document.createElement('div');
		cardHeader.classList.add('card-header', 'text-capitalize', 'fs-3');
		card.append(cardHeader);

		const cardBody = document.createElement('div');
		cardBody.classList.add('card-body');
		card.append(cardBody);

		const cardTextOne = document.createElement('p');
		cardTextOne.classList.add('card-text', 'fs-5');
		cardBody.append(cardTextOne);

		const cardTextTwo = document.createElement('p');
		cardTextTwo.classList.add('card-text', 'fs-5');
		cardBody.append(cardTextTwo);

        const cardTextThree = document.createElement('p');
		cardTextThree.classList.add('card-text', 'fs-6');
		cardBody.append(cardTextThree);

		cardHeader.innerText = movie.Title;
		cardTextOne.innerText = 'Genre: ' + movie.Genre;
		cardTextTwo.innerText = 'Year: ' + movie.Year;
        // cardTextThree.innerText = sampleText
	});
	
}

fetchMovies();


movieForm.addEventListener("submit", handleSubmit)

function handleSubmit(e){
    e.preventDefault();
    
    const serverUserObject = {
        inputTitle: "",
        inputGenre: "",
        inputYear: "",
    }

    serverUserObject.inputTitle = movieForm.inputTitle.value;
    serverUserObject.inputGenre = movieForm.inputGenre.value;
    serverUserObject.inputYear = movieForm.inputYear.value;

    console.log(serverUserObject);

    const request = new Request(url,{
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(serverUserObject)
    });

    fetch(request).then(response => {
        console.log(response);
        movieForm.reset();
    })
}