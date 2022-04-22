/*
    Tony-Steel. 
    17/02/2022. 
    Projet d'application Web Midi
    Page Juno Controler
*/
/*-----------------------------------------------------------------------------------------------------------------------------*/

/* Document OK */
$(document).ready(function(){
    /* Initialisations */
    constPotentiometre($(`#stdMidiCtrlChg`))
    afficherClavier()

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    let fabricant = urlParams.get('fabricant')
    let device = urlParams.get('device')
    let synth = new Synth(fabricant, device)
    synth.afficheSynth()
    let webMidiApp = new WebMidiApp(SynthEnumerations.MANUFACT_ID_SYSEX[fabricant])
    
    DCO()
    VCF() 
    VCA()
    Enveloppe()
    LFO()
    Chorus()
    /*-*/
});

/* Initialisation des Modules */

function DCO(){
    let miniPotVolume = new MiniPot('Global', '', 'Volume', 0, false)
    let miniPotPorta = new MiniPot('Global', '', 'Porta', 0, true)
    let miniPotDCOPW = new MiniPot('DCO', '', 'PW', 0, false)
    let miniPotDCOPWM = new MiniPot('DCO', '', 'PWM', 0, false)
    let miniPotDCOEnvDeph = new MiniPot('DCO', '', 'Env-Deph', 0, false)
    let miniPotDCOLFODeph = new MiniPot('DCO', '', 'LFO-Deph', 0, false)

    $(`#global`).append(`
        <h2>Global</h2>
        <div class="horizontale">
            <div class="verticale">
                <h3>Keyboard</h3>
                <div>
                    <input type="checkbox" id="keyblocal" name="keyblocal" checked>
                    <label class="checkbox" for="keyblocal">Local</label> 
                </div>  
                <div>
                    <input type="checkbox" id="hold" name="hold">
                    <label class="checkbox" for="hold">Hold</label> 
                </div>  
            </div> 
            
            `+ miniPotVolume.constMiniPot() + `
            `+ miniPotPorta.constMiniPot() + `
        </div>       
    `)

            
    $(`#dco`).append(`
        <h2>DCO</h2>
        <div class="horizontale space-around">
            <div class="verticale">
                <h3>Range</h3>
                <div class="horizontale cell-demi-double">
                    <div>
                        <input type="radio" id="range-32-dco" name="range-dco" checked>
                        <label class="radio" for="range-32-dco">32'</label> 
                    </div>  
                    <div>
                        <input type="radio" id="range-16-dco" name="range-dco">
                        <label class="radio" for="range-16-dco">16'</label> 
                    </div>
                    <div>
                        <input type="radio" id="range-8-dco" name="range-dco">
                        <label class="radio" for="range-8-dco">8'</label> 
                    </div>
                    <div>
                        <input type="radio" id="range-4-dco" name="range-dco">
                        <label class="radio" for="range-4-dco">4'</label> 
                    </div>                
                </div> 

                <div class="verticale cell">                    
                    <h3>Bend</h3>
                    <input type="number" name="bendDCO" id="bendDCO" min="0" max="12" value="0">
                </div>               
            </div> 
            
            <div class="verticale">
                <h3 class="select">Saw</h3>
                <input type="number" name="saw" id="saw" min="0" max="5" value="0">
                <h3 class="select">Pulse</h3>
                <input type="number" name="pulse" id="pulse" min="0" max="3" value="0">
            </div> 
            `+ miniPotDCOPW.constMiniPot() + `    
            `+ miniPotDCOPWM.constMiniPot() + `   
            
            <div class="verticale">     
                <h3 class="select">Sub</h3>
                <input type="number" name="sub" id="sub" min="0" max="5" value="0">
                <h3 class="select">Sub Level</h3>
                <input type="number" name="sublvl" id="sublvl" min="0" max="3" value="0">
            </div> 
            
            <div class="verticale">   
                `+ miniPotDCOEnvDeph.constMiniPot() + ` 
                <div class="">
                    <select name="envModeDCO" id="envModeDCO"></select>
                </div>   
            </div>   
            `+ miniPotDCOLFODeph.constMiniPot() + ` 
            
            <div class="verticale">     
                <h3 class="select">After Deph</h3>
                <input type="number" name="afterDeph" id="afterDeph" min="0" max="15" value="0">
                <h3 class="select">Noise</h3>
                <input type="number" name="noise" id="noise" min="0" max="3" value="0">
            </div> 
        </div>       
    `)

    const listEnvModeDCO = {
        0: 'Normal',
        1: 'Invert',   
        2: 'Dyn. Normal',
        3: 'Dyn. Invert'
    };
    alimListe($(`#envModeDCO`), listEnvModeDCO);    
}

function VCF(){
    let miniPotVCFCutoff = new MiniPot('VCF', '', 'Cutoff', 0, false)
    let miniPotVCFResonance = new MiniPot('VCF', '', 'Resonance', 0, false)
    let miniPotVCFEnv = new MiniPot('VCF', '', 'Env', 0, false)
    let miniPotVCFKeyFlw = new MiniPot('VCF', '', 'Key-Flw', 0, false)
    let miniPotVCFLFODeph = new MiniPot('VCF', '', 'LFO-Deph', 0, false)
    let miniPotVCFAfterDph = new MiniPot('VCF', '', 'After-Dph', 0, false)
    
    $(`#vcf`).append(`
        <h2>VCF</h2>
        <div class="horizontale space-around">
            <div class="verticale">     
                <h3 class="select">HPF Freq</h3>
                <input type="number" name="hpfcutoff" id="hpfcutoff" min="0" max="3" value="0">
            </div> 

            `+ miniPotVCFCutoff.constMiniPot() + ` 
            `+ miniPotVCFResonance.constMiniPot() + ` 

            <div class="verticale">                    
                `+ miniPotVCFEnv.constMiniPot() + `    
                <select name="envModeVCF" id="envModeVCF"></select>
            </div> 
            
            `+ miniPotVCFKeyFlw.constMiniPot() + ` 
            `+ miniPotVCFLFODeph.constMiniPot() + ` 
            `+ miniPotVCFAfterDph.constMiniPot() + ` 
        </div>  
    `) 
    
    const listEnvModeVCF = {
        0: 'Normal',
        1: 'Invert',   
        2: 'Dyn. Normal',
        3: 'Dynamique'
    };
    alimListe($(`#envModeVCF`), listEnvModeVCF); 
}

function VCA(){
    let miniPotVCALevel = new MiniPot('VCA', '', 'Level', 0, false)
    let miniPotVCAAfterDph = new MiniPot('VCA', '', 'After-Dph', 0, false)
    
    $(`#vca`).append(`
        <h2>VCA</h2>
            <div class="verticale">
                <div class="horizontale">    
                    `+ miniPotVCALevel.constMiniPot() + ` 
                    <div class="verticale">     
                        <h3 class="select">Mode</h3>    
                        <select name="envModeVCA" id="envModeVCA"></select>
                    </div>  
                    `+ miniPotVCAAfterDph.constMiniPot('After-Dph', 1, false, 'VCA') + `     
                <div>  
            </div>       
    `) 
    
    const listEnvModeVCA = {
        0: 'Normal',
        1: 'Gate',   
        2: 'Dyn. Normal',
        3: 'Dyn. Gate'
    };
    alimListe($(`#envModeVCA`), listEnvModeVCA);  
}

function Enveloppe(){
    let miniPotEnvT1 = new MiniPot('Env', '', 'T1', 0, false)
    let miniPotEnvL1 = new MiniPot('Env', '', 'L1', 0, false)
    let miniPotEnvT2 = new MiniPot('Env', '', 'T2', 0, false)
    let miniPotEnvL2 = new MiniPot('Env', '', 'L2', 0, false)
    let miniPotEnvT3 = new MiniPot('Env', '', 'T3', 0, false)
    let miniPotEnvL3 = new MiniPot('Env', '', 'L3', 0, false)
    let miniPotEnvT4 = new MiniPot('Env', '', 'T4', 0, false)
    let miniPotEnvKeyboard = new MiniPot('Env', 1, 'Keyboard', 0, false)
    
    $(`#env`).append(`
        <h2>Enveloppe</h2>
        <div class="horizontale space-around">  
            `+ miniPotEnvT1.constMiniPot() + ` 
            `+ miniPotEnvL1.constMiniPot() + ` 
            `+ miniPotEnvT2.constMiniPot() + `
            `+ miniPotEnvL2.constMiniPot() + ` 
            `+ miniPotEnvT3.constMiniPot() + ` 
            `+ miniPotEnvL3.constMiniPot() + `
            `+ miniPotEnvT4.constMiniPot() + ` 
            `+ miniPotEnvKeyboard.constMiniPot() + ` 
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
    let miniPotChorus = new MiniPot('chorus', '', 'Chorus', 0, true)
    
    $(`#chorus`).append(`
        <h2>Chorus</h2>
        `+ miniPotChorus.constMiniPot() + `        
    `)    
}
