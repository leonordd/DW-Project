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
    /*console.log(data)*/
   let back_color;
    let filter1;
    let filter2;
    let filter3;
    let filter4;
    let cor1;
    let cor2;
    let tags_back;
    let tags_text;

    if(data.metadata.filme!==null){
        console.log(data.metadata.filme);
        back_color = data.metadata.filme.metadata.background_color;
        filter1 = data.metadata.filme.metadata.filter1;
        filter2 = data.metadata.filme.metadata.filter2;
        filter3 = data.metadata.filme.metadata.filter3;
        filter4 = data.metadata.filme.metadata.filter4;
        cor1 = data.metadata.filme.metadata.cor1;
        cor2 = data.metadata.filme.metadata.cor2;
        tags_back = data.metadata.filme.metadata.tags_background;
        tags_text = data.metadata.filme.metadata.tags_text; 
    } else{ //se for igual a null
        back_color = "#F7C5C8";
        filter1 = "#CA4C45";
        filter2 = "#F2F2F2";
        filter3 = "#3B53AB";
        filter4 = "#F2D140";
        cor1 = "#640C08";
        cor2 = "#640C08";
        tags_back = "#640C08";
        tags_text = "#FFFFFF";
    }

    // info

    const title = document.getElementById('title')
    const by = document.getElementById('by')
    const text = document.getElementById('text')
    let background = document.querySelector("html");

    background.style.backgroundColor = back_color;

    title.textContent = data.metadata.name;
    title.style.color = cor1;
    let year; 
    if (data.metadata.year) year = data.metadata.year;
    else year = ''
    by.textContent = 'by ' + data.metadata.author_name + ' ' + year;

    //by.style.color = "black";

    text.innerHTML = data.metadata.description;

    // more link
    if (data.metadata.more_link) {
        const linkContainer = document.getElementById('more-link');
        const link = document.createElement('a');
        link.href = data.metadata.more_link;
        link.textContent = 'More +';
        link.style.color = cor1;
        linkContainer.appendChild(link);
    }
    
    // tags
    if (data.metadata.tags) {
        const tagsContainer = document.getElementById('tags-container')
        const list = document.createElement('ul')
        data.metadata.tags.forEach(tag => {
            const item = document.createElement('li')
            item.textContent = tag.title
            item.style.backgroundColor = tags_back;
            item.style.color = tags_text;
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
    const filterArray = [filter1, filter2, filter3, filter4];

    for (let i = 0; i < 4; i++) {
        const item = document.createElement('li')
        item.classList.add(`cor`)
        //item.classList.add(`cor-${i + 1}`)

        item.style.backgroundColor = filterArray[i];
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
