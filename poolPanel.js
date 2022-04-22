/*
    Tony-Steel. 
    30/12/2021. 
    Projet d'application Web Midi
    Page The Pool
*/
/*-----------------------------------------------------------------------------------------------------------------------------*/

/* Mini Potentiometre */
/*let Yinit = 0;
let Yactuel = 0;
let Ychange = false;
let deplacementY = 0;
let angle = -150;
let valMidi = 0; 
let idPot;
let IdValPot;
let idFond;

/* Document OK */
$(document).ready(function(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    let fabricant = urlParams.get('fabricant')
    let device = urlParams.get('device')
    let synth = new Synth(fabricant, device)
    synth.afficheSynth()
    let webMidiApp = new WebMidiApp(SynthEnumerations.MANUFACT_ID_SYSEX[fabricant])
    
    /* Initialisations */
        initOscillo(2);    
        initMixer(2); 
        initFiltres(4); 
        initEnveloppes(4);
        initLFO(3);
        initVCA(2);
        initMaster();
        initEcran();
        initSeqStep(16);
    /*---*/

    /* Evénements bouton */
    $('.btn-pool').click(function(){
        let chk = $(this).attr("for");
        //console.log(chk);  
    });

    /* Evénements checkbox */    
    $('input').change(function(){
        let chk = $(this).attr("name");
        let idPot = 'pot-curs-' + chk.slice(4);
        let idVal = 'pot-val-' + chk.slice(4);
    
        if($(this).prop("checked")){
            console.log(idPot);  
            console.log(idVal);  
            $(`#${idPot}`).addClass('curseur-cir-actif');
            $(`#${idVal}`).addClass('pot-val-actif');
        }
        else{
            $(`#${idPot}`).removeClass('curseur-cir-actif');
            $(`#${idVal}`).removeClass('pot-val-actif');
        }   
    });
    /*-*/           



    $('.rd-pool').mousedown(function(){
        let rd = $(this).attr("for");
        console.log(rd);
    });    


    /* Evénements mini Potentiomètre */
    /* Valeur midi */
    $(`.pot-val`).click(function(){
        idPot = 'pot-curs-' + $(this).attr("name");
        IdValPot = $(this).attr("id") 
        idFond = 'pot-fond-' + $(this).attr("name");
    });

    $('.pot-val').change(function(){
        valMidi = $(this).val();
        if(valMidi < 0) valMidi = 0;
        if(valMidi > 127) valMidi = 127;
        afficheValeurMiniPot()
        angle = Math.floor(valMidi * (300/127) - 150);
        RotationMiniPot(idPot, angle);      
    });

    /* Souris */
    $('body').mousemove(function(event){ 
        $('.curseur-cir, .pot-lin').mousedown(function(){
            idPot = 'pot-curs-' + $(this).attr("name");
            IdValPot = 'pot-val-' + $(this).attr("name") 
            idFond = 'pot-fond-' + $(this).attr("name");           

            valMidi = $(`#${IdValPot}`).val();
            angle = Math.floor(valMidi * (300/127) - 150);
            Yinit = event.pageY; 
            deplacementY = 0;
            Ychange = true;
        });
        
        if (Ychange == true){        
            deplacementY = Yinit - event.pageY;
            angle = angle + deplacementY*5;
            Yinit = event.pageY; 
            deplacementY = 0;
            
            if( angle < -150){
                angle = -150;
            }
            if(angle >= 150){
                angle = 150;
            }
            
            valMidi = Math.floor(angle / (300/127) + 64)
            afficheValeurMiniPot(); 
            RotationMiniPot();                      
        }   
    });

    $("body").mouseup(function(){
        Ychange = false;
        angle = -150;
    });
    
    /*---*/

    function afficheValeurMiniPot(){   
        $(`#${IdValPot}`).val(valMidi); 
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
        });    
    };
    
    /*---*/

});

/*-----------------------------------------------------------------------------------------------------------------------------*/

/* Initialisation des Modules */

/* Construction d'un mini potentiomètre */
function constMiniPot(param, i, bouton, groupe){
    txthtml = `
        <!-- ${param} -->
        <div class="cell verticale">                             
            <div class="pot"> 
                <div class="pot-fond" id="pot-fond-${param}-${groupe}${i}"></div> 
                
                <div class="rep-graduations"></div>`
                if(bouton==false){
                    txthtml = txthtml + `<div id="pot-curs-${param}-${groupe}${i}" name="${param}-${groupe}${i}" class="curseur-cir curseur-cir-actif"></div>`
                }else{
                    txthtml = txthtml + `<div id="pot-curs-${param}-${groupe}${i}" name="${param}-${groupe}${i}" class="curseur-cir"></div>`                    
                }
                txthtml = txthtml + `<div class="pot-cir">
                    <div class="pot-lin" name="${param}-${groupe}${i}" id="pot-${param}-${groupe}${i}"></div>`
                    if(bouton==false){
                        txthtml = txthtml + `<input class="pot-val pot-val-actif" name="${param}-${groupe}${i}" id="pot-val-${param}-${groupe}${i}" value=0 min="0" max="127"></input>`
                    }else{
                        txthtml = txthtml + `<input class="pot-val" name="${param}-${groupe}${i}" id="pot-val-${param}-${groupe}${i}" value=0 min="0" max="127"></input>`
                    }    
                    txthtml = txthtml + `</div>
                </div>`
                
                if(bouton==true){
                    txthtml = txthtml + ` 
                    <input type="checkbox" name="chk-${param}-${groupe}${i}" id="chk-${param}-${groupe}${i}"></input>
                    <label class="checkbox btn-pot" for="chk-${param}-${groupe}${i}">${param}</label> `
                }else{
                    txthtml = txthtml + `<h3 class="etiq-pot">${param}</h3>`
                }
                txthtml = txthtml + `
        </div>`         
    return txthtml;
}
/* Initialisation Oscillateurs */
function initOscillo(nbOscillo){
    for(i=1; i<=nbOscillo; i++){
        if(i==1){
            j=2;
        }else{
            j=1;
        }

        /* VCO */
        $(`#vco${i}`).append(`
            <h2>VCO ${i}</h2>
            <div class="verticale">
                <div class="horizontale space-around">
                    <div class="cell-double horizontale space-around">
                        <div class="verticale">
                            <!-- Synchro -->
                            <h3>Synchro</h3>
                            <div class="horizontale">
                                <div>
                                    <input type="radio" id="rd-No-vco${i}" name="sync-vco${i}" checked>
                                    <label class="radio" for="rd-No-vco${i}">No</label> 
                                </div>
                                <div>
                                    <input type="radio" id="rd-Dig-vco${i}" name="sync-vco${i}">
                                    <label class="radio" for="rd-Dig-vco${i}">Dig${i}</label> 
                                </div>
                                <div>
                                    <input type="radio" id="rd-VCO-vco${i}" name="sync-vco${i}">
                                    <label class="radio" for="rd-VCO-vco${i}">VCO</label> 
                                </div>
                            </div>     

                            <!-- Range -->
                            <h3>Range</h3>
                            <div class="horizontale">
                                <div>
                                    <input type="radio" id="rd-32-vco${i}" name="range-vco${i}" checked>
                                    <label class="radio" for="rd-32-vco${i}">32'</label> 
                                </div>
                                <div>
                                    <input type="radio" id="rd-16-vco${i}" name="range-vco${i}">
                                    <label class="radio" for="rd-16-vco${i}">16'</label> 
                                </div>
                                <div>
                                    <input type="radio" id="rd-8-vco${i}" name="range-vco${i}">
                                    <label class="radio" for="rd-8-vco${i}">8'</label> 
                                </div>
                                <div>
                                    <input type="radio" id="rd-4-vco${i}" name="range-vco${i}">
                                    <label class="radio" for="rd-4-vco${i}">4'</label> 
                                </div>
                            </div> 
                        </div>
                    </div>
                        
                    <!-- FM -->
                    <div class="cell">
                        <input type="checkbox" name="chk-fm-vco${i}" id="chk-fm-vco${i}"></button>
                        <label class="checkbox btn-pool" for="chk-fm-vco${i}">FM</label> 
                    </div>`
                    + constMiniPot('Semi', i, false, 'VCO') + ` `
                    + constMiniPot('Tune', i, true, 'VCO') + 
                `</div> 
            </div>  

            <div class="verticale">
                <div class="horizontale space-around">`
                + constMiniPot('Saw', i, true, 'VCO') + ` `
                + constMiniPot('Tri', i, true, 'VCO') + ` `                   
                + constMiniPot('PW', i, true, 'VCO') + ` `                   
                + constMiniPot('PWM', i, true, 'VCO') + ` `                   
                + constMiniPot('Ext', i, true, 'VCO') +                   
                `</div>
            </div>   
        `); 
        
        /* DCO */
        $(`#dco${i}`).append(`
            <h2>Digit ${i}</h2>
            <div class="horizontale space-around">
                <div class="verticale">
                    <div class="cell-demi-double">
                        <div class="horizontale cell">
                            <input type="checkbox" name="chk-A2D-digit${i}" id="chk-A2D-digit${i}"></button>
                            <label class="checkbox btn-pool" for="chk-A2D-digit${i}">A2D</label> 
                        </div>
                        <div class="horizontale cell">
                            <input type="checkbox" name="chk-ADD-digit${i}" id="chk-ADD-digit${i}"></button>
                            <label class="checkbox btn-pool" for="chk-ADD-digit${i}">ADD</label> 
                        </div>
                    </div>
                    <div class="cell-demi-double">
                        <div class="horizontale cell">
                            <input type="checkbox" name="chk-Wave-digit${i}" id="chk-Wave-digit${i}"></button>
                            <label class="checkbox btn-pool" for="chk-Wave-digit${i}">Wave</label> 
                        </div>
                        <div class="horizontale cell">
                            <input type="checkbox" name="chk-FM-digit${i}" id="chk-FM-digit${i}"></button>
                            <label class="checkbox btn-pool" for="chk-FM-digit${i}">FM</label> 
                        </div>
                    </div>
                </div>`
                + constMiniPot('Param', i, true, 'Digit') + ` `
                + constMiniPot('Semi', i, false, 'Digit') + ` `
                + constMiniPot('Tune', i, true, 'Digit') + 
            `</div>
        `); 
    };
};

/* Initialisation Mixers */
function initMixer(nbMixer){
    for(i=1; i<=nbMixer; i++){
        if(i==1){
            j='3-4';
        }else{
            j='1-2';
        }

        $(`#mix${i}`).append(` 
            <h2>Mix ${i}</h2>
            <div class="verticale">`
            + constMiniPot('VCO1', i, true, `Mix`) + ` `
            + constMiniPot('VCO2', i, true, `Mix`) + ` `
            + constMiniPot(`VCF${j}`, i, true, `Mix`) + ` `
            + constMiniPot(`Digit${i}`, i, true, `Mix`) + 
            `</div>
        `);
    };    
};

/* Initialisation Filtres */
function initFiltres(nbFiltre){
    for(i=1; i<=nbFiltre; i++){
        if (i%2 == 0){
            //pair
            fPass1='BP'
            fPass2='HP'
            chF1='par'
            chF2='ser'
            if(i==2)vcf='VCF1-2'
            if(i==4)vcf='VCF3-4'
        }
        else{
            //impair
            fPass1='12db'
            fPass2='24db'
            if(i==1){
                chF1='Dig1'
                chF2='VCO2'
            }
            if(i==3){
                chF1='Dig2'
                chF2='VCO1'
            }
            vcf='FM';
        }

        $(`#vcf${i}`).append(` 
            <h2>VCF ${i}</h2>
            <div class="verticale">
                <div class="horizontale space-around">
                    <div class="horizontale space-around">
                        <!-- db -->
                        <div class="cell-demi-double">
                            <div>
                                <input type="radio" id="rd-${fPass1}-vcf${i}" name="filtre-bande-vcf${i}" checked>
                                <label class="radio" for="rd-${fPass1}-vcf${i}">${fPass1}</label> 
                            </div>
                            <div>
                                <input type="radio" id="rd-${fPass2}-vcf${i}" name="filtre-bande-vcf${i}">
                                <label class="radio" for="rd-${fPass2}-vcf${i}">${fPass2}</label> 
                            </div>
                        </div>
                    
                        <!-- Env -->
                        <div class="cell-demi-double">
                            <div>
                                <input type="radio" id="rd-Env1-vcf${i}" name="filtre-env-vcf${i}" checked>
                                <label class="radio" for="rd-Env1-vcf${i}">Env1</label> 
                            </div>
                            <div>
                                <input type="radio" id="rd-Env2-vcf${i}" name="filtre-env-vcf${i}">
                                <label class="radio" for="rd-Env2-vcf${i}">Env2</label> 
                            </div>
                            <div>
                                <input type="radio" id="rd-EnvF-vcf${i}" name="filtre-env-vcf${i}">
                                <label class="radio" for="rd-EnvF-vcf${i}">EnvF</label> 
                            </div>
                        </div>

                        <!-- Digit / VCO -->                                    
                        <div class="cell-demi-double">
                            <div>
                                <input type="radio" id="rd-${chF1}-vcf${i}" name="filtre-chain-vcf${i}" checked>
                                <label class="radio" for="rd-${chF1}-vcf${i}">${chF1}</label> 
                            </div>
                            <div>
                                <input type="radio" id="rd-${chF2}-vcf${i}" name="filtre-chain-vcf${i}">
                                <label class="radio" for="rd-${chF2}-vcf${i}">${chF2}</label> 
                            </div>
                        </div>
                            
                    </div>                            
                </div> 
            </div>  
            <div class="verticale">
                <div class="horizontale space-around">`
                + constMiniPot('Freq', i, true, `VCF`) + ` `
                + constMiniPot('Q', i, true, `VCF`) + ` `
                + constMiniPot(`Env`, i, true, `VCF`) + ` `
                + constMiniPot(`Key`, i, false, `VCF`) + ` `
                + constMiniPot(`${vcf}`, i, true, `VCF`) + 
                `</div>
            </div> 
        `);
    };    
};

/* Initialisation Enveloppes */
function initEnveloppes(nbEnv){
    for(i=1; i<=nbEnv; i++){
        j=i;
        if(i == 3) j='F';
        if(i == 4) j='M';

        $(`#env${j}`).append(` 
            <h2>Env ${j}</h2>
            <div class="horizontale space-around">`
            + constMiniPot('Attack', j, true, `Env`) + ` `
            + constMiniPot('Decay', j, true, `Env`) + ` `
            + constMiniPot(`Sustain`, j, true, `Env`) + ` `
            + constMiniPot(`Release`, j, true, `Env`) + 
            `</div>
        `);

        if(i > 2){
            $(`#env${j} > div`).append(``
                + constMiniPot(`Curve`, j, true, `Env`) + ` `
            );
        }
    };    
};

/* Initialisation LFO */
function initLFO(nblfo){
    for(i=1; i<=nblfo; i++){
        $(`#lfo${i}`).append(` 
            <h2>LFO ${i}</h2>
            <div class="horizontale">`
            + constMiniPot('Wave', i, false, `LFO`) + ` `
            + constMiniPot(`Rate`, i, true, `LFO`) + ` `
            + constMiniPot(`Level`, i, true, `LFO`) + 
            `<!-- Option -->
                <div class="verticale cell">
                    <h3 class="etiq-pool">Option</h3>
                    <input type="checkbox" name="chk-Tap-LFO${i}" id="chk-Tap-LFO${i}"></button>
                    <div class="verticale cell">
                        <label class="checkbox btn-pool" for="chk-Tap-LFO${i}">Tap</label> 
                    </div>
                </div>
            </div>
        `);
    };    
};

/* Initialisation Master */
function initMaster(){
    $('#master').append(`
        <h2>Master</h2>
        <div class="horizontale space-around">`
        + constMiniPot('Morph1', '', false, `Master`) + ` `
        + constMiniPot(`Morph2`, '', false, `Master`) + 
        `<!-- Général -->
            <div class="verticale">
                <div class="cell-demi-double">
                    <div class="horizontale cell">
                        <input type="checkbox" name="chk-Load-master" id="chk-Load-master"></button>
                        <label class="checkbox btn-pool" for="chk-Load-master">Load</label> 
                    </div>
                    <div class="horizontale cell">
                        <input type="checkbox" name="chk-Save-master" id="chk-Save-master"></button>
                        <label class="checkbox btn-pool" for="chk-Save-master">Save</label> 
                    </div>
                </div>
                <div class="cell-demi-double">
                    <div class="horizontale cell">
                        <input type="checkbox" name="chk-System-master" id="chk-System-master"></button>
                        <label class="checkbox btn-pool" for="chk-System-master">System</label> 
                    </div>
                    <div class="horizontale cell">
                        <input type="checkbox" name="chk-Option-master" id="chk-Option-master"></button>
                        <label class="checkbox btn-pool" for="chk-Option-master">Option</label> 
                    </div>
                </div>
            </div>`
                + constMiniPot(`Master`, '', false, `Master`) + 
            `</div>

        <!-- Channels -->
        <div class="horizontale">
            <div class="cell-demi-double">
                <div class="horizontale cell">
                    <input type="checkbox" name="chk-ch1-master" id="chk-ch1-master"></button>
                    <label class="checkbox btn-pool" for="chk-ch1-master">Ch 1</label> 
                </div>
                <div class="horizontale cell">
                    <input type="checkbox" name="chk-ch2-master" id="chk-ch2-master"></button>
                    <label class="checkbox btn-pool" for="chk-ch2-master">Ch 2</label> 
                </div>
            </div>
            <div class="cell-demi-double">
                <div class="horizontale cell">
                    <input type="checkbox" name="chk-ch3-master" id="chk-ch3-master"></button>
                    <label class="checkbox btn-pool" for="chk-ch3-master">Ch 3</label> 
                </div>
                <div class="horizontale cell">
                    <input type="checkbox" name="chk-ch4-master" id="chk-ch4-master"></button>
                    <label class="checkbox btn-pool" for="chk-ch4-master">Ch 4</label> 
                </div>
            </div>
        </div>

        <!-- Mode -->                    
        <div class="horizontale space-around">
            <!-- Op -->
            <div class="cell-demi-double">
                <div>
                    <input type="radio" id="rd-Op1-mode" name="mode-op" checked>
                    <label class="radio" for="rd-Op1-mode">Op1</label> 
                </div>
                <div>
                    <input type="radio" id="rd-Op2-mode" name="mode-op">
                    <label class="radio" for="rd-Op2-mode">Op2</label> 
                </div>
            </div>

            <!-- Mode -->
            <div class="cell-demi-double">
                <div>
                    <input type="radio" id="rd-Mono-mode" name="mode" checked>
                    <label class="radio" for="rd-Mono-mode">Mono</label> 
                </div>
                <div>
                    <input type="radio" id="rd-Dual-mode" name="mode">
                    <label class="radio" for="rd-Dual-mode">Dual</label> 
                </div>
                <div>
                    <input type="radio" id="rd-Midi-mode" name="mode">
                    <label class="radio" for="rd-Midi-mode">Midi</label> 
                </div>
                <div>
                    <input type="radio" id="rd-Poly-mode" name="mode">
                    <label class="radio" for="rd-Poly-mode">Poly</label> 
                </div>
            </div>

            <!-- Init/Query/Show -->                                    
            <div class="cell-demi-double">
                <div>
                    <input type="radio" id="rd-Init-mode" name="mode-iqs" checked>
                    <label class="radio" for="rd-Init-mode">Init</label> 
                </div>
                <div>
                    <input type="radio" id="rd-Query-mode" name="mode-iqs">
                    <label class="radio" for="rd-Query-mode">Query</label> 
                </div>
                <div>
                    <input type="radio" id="rd-Show-mode" name="mode-iqs">
                    <label class="radio" for="rd-Show-mode">Show</label> 
                </div>
            </div>
        </div> 
    `);
};

/* Initialisation VCA */
function initVCA(nbvca){
    for(i=1; i<=nbvca; i++){
        $(`#vca${i}`).append(` 
            <h2>VCA ${i}</h2>
            <div class="horizontale">`
                + constMiniPot(`Env${i}`, i, true, `VCA`) + ` `
                + constMiniPot(`Init`, i, true, `VCA`) + ` `
                + constMiniPot(`Pan`, i, true, `VCA`) + 
            `<!-- Mute -->
                <div class="cell">
                    <input type="checkbox" name="chk-Mute-vca${i}" id="chk-Mute-vca${i}"></button>
                    <label class="checkbox btn-pool" for="chk-Mute-vca${i}">Mute</label> 
                </div>
            </div>
        `);
    };    
};

/* screen */
function initEcran(){
    $('#screen').append(`
        <div class="affichage verticale">
            <img src="img/Baloran/The Pool.svg"  height="120">
            <img src="img/Baloran/Baloran Logo.svg"  height="80">
        </div>
    `)
}

/* Initialisation Sequencer */
function initSeqStep(nbstep){
    for(i=1; i<=nbstep/2; i++){
        $(`#seqStep`).append(` 
            <div id="grpStep${i}" class="horizontale"></div>
        `);
    };

    for(i=1; i<=nbstep; i++){
        $(`#grpStep${Math.ceil(i/2)}`).append(
            constMiniPot(`${i}`, i, true, `Seq`) + ` `
        );
    }; 
    
    $('#seqCmd').append(`
        <div class="horizontale">
            <div class="cell-demi-double">
                <div class="horizontale cell">
                    <input type="checkbox" name="chk-Seq-seq" id="chk-Seq-seq"></button>
                    <label class="checkbox btn-pool" for="chk-Seq-seq">Seq</label> 
                </div>
                <div class="horizontale cell">
                    <input type="checkbox" name="chk-Arp-mastseqr" id="chk-Arp-seq"></button>
                    <label class="checkbox btn-pool" for="chk-Arp-seq">Arp</label> 
                </div>
            </div>
            <div class="cell-demi-double">
                <div class="horizontale cell">
                    <input type="checkbox" name="chk-Clock-seq" id="chk-Clock-seq"></button>
                    <label class="checkbox btn-pool" for="chk-Clock-seq">Clock</label> 
                </div>
                <div class="horizontale cell">
                    <input type="checkbox" name="chk-Cmd-seq" id="chk-Cmd-seq"></button>
                    <label class="checkbox btn-pool" for="chk-Cmd-seq">Cmd</label> 
                </div>
            </div>
        </div>
        <div class="horizontale">
            <div class="cell-demi-double">
                <div class="horizontale cell">
                    <input type="checkbox" name="chk-Tap-seq" id="chk-Tap-seq"></button>
                    <label class="checkbox btn-pool" for="chk-Tap-seq">Tap</label> 
                </div>
                <div class="horizontale cell">
                    <input type="checkbox" name="chk-Pause-seq" id="chk-Pause-seq"></button>
                    <label class="checkbox btn-pool" for="chk-Pause-seq">Pause</label> 
                </div>
            </div>
            <div class="cell-demi-double">
                <div class="horizontale cell">
                    <input type="checkbox" name="chk-Play-seq" id="chk-Play-seq"></button>
                    <label class="checkbox btn-pool" for="chk-Play-seq">Play</label> 
                </div>
                <div class="horizontale cell">
                    <input type="checkbox" name="chk-Rec-seq" id="chk-Rec-seq"></button>
                    <label class="checkbox btn-pool" for="chk-Rec-seq">Rec</label> 
                </div>
            </div>                        
        </div>
    `);
};

/*-----------------------------------------------------------------------------------------------------------------------------*/
/* Midi Standard */
    /* Initialisation : Affichage du clavier */ 
    afficherClavier();

    /* Potentiomètre Midi Control Change Standard */
    constPotentiometre($(`#stdMidiCtrlChg`));

/*-----------------------------------------------------------------------------------------------------------------------------*/
