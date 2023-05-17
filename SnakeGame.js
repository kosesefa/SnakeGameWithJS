canvas=document.getElementById("GameCanvas");
context=canvas.getContext("2d");
document.addEventListener("keydown",keyboardActions);

let sol=10;
let ust=10;
let konum= 20;
let boyut=18;
let kuyrukBoyut=15;
let elmaBoyut=10;
let elmaSol=5;
let elmaUst=5;
let ustHareket=0;
let solHareket=0;
let hiz=10;
let yilanUzunluk=1;
let yilanParcalari=[];
let skor=0;

class PartOfSnake{
    constructor(sol,ust){
        this.sol=sol;
        this.ust=ust;
    }
}


function DrawTheGame(){
 CleanTheWindow();
 DrawTheSnakeTail();
 DrawTheSnake();
 UpdateTheSnakeLocation();
 DrawTheApple();
 ChangeTheAppleLocation();
 DrawScoreTable();
 DrawSpeedTable();

 let sonuc=isTheGameOver();
 if (sonuc) {
    return;
 }

 setTimeout(DrawTheGame,1000/hiz);
}

function CleanTheWindow(){
    context.fillStyle="black";
    context.fillRect(0,0,400,400);
}


function DrawTheSnakeTail(){
    context.fillStyle="green";
    for (let i = 0; i < yilanParcalari.length; i++) {
        let partOfSnake=yilanParcalari[i];
        context.fillRect(partOfSnake.sol*konum,partOfSnake.ust*konum,kuyrukBoyut,kuyrukBoyut);
        
      
    }
    yilanParcalari.push(new PartOfSnake(sol,ust));

    if (yilanParcalari.length>yilanUzunluk) 
    {
       yilanParcalari.shift(); 
    }
}

function DrawTheSnake(){
     

    context.fillStyle="white";

    context.fillRect(sol*konum,ust*konum,boyut,boyut);

}


function UpdateTheSnakeLocation(){
     let solSonuc=sol+solHareket;
     let ustSonuc=ust+ustHareket;
        if (solSonuc >19) 
        {
           sol=0;   
        }
        else if (solSonuc<0){
            sol=19
        }
        else{
            sol=solSonuc;
        }

        if(ustSonuc>19){
            ust = 0;
        }
        else if (ustSonuc<0){
            ust=19
        }
        else{
            ust=ustSonuc;
        }

}

function keyboardActions(input){
    switch (input.keyCode) {
        case 38://Yukarı tuşunun kodu 38'dir.
        if(ustHareket==1){return;}
            ustHareket=-1;
            solHareket=0;
            break;
            case 40://Alt tuşunun kodu 40'dir.
            if(ustHareket==-1){return;}
            ustHareket=1;
            solHareket=0;
            break;
            case 37://Sol tuşunun kodu 37'dir.
            if(solHareket==1){return;}
            ustHareket=0;
            solHareket=-1;
            break;
            case 39://Sağ tuşunun kodu 39'dir.
            if(solHareket==-1){return;}
            ustHareket=0;
            solHareket=1;
            break;
    }
}

function DrawTheApple(){
    context.fillStyle="red";
    context.fillRect(elmaSol*konum,elmaUst*konum,elmaBoyut,elmaBoyut);
}

function ChangeTheAppleLocation(){
    if (sol===elmaSol && ust===elmaUst) 
    {
       elmaSol=Math.floor(Math.random()*konum);
       elmaUst=Math.floor(Math.random()*konum);
        yilanUzunluk++;
        skor +=10;
        let elmaKonumu=false;

        while (!elmaKonumu) {
            elmaKonumu=true;

            yilanParcalari.forEach(element=>{
                if (element.sol===elmaSol&&element.ust===elmaUst) {
                    elmaSol=Math.floor(Math.random()*konum);
                    elmaUst=Math.floor(Math.random()*konum);
                    elmaKonumu=false;
                }
            });
        }

        if (yilanUzunluk%3===0) {
            hiz++;
            
        }
    }
}

function isTheGameOver (){

    let oyunBitti=false;

    if (solHareket===0 && ustHareket ===0) {
        return;
    }

    for(let i=0;i<yilanParcalari.length;i++){
        let part =yilanParcalari[i];
        if (part.sol===sol&& part.ust===ust) {
            oyunBitti=true;
            break;
        }
             
    }

    if (oyunBitti) {
        
        context.fillStyle="white";
        context.font="50px verdena";
        context.fillText("Oyun Bitti !",400/4.5,200);
    }

    return oyunBitti;

}

function DrawScoreTable(){
    context.fillStyle="white";
    context.font="20px verdena";
    context.fillText(`Skor: ${skor}`,320,30);
}

function DrawSpeedTable(){
    context.fillStyle="white";
    context.font="20px verdena";
    context.fillText(`Hız: ${hiz}`,320,60);
}

function ResetGame(){
    document.location.reload();
}
DrawTheGame();