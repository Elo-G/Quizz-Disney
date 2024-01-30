// I) JE DECLARE CE DONT JE VAIS AVOIR BESOIN: 
let questions = [ "Qui est la femme de Mickey ? : ",
                  "Qu'est-ce qui a tué Blanche neige ?: ",
                  "Pourquoi Cendrillon doit rentrer avant minuit ? : ",
                  "Comment fini l'histoire de la belle au bois dormant ? : ",
                  "Quel personnage n'est pas un Disney ? : "
                   ];


let answers = [
["Pluto", "Daisy", "Minnie", "Joe Bidden"],
["Une pomme empoisonée", "Le vaccin du covid", "Un coup de fusil du chasseur", "L'odeur de grincheux"],
["Car après minuit elle redevient Cendrillon", "Parce que la soirée est cuite", "Parce qu'elle est clairement bourrée", "Parce qu'elle a un deuxième date" ],
["Elle se fait larguer et noie son chagrin dans l'alcool", "Elle et le prince participent aux Anges de la téléréalité et finissent leur vie à Dubaï pour ne pas payer d'impôts", "Ils vécurent heureux et eurent beaucoup d'enfants", "Elle supplia la mauvaise fée de la réendormir quand elle senti l'haleine du Prince" ],
["Poccahontas", "Moufassa", "La reine des neiges", "Le professeur Raoult parce qu'il vend plus de rêve que tous les Disneys réunis"],
];

let goodAnswers = ["Minnie", "Une pomme empoisonée", "Car après minuit elle redevient Cendrillon", "Ils vécurent heureux et eurent beaucoup d'enfants", "Le professeur Raoult parce qu'il vend plus de rêve que tous les Disneys réunis"];
let score = 0;
let globalCount = 0;     //j'ai ajouter une variable globalCount qui servira d itérateur commun aux tableau [questions] et [goodAnswer] pour que le cpu relie la question en position [i] dans mon tableau questions, à la good answer qui a la même position [i] dans le tableau the [goodAnswers] //
let scoreIncremented =false;

// II) JE CREE TOUTE LES FONCTION DONT JE VAIS AVOIR BESOIN (ET QUI VONT ME FAIRE ECONOMISER DES LIGNES DE CODES) et JE "LANCE" MES FONCTION POUR QUE QUIZZ FONCTIONNE

/*ci-dessous
(§§§) :je créer une fonction pour afficher ma question ( et aussi les réponses s'y rapportant grâce à la function displayreponse que je vais créer plus bas puis inclure dans ma fonction displayQuestion
(***) :j'ai enlever la valeur 0 de mon "questions[]"  pour la transformer en globalcount (ça m'évitera de retaper des lignes de codes et des boucles pour  pour chaque nouvelle questions*/
let temps = 12;
const timerElement = document.getElementById("span-timer");//timerElement = l'element qui a l'id span-timer ds le html
timerElement.innerText = temps;

function diplayQuestion() { //(§§§)
    temps = 12
    timerElement.innerText = temps;
    document.querySelector('#question').innerHTML = questions[globalCount]; //(***)
    displayReponses(); 
}
if (globalCount < questions.length) {
    diplayQuestion();

}



function displayReponses() {         
    let reponseContainer = document.querySelectorAll(".choiceAnswer"); //tableau d'element HTML (mes boutons)
    for (let i = 0; i < reponseContainer.length; i++) { //boucle parcourant mes boutons un a un
        reponseContainer[i].innerHTML = answers [globalCount][i]; //insertion de la reponse a chaque boutons
    }
}
/*attention de pas oublier de mettre le .innerHTML sinon si j'écris "
document.querySelector("#theGoodanswerIs") = "La bonne réponse est : " + goodAnswers[globalCount]"" ,ça veut seulement dire "à cette adresse:= "La bonne réponse est : " + goodAnswers[globalCount]" sans lui préciser l'action à faire. 

ALORS qu'en mettant ".innerHTML" après ("#theGoodanswerIs") je lui précise l'action que je veux appliquer,soit: "à l'adresse "#theGoodanswerIs":va m'afficher (en version html)= "La bonne réponse est : " + goodAnswers[globalCount]" */   


function solution() { /*je créé une fonction pour afficher la bonne réponse */  
    document.querySelector("#theGoodanswerIs").innerHTML = "La bonne réponse est : " + goodAnswers[globalCount];
    setTimeout(() => document.querySelector("#theGoodanswerIs").innerHTML = " ",3000);// pr effacer la bonne rep au bout de 3s
    }

  /*ci-dessous,je créer une fonction pour que lorsque le joueur clique sur ça réponse le cpu affiche ce qui va se passer selon les condition que je vais définir dans ma fonction reply (reply veut dire réponse) */                    
 function reply (element) {
    // condition si tu as bien répondu ET QU IL RESTE DES QUESTION 0 PARCOURIR
    if (element.innerHTML == goodAnswers[globalCount] && globalCount < questions.length - 1){
        score++; /*<=> score=score+1 */
        document.querySelector("#score").innerHTML = "Bravo! score: " +score;
        globalCount++; /* (%%%)*/
        diplayQuestion();
      // condition quand tu as répondu à tout je rappelle les questions,reponses, et solution avec une valeur de zero pour redemarrer://
    } else if (element.innerHTML == goodAnswers[globalCount]  && globalCount == questions.length - 1 && !scoreIncremented) {
        clearInterval(inter); // Arrête le minuteur
        score ++;
        document.querySelector("#score").innerHTML = "Bravo! score: " +score;
        scoreIncremented= true;
        setTimeout(()=>document.querySelector("#score").innerHTML="",1500);
      //condition rep fausse et reste questions à parcourir:
    }else if(element.innerHTML != goodAnswers[globalCount] && globalCount < questions.length - 1) {
      document.querySelector("#score").innerHTML = "score: " +score;
      solution();
      globalCount++;
      diplayQuestion();
    }        
     //condition si reponse fausse et il ne reste plus de questions à poser:
    else if (element.innerHTML != goodAnswers[globalCount] && globalCount == questions.length - 1) {
     clearInterval(inter); // Arrête le minuteur
     document.querySelector("#score").innerHTML = "score: " +score;
     solution();
     setTimeout(()=>document.querySelector("#score").innerHTML="",1500);
    }
 }

function reset(element){
    globalCount = 0; 
    diminuerTemps();
    let inter = setInterval(diminuerTemps, 1000);
    diplayQuestion();
    displayReponses(); 
    score = 0;
    document.querySelector("#score").innerHTML = "score: " +score;
};

//---------------------VARIABLE POUR DEFINIR LE TEMPS--------------------------


//--------------------VARIABLE POUR AFFICHER LE TEMPS--------------------------


//-----FONCTION POUR LANCER LE TIMER ET LUI FAIRE MOINS 1 A CHAQUES TOURS------
 let goodanswerTimer = document.getElementById("theGoodanswerIs")

function diminuerTemps() {
    timerElement.innerText = temps;
    if (temps > 0 && globalCount <= questions.length - 1) {
     temps--;
    }else if(temps === 0 && globalCount <= questions.length - 1){
      goodanswerTimer.innerHTML = "PERDU!!! Temps écoulé...";
      globalCount++;
      diplayQuestion();
      setTimeout(() => document.getElementById("theGoodanswerIs").innerHTML = " ",1500)//ON REMET SCORE à vide "" et ça reste affiché que 1.5 s    
     }else if (temps === 0 && globalCount > questions.length - 1){
        goodanswerTimer.innerHTML = "PERDU!!! Temps écoulé...";
        document.querySelector("#score").innerHTML = "score: " +score;
        
    };
     }
    

let inter = setInterval(diminuerTemps, 1000);

// setTimeout est une fonction qui s'execute au bout d'un certain temps
/*let inter = setInterval(diminuerTemps, 1000);  permet de rejouer la fonction 
diminuer temps toutes les secondes (dc d'enlever une seconde car temps --, toutes les secondes)*/










/* !!!!!ATTENTION!!!!!!
quand tu crées tes conditions de bien les hiérachiser dans le bon ordre d'execution.
ex si je met solution en dessous de globalcount++ il va m'afficher la solution 
correspondant à globalCount++(c'est à dire il va m'afficher la 
solutuion de la question suivante ) alors que je veux qu'il m'affiche la solution 
correspondant à GlobalCount (la solution correspondant à la question en cours)*/


/* (%%%)A cet ligne de code là,(comme je vois mon [i] et mon [global compte] comme un curseur, avec mon globalCount++), je lui dit de passer à la question et au réponses en position  globalCount+1*/


// RQ:"document.querySelector("#score").innerHTML = score"  veut dire : tu va m'afficher score dans  le contenant qui a l'id #score dans la page HTML.
