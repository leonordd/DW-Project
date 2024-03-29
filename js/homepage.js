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
        newTag.style.cursor = 'pointer';

        newTag.addEventListener('mouseover', function () {
            displayRandomImage(tag.slug);
        });

        if (index < tagsToDisplayInList1) {
            tagsContainer1.appendChild(newTag);
        } else {
            //Clona o nó para o segundo container
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


/*----------------------------------------ANIMAÇÕES HOMEPAGE---------------------------------------------*/

//faz a troca da class do elemento fullscreen quando se clica nos olhos
let eyes = document.querySelector("#eyes");
let fullscreen = document.querySelector(".fullscreen-menu");

eyes.addEventListener("click", function () {
    fullscreen.classList.toggle('show');
});


//----------------------CORES FUNDO

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

    // Escolhe cores aleatórias únicas para cada div
    let corAleatoriaFundoImagensHome, corAleatoriaFundoKeywords, corAleatoriaFundoWA;
    let corAleatoriaTextoImagensHome, corAleatoriaTextoKeywords, corAleatoriaTextoWA;

    // Garante que as cores de fundo sejam diferentes
    do {
        corAleatoriaFundoImagensHome = coresFundo[Math.floor(Math.random() * coresFundo.length)];
        corAleatoriaFundoKeywords = coresFundo[Math.floor(Math.random() * coresFundo.length)];
        corAleatoriaFundoWA = coresFundo[Math.floor(Math.random() * coresFundo.length)];
    } while (corAleatoriaFundoKeywords === corAleatoriaFundoImagensHome || corAleatoriaFundoKeywords === corAleatoriaFundoWA || corAleatoriaFundoImagensHome === corAleatoriaFundoWA);

    // Encontra as cores de texto correspondentes
    corAleatoriaTextoImagensHome = encontrarCorTexto(corAleatoriaFundoImagensHome);
    corAleatoriaTextoKeywords = encontrarCorTexto(corAleatoriaFundoKeywords);
    corAleatoriaTextoWA = encontrarCorTexto(corAleatoriaFundoWA);

    // Altera a cor de fundo e de texto de cada div
    imagensHomeDiv.style.backgroundColor = corAleatoriaFundoImagensHome;
    imagensHomeDiv.style.color = corAleatoriaTextoImagensHome;

    keywordsDiv.style.backgroundColor = corAleatoriaFundoKeywords;
    words1.style.color = corAleatoriaTextoKeywords;
    words2.style.color = corAleatoriaTextoKeywords;

    WADiv.style.backgroundColor = corAleatoriaFundoWA;
    name.style.color = corAleatoriaTextoWA;
    quote.style.color = corAleatoriaTextoWA;

    // Altera a cor de fundo da página 
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

// Function que converte o código RGB para Hexadecimal
function rgbToHex(rgb) {
    var values = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    // Conversão dos valores em hexadecimal
    var hex = '#';
    for (var i = 1; i <= 3; i++) {
        var component = parseInt(values[i]).toString(16);
        hex += component.length == 1 ? '0' + component : component;
    }
    return hex;
}

//Adicione um ouvinte de evento para o scroll
window.addEventListener('scroll', function () {

    if (window.scrollY > 100) {
        var corFundoImagensHome = window.getComputedStyle(document.querySelector('.imagens_home')).backgroundColor;

        // Converter o código RGB para Hexadecimal
        var corHexadecimal = rgbToHex(corFundoImagensHome);
        //console.log(corHexadecimal);

        // Ajusta a cor de fundo da .intro
        document.querySelector('.intro').style.backgroundColor = corFundoImagensHome;
        document.querySelector('.intro h1').style.backgroundColor = corFundoImagensHome;

        // Atualiza a cor do texto h1
        updateH1Color(corHexadecimal);
    } else {
        // Se estiver no topo, define a cor de fundo padrão para a .intro
        document.querySelector('.intro').style.backgroundColor = '';
        document.querySelector('.intro h1').style.backgroundColor = '';
        const h1Texto = document.querySelector('.intro h1');
        h1Texto.style.color = "#F3E4EC";
    }
});

// Função para atualizar a cor do texto h1 com base na cor de fundo da .intro
function updateH1Color(corFundoIntro) {
    const h1Texto = document.querySelector('.intro h1');
    h1Texto.style.color = "#F3E4EC";

    switch (corFundoIntro) {
        case "#642e68":
            h1Texto.style.color = "#F3e4ec";
            break;
        case "#fbe45b":
            h1Texto.style.color = "#900e16";
            break;
        case "#900e16":
            h1Texto.style.color = "#fbe45b";
            break;
        case "#efebd0":
            h1Texto.style.color = "#900e16";
            break;
        case "#f0b7ba":
            h1Texto.style.color = "#640c08";
            break;
        case "#842d53":
            h1Texto.style.color = "#feed7d";
            break;
        case "#c0fff3":
            h1Texto.style.color = "#972a22";
            break;
        case "#0e5266":
            h1Texto.style.color = "#efebd0";
            break;
        case "#efebd0":
            h1Texto.style.color = "#0e5266";
            break;
        case "#773613":
            h1Texto.style.color = "#ffec69";
            break;
        default:
            h1Texto.style.color = '#F3E4EC"';
    }

}


/*-------------------------------------------------LOADING SCREEN HOMEPAGE----------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('load', function () {
        setTimeout(function () {
            window.scrollTo(0, 0);
            zoomOut();
        }, 1000);
    });
});

function zoomOut() {
    var image = document.querySelector('.zoom-image');
    document.body.classList.add('no-scroll');

    // Adiciona a classe para iniciar a animação
    image.classList.add('zoom-out-animation');

    image.addEventListener('transitionend', function () {
        image.classList.add('scale-zero'); //dar reset na scale
        setTimeout(function () {
            document.body.classList.remove('no-scroll');
        }, 1000);
    });
}

/*-------------BOTÃO COSTUMIZAR INVISIVEL NO HEADER------- */
document.addEventListener("DOMContentLoaded", function () {
    var costumizeDiv = document.querySelector(".costumize");
    var headerHeight = document.querySelector("header").offsetHeight;

    // Verifica a posição do scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > headerHeight) {
            // Scroll está fora do cabeçalho, torna a div visível
            costumizeDiv.style.opacity = "1";
        } else {
            // Scroll está dentro do cabeçalho, torna a div invisível
            costumizeDiv.style.opacity = "0";
        }
    });
    costumizeDiv.style.transition = "opacity 0.3s ease";
});





