let tagsList = [];
let projectsData; 

const PROJECTS_URL = 'https://api.cosmicjs.com/v3/buckets/dw-project-production/objects?pretty=true&query=%7B%22type%22:%22projects%22%7D&limit=53&skip=0&read_key=rpHe3JIOqs8yp0uC1q6v1J1NjWXksisBbjgrQrUG1voFfLITHg&depth=1&props=slug,title,metadata,id,';
const CATEGORIES_URL = 'https://api.cosmicjs.com/v3/buckets/dw-project-production/objects?pretty=true&query=%7B%22type%22:%22categories%22%7D&limit=19&skip=0&read_key=rpHe3JIOqs8yp0uC1q6v1J1NjWXksisBbjgrQrUG1voFfLITHg&depth=1&props=slug,title,metadata,id,';

async function fetchApi(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`error loading search results: ${response.status}`);
        }
        const data = await response.json();
        return data.objects;
    } catch (error) {
        console.error('Fetching error:', error);
        throw error;
    }
}

function setTags(project) {
    let projectTags = project.metadata.tags;
    let tags = [];

    projectTags.forEach(tag => {
        tags.push(tag.slug);
    });

    tagsList = tagsList.concat(tags);
}

function displayCategories(data) {
    const tagsContainer1 = document.getElementById('list1-tags');
    const tagsContainer2 = document.getElementById('list2-tags');

    const tagsToDisplayInList1 = 10;
    
    data.forEach((tag, index) => {
        const newTag = document.createElement('spam');
        newTag.textContent = `${tag.title}`;
        newTag.classList.add('prevent-select');
        newTag.setAttribute('id', `${tag.slug}`);
        newTag.style.marginRight = '5%';
        newTag.style.cursor ='pointer';

        newTag.addEventListener('mouseover', function () {
            displayRandomImage(tag.slug);
        });

        if (index < tagsToDisplayInList1) {
            tagsContainer1.appendChild(newTag);
        } else {
            // Clone o nó para o segundo contêiner
            const clonedTag = newTag.cloneNode(true);
            clonedTag.addEventListener('mouseover', function () {
                displayRandomImage(tag.slug);
            });
            tagsContainer2.appendChild(clonedTag);
        }
    });
}

function displayRandomImage(tagSlug) {
    const filteredProjects = projectsData && projectsData.filter(project => {
        return project.metadata.tags.some(tag => tag.slug === tagSlug);
    });

    if (filteredProjects && filteredProjects.length > 0) {
        const randomProject = filteredProjects[Math.floor(Math.random() * filteredProjects.length)];
        const fotoContainer = document.querySelector('.img_select');

        // Limpa o conteúdo atual e adiciona a nova imagem
        fotoContainer.innerHTML = '';
        const img = document.createElement('img');
        img.width = '50%'; 
        img.height = 'auto'; 
        img.src = randomProject.metadata.image.url;
        img.alt = randomProject.metadata.title;
        fotoContainer.appendChild(img);
    }
}

(async () => {
    try {
        const categoriesData = await fetchApi(CATEGORIES_URL);
        const projectsDataResponse = await fetchApi(PROJECTS_URL);
        projectsData = projectsDataResponse; // Atribui os projetos à variável global
        displayCategories(categoriesData);

    } catch (error) {
        console.error('Fetching error:', error);
        throw error;
    }
})();


