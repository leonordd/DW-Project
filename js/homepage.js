/*---------------------------SECÇÃO DE KEYWORDS E PROJETOS HOMEPAGE--------------------------------*/
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
            // Clone o nó para o segundo container
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


/*----------------------------------------ANIMAÇÕES HOMEPAGE---------------------------------------------*/


   function changeBackgroundColor() {
  
    const coresFundo = ["#642E68", "#F0B7BA", "#900E16", "#FBE45B", "#842D53", "#C0FFF3", "#0E5266", "#EFEBD0", "#773613"];
    const coresTexto = ["#F3E4EC", "#640C08", "#FBE45B", "#900E16", "#FEED7D", "#972A22", "#EFEBD0", "#0E5266", "#FFEC69"];

    const imagensHomeDiv = document.querySelector('.imagens_home');
    const keywordsDiv = document.querySelector('.keywords');
    const WADiv = document.querySelector('.WA');

    const words1 = document.querySelector('.words1 h4');
    const words2 = document.querySelector('.words2 h4');
    const name = document.querySelector('.pic_h3 h3');
    const quote = document.querySelector('.quote-WA h4');

    // Escolher cores aleatórias únicas para cada div
    let corAleatoriaFundoImagensHome, corAleatoriaFundoKeywords, corAleatoriaFundoWA;
    let corAleatoriaTextoImagensHome, corAleatoriaTextoKeywords, corAleatoriaTextoWA;

    // Garantir que as cores de fundo sejam diferentes
    do {
      corAleatoriaFundoImagensHome = coresFundo[Math.floor(Math.random() * coresFundo.length)];
      corAleatoriaFundoKeywords = coresFundo[Math.floor(Math.random() * coresFundo.length)];
      corAleatoriaFundoWA = coresFundo[Math.floor(Math.random() * coresFundo.length)];
    } while (corAleatoriaFundoKeywords === corAleatoriaFundoImagensHome || corAleatoriaFundoKeywords === corAleatoriaFundoWA || corAleatoriaFundoImagensHome === corAleatoriaFundoWA);

    // Encontrar as cores de texto correspondentes
    corAleatoriaTextoImagensHome = encontrarCorTexto(corAleatoriaFundoImagensHome);
    corAleatoriaTextoKeywords = encontrarCorTexto(corAleatoriaFundoKeywords);
    corAleatoriaTextoWA = encontrarCorTexto(corAleatoriaFundoWA);

    // Alterar a cor de fundo e de texto de cada div
    imagensHomeDiv.style.backgroundColor = corAleatoriaFundoImagensHome;
    imagensHomeDiv.style.color = corAleatoriaTextoImagensHome;

    keywordsDiv.style.backgroundColor = corAleatoriaFundoKeywords;
    words1.style.color = corAleatoriaTextoKeywords;
    words2.style.color = corAleatoriaTextoKeywords;

    WADiv.style.backgroundColor = corAleatoriaFundoWA;
    name.style.color = corAleatoriaTextoWA;
    quote.style.color = corAleatoriaTextoWA;

    // Alterar a cor de fundo da página 
    document.body.style.backgroundColor = coresFundo[Math.floor(Math.random() * coresFundo.length)];
    document.body.style.color = encontrarCorTexto(document.body.style.backgroundColor);
  }

  function encontrarCorTexto(corFundo) {
    switch (corFundo) {
      case "#642E68":
        return "#F3E4EC";
      case "#F0B7BA":
        return "#640C08";
      case "#900E16":
        return "#FBE45B";
      case "#FBE45B":
        return "#900E16";
      case "#842D53":
        return "#FEED7D";
      case "#C0FFF3":
        return "#972A22";
      case "#0E5266":
        return "#EFEBD0";
      case "#EFEBD0":
        return "#0E5266";
      case "#773613":
        return "#FFEC69";
      default:
        return "#000000";
    }
  }

