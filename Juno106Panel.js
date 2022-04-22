/*
    Tony-Steel. 
    17/02/2022. 
    Projet d'application Web Midi
    Page Juno Controler
*/

/* Authentifiants fabricants Sysex
https://www.midi.org/specifications-old/item/manufacturer-id-numbers
    let Roland = 0x41
/*-*/
/*-----------------------------------------------------------------------------------------------------------------------------*/

/* Document OK */
$(document).ready(function(){
    /* Initialisations */
    constPotentiometre($(`#stdMidiCtrlChg`));
    afficherClavier();

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    let fabricant = urlParams.get('fabricant')
    let device = urlParams.get('device')
    let synth = new Synth(fabricant, device)
    synth.afficheSynth()
    let webMidiApp = new WebMidiApp(SynthEnumerations.MANUFACT_ID_SYSEX[fabricant])

    DCO();
    VCF() 
    VCA()
    Enveloppe()
    LFO()
    Chorus()
    /*---*/

});

/* Initialisation des Modules */
$(`#global`).append(`
        <h2>Pedale</h2>
        <div class="horizontale">
            <div class="verticale">
                <div>
                    <input type="checkbox" id="hold" name="hold">
                    <label class="checkbox" for="hold">Hold</label> 
                </div>  
            </div> 
        </div>       
    `)

function DCO(){
    let miniPotDCOLFODeph = new MiniPot('DCO', '', 'LFO-Deph', 0, false)
    let miniPotDCOPWM = new MiniPot('DCO', '', 'PWM', 0, false)
    let miniPotDCONoise = new MiniPot('DCO', '', 'Noise', 0, false)
    let miniPotDCOSub = new MiniPot('DCO', '', 'Sub', 0, false)

    $(`#dco`).append(`
        <h2>DCO</h2>
        <div class="horizontale space-around">
            <div class="verticale">                    
                <div class="verticale">
                    <div class="horizontale">
                        <div>
                            <input type="radio" id="range16" name="range" checked>
                            <label class="radio" for="range16">16'</label> 
                        </div>
                        <div>
                            <input type="radio" id="range8" name="range">
                            <label class="radio" for="range8">8'</label> 
                        </div>
                        <div>
                            <input type="radio" id="range4" name="range">
                            <label class="radio" for="range4">4'</label> 
                        </div>                
                    </div> 
                    <h3>Range</h3>               
                </div> 
            </div> 
            <div class="verticale">   
                <div class="horizontale">                      
                        `+ miniPotDCOLFODeph.constMiniPot() + `                    
                        `+ miniPotDCOPWM.constMiniPot() + `                          
                </div> 
                <div class="horizontale">
                    <input type="radio" id="pwmlfo" name="pwmmode" checked>
                    <label class="radio" for="pwmlfo">LFO</label>

                    <input type="radio" id="pwmmanual" name="pwmmode">
                    <label class="radio" for="pwmmanual">Manual</label>  
                </div>                   
            </div>  

            <div class="verticale"> 
                <div class="horizontale">
                    <input type="checkbox" name="pulse" id="pulse"></button>
                    <label class="checkbox" for="pulse">Pulse</label> 

                    <input type="checkbox" name="saw" id="saw"></button>
                    <label class="checkbox" for="saw">Saw</label> 
                </div>
                <h3>Waveform</h3>
            </div>

            `+ miniPotDCONoise.constMiniPot() + ` 
            `+ miniPotDCOSub.constMiniPot() + ` 
        </div>       
    `)
}

function VCF(){
    let miniPotVCFCutoff = new MiniPot('VCF', '', 'Cutoff', 0, false)
    let miniPotVCFResonance = new MiniPot('VCF', '', 'Resonance', 0, false)
    let miniPotVCFEnv = new MiniPot('VCF', '', 'Env', 0, false)
    let miniPotVCFLFODeph = new MiniPot('VCF', '', 'LFO-Deph', 0, false)
    let miniPotVCFKeyFlw = new MiniPot('VCF', '', 'Key-Flw', 0, false)

    $(`#vcf`).append(`
        <h2>VCF</h2>
        <div class="horizontale space-around">   
            <div class="verticale">
                <div class="horizontale">   
                    <h3>HPF</h3>
                    <input type="radio" id="hpfoff" name="hpf" checked>
                    <label class="radio" for="hpfoff">off</label> 
                </div>    
                
                <div class="horizontale">
                    <input type="radio" id="hpf1" name="hpf">
                    <label class="radio" for="hpf1">1</label> 
                
                    <input type="radio" id="hpf2" name="hpf">
                    <label class="radio" for="hpf2">2</label> 
                
                    <input type="radio" id="hpf3" name="hpf">
                    <label class="radio" for="hpf3">3</label> 
                </div>                
            </div>          
            `+ miniPotVCFCutoff.constMiniPot() + ` 
            `+ miniPotVCFResonance.constMiniPot() + ` 
            <div class="verticale">
                `+ miniPotVCFEnv.constMiniPot() + ` 
                <div> 
                    <input type="checkbox" id="vcfenvinv" name="vcfenv">
                    <label class="checkbox" for="vcfenvinv">Reverse</label>
                </div>  
            </div>
            `+ miniPotVCFLFODeph.constMiniPot() + `
            `+ miniPotVCFKeyFlw.constMiniPot() + ` 
        </div>  
    `) 
}    

function VCA(){
    let miniPotVCALevel = new MiniPot('VCA', '', 'Level', 0, false)

    $(`#vca`).append(`
        <h2>VCA</h2>
        `+ miniPotVCALevel.constMiniPot() + ` 
        <div class="horizontale"> 
            <div class="cell">
                <input type="radio" id="vcamodeenv" name="vcamode" checked>
                <label class="radio" for="vcamodeenv">Env</label> 
            </div>
            <div class="cell">
                <input type="radio" id="vcamodegate" name="vcamode">
                <label class="radio" for="vcamodegate">Gate</label> 
            </div>
        </div>    
    `) 
}

function Enveloppe(){
    let miniPotEnvAttack = new MiniPot('Env', '', 'Attack', 0, false)
    let miniPotEnvDecay = new MiniPot('Env', '', 'Decay', 0, false)
    let miniPotEnvSustain = new MiniPot('Env', '', 'Sustain', 0, false)
    let miniPotEnvRelease = new MiniPot('Env', '', 'Release', 0, false)

    $(`#env`).append(`
        <h2>Enveloppe</h2>
        <div class="horizontale">  
            `+ miniPotEnvAttack.constMiniPot() + ` 
            `+ miniPotEnvDecay.constMiniPot() + ` 
            `+ miniPotEnvSustain.constMiniPot() + `
            `+ miniPotEnvRelease.constMiniPot() + ` 
        </div> 
    `)    
}

function LFO(){
    let miniPotLFORate = new MiniPot('LFO', '', 'Rate', 0, false)
    let miniPotLFODelay = new MiniPot('LFO', '', 'Delay', 0, false)

    $(`#lfo`).append(`
        <h2>LFO</h2>
        <div class="horizontale">  
            `+ miniPotLFORate.constMiniPot() + ` 
            `+ miniPotLFODelay.constMiniPot() + ` 
        </div> 

    `)    
}

function Chorus(){
    $(`#chorus`).append(`
        <h2>Chorus</h2>
        <div class="verticale">          
            <div>
                <input type="checkbox" name="choruson" id="choruson"></button>
                <label class="checkbox" for="choruson">Chorus</label> 
            </div>
        
            <div class="horizontale">
                <div> 
                    <input type="radio" id="chorusmode1" name="chorusmode" checked>
                    <label class="radio" for="chorusmode1">1</label> 
                </div>
                <div>
                    <input type="radio" id="chorusmode2" name="chorusmode">
                    <label class="radio" for="chorusmode2">2</label> 
                </div>
            </div>
            
        </div> 
    `)   
}

