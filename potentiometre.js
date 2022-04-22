/*
    Tony-Steel. 
    30/12/2021. 
    Projet d'application Web Midi
    potentiometre.js : Gestion du potentiomètre. 
*/
/*-----------------------------------------------------------------------------------------------------*/
/* Liste Control Change */
const listCc = {
    1: '1 modulation',
    2: '2 breath control',   
    3: '3 controller 3',
    4: '4 foot controller',
    5: '5 portamento time',
    6: '6 data entry',
    7: '7 volume',
    8: '8 balance',
    9: '9 controller 9',
    10: '10 panoramique',
    11: '11 expression',
    12: '12 effect control 1',
    13: '13 effect control 2',
    14: '14 controller 14',
    15: '15 controller 15',
    16: '16 general prp.slid.1',
    17: '17 general prp.slid.2',
    18: '18 general prp.slid.3',
    19: '19 general prp.slid.4',
    20: '20 controller 20',
    21: '21 controller 21',
    22: '22 controller 22',
    23: '23 controller 23',
    24: '24 controller 24',
    25: '25 controller 25',
    26: '26 controller 26',
    27: '27 controller 27',
    28: '28 controller 28',
    29: '29 controller 29',
    30: '30 controller 30',
    31: '31 controller 31',
    64: '64 hold-1 pedal',
    65: '65 portamento',
    66: '66 sustain pedal',
    67: '67 soft pedal',
    68: '68 legato pedal',
    69: '69 hold-2 pedal',
    91: '91 reverb level',
    92: '92 tremololevel',
    93: '93 chorus level',
    94: '94 celeste level',
    95: '95 phaser level',
};

/* Potentiometre */
let Yinit = 0;
let Yactuel = 0;
let Ychange = false;
let deplacementY = 0;
let angle = -150;
let valMidi = 0;    

/* Construction du potentiomètre */
function constPotentiometre(elt){
    elt.append(`
        <div class="Fond-lin"></div>
        <div class="ref-0-10"></div>                                
        <div class="graduations"></div>
        <div class="curseur"></div>
        <div class="bille-cont">                                
            <div class="bille-cir">
                <div class="bille-lin" id="bille"></div>
            </div>
        </div>

        <div class="cercle-centre">
            <input type="number" name="cChgMidiOut" id="cChgMidiOut" class="val0-127 valPot" min="0" max="127" value="0">
        </div>

        
        <div class="titre">
            <h3>Control Change</h3>   
            <select name="cChgNumMidiOut" id="cChgNumMidiOut" class="cChgNumMidi"></select>
        </div>                  
    `);
    const nbCc = alimListe($('#cChgNumMidiOut'), listCc);     
};
/*---*/

function afficheValeur(){   
    $('#cChgMidiOut').val(valMidi); 
};

function RotationPot(ang){    
    angle = ang;
    $('.bille-cont').animate(
        {deg: angle},
        {
            duration: 0,
            step: function(angle) {
            $(this).css({transform: 'rotate('+ angle + 'deg)'});
            $('#bille').css({transform: 'rotate('+ angle + 'deg)'});
            $('.curseur').css({transform: 'rotate('+ angle + 'deg)'});
            $('.Fond-lin').css({transform: 'rotate('+ -angle/2 + 'deg)'});
        }            
    });    
};
/*---*/

/* Evenements */
    /* Souris */
    $(".potentiometre").mousemove(function(event){        
        $("#bille").mousedown(function(){
            Yinit = event.pageY; 
            deplacementY = 0;
            Ychange = true;
        });
        
        if (Ychange == true){        
            deplacementY = Yinit - event.pageY;
            angle = angle + deplacementY*2;
            Yinit = event.pageY; 
            deplacementY = 0;
            
            if( angle < -150){
                angle = -150;
            }
            if(angle >= 150){
                angle = 150;
            }
            
            valMidi = Math.floor(angle / (300/127) + 64)
            afficheValeur(); 
            RotationPot(angle);                      
        }   
    });

    $("body").mouseup(function(){
        Ychange = false;
    });
    /*---*/
/*---*/


/*-----------------------------------------------------------------------------------------------------*/

