var forca;
var defesa;
var sorte;
var nome;

function atribuir(){
    nome = document.getElementById("name").value;
    forca = document.getElementById("forca").value;
    forca = parseInt(forca);
    defesa = document.getElementById("defesa").value;
    defesa = parseInt(defesa);
    sorte = document.getElementById("sorte").value;
    sorte = parseInt(sorte);
    if (forca + defesa + sorte > 10){
        window.alert("atributos com pontuação superior a permitida");
    } else if (forca + defesa + sorte < 10){
        window.alert("atributos com pontuação abaixo da permitida");
    } else {
        window.location.href = `/pages/masmorra.html?nome=${nome}&forca=${forca}&defesa=${defesa}&sorte=${sorte}`;
    }
}

function apresentacao(){
    console.log(nome);
    console.log(forca);
    console.log(defesa);
    console.log(sorte);
}
