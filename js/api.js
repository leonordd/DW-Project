let tags = {}
const PROJECTS_URL = 'https://api.cosmicjs.com/v3/buckets/dw-project-production/objects?pretty=true&query=%7B%22type%22:%22projects%22%7D&limit=10&read_key=rpHe3JIOqs8yp0uC1q6v1J1NjWXksisBbjgrQrUG1voFfLITHg&depth=1&props=slug,title,metadata,id,'
const CATEGORIES_URL =  'https://api.cosmicjs.com/v3/buckets/dw-project-production/objects?pretty=true&query=%7B%22type%22:%22categories%22%7D&limit=10&skip=0&read_key=rpHe3JIOqs8yp0uC1q6v1J1NjWXksisBbjgrQrUG1voFfLITHg&depth=1&props=slug,title,metadata,'

async function fetchApi(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`error loading search results: ${response.status}`)
        }
        const data = await response.json()
        return data.objects;
    } catch (error) {
        console.error('Fetching error:', error);
        throw error;
    }
}

function setTags(project) {
    let projectTags = project.metadata.tags
    let tags = []

    projectTags.forEach(tag => {
        tags.push(tag.title)
    });

    return tags
}

function displayProjects(data) {
    const imagesContainer = document.createElement('div')
    imagesContainer.classList.add('images-container')
    imagesContainer.setAttribute('id', 'images-container')
    
    data.forEach(project => {
        const div = document.createElement('div')
        div.classList.add('img-container')
        let tags = setTags(project)

        //add tags
        for (let i = 0; i < tags.length; i++) {
            div.classList.add(tags[i])
        }

        const img = document.createElement('img')
        const hyperlink = document.createElement('a')
        hyperlink.href = `artifact.html?id=${project.id}`
        img.src = project.metadata.image.url 
        img.setAttribute('id', project.id)
        hyperlink.appendChild(img)
        div.appendChild(hyperlink)
        imagesContainer.appendChild(div)
        
    });
    

    document.body.appendChild(imagesContainer)
}

function displayCategories(data) {
    const filtersContainer = document.createElement('div')
    filtersContainer.classList.add('filters-container')
    

    data.forEach(tag => {
        // initialize tags dictionary to false <==> none of the tags are selected
        tags[`${tag.title}`] = false
        // display tags
        const newTag = document.createElement('p')
        newTag.textContent = `${tag.title}`
        newTag.setAttribute('id', `${tag.title}`)
        
        // add event listener (click event) to each tag
        newTag.addEventListener('click', function (e) {
            tags[`${tag.title}`] = !tags[`${tag.title}`]
            
            for (const [key, value] of Object.entries(tags)) {

                // display all
                if (Object.values(tags).reduce((a, b) => a + b, 0) === 0) {
                    const projects = document.querySelectorAll('.img-container');
                    const buttons = document.querySelectorAll('.filters-container p');
                    buttons.forEach(button => {
                        button.style.background = '#642E68'
                    });
                    projects.forEach(project => {
                        project.style.display = 'block'
                    });
                    break;
                }

                // hide projects
                if (!value) {
                    const projects = document.querySelectorAll(`.${key}`);
                    const button = document.getElementById(`${key}`)
                    button.style.background = '#642E68'
                    projects.forEach(project => {
                        project.style.display = 'none'
                    });
                }
                
                // show projects
                else {
                    const projects = document.querySelectorAll(`.${key}`)
                    const button = document.getElementById(`${key}`)
                    button.style.background = '#D8C2D3'
                    projects.forEach(project => {
                        project.style.display = 'block'
                    });
                }
            }

            
        })

        filtersContainer.appendChild(newTag)
    });

    document.body.appendChild(filtersContainer)
}



(async () => {
    try {
        const categoriesData = await fetchApi(CATEGORIES_URL)
        displayCategories(categoriesData)

        const projectsData = await fetchApi(PROJECTS_URL);
        displayProjects(projectsData);

    } catch (error) {
        console.error('Fetching error:', error);
        throw error;
    }
})();