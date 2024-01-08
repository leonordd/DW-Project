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

//faz a troca da class do elemento fullscreen quando se clica nos olhos
let eyes = document.querySelector("#eyes");
let fullscreen = document.querySelector(".fullscreen-menu");

eyes.addEventListener("click", function () {
    fullscreen.classList.toggle('show');
});


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



// function changeBackgroundColor() {
//     // Array de cores possíveis em formato hexadecimal
//     const coresHex = ["#642E68", "#FBE45B", "#900E16", "#842D53", "#C0FFF3", '#0E5266','#773613', '#EFEBD0'];

//     // Obter as divs específicas
//     const imagensHomeDiv = document.querySelector('.imagens_home');
//     const keywordsDiv = document.querySelector('.keywords');
//     const WADiv = document.querySelector('.WA');

//     // Escolher cores aleatórias únicas para cada div
//     let corAleatoriaHexImagensHome, corAleatoriaHexKeywords, corAleatoriaHexWA;

//     // Garantir que as cores sejam diferentes
//     do {
//       corAleatoriaHexImagensHome = coresHex[Math.floor(Math.random() * coresHex.length)];
//       corAleatoriaHexKeywords = coresHex[Math.floor(Math.random() * coresHex.length)];
//       corAleatoriaHexWA = coresHex[Math.floor(Math.random() * coresHex.length)];
//     } while (corAleatoriaHexKeywords === corAleatoriaHexImagensHome || corAleatoriaHexKeywords === corAleatoriaHexWA || corAleatoriaHexImagensHome === corAleatoriaHexWA);

//     // Alterar a cor de fundo de cada div
//     imagensHomeDiv.style.backgroundColor = corAleatoriaHexImagensHome;
//     keywordsDiv.style.backgroundColor = corAleatoriaHexKeywords;
//     WADiv.style.backgroundColor = corAleatoriaHexWA;

//     // Alterar a cor de fundo da página (opcional)
//     document.body.style.backgroundColor = coresHex[Math.floor(Math.random() * coresHex.length)];
//   }
function changeBackgroundColor() {
    // Array de cores possíveis em formato hexadecimal
    const coresHex = ["#642E68", "#FBE45B", "#900E16", "#842D53", "#C0FFF3", '#0E5266','#773613', '#EFEBD0'];

    // Obter as divs específicas
    const imagensHomeDiv = document.querySelector('.imagens_home');
    const keywordsDiv = document.querySelector('.keywords');
    const WADiv = document.querySelector('.WA');

    // Escolher cores aleatórias únicas para cada div
    let corAleatoriaHexImagensHome, corAleatoriaHexKeywords, corAleatoriaHexWA;

    // Garantir que as cores sejam diferentes
    do {
      corAleatoriaHexImagensHome = coresHex[Math.floor(Math.random() * coresHex.length)];
      corAleatoriaHexKeywords = coresHex[Math.floor(Math.random() * coresHex.length)];
      corAleatoriaHexWA = coresHex[Math.floor(Math.random() * coresHex.length)];
    } while (corAleatoriaHexKeywords === corAleatoriaHexImagensHome || corAleatoriaHexKeywords === corAleatoriaHexWA || corAleatoriaHexImagensHome === corAleatoriaHexWA);

    // Alterar a cor de fundo de cada div
    imagensHomeDiv.style.backgroundColor = corAleatoriaHexImagensHome;
    keywordsDiv.style.backgroundColor = corAleatoriaHexKeywords;
    WADiv.style.backgroundColor = corAleatoriaHexWA;

    // Definir a cor do texto com base na cor de fundo da div
    setTextColor(imagensHomeDiv, '', '#642E68', '#F3E4EC');
    setTextColor(imagensHomeDiv, '', '#642E68', '#F3E4EC');
    setTextColor(keywordsDiv, '.words1 h4', '#FBE45B', '#900E16');
    setTextColor(keywordsDiv, '.words2 h4', '#FBE45B', '#900E16');
    setTextColor(WADiv, '.pic_h3 h3', '#0E5266', '#EFEBD0');
    setTextColor(WADiv, '.quote-WA h4', '#0E5266', '#EFEBD0');

    // Alterar a cor de fundo da página (opcional)
    document.body.style.backgroundColor = coresHex[Math.floor(Math.random() * coresHex.length)];
  }

  function setTextColor(container, selector, backgroundColor, textColor) {
    // Verificar se a cor de fundo da div é igual à cor específica
    if (container.style.backgroundColor.toLowerCase() === backgroundColor.toLowerCase()) {
      // Definir a cor do texto
      container.querySelector(selector).style.color = textColor;
    } else {
      // Se não for igual, definir a cor do texto como padrão (preto, por exemplo)
      container.querySelector(selector).style.color = '#000000';
    }
  }
