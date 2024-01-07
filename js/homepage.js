// const urlParams = new URLSearchParams(window.location.search);

// const ARTIFACT_URL = `https://api.cosmicjs.com/v3/buckets/dw-project-production/objects/${artifactId}?read_key=rpHe3JIOqs8yp0uC1q6v1J1NjWXksisBbjgrQrUG1voFfLITHg&depth=1&props=slug,title,metadata,`
const MOVIES_URL = 'https://api.cosmicjs.com/v3/buckets/dw-project-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=10&read_key=rpHe3JIOqs8yp0uC1q6v1J1NjWXksisBbjgrQrUG1voFfLITHg&depth=1&props=slug,title,metadata,';
const CATEGORIES_URL =  'https://api.cosmicjs.com/v3/buckets/dw-project-production/objects?pretty=true&query=%7B%22type%22:%22categories%22%7D&limit=19&skip=0&read_key=rpHe3JIOqs8yp0uC1q6v1J1NjWXksisBbjgrQrUG1voFfLITHg&depth=1&props=slug,title,metadata,id,'


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

function setTags(project) {
    let projectTags = project.metadata.tags
    let tags = []

    projectTags.forEach(tag => {
        tags.push(tag.slug)
    });
 
    return tags
}


function displayCategories(data) {
    const keywords = document.getElementById('list1-tags');
    let tags = {}; // Initialize tags dictionary outside the loop

    data.forEach(tag => {
        const tagProperties = setTags(tag);

        // initialize tags dictionary to false <==> none of the tags are selected
        tags[`${tagProperties}`] = false;

        // display tags
        const newTag = document.createElement('span'); // Change from <p> to <span>
        newTag.textContent = `${tag.title}`;
        newTag.classList.add('prevent-select');
        newTag.setAttribute('id', `${tagProperties}`);

        // add event listener (hover event) to each tag
        newTag.addEventListener('mouseenter', function (e) {
            tags[`${tagProperties}`] = true;

            // your hover logic here

            const projects = document.querySelectorAll(`.${tagProperties}`);
            projects.forEach(project => {
                project.style.display = 'block';
            });
        });

        // add event listener (hover out event) to each tag
        newTag.addEventListener('mouseleave', function (e) {
            tags[`${tagProperties}`] = false;

            // your hover out logic here

            const projects = document.querySelectorAll('.img-container');
            projects.forEach(project => {
                project.style.display = 'block';
            });
        });

        keywords.appendChild(newTag); // Append to h4
    });
}

(async () => {
    try {
        categoriesData = await fetchApi(CATEGORIES_URL)
        displayCategories(categoriesData)


    } catch (error) {
        console.error('Fetching error:', error);
        throw error;
    }
})();








