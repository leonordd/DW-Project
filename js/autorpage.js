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

function displayMovies(movies) {
    const moviesContainer = document.querySelector('.movies');

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('info-container');

        const imgElement = document.createElement('img');
        imgElement.src = movie.metadata.cover.url;
        imgElement.alt = `${movie.title} Cover`;

        // Add event listeners for mouseenter and mouseleave to show/hide the hover content
        imgElement.addEventListener('mouseenter', () => {
            hoverElement.style.display = 'block';
        });

        imgElement.addEventListener('mouseleave', () => {
            hoverElement.style.display = 'none';
        });

        const nameElement = document.createElement('h5');
        nameElement.textContent = movie.title;

        const yearElement = document.createElement('p');
        yearElement.textContent = movie.metadata.year;

        const durationElement = document.createElement('p');
        durationElement.textContent = `${movie.metadata.duration_hours}h ${movie.metadata.duration_minutes}min`;

        const hoverElement = document.createElement('div');
        hoverElement.classList.add('hover-content');
        hoverElement.textContent = movie.metadata.hover || '';

        // Append elements to their respective parents
        infoContainer.appendChild(imgElement);
        infoContainer.appendChild(nameElement);
        infoContainer.appendChild(yearElement);
        infoContainer.appendChild(durationElement);

        movieElement.appendChild(infoContainer);
        movieElement.appendChild(hoverElement);

        // Append the movie element to the movies container
        moviesContainer.appendChild(movieElement);
    });
}

(async () => {
    try {
        const moviesData = await fetchApi(MOVIES_URL);
        displayMovies(moviesData);

    } catch (error) {
        console.error('Fetching error:', error);
        throw error;
    }
})();
