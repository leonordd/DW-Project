const urlParams = new URLSearchParams(window.location.search);
const artifactId = urlParams.get('id');
const ARTIFACT_URL = `https://api.cosmicjs.com/v3/buckets/dw-project-production/objects/${artifactId}?read_key=rpHe3JIOqs8yp0uC1q6v1J1NjWXksisBbjgrQrUG1voFfLITHg&depth=1&props=slug,title,metadata,`


async function fetchApi(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`error loading search results: ${response.status}`)
        }
        const data = await response.json()
        return data.object;
    } catch (error) {
        console.error('Fetching error:', error);
        throw error;
    }
}


function displayArtifact(data) {
    console.log(data)

    // info

    const title = document.getElementById('title')
    const by = document.getElementById('by')
    const text = document.getElementById('text')

    title.textContent = data.metadata.name
    let year 
    if (data.metadata.year) year = data.metadata.year
    else year = ''
    by.textContent = 'by ' + data.metadata.author_name + ' ' + year
    text.innerHTML = data.metadata.description

    // more link
    if (data.metadata.more_link) {
        const linkContainer = document.getElementById('more-link')
        const link = document.createElement('a')
        link.href = data.metadata.more_link
        link.textContent = 'More +'
        linkContainer.appendChild(link)
    }
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

    // dominant colors
    const colors = document.getElementById('dominant-colors')
    const palette = document.createElement('ul')
    for (let i = 0; i < 4; i++) {
        const item = document.createElement('li')
        item.classList.add(`cor-${i + 1}`)
        palette.appendChild(item)
    }
    colors.appendChild(palette)
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
