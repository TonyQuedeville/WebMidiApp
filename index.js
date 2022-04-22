/*
    Tony-Steel. 
    30/12/2021. 
    Projet d'application Web Midi
    index.js : Initialisation Page de démarrage. 
*/
/*-----------------------------------------------------------------------------------------------------------------------------*/


/* Initialisations */
let webMidiApp = new WebMidiApp()

constPotentiometre($(`#stdMidiCtrlChg`))
afficherClavier()
afficheListeSynth()
/*---*/

function afficheListeSynth(){
    const listMarque = {
        Roland: 'Roland',
        Oberheim: 'Oberheim',   
        Baloran: 'Baloran',
        /*Moog: 'Moog',
        Korg: 'Korg',
        Crumar: 'Crumar',
        Ibanez: 'Ibanez',
        Waldorf: 'Waldorf',
        /*-*/
    };

    /*$(`#marques`).prepend(`        
        <select name="manufacturer" id="manufacturer"></select>
        <div id="synths"></div>     
    `)
    alimListe($('#manufacturer'), listMarque); */ 
    //afficheSynths('Roland') 
    
    $('#synths').remove()        
    $('#marques').append(`
        <div id="synths" class="inline overflowAuto"></div>    
    `)
    manufacturer = SynthEnumerations.MANUFACTACTURERS
    manufacturer.forEach(afficheSynths)
}

/* Ecoute évènements */

/* Evénements selecteur (menu déroulant) */
$(document).ready(() => {
    $('#manufacturer').change(function(){
        afficheSynths($(this).val())  
    })
})

/*---*/

/* Fonctions */ 
function afficheSynths(manufacturer){
    // affiche la liste des appareils dans la page d'accueil
    const devices = SynthEnumerations.DEVICES_BY_MANUFACT[manufacturer]

    for(i=0; i<=7; i++){
        let txthtml = ''
        let nom = devices[i]

        const device = SynthEnumerations.DEVICES[nom]            
        if(device !== undefined){        
            txthtml = `
                <label id="synth-${i}" class="card module" for="item-${i}">   
                    <div class="horizontale space-around">                             
                        <div class="verticale"> 
                            <h3>Power</h3>
                            <a href="${device['controleur']}?fabricant=${manufacturer}&device=${nom}">
                                <img src="img/icn-power.png" class="power icn">
                            </a>                                
                        </div>                             
                        
                        <div class="verticale">                                   
                                <h1 id="fabricant">${manufacturer}</h1>
                                <a href="${device['controleur']}?fabricant=${manufacturer}&device=${nom}">
                                    <img src="img/${manufacturer}/${device.logo}" alt="${nom}" name="${nom}" class="logo">
                                </a>
                        </div> 
                    </div>

                    <a href="${device['controleur']}?fabricant=${manufacturer}&device=${nom}">
                        <img src="img/${manufacturer}/${device.image}"card alt="${nom}" name="${nom}" class="image">                         
                    </a>

                    <div class="verticale"> 
                        <div class="horizontale">`
                            if(device.video !== undefined){
                                txthtml = txthtml + `
                                <h3>Demo</h3>
                                <a href="${device.video}" target="_blank">
                                    <img src="img/icnVideo.png" class="icn">
                                </a>`
                            }                
                            if(device.info !== undefined){
                                txthtml = txthtml + `
                                <h3>Information</h3>
                                <a href="${device.info}" target="_blank">
                                    <img src="img/icn-info.jpg" height="30" class="icn">
                                </a>`
                                }                                      
                                txthtml = txthtml + `  
                        </div> 

                        <div class="horizontale">`
                            if(device.ownerManual !== undefined){
                                txthtml = txthtml + `
                                <h3>Owner Manual</h3>
                                <a href="${device.ownerManual}" target="_blank">
                                    <img src="img/icn-owner-manual.jpg" height="30" class="icn">
                                </a>`
                            }
                            if(device.serviceManual !== undefined){
                                txthtml = txthtml + `
                                <h3>Service Manual</h3>
                                <a href="${device.serviceManual}" target="_blank">
                                    <img src="img/icn-service-manual.jpg" height="30" class="icn">
                                </a>`
                            }                                      
                            txthtml = txthtml + `  
                        </div>
                    </div>
                </label>
            `
            $('#synths').append(txthtml)
        }
    }
}

function minimaxiMiniPot(idPot){
    let minimaxi = Parametres.MINIMAXI_MINIPOT[idPot]
    if (minimaxi !== undefined){
        return minimaxi
    }else{
        return [0,127]            
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

class Parametres {
    static get SYSEX_CONTROL() {
        return 0
    }

    static get MINIMAXI_MINIPOT() {
        return [0, 127]
    }
}