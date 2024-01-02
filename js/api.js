let tags = {}
let categoriesData, projectsData

const PROJECTS_URL = 'https://api.cosmicjs.com/v3/buckets/dw-project-production/objects?pretty=true&query=%7B%22type%22:%22projects%22%7D&limit=53&skip=0&read_key=rpHe3JIOqs8yp0uC1q6v1J1NjWXksisBbjgrQrUG1voFfLITHg&depth=1&props=slug,title,metadata,id,'
const CATEGORIES_URL =  'https://api.cosmicjs.com/v3/buckets/dw-project-production/objects?pretty=true&query=%7B%22type%22:%22categories%22%7D&limit=19&skip=0&read_key=rpHe3JIOqs8yp0uC1q6v1J1NjWXksisBbjgrQrUG1voFfLITHg&depth=1&props=slug,title,metadata,id,'

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
        tags.push(tag.slug)
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
        const container = document.createElement('div')
        container.classList.add('info-container')
        hyperlink.href = `artifact.html?id=${project.id}`
        img.src = project.metadata.image.url
        img.setAttribute('id', project.id)
        img.classList.add('prevent-select')
        console.log(project)

        let title, author
        title = project.metadata.name
        author = project.metadata.author_name
        if (title == null) title = "Untitled"
        if (author == null) author = "Anonymous"

        container.innerHTML = `${title}<br><b>${author}</b>`
        container.classList.add('prevent-select')
        console.log(img.width)
        hyperlink.appendChild(img)
        div.appendChild(hyperlink)
        div.appendChild(container)
        imagesContainer.appendChild(div)
        
    });
    

    document.body.appendChild(imagesContainer)
}

function displayCategories(data) {
    const filtersContainer = document.createElement('div')
    filtersContainer.classList.add('filters-container')
    

    data.forEach(tag => {
        // initialize tags dictionary to false <==> none of the tags are selected
        tags[`${tag.slug}`] = false
        // display tags
        const newTag = document.createElement('p')
        newTag.textContent = `${tag.title}`
        newTag.classList.add('prevent-select')
        newTag.setAttribute('id', `${tag.slug}`)
        
        // add event listener (click event) to each tag
        newTag.addEventListener('click', function (e) {
            tags[`${tag.slug}`] = !tags[`${tag.slug}`]
            
            // no filter selected => display all images

            if (Object.values(tags).reduce((a, b) => a + b, 0) === 0) {
                const projects = document.querySelectorAll('.img-container');
                const buttons = document.querySelectorAll('.filters-container p');
                buttons.forEach(button => {
                    button.style.background = '#642E68'
                });
                projects.forEach(project => {
                    project.style.display = 'block'
                });
            }

            // some filter is selected => apply 'display: none' to all => apply 'display: block' to the projects that contain the selected tags
            else {
                const projects = document.querySelectorAll('.img-container')
                projects.forEach(project => {
                    project.style.display = 'none'
                });

                for (const [key, value] of Object.entries(tags)) {

                    if (value) {
                        const projects = document.querySelectorAll(`.${key}`)
                        const button = document.getElementById(`${key}`)
                        button.style.background = '#D8C2D3'
                        projects.forEach(project => {
                            project.style.display = 'block';
                        });
                    }
                    else {
                        const button = document.getElementById(`${key}`)
                        button.style.background = '#642E68'
                    }
                }
                
             }            
        })

        filtersContainer.appendChild(newTag)
    });

    document.body.appendChild(filtersContainer)
}

function handleSearchEngine() {
    const input = document.getElementById('search-engine');
    const value = input.value.trim().toLowerCase();

    // display all
    if (!value || value.length === 0 || value.length < 3) {
        
        // clear image container
        const imagesContainer = document.getElementById('images-container');
        if (imagesContainer) {
            imagesContainer.parentNode.removeChild(imagesContainer);
        }

        // display all projects
        displayProjects(projectsData);
        return;
    }

    let newData = [];

    // filter search input
    projectsData.forEach(data => {
        if (data.metadata.name.toLowerCase().includes(value)) {
            const exists = newData.some(obj => obj.id === data.id);
            if (!exists) {
                newData.push(data);
            }
        }
    });


    // new results
    if (newData !== null) {
        // clear image container ans display new results
        const imagesContainer = document.getElementById('images-container');
        if (imagesContainer) {
            imagesContainer.parentNode.removeChild(imagesContainer);
        }
        displayProjects(newData);
    }
}


(async () => {
    try {
        categoriesData = await fetchApi(CATEGORIES_URL)
        displayCategories(categoriesData)

        projectsData = await fetchApi(PROJECTS_URL);
        displayProjects(projectsData);
        handleSearchEngine()

    } catch (error) {
        console.error('Fetching error:', error);
        throw error;
    }
})();