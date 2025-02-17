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
        window.alert("Atributos com pontuação superior a permitida");
    } else if (forca + defesa + sorte < 10){
        window.alert("Atributos com pontuação abaixo da permitida");
    } else if (forca < 0 || defesa < 0 || sorte < 0 || !nome || forca == NaN || defesa == NaN || sorte == NaN){
        window.alert("Valores Invalidos");
    }
    
    else {
        window.location.href = `/pages/masmorra.html?nome=${nome}&forca=${forca}&defesa=${defesa}&sorte=${sorte}`;
    }
}


