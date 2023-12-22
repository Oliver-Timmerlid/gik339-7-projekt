//design 
//rullistan för genre inkl färg kodat
//storlek på card
//header och footer bild
//


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

		// const cardTextThree = document.createElement('p');
		// cardTextThree.classList.add('card-text', 'fs-6');
		// cardBody.append(cardTextThree);

		cardHeader.innerText = movie.Title;
		cardTextOne.innerText = 'Genre: ' + movie.Genre;
		cardTextTwo.innerText = 'Year: ' + movie.Year;
		// cardTextThree.innerText = sampleText

		const cardFooter = document.createElement('div');
		cardFooter.classList.add('card-footer');
		card.append(cardFooter);
		cardFooter.innerHTML = `<!-- Button trigger modal -->
		<button
			type="button"
			class="btn btn-outline-success"
			data-bs-toggle="modal"
            data-bs-target="#exampleModal"
			onClick="preFill(${movie.id})">
			Update
		</button>

		<button
			type="button"
			class="btn btn-outline-danger"
			onClick="deleteFunction(${movie.id})">
			Delete
		</button>`;
	});
}

fetchMovies();

movieForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
	e.preventDefault();

	const serverUserObject = {
		Title: '',
		Genre: '',
		Year: '',
	};

	serverUserObject.Title = movieForm.inputTitle.value;
	serverUserObject.Genre = movieForm.inputGenre.value;
	serverUserObject.Year = movieForm.inputYear.value;

	console.log(serverUserObject);

	const id = localStorage.getItem('currentId');
	if (id) {
		serverUserObject.id = id;
	}

	console.log(serverUserObject);

	const method = serverUserObject.id ? 'PUT' : 'POST';

	const request = new Request(url, {
		method: method,
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(serverUserObject),
	});

	if (request.method == 'PUT') {
		var exampleModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
			keyboard: false
		});
		exampleModal.hide();

		var changeModal = new bootstrap.Modal(document.getElementById('changeModal'), {
			keyboard: false
		});
		changeModalHeader.innerText = 'Successful update';
		changeModalBodyText.innerText = `id: ${id}`;
	
		changeModal.show();
	}
	
	console.log(request);

	fetch(request).then((response) => {
		console.log(response);
		localStorage.removeItem('currentId');
		movieForm.reset();
	});
}

// function deleteFunction(id) {
// 	console.log('delete', id);
// 	fetch(`${url}/${id}`, { method: 'DELETE' })
// 		.then((result) => {
// 			fetchData();
// 			return result;
// 		})
// 		.then((result) => {
// 			openModal();
// 		});
// }

function preFill(id) {
	fetch(`${url}/${id}`)
		.then((result) => result.json())
		.then((movie) => {
			console.log(movie);
			movieForm.inputTitle.value = movie.Title;
			movieForm.inputGenre.value = movie.Genre;
			movieForm.inputYear.value = movie.Year;

			localStorage.setItem('currentId', movie.id);
		});
}

function resetForm() {
	movieForm.reset();
}

// function openModal() {
// 	const deleteModal = document.getElementById('deleteModal');
// 	deleteModal.style.display = 'block';
// }

function deleteFunction(id) {
	console.log('delete', id);


	fetch(`${url}/${id}`, { method: 'DELETE' })
		.then((result) => {
			console.log('Filmen har tagits bort.');
			fetchData();
		})
		// .then((result) => {
		// 	fetchData();
		// 	return result;
		// })
		.catch((error) => {
			console.error('Ett fel uppstod:', error);
		});

	
	var changeModal = new bootstrap.Modal(document.getElementById('changeModal'), {
		keyboard: false
	});
	// const changeModalHeaderinnerText = document.getElementById('');
	changeModalHeader.innerText = 'Successful delete';
	changeModalBodyText.innerText = `id: ${id}`;
	
	changeModal.show();
}
