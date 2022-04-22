/*
    Tony-Steel. 
    30/12/2021. 
    Projet d'application Web Midi
    Gestion du clavier virtuel
    */
/*---------------------------------------------------------------------------------------------------------------------------------*/

/* Variables */ 
let nbOctave = 10;
/*---*/

/* Affichage */
function afficherClavier(){
    let numNote = 0;
    let numPos = 0;

    //$('#icnClavier').addClass('invisible');
    //$('#icnRetour').removeClass('invisible');

    $('#clavier').append(`
        <div class="clavBlanche">
            <div class="clavNoire"></div>
        </div>
        <div class="panic">
            <button id="panicMidi" name="panicMidi">Panic</button>
        </div>
    `);

    for(oct=-1; oct<nbOctave; oct++){
        /* Octave Blanches */    
        for(i=0; i<7; i++){        
            if (numNote <= 127){
                // Blanche
                $('.clavBlanche').append(`<div class="tchBlanche" name="note${numNote}" id="note${numNote}"></div>`);
                /* C-1 à C9 */
                if(i == 0){
                    $("#note" + numNote).append(`<p class="nOct">C${oct}</p>`);
                }
                numNote = numNote+1;
                
                if (numNote <= 127){
                    // Noire
                    if(i!=2 && i!=6){
                        $('.clavNoire').append(`<div class="tchNoire" name="note${numNote}" id="note${numNote}"></div>`);
                        numNote = numNote+1;
                    } 
                    else {
                        $('.clavNoire').append(`<div style="visibility: hidden"; class="tchNoire"></div>`);
                    }   
                    numPos =numPos+1;
                }
            }
        }
    }
}

function afficheNoteOff(numNote, alteration){
    if(typeof alteration !== "undefined"){
        $(`#note${numNote}`).removeClass("tchNoireClic");    
    }
    else{
        $(`#note${numNote}`).removeClass("tchBlancheClic");    
    }
};

function afficheNoteOn(numNote, alteration){
    if(typeof alteration !== "undefined"){
        $(`#note${numNote}`).addClass("tchNoireClic");    
    }
    else{
        $(`#note${numNote}`).addClass("tchBlancheClic");    
    }
};

function btnPanic(){
    $(`#panic`).append(` 
        <div class="cell">
            <button id="panicMidi" name="panicMidi">Panic</button>
        </div>
    `);   
};

/*---*/

/*--------------------------------------------------------------------*/
/* Evenements */

/* Ouverture Clavier */
/*$('#icnClavier').click(function(){
    afficherClavier();
});
/*-*/

/* Fermeture Clavier */
/*$('#icnRetour').click(function(){
    $('.clavBlanche').remove()
    $('#icnClavier').removeClass('invisible');
    $('#icnRetour').addClass('invisible');
});
/*-*/


/* Click touches */
$('.tchBlanche').mousedown(function(){
    if($(this).attr("class") === 'tchBlanche tchBlancheClic'){
        $($(this)).removeClass('tchBlancheClic');    
    }
    else{
        $($(this)).addClass('tchBlancheClic');    
    }
});
$('.tchBlanche').mouseup(function(){
    $($(this)).removeClass('tchBlancheClic');    
});

$('.tchNoire').mousedown(function(){
    let id = $(this).attr("id");    
    if($(this).attr("class") === 'tchNoire tchNoireClic'){
        $($(this)).removeClass('tchNoireClic');    
    }
    else{
        $($(this)).addClass('tchNoireClic');    
    }
});
$('.tchNoire').mouseup(function(){
    $($(this)).removeClass('tchNoireClic');    
});
/*---*/

/*--------------------------------------------------------------------*/
