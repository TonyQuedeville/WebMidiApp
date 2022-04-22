/*
    Tony-Steel. 
    30/12/2021. 
    Projet d'application Web Midi
    API Midi Web : Fonctions générales 
*/
/*-----------------------------------------------------------------------------------------------------------------------------*/


/* Alimentation de liste déroulante */
function alimListe(elt, list){
    //console.log(elt)
    let nbOption = 0;

    for(let cle in list){
        elt.append(`<option id="${cle}" value="${cle}">${list[cle]}</option>`);
        nbOption++;
    };
    return nbOption;
};

/* Interface détectée */
function afficheIntDetected(list){
    $('#listInt').remove();
    $('#interfaceDetect').append(`<h3 class="erreur" id="listInt">Interface Midi : </h3>`);
    
    for(let cle in list){
        $('#listInt').append(` - ${list[cle]} -`);
        if(list[cle] == 'Non reconnue !'){
            $('#listInt').addClass('erreur');
        } else {
            $('#listInt').removeClass('erreur');                
        }            
    };
};

/*---*/