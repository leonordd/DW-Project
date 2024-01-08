# DW-Project

FICHEIROS:
flexbox_grid.css + flexbox_grid.html --> ficheiro de exemplo de grelha flexbox (NÃO ALTERAR, PLEASE)


geral.css + geral.js --> são os dois ficheiros que dão acesso à nav bar e footer. para os usar, colocar no html:
1. no <head> " <link href="../css/geral.css" rel="stylesheet"> "

2. antes do fim do <body> e antes de qualquer outro ficheiro de js  
"<script src="https://code.jquery.com/jquery-3.6.4.min.js">
</script> <script src="../js/geral.js"></script>"

3. logo no início do body 
    "<header>
        <nav>
            <p>WES ANDERSON</p>
            <div id="eyes">
                <div class='eye'>
                    <div></div>
                </div>
                <div class='eye'>
                    <div></div>
                </div>
            </div>
            <!--<img id="eyes" src="../content/icons/eyes.svg" alt="eyes" />-->
            <p>through your eyes</p>
        </nav>
    </header>"

4. logo antes de importar os ficheiros de js 
    "<footer>
        <span>WES ANDERSON <br> through your eyes</span>
        <a href="#zero">
            <div>Top</div>
            <img src="../content/icons/arrow.svg" alt="top arrow">
        </a>
    </footer>"

5. colocar um padding top ou margem top na div que vem imediatamente a seguir do header 
    - desktop: "padding-top: 100px;"
    - mobile: "padding-top: 140px;"