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

(async () => {
    try {
        const moviesData = await fetchApi(MOVIES_URL);
        displayMovies(moviesData);

    } catch (error) {
        console.error('Fetching error:', error);
        throw error;
    }
})();






// -----------------------------------------------











function displayArtifact(data) {
    console.log(data)

    // info

    const title = document.getElementById('title') // titulo
    const by = document.getElementById('by') // autor
    // const text = document.getElementById('text') // descrição

    title.textContent = data.metadata.name
    let year 
    if (data.metadata.year) year = data.metadata.year
    else year = ''
    by.textContent = 'by ' + data.metadata.author_name + ' ' + year
    text.innerHTML = data.metadata.description

    // // more link
    // if (data.metadata.more_link) {
    //     const linkContainer = document.getElementById('more-link')
    //     const link = document.createElement('a')
    //     link.href = data.metadata.more_link
    //     link.textContent = 'More +'
    //     linkContainer.appendChild(link)
    // }

    // tags
    if (data.metadata.tags) {
        const tagsContainer = document.getElementById('tags-container')
        const list = document.createElement('ul')
        data.metadata.tags.forEach(tag => {
            const item = document.createElement('li')
            item.textContent = tag.title
            list.appendChild(item)
        });
        tagsContainer.appendChild(list)
    }

    // image
    const imagesContainer = document.getElementById('img-container')
    const img = document.createElement('img')
    img.alt = "Artifact"
    img.src = data.metadata.image.url
    imagesContainer.appendChild(img)

    // // dominant colors
    // const colors = document.getElementById('dominant-colors')
    // const palette = document.createElement('ul')
    // for (let i = 0; i < 4; i++) {
    //     const item = document.createElement('li')
    //     item.classList.add(`cor-${i + 1}`)
    //     palette.appendChild(item)
    // }
    // colors.appendChild(palette)
}
 function displayMovieTitle(movies){
    const movieTitle = document.querySelector('.list2-titles')


    movies.forEach(movie => {
        const movieElement = createMovieElement(movie);
        moviesContainer.appendChild(movieElement);
    });

 }


(async () => {
    try {
        const artifactData = await fetchApi(ARTIFACT_URL);
        displayArtifact(artifactData);

    } catch (error) {
        console.error('Fetching error:', error);
        throw error;
    }
})();
