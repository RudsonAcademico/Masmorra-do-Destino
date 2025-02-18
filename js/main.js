var forca;
var defesa;
var sorte;
var nome;


function deusaDosNumerosAleatorios(){ // A Maldita deusa dos numeros aleatorios
    return Math.floor(Math.random()*10)+1;
}


function atribuir(){
    nome = document.getElementById("name").value;
    forca = document.getElementById("forca").value;
    forca = parseInt(forca);
    defesa = document.getElementById("defesa").value;
    defesa = parseInt(defesa);
    sorte = document.getElementById("sorte").value;
    sorte = parseInt(sorte);
    if ((forca + defesa + sorte == 10) && nome && (forca >= 0) && (defesa >= 0) && (sorte >= 0)){
        window.location.href = `/pages/masmorra.html?nome=${nome}&forca=${forca}&defesa=${defesa}&sorte=${sorte}`;
    } else {
        window.alert("Valores Invalidos");
    }
}
function nivel(){
    let n = Math.floor(Math.random()*3)+1;
    if (n == 1){
        forca++
    } else if (n == 2){
        defesa++
    } else {
        sorte++
    }
}

function gameover(){
    return document.getElementById("idblocoDeAventura").innerHTML = `
        <div class="titulo">
           <h1>Você foi Derrotado</h1>
           <a href='../index.html'><button class="botao" >Recomeçar</button></a>
        </div>`;
}

function vitoria(){
    return document.getElementById("idblocoDeAventura").innerHTML = `
        <div class="titulo">
            <h1>Parabéns</h1>
            <h2>Você Desbravou toda a Masmorra</h2>
            <a href='../index.html'><button class="botao" >Recomeçar</button></a>
        </div>`;
}

function detalhesDoHeroi(){
    return document.getElementById("andar").innerHTML = `
        <div class="titulo">
           <h1>Herói: ${nome}</h1>
           <p id="estatus">Vida: ${vidaHeroi}|Força: ${forca}|Defesa:${defesa}|Sorte: ${sorte}</p>
           
        </div>`;
}

function limpar(){
    
    vidaInimigo = inimigos[inimigoDoAndar]["vida"];
    inimigosAbatidos++
    inimigoDoAndar = inimigo[inimigosAbatidos]
    return document.getElementById("aventura").innerHTML = ``
}

function detalhesDoMonstro(){//função que escreve estatisticas e do monstro
    if (inimigosAbatidos != 6){
        return document.getElementById("monstros").innerHTML = `
            <div class="titulo">
                <h2>Monstro: ${inimigoDoAndar}</h2>
            </div>
            <div class="atributos">
                <p>Vida: ${vidaInimigo}|Força: ${inimigos[inimigoDoAndar]["ataque"]}|Defesa:${inimigos[inimigoDoAndar]["defesa"]}|Especial: ${inimigos[inimigoDoAndar]["especial"]}</p>
            </div>    
            `;
        document.getElementById("estatus").innerHTML = `<p id="estatus">Vida: ${vidaHeroi}|Força: ${forca}|Defesa:${defesa}|Sorte: ${sorte}</p>`;
    } else {
        return vitoria()
    }
}

function descricaoBatalhaHeroi(acontece){ // função que escreve a os o que ouve na batalha
    if (acontece == "Esquiva"){
        return document.getElementById("aventura").innerHTML += `<p>Você errou o golpe</p>`
    }
    if (critico){
        return document.getElementById("aventura").innerHTML += `<p>Você causou ${danoHeroi} de dano com um Critico!!</p>`;
    } else {
        return document.getElementById("aventura").innerHTML += `<p>Você causou ${danoHeroi} de dano</p>`;
    } 
}
function descricaoBatalhaInimigo(acontece){
    if (acontece == "Esquiva"){
        return document.getElementById("aventura").innerHTML += `<p>O inimigo se esquivou do ataque e lhe causou ${danoInimigo} de dano</p>`
    } else if(acontece == "Segundo Ataque"){
        return document.getElementById("aventura").innerHTML += `<p>O inimigo lhe acertou duas vezes e causou ${danoInimigo} de dano</p>`
    } else if(acontece == "") {
        return document.getElementById("aventura").innerHTML += `<p>O inimigo lhe causou ${danoInimigo} de dano</p>`
    }
    
}

function descricaoBatalha(acontece){
    return descricaoBatalhaHeroi(acontece), descricaoBatalhaInimigo(acontece)
}

function golpe(){
    
    danoHeroi = forca - inimigos[inimigoDoAndar]["defesa"];
    danoInimigo = inimigos[inimigoDoAndar]["ataque"] - defesa;
    especial = inimigos[inimigoDoAndar]["especial"];

    if (danoInimigo <= 0){//Para não bugar e ficar em uma luta infinita de dano 0
        danoInimigo = 1
    }

    if (danoHeroi <= 0){//Para não bugar e ficar em uma luta infinita de dano 0
        danoHeroi = 1
    }

    if (deusaDosNumerosAleatorios() <= sorte){//Gera critico
        danoHeroi*=2
        critico = true
    }
    

    if (especial == "Esquiva"){ //Esta merda vai burgar e gera uma luta infinita de dano 0
        if (deusaDosNumerosAleatorios() <= 6){
            danoHeroi = 0;
            acontece = "Esquiva";
        }
    } else if(especial == "Segundo Ataque"){
        if (deusaDosNumerosAleatorios() <= 4){
            danoInimigo*=2;
            acontece = "Segundo Ataque";
        }
    } else if (especial == "Veneno") {
        danoInimigo+=5;
    } else if (especial == "Sangria"){
        vidaInimigo+=Math.floor(danoInimigo / 2);
    } else if (especial == "Acido"){
        danoInimigo += Math.floor(defesa / 2);
    } else if (especial == "Ataque Duplo"){
        if (vidaInimigo/2 <= inimigos[inimigoDoAndar]["vida"]){
            danoInimigo*=2;
        }
    } // eu percebi agora que eu podia fazer com mathcase mas eu ja terminei vai ficar assim
    
    vidaInimigo-=danoHeroi;
    vidaHeroi-=danoInimigo;
    
    
    if(vidaHeroi > 0 && vidaInimigo > 0){
        descricaoBatalha(acontece)

    } else if (vidaInimigo <= 0){
        limpar()
        nivel()
        
    } else if (vidaHeroi <= 0){
        gameover()
        
    }
    critico = false;
    acontece = "";
    detalhesDoHeroi()
    detalhesDoMonstro()
    document.getElementById("derrota").innerHTML = `<p>Inimigos Abatidos: ${inimigosAbatidos}</p>`;
}



