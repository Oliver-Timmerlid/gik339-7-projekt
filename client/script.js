
const url = 'http://localhost:3000/movies';

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
		card.classList.add(
			'card',
			'zoom',
			'text-center',
			'text-nowrap',
			'overflow-hidden'
		);
		col.append(card);

		const cardHeader = document.createElement('div');
		cardHeader.classList.add('card-header', 'text-capitalize', 'fs-3');
		card.append(cardHeader);

		const cardBody = document.createElement('div');
		cardBody.classList.add('card-body', 'bg-gradient');
		card.append(cardBody);

		const cardTextOne = document.createElement('p');
		cardTextOne.classList.add('card-text', 'fs-5');
		cardBody.append(cardTextOne);

		const cardTextTwo = document.createElement('p');
		cardTextTwo.classList.add('card-text', 'fs-5');
		cardBody.append(cardTextTwo);

		cardHeader.innerText = movie.Title;
		cardTextOne.innerText = 'Genre: ' + movie.Genre;
		cardTextTwo.innerText = 'Year: ' + movie.Year;

		const cardFooter = document.createElement('div');
		cardFooter.classList.add('card-footer');
		card.append(cardFooter);
		cardFooter.innerHTML = `
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

		switch (movie.Genre) {
			case 'Action':
				cardBody.classList.add('bg-danger');
				break;
			case 'Comedy':
				cardBody.classList.add('bg-success-subtle');
				break;
			case 'Drama':
				cardBody.classList.add('bg-primary-subtle');
				break;
			case 'Romance':
				cardBody.classList.add('bg-danger-subtle');
				break;
			case 'Animation':
				cardBody.classList.add('bg-info');
				break;
			case 'Adventure':
				cardBody.classList.add('bg-secondary-subtle');
				break;
			case 'ScienceFiction':
				cardBody.classList.add('bg-info-subtle');
				break;
			case 'Documentary':
				cardBody.classList.add('bg-warning');
				break;
			case 'Thriller':
				cardBody.classList.add('bg-warning-subtle');
				break;
			// default:
			//   statements
		}
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

	if (movieForm.inputGenre.value == '--Choose a genre--') {
		alert('Please choose a genre');
		return false;
	}

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
		const changeModal = new bootstrap.Modal(
			document.getElementById('changeModal'),
			{
				keyboard: false,
			}
		);
		changeModalHeader.innerText = 'Successful update';
		changeModalBodyText.innerText = `id: ${id}`;

		changeModal.show();
	} else {
		const changeModal = new bootstrap.Modal(
			document.getElementById('changeModal'),
			{
				keyboard: false,
			}
		);
		changeModalHeader.innerText = 'Movie added';
		// changeModalBodyText.innerText = `id: ${id}`;
		changeModalBodyText.innerText = `Movie name: ${serverUserObject.Title}`;
		changeModal.show();
	}

	console.log(request);

	fetch(request).then((response) => {
		console.log(response);
		localStorage.removeItem('currentId');
		movieForm.reset();
	});
	refresh();
}

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

function deleteFunction(id) {
	console.log('delete', id);

	fetch(`${url}/${id}`, { method: 'DELETE' })
		.then((result) => {
			console.log('Filmen har tagits bort.');
			fetchData();
		})
		.catch((error) => {
			console.error('Ett fel uppstod:', error);
		});

	const changeModal = new bootstrap.Modal(
		document.getElementById('changeModal'),
		{
			keyboard: false,
		}
	);
	changeModalHeader.innerText = 'Successful delete';
	changeModalBodyText.innerText = `id: ${id}`;

	changeModal.show();
	refresh();
}

function refresh() {
	setTimeout(function () {
		location.reload();
	}, 3000);
}
