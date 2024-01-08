const MOVIES_URL = 'https://api.cosmicjs.com/v3/buckets/dw-project-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=10&read_key=rpHe3JIOqs8yp0uC1q6v1J1NjWXksisBbjgrQrUG1voFfLITHg&depth=1&props=slug,title,metadata,';

async function fetchApi(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error loading search results: ${response.status}`);
        }
        const data = await response.json();
        return data.objects;
    } catch (error) {
        console.error('Fetching error:', error);
        throw error;
    }
}

function createMovieElement(movie) {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    const imgElement = document.createElement('img');
    imgElement.src = movie.metadata.cover.url;
    imgElement.alt = `${movie.title} Cover`;


    imgElement.addEventListener('mouseover', () => {
        imgElement.src = movie.metadata.hover.url || ''; 
    });

    imgElement.addEventListener('mouseout', () => {
        imgElement.src = movie.metadata.cover.url; 
    });

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container');

    const nameElement = document.createElement('h5');
    nameElement.textContent = movie.title;

    const yearElement = document.createElement('p');
    yearElement.classList.add('year');
    yearElement.textContent = movie.metadata.year;

    const durationElement = document.createElement('p');
    durationElement.classList.add('duration');
    durationElement.textContent = `${movie.metadata.duration_hours}h ${movie.metadata.duration_minutes}min`;

    infoContainer.appendChild(nameElement);
    infoContainer.appendChild(yearElement);
    infoContainer.appendChild(durationElement);

    imageContainer.appendChild(imgElement);
    movieElement.appendChild(imageContainer);
    movieElement.appendChild(infoContainer);

    return movieElement;
}



function displayMovies(movies) {
    const moviesContainer = document.querySelector('.movies');

    movies.forEach(movie => {
        const movieElement = createMovieElement(movie);
        moviesContainer.appendChild(movieElement);
    });
}

function navBar() {
    //verifica se a class show está ou não presente e muda a cor de background do header
    let eyes = document.querySelector("#eyes");
    let a = document.querySelector("#fullscreen");
    let boolean = a.classList.contains("show");
    //console.log(boolean);
    header.style.backgroundColor = "#F3E4EC";

    eyes.addEventListener("click", function () {
        boolean = !boolean;
        console.log(boolean);

        if (boolean === true) {
            header.style.backgroundColor = "rgba(0,0,0,0)";
        } else {
            //cor específica de cada página
            header.style.backgroundColor = "#F3E4EC";
        }
    });
}

(async () => {
    try {
        const moviesData = await fetchApi(MOVIES_URL);
        displayMovies(moviesData);
        navBar();
    } catch (error) {
        console.error('Fetching error:', error);
        throw error;
    }
})();


