/*
    Tony-Steel. 
    30/12/2021. 
    Projet d'application Web Midi
    API Midi Web : Gestion des commandes Midi standards
*/
/*-----------------------------------------------------------------------------------------------------------------------------*/

class WebMidiApp { 
    constructor(manufacturerIdSysex) {
        this.manufacturerIdSysex = manufacturerIdSysex
        this.setup()
        }

    setup() {
        // Active WebMidi.js et déclenche la fonction onEnabled() lorsque c'est prêt.
        // https://webmidijs.org/docs/getting-started/basics
        WebMidi // ligne 7703
        .enable({sysex: true})
        //.then(() => console.log("Les messages exclusifs du système sont activés"))
        .then(this.onEnabled)
        .catch(err => alert(err));
    }

    onEnabled() { 
        /* Midi */        
        let chnMidiIn = $('#chnMidiIn').val()
        let chnMidiOut = $('#chnMidiOut').val()
        let activeThru = $('#activeThru')
        activeThru.checked = true // Midi Thru actif par défaut

        /* Midi Interface */
        let intMidi = $('.intMidi')
        let intMidiList = ['Non reconnue !']

        // Reconnaissance de l'interface Midi
        if (WebMidi.inputs.length <= 0) {
            alert("Interface Midi non reconnue !")
        } else {
            WebMidi.inputs.forEach((device, index) => {
                intMidiList[index] = device.name          
            });
        }
        alimListe(intMidi, intMidiList)
        afficheIntDetected(intMidiList)
        let SynthIn = WebMidi.inputs[0];
        let SynthOut = WebMidi.outputs[0];

        /* Interface id & Midi Channel In */  
        $('#intMidiIn').change(function() {
            SynthIn = WebMidi.inputs[$(this).val()];
        });
        $('#chnMidiIn').change(function(){            
            chnMidiIn = $(this).val(); 
        });

        /* Interface id & Midi Channel Out */        
        $('#intMidiOut').change(function() {
            SynthOut = WebMidi.outputs[$(this).val()];
        });        
        $('#chnMidiOut').change(function(){
            chnMidiOut = $(this).val();  
        });

        /*------------------------------------------------------------------------------------------------------------------------*/

        /* Midi In */
        $(activeThru).change(function(){
            if (activeThru.checked == true){
                activeThru.checked = false
            }
            else{
                activeThru.checked = true
            }
        })

        /* Note On : ligne 2114 */
        SynthIn.channels[chnMidiIn].addListener("noteon", e => {
            $('#noteIn').remove()
            $('#noteMidiIn ').append(`<h3 id="noteIn"><p>${e.note.identifier}</p></h3>`)
            $('#velIn').remove()
            $('#velMidiIn ').append(`<h3 id="velIn"><p>${e.note.rawAttack}</p></h3>`)
            if (activeThru.checked == true){
                let options = {rawAttack: e.note.rawAttack}
                SynthOut.channels[chnMidiOut].playNote(e.note.number, options); //2309
                afficheNoteOn(e.note.number, e.note.accidental)
            }
        })

        $('.tchBlanche, .tchNoire').mousedown(function(){
            let note = $(this).attr("id").slice(4)
            SynthOut.channels[chnMidiOut].playNote(note)                
        })

        /* Note off : ligne 2259 */
        SynthIn.channels[chnMidiIn].addListener("noteoff", e => {
            $('#relIn').remove()
            $('#relMidiIn ').append(`<h3 id="relIn"><p>${e.note.rawRelease}</p></h3>`)
            if (activeThru.checked == true){
                let options = {rawRelease: e.note.rawRelease}
                SynthOut.channels[chnMidiOut].stopNote(e.note.number, options)
                afficheNoteOff(e.note.number, e.note.accidental)
            } 
        }) 

        $('.tchBlanche, .tchNoire').mouseup(function(){
            let note = $(this).attr("id").slice(4)
            SynthOut.channels[chnMidiOut].stopNote(note)                
        })

        /* Pitch Bend  Ligne 2686 */
        // voir aussi sendPitchBendRange(semitones, cents, options = {}) Ligne 2759
        SynthIn.channels[chnMidiIn].addListener("pitchbend", e => {
            $('#pitchIn').remove()
            $('#pitchMidiIn ').append(`<h3 id="pitchIn"><p>${e.value}</p></h3>`)
            if (activeThru.checked == true){
                SynthOut.channels[chnMidiOut].sendPitchBend(e.value)
            }  
        })
        
        /* Aftertouch (Ligne 1591) */
        SynthIn.channels[chnMidiIn].addListener("keyaftertouch", e => {
            $('#aftchIn').remove()
            $('#aftchMidiIn').append(`<h3 id="aftchIn"><p>${e.rawValue}</p></h3>`)
            if (activeThru.checked == true){
                SynthOut.channels[chnMidiOut].sendKeyAftertouch(eNote, e.value)
            }                
        })

        // Panic Ligne 2993 : sendAllNotesOff(options = {})
        $("#panicMidi").click(function(){
            SynthOut.channels[chnMidiOut].sendAllNotesOff()
            $(`.tchBlanche`).removeClass("tchBlancheClic")     
            $(`.tchNoire`).removeClass("tchNoireClic")     
        })

        /* Program Change (Ligne 1625) */
            //Programme change Ligne 2795 : sendProgramChange(program, options = {}) 
        SynthIn.channels[chnMidiIn].addListener("programchange", e => {
            $('#prgChgIn').remove()
            $('#pgChgMidiIn ').append(`<h3 id="prgChgIn"><p>${e.value}</p></h3>`)
            if (activeThru.checked == true){
                SynthOut.channels[chnMidiOut].sendProgramChange(e.value,0)
                $('#pgChgMidiOut').val(e.value)
            }
        })
        $('#pgChgMidiOut').change(function(){ 
            SynthOut.channels[chnMidiOut].sendProgramChange($(this).val(),0)
        })

        /* Bank Change */
        $('#bkChgMidiOut').change(function(){ 
            SynthOut.channels[chnMidiOut].sendControlChange(0, $(this).val())
        })

        /* Control Change (Ligne 1625) */
        SynthIn.channels[chnMidiIn].addListener("controlchange", e => {
            $('#cChgNumIn').remove()
            $('#cChgNumMidiIn ').append(`<h3 id="cChgNumIn"><p>${e.controller.number}</p></h3>`)
            $('#cChgIn').remove()
            $('#cChgMidiIn').append(`<h3 id="cChgIn"><p>${e.rawValue}</p></h3>`)
            /*-*/
            if (activeThru.checked == true){
                SynthOut.channels[chnMidiOut].sendControlChange(e.controller.number,e.rawValue)
                $('#cChgMidiOut').val(e.rawValue)
                $('#cChgNumMidiOut').val(e.controller.number)
                let angle = Math.floor(e.rawValue * (300/127) - 150)
                RotationPot(angle)
            }
        })

        $('#cChgMidiOut').change(function(){ 
            SynthOut.channels[chnMidiOut].sendControlChange(Number($('#cChgNumMidiOut').val()), $(this).val())
            let angle = Math.floor($(this).val() * (300/127) - 150)
            RotationPot(angle)
        })

        $(".bille-cont").mousemove(function(){        
            SynthOut.channels[chnMidiOut].sendControlChange(Number($('#cChgNumMidiOut').val()), $('#cChgMidiOut').val())
        })
        /*---*/

        /*------------------------------------------------------------------------------------------------------------------------*/
        /* Patch */ 


        /* ---- Sysex ---- */
        let manufacturerIdSysex = SynthEnumerations.MANUFACT_ID_SYSEX[$(`#fabricant`).text()]
        if(manufacturerIdSysex === undefined){
            alert=("identifiant sysex fabricant non reconnu !")
        }

        /* Mini Potentiometre */
        let Yinit = 0
        let Ychange = false
        let deplacementY = 0
        let angle = -150
        let valMidi = 0
        let name = ''
        let id = ''
        let idPot
        let IdValPot
        let idFond
        let control = ''

        let minmax = minimaxiMiniPot('')
        //let mini = minmax[0]
        let maxi = minmax[1]

        /* Evénements bouton */         
        $('button').click(function(){
            id = $(this).attr("id");  
            control = Parametres.SYSEX_CONTROL[id]
            if(control !== undefined){  
                valMidi = $(this).val() 
                envoiSysex(manufacturerIdSysex, SynthOut, chnMidiOut, control, valMidi)
            }
        });
        /*-*/

        /* Evénements spinner */         
        $('input[type=number]').change(function(){
            id = $(this).attr("id");            
            control = Parametres.SYSEX_CONTROL[id]            
            if(control !== undefined){ 
                valMidi = $(this).val()   
                envoiSysex(manufacturerIdSysex, SynthOut, chnMidiOut, control, valMidi)
            }
        });
        /*-*/   

        /* Evénements checkbox */         
        $('input[type=checkbox]').change(function(){
            name = $(this).attr("name");

            // miniPot
            idPot = 'pot-curs-' + name.slice(4);
            IdValPot = 'pot-val-' + name.slice(4);
            if($(this).prop("checked")){
                $(`#${idPot}`).addClass('curseur-cir-actif');
                $(`#${IdValPot}`).addClass('pot-val-actif');
                valMidi = 1
            }
            else{
                $(`#${idPot}`).removeClass('curseur-cir-actif');
                $(`#${IdValPot}`).removeClass('pot-val-actif');
                valMidi = 0
            }
            /*-*/

            control = Parametres.SYSEX_CONTROL[name]
            if(control !== undefined){   
                envoiSysex(manufacturerIdSysex, SynthOut, chnMidiOut, control, valMidi)
            }else{
                control = Parametres.GLOBAL_CONTROL[name] 
                if(control !== undefined){   
                    if (valMidi == 1){valMidi = 0x7F}
                    let octet1 = "0x" + ("B" + (chnMidiOut-1).toString(16)).toString(16)
                    envoiSysexGlobal(SynthOut, chnMidiOut, [octet1, control, valMidi])
                }    
            }  
        });
        /*-*/            

        /* Evénements radio bouton */    
        $('input[type=radio]').change(function(){
            name = $(this).attr("name");
            id = $(this).attr("id");            
            control = Parametres.SYSEX_CONTROL[name]
            if(control !== undefined){ 
                valMidi = Parametres.SYSEX_VALUE[id]
                envoiSysex(manufacturerIdSysex, SynthOut, chnMidiOut, control, valMidi)
            }
        });

        /* Evénements selecteur (menu déroulant) */
        $('select').change(function(){
            name = $(this).attr("name");          
            control = Parametres.SYSEX_CONTROL[name]
            if(control !== undefined){ 
                valMidi = $(this).val()
                envoiSysex(manufacturerIdSysex, SynthOut, chnMidiOut, control, valMidi)
            }
        });


        /* Evénements mini Potentiomètre */
        /* Valeur midi */
        $(`.pot-val`).click(function(){
            idPot = 'pot-curs-' + $(this).attr("name");
            IdValPot = $(this).attr("id") 
            idFond = 'pot-fond-' + $(this).attr("name");
        });

        $('.pot-val').change(function(){
            minmax = minimaxiMiniPot(IdValPot)
            //mini = minmax[0]
            maxi = minmax[1]

            valMidi = $(this).val();
            if(valMidi < 0) valMidi = 0;
            if(valMidi > maxi) valMidi = maxi;
            valMidi = Number(valMidi)
            afficheValeurMiniPot()
            angle = Math.floor(valMidi * (300/maxi) - 150);
            RotationMiniPot(idPot, angle);      
        });

        /* Souris mini potentiomètre */
        $('.module').mousemove(function(event){ 
            $('.curseur-cir, .pot-lin').mousedown(function(){
                idPot = 'pot-curs-' + $(this).attr("name");
                IdValPot = 'pot-val-' + $(this).attr("name") 
                idFond = 'pot-fond-' + $(this).attr("name"); 
                
                minmax = minimaxiMiniPot(IdValPot)
                //mini = minmax[0]
                maxi = minmax[1]

                valMidi = $(`#${IdValPot}`).val();
                angle = Math.floor(valMidi * (300/maxi) - 150);
                Yinit = event.pageY; 
                deplacementY = 0;
                Ychange = true;
            });
            
            if (Ychange == true){        
                deplacementY = Yinit - event.pageY;
                angle = angle + deplacementY*4;
                Yinit = event.pageY; 
                deplacementY = 0;
                
                if( angle < -150){
                    angle = -150;
                }
                if(angle >= 150){
                    angle = 150;
                }
                
                let pointMilieu = maxi/2
                if (maxi%2 != 0) {
                    pointMilieu = (maxi+1)/2
                }
                valMidi = Math.floor(angle / (300/maxi) + pointMilieu)
                RotationMiniPot();                      
                afficheValeurMiniPot(); 
            }   
        });

        $("body").mouseup(function(){
            Ychange = false;
            angle = -150;
        });

        /*---*/

        /* Fonctions onEnabled */
        function afficheValeurMiniPot(){  
            let sysex = [] 
            $(`#${IdValPot}`).val(valMidi); 

            control = Parametres.SYSEX_CONTROL[IdValPot]
            if(control !== undefined){   
                sysex = envoiSysex(manufacturerIdSysex, SynthOut, chnMidiOut, control, valMidi)
            }else{
                control = Parametres.GLOBAL_CONTROL[IdValPot] 
                if(control !== undefined){   
                    let octet1 = "0x" + ("B" + (chnMidiOut-1).toString(16)).toString(16)
                    sysex = envoiSysexGlobal(SynthOut, chnMidiOut, [octet1, control, valMidi])
                }    
            }
        };
        

        function RotationMiniPot(){   
            $(`#${idPot}`).animate(
                {deg: angle},
                {
                    duration: 0,
                    step: function(angle) {
                    $(this).css({transform: 'rotate('+ angle + 'deg)'});
                    $(`#${idFond}`).css({transform: 'rotate('+ -angle + 'deg)'});
                }            
            })  
        }
    }
}
/*---*/

/* Fonctions hors classe */ 

function visualisationSysex(sysex){
    let visuSysex = ""
    for(i=0; i<sysex.length; i++){
        if (sysex[i].toString(16).length <= 1){
            visuSysex = visuSysex + "0"
        }
        if (sysex[i].toString(16).length > 2){
            sysex[i] = sysex[i].slice(sysex[i].toString(16).length - 2)
        }
        visuSysex = visuSysex + sysex[i].toString(16) + " "
    }
    $('#visuSysex').remove();
    $('#sysex').append(`<p id="visuSysex">${visuSysex}</p>`);
}