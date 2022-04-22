/*
    Tony-Steel. 
    14/01/2022. 
    Projet d'application Web Midi
    Page Matrix-6 Controler
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

    initDCO1(1)  
    initMixer() 
    initDCO2(2)  
    initFM() 
    initVCF() 
    initVCA()
    initTrack()
    initRamp(2)
    initPorta()
    initEnveloppes(3)
    initLFO(2)
    /*---*/
}); 

/*-----------------------------------------------------------------------------------------------------------------------------*/

/* Initialisation des Modules */

/* Initialisation Oscillateurs */
function initDCO1(i){  
    let miniPotDCOFreq = new MiniPot('DCO', i, 'Freq', 0, false)
    let miniPotDCOMod = new MiniPot('DCO', i, 'Mod', 0, false)
    let miniPotDCOPW = new MiniPot('DCO', i, 'PW', 0, false)
    let miniPotDCOPWM = new MiniPot('DCO', i, 'PWM', 0, false)
    let miniPotDCOShape = new MiniPot('DCO', i, 'Shape', 0, false)

        /* DCO */
        $(`#dco${i}`).append(`
            <h2>DCO ${i}</h2>
            <div class="horizontale space-around">`
                + miniPotDCOFreq.constMiniPot() + ` `
                + miniPotDCOMod.constMiniPot() + `
                <div class="verticale">
                    <div class="horizontale">
                        <h3>Sync DCO2</h3>
                        <input type="radio" id="sync-off-dco${i}" name="sync-dco${i}" checked>
                        <label class="radio" for="sync-off-dco${i}">Off</label> 
                    </div> 
                    <div class="horizontale">
                        <div>
                            <input type="radio" id="sync-soft-dco${i}" name="sync-dco${i}">
                            <label class="radio" for="sync-soft-dco${i}">Soft</label> 
                        </div>
                        <div>
                            <input type="radio" id="sync-med-dco${i}" name="sync-dco${i}">
                            <label class="radio" for="sync-med-dco${i}">Med</label> 
                        </div>
                        <div>
                            <input type="radio" id="sync-full-dco${i}" name="sync-dco${i}">
                            <label class="radio" for="sync-full-dco${i}">Full</label> 
                        </div>
                    </div> 
                </div> 
            </div>

            
            <div class="verticale">               
                <div class="horizontale">`
                    + miniPotDCOPW.constMiniPot() + ` `
                    + miniPotDCOPWM.constMiniPot() + ` `
                    + miniPotDCOShape.constMiniPot() + `
                </div>
            </div>
            
            <div class="horizontale">
                <h3>Wave</h3>

                <input type="radio" id="wave-off-dco${i}" name="wave-dco${i}" checked>
                <label class="radio" for="wave-off-dco${i}">Off</label> 

                <input type="radio" id="wave-pulse-dco${i}" name="wave-dco${i}">
                <label class="radio" for="wave-pulse-dco${i}">Pulse</label> 

                <input type="radio" id="wave-saw-dco${i}" name="wave-dco${i}">
                <label class="radio" for="wave-saw-dco${i}">Wave</label> 

                <input type="radio" id="wave-both-dco${i}" name="wave-dco${i}">
                <label class="radio" for="wave-both-dco${i}">Both</label> 
            </div>

            <div class="horizontale">
                <h3>Levers</h3>
                
                <input type="radio" id="levers-off-dco${i}" name="levers-dco${i}" checked>
                <label class="radio" for="levers-off-dco${i}">Off</label> 
            
                <input type="radio" id="levers-bend-dco${i}" name="levers-dco${i}">
                <label class="radio" for="levers-bend-dco${i}">Bend</label> 
            
                <input type="radio" id="levers-vib-dco${i}" name="levers-dco${i}">
                <label class="radio" for="levers-vib-dco${i}">Vib</label> 
            
                <input type="radio" id="levers-both-dco${i}" name="levers-dco${i}">
                <label class="radio" for="levers-both-dco${i}">Both</label> 
            </div>

            <div class="horizontale">
                <h3>Portamento</h3>
        
                <input type="radio" id="porta-keyb-dco${i}" name="porta-dco${i}" checked>
                <label class="radio" for="porta-keyb-dco${i}">Keyb</label> 

                <input type="radio" id="porta-porta-dco${i}" name="porta-dco${i}">
                <label class="radio" for="porta-porta-dco${i}">Porta</label> 
            </div>

            <div class="horizontale">
                <h3>Attack</h3>

                <input type="radio" id="click-off-dco${i}" name="click-dco${i}" checked>
                <label class="radio" for="click-off-dco${i}">Off</label> 
            
                <input type="radio" id="click-click-dco${i}" name="click-dco${i}">
                <label class="radio" for="click-click-dco${i}">Click</label> 
            </div>
        `); 
};

function initMixer(){
    let miniPotBalance = new MiniPot('Balance', '', 'DCO1-2', 0, false)
    //+ constMiniPot(`DCO1-2`, 1, false, `Balance`) + ``

    const listKeybMode = {
        0: 'Reassign',   
        1: 'Rotate',
        2: 'Unison',
        3: 'Reassign Rob',
    };  

    $(`#balance`).append(`
        <div>
            <button id="patch-edit" name="patch-edit">Patch Edit . Mode</button>
        </div>
        
        <h2>Balance</h2>
        <div class="verticale">`        
        + miniPotBalance.constMiniPot() + `
        </div>

        <div class="verticale">
            <h3>Keyboard Mode</h3>
            <select name="keybMode" id="keybMode"></select>
        </div>
    `);  
    
    alimListe($('#keybMode'), listKeybMode); 
};

function initDCO2(i){ 
    let miniPotDCOFreq = new MiniPot('DCO', i, 'Freq', 0, false)
    let miniPotDCOMod = new MiniPot('DCO', i, 'Mod', 0, false)
    let miniPotDCODetune = new MiniPot('DCO', i, 'Detune', 0, false)
    let miniPotDCOPW = new MiniPot('DCO', i, 'PW', 0, false)
    let miniPotDCOPWM = new MiniPot('DCO', i, 'PWM', 0, false)
    let miniPotDCOShape = new MiniPot('DCO', i, 'Shape', 0, false)

        /* DCO */
        $(`#dco${i}`).append(`
            <h2>DCO ${i}</h2>
            <div class="horizontale">`
                + miniPotDCOFreq.constMiniPot() + ` `
                + miniPotDCOMod.constMiniPot() + ` `
                + miniPotDCODetune.constMiniPot() + `
            </div>

            
            <div class="verticale">               
                <div class="horizontale">`
                    + miniPotDCOPW.constMiniPot() + ` `
                    + miniPotDCOPWM.constMiniPot() + ` `
                    + miniPotDCOShape.constMiniPot() + `
                </div>
            </div>
            
            <div class="horizontale">
                <h3>Wave</h3>
                
                <input type="radio" id="wave-off-dco${i}" name="wave-dco${i}" checked>
                <label class="radio" for="wave-off-dco${i}">Off</label> 
            
                <input type="radio" id="wave-pulse-dco${i}" name="wave-dco${i}">
                <label class="radio" for="wave-pulse-dco${i}">Pulse</label> 
            
                <input type="radio" id="wave-saw-dco${i}" name="wave-dco${i}">
                <label class="radio" for="wave-saw-dco${i}">Wave</label> 
            
                <input type="radio" id="wave-both-dco${i}" name="wave-dco${i}">
                <label class="radio" for="wave-both-dco${i}">Both</label> 
            
                <input type="radio" id="wave-noise-dco${i}" name="wave-dco${i}">
                <label class="radio" for="wave-noise-dco${i}">Noise</label> 
            </div>

            <div class="horizontale">
                <h3>Levers</h3>
                
                <input type="radio" id="levers-off-dco${i}" name="levers-dco${i}" checked>
                <label class="radio" for="levers-off-dco${i}">Off</label> 
            
                <input type="radio" id="levers-bend-dco${i}" name="levers-dco${i}">
                <label class="radio" for="levers-bend-dco${i}">Bend</label> 
            
                <input type="radio" id="levers-vib-dco${i}" name="levers-dco${i}">
                <label class="radio" for="levers-vib-dco${i}">Vib</label> 
            
                <input type="radio" id="levers-both-dco${i}" name="levers-dco${i}">
                <label class="radio" for="levers-both-dco${i}">Both</label> 
            </div>

            <div class="horizontale">
                <h3>Portamento</h3>
                
                <input type="radio" id="porta-keyb-dco${i}" name="porta-dco${i}" checked>
                <label class="radio" for="porta-keyb-dco${i}">Keyb</label> 
            
                <input type="radio" id="porta-porta-dco${i}" name="porta-dco${i}">
                <label class="radio" for="porta-porta-dco${i}">Porta</label> 
            
                <input type="radio" id="porta-off-dco${i}" name="porta-dco${i}">
                <label class="radio" for="porta-off-dco${i}">Off</label> 
            </div>

            <div class="horizontale">
                <h3>Attack</h3>
                
                <input type="radio" id="click-off-dco${i}" name="click-dco${i}" checked>
                <label class="radio" for="click-off-dco${i}">Off</label> 
            
                <input type="radio" id="click-click-dco${i}" name="click-dco${i}">
                <label class="radio" for="click-click-dco${i}">Click</label> 
            </div>
        `); 
};

/* FM  */
function initFM(){
    let miniPotFMAmout = new MiniPot('Fm', '', 'Amount', 0, false)
    let miniPotFMMdEv3 = new MiniPot('Fm', '', 'Md-Ev3', 0, false)
    let miniPotFMModPrs = new MiniPot('Fm', '', 'Mod-Prs', 0, false)

    $(`#Fm`).append(`
        <h2>FM</h2>
        <div class="verticale">`
            + miniPotFMAmout.constMiniPot() + ` `
            + miniPotFMMdEv3.constMiniPot() + ` `
            + miniPotFMModPrs.constMiniPot() + ` 
        </div>
    `); 
};

/* Initialisation Filtres */
function initVCF(){
    let miniPotVCFFreq = new MiniPot('VCF', '', 'Freq', 0, false)
    let miniPotVCFReson = new MiniPot('VCF', '', 'Reson', 0, false)
    let miniPotVCFModEv = new MiniPot('VCF', '', 'Mod-Ev', 0, false)
    let miniPotVCFModPrs = new MiniPot('VCF', '', 'Mod-Prs', 0, false)

    /* VCF */
    $(`#vcf`).append(`
        <h2>VCF</h2>
        <div class="horizontale">`
            + miniPotVCFFreq.constMiniPot() + ` `
            + miniPotVCFReson.constMiniPot() + ` `
            + miniPotVCFModEv.constMiniPot() + ` `
            + miniPotVCFModPrs.constMiniPot() + `
        </div>

        <div class="horizontale">
            <h3>Levers</h3>

            <input type="radio" id="levers-off-vcf" name="levers-vcf" checked>
            <label class="radio" for="levers-off-vcf">Off</label> 
        
            <input type="radio" id="levers-bend-vcf" name="levers-vcf">
            <label class="radio" for="levers-bend-vcf">Bend</label> 
        
            <input type="radio" id="levers-vib-vcf" name="levers-vcf">
            <label class="radio" for="levers-vib-vcf">Vib</label> 
        
            <input type="radio" id="levers-both-vcf" name="levers-vcf">
            <label class="radio" for="levers-both-vcf">Both</label> 
        </div>

        <div class="horizontale">
            <h3>Portamento</h3>
            
            <input type="radio" id="porta-off-vcf" name="porta-vcf" checked>
            <label class="radio" for="porta-off-vcf">Off</label> 
        
            <input type="radio" id="porta-porta-vcf" name="porta-vcf">
            <label class="radio" for="porta-porta-vcf">Porta</label> 
        
            <input type="radio" id="porta-keyb-vcf" name="porta-vcf">
            <label class="radio" for="porta-keyb-vcf">Keyb</label> 
        </div>
    `); 
};

/* Initialisation VCA */
function initVCA(i){ 
    let miniPotVCAVolume = new MiniPot('VCA', i, 'Volume', 0, false)
    let miniPotVCAModVel = new MiniPot('VCA', i, 'Mod-Vel', 0, false)
    let miniPotVCAMdEv2 = new MiniPot('VCA', i, 'Md-Ev2', 0, false)

    /* VCA */
    $(`#vca`).append(`
        <h2>VCA</h2>
        <div class="verticale">`
            + miniPotVCAVolume.constMiniPot() + ` `
            + miniPotVCAModVel.constMiniPot() + ` `
            + miniPotVCAMdEv2.constMiniPot() + ` 
        </div>
    `); 
};

/* Track */
function initTrack(){
    let miniPotTrackPoint1 = new MiniPot('Track', '', 'Point-1', 0, false)
    let miniPotTrackPoint2 = new MiniPot('Track', '', 'Point-2', 0, false)
    let miniPotTrackPoint3 = new MiniPot('Track', '', 'Point-3', 0, false)
    let miniPotTrackPoint4 = new MiniPot('Track', '', 'Point-4', 0, false)
    let miniPotTrackPoint5 = new MiniPot('Track', '', 'Point-5', 0, false)

    const listSource = {
        1: 'ENV1',
        2: 'ENV2',   
        3: 'ENV3',
        4: 'LFO1',
        5: 'LFO2',
        6: 'Vib',
        7: 'Ramp 1',
        8: 'Ramp 2',
        9: 'Keyboard',
        10: 'Portamento',
        11: 'Trak',
        12: 'Gate',
        13: 'Velocity',
        14: 'Release Velocity',
        15: 'Pressure',
        16: 'Pedal 1',
        17: 'Pedal 2',
        18: 'Lever 1',
        19: 'Lever 2',
        20: 'Lever 3'
    };

    $(`#Track`).append(`
        <h2>Tracking</h2>
        <div class="verticale">
            <div class="horizontale">
                <h3>Source</h3>
                <select name="inTrack" id="inTrack"></select>
            </div>

            <h2 >Destination</h2>
            <div class="horizontale space-around">`
                + miniPotTrackPoint1.constMiniPot() + ` `
                + miniPotTrackPoint2.constMiniPot() + ` `
                + miniPotTrackPoint3.constMiniPot() + ` `
                + miniPotTrackPoint4.constMiniPot() + ` `
                + miniPotTrackPoint5.constMiniPot() + ` 
            </div>
        </div>
    `); 
    alimListe($('#inTrack'), listSource);   
};

/* Rampes */
function initRamp(nb){    
    for(i=1; i<=nb; i++){
        let miniPotRampRate = new MiniPot('Ramp', i, 'Rate', 0, false)
        $(`#Ramp`).append(`
            <h2>Ramp ${i}</h2>
            <div class="horizontale">`
                + miniPotRampRate.constMiniPot() + ` 

                <div class="verticale">
                    
                    <input type="radio" id="decl-STrig-ramp${i}" name="decl-ramp${i}" checked>
                    <label class="radio" for="decl-STrig-ramp${i}">STrig</label> 
                
                    <input type="radio" id="decl-MTrig-ramp${i}" name="decl-ramp${i}">
                    <label class="radio" for="decl-MTrig-ramp${i}">MTrig</label> 
                
                    <input type="radio" id="decl-XTrig-ramp${i}" name="decl-ramp${i}">
                    <label class="radio" for="decl-XTrig-ramp${i}">XTrig</label> 
                
                    <input type="radio" id="decl-GateX-ramp${i}" name="decl-ramp${i}">
                    <label class="radio" for="decl-GateX-ramp${i}">GateX</label> 
                </div>
            </div>    
        `); 
    };    
};

/* Portamento */
function initPorta(){
    let miniPotPortaPorta = new MiniPot('Porta', '', 'Porta', 0, false)
    let miniPotPortaModVel = new MiniPot('Porta', '', 'Mod-Vel', 0, false)

    $(`#Porta`).append(`
        <h2>Portamento</h2>
        <div class="horizontale">`
            + miniPotPortaPorta.constMiniPot() + ` `
            + miniPotPortaModVel.constMiniPot() + ` 
        </div>

        <div class="horizontale">
            <h3>Mode</h3>
            
            <input type="radio" id="mode-lin-porta" name="mode-porta" checked>
            <label class="radio" for="mode-lin-porta">Lin</label> 
        
            <input type="radio" id="mode-const-porta" name="mode-porta">
            <label class="radio" for="mode-const-porta">Const</label> 
        
            <input type="radio" id="mode-exp-porta" name="mode-porta">
            <label class="radio" for="mode-exp-porta">Exp</label> 
        </div>

        <div class="horizontale">
            <h3>Legato</h3>
            
            <input type="radio" id="legato-off-porta" name="legato-porta" checked>
            <label class="radio" for="legato-off-porta">Off</label> 
        
            <input type="radio" id="legato-on-porta" name="legato-porta">
            <label class="radio" for="legato-on-porta">Legato</label>
        </div>
    `); 
};

/* Initialisation Enveloppes */
function initEnveloppes(nb){
    const listTrig = {
        0: 'STrig',
        1: 'SReset',
        2: 'MTrig',   
        3: 'MReset',
        4: 'Xtrig',
        5: 'RXReset',
        6: 'XMTrig',
        7: 'XMRst'
    };

    for(i=1; i<=nb; i++){
        let miniPotEnvDelay = new MiniPot('Env', i, 'Delay', 0, false)
        let miniPotEnvAttack = new MiniPot('Env', i, 'Attack', 0, false)
        let miniPotEnvDecay = new MiniPot('Env', i, 'Decay', 0, false)
        let miniPotEnvSustain = new MiniPot('Env', i, 'Sustain', 0, false)
        let miniPotEnvRelease = new MiniPot('Env', i, 'Release', 0, false)
        let miniPotEnvAmpli = new MiniPot('Env', i, 'Ampli', 0, false)
        let miniPotEnvModVel = new MiniPot('Env', i, 'Mod-Vel', 0, false)

        $(`#env${i}`).append(`
            <h2>Enveloppe ${i}</h2>
            <div class="horizontale space-around">`
                + miniPotEnvDelay.constMiniPot() + ` `
                + miniPotEnvAttack.constMiniPot() + ` `
                + miniPotEnvDecay.constMiniPot() + ` `
                + miniPotEnvSustain.constMiniPot() + ` `
                + miniPotEnvRelease.constMiniPot() + ` `
                + miniPotEnvAmpli.constMiniPot() + ` `
                + miniPotEnvModVel.constMiniPot() + ` 
            </div>    
            
            <div class="horizontale">
                <h3 class="select">Trig</h3>
                <select name="envTrig${i}" id="envTrig${i}"></select>
            
                <div class="verticale">
                    <div class="horizontale">
                        <h3>Mode</h3>
                    
                        <input type="radio" id="mode-Norm-env${i}" name="mode-env${i}" checked>
                        <label class="radio" for="mode-Norm-env${i}">Norm</label> 
                    
                        <input type="radio" id="mode-DADR-env${i}" name="mode-env${i}">
                        <label class="radio" for="mode-DADR-env${i}">DADR</label> 
                    
                        <input type="radio" id="mode-Free-env${i}" name="mode-env${i}">
                        <label class="radio" for="mode-Free-env${i}">Free</label> 
                    
                        <input type="radio" id="mode-Both-env${i}" name="mode-env${i}">
                        <label class="radio" for="mode-Both-env${i}">Both</label> 
                    </div>
                    
                    <div class="horizontale">
                        <h3>LFO 1 Trig</h3>
                    
                        <input type="radio" id="lfoTrig-Norm-env${i}" name="lfoTrig-env${i}" checked>
                        <label class="radio" for="lfoTrig-Norm-env${i}">Norm</label> 
                    
                        <input type="radio" id="lfoTrig-LFO1-env${i}" name="lfoTrig-env${i}">
                        <label class="radio" for="lfoTrig-LFO1-env${i}">LFO1</label> 
                    
                        <input type="radio" id="lfoTrig-G-LFO1-env${i}" name="lfoTrig-env${i}">
                        <label class="radio" for="lfoTrig-G-LFO1-env${i}">G-LFO1</label> 
                    </div>  
                </div>  
            </div>             
        `); 
        alimListe($(`#envTrig${i}`), listTrig);
    };  
};

/* Initialisation LFO */
function initLFO(nb){
    const listWave = {
        0: 'Tri',
        1: 'UpSaw',
        2: 'DownSaw',   
        3: 'Square',
        4: 'Random',
        5: 'Noise',
        6: 'Sample'
    };
    const listSamplInput = {
        1: 'ENV 1',
        2: 'ENV 2',
        3: 'ENV 3',   
        4: 'LFO 1',
        5: 'LFO 2',
        6: 'Vib',
        7: 'Ramp 1',
        8: 'Ramp 2',
        9: 'Keyboard',
        10: 'Portamento',
        11: 'Track',
        12: 'Gate',
        13: 'Velocity',
        14: 'Release Velocity',
        15: 'Pressure',
        16: 'Pedal 1',
        17: 'Pedal 2',
        18: 'Lever 1',
        19: 'Lever 2',
    };
    
    for(i=1; i<=nb; i++){
        let miniPotLFOSpeed = new MiniPot('LFO', i, 'Speed', 0, false)
        let miniPotLFOModSp = new MiniPot('LFO', i, 'Mod-Sp', 0, false)
        let miniPotLFORetrgPt = new MiniPot('LFO', i, 'Retrg-Pt', 0, false)
        let miniPotLFOAmpli = new MiniPot('LFO', i, 'Ampli', 0, false)
        let miniPotLFOModRp = new MiniPot('LFO', i, 'Mod-Rp', 0, false)

        $(`#lfo${i}`).append(`
            <h2>LFO ${i}</h2>
            <div class="horizontale">`
                + miniPotLFOSpeed.constMiniPot() + ` `
                + miniPotLFOModSp.constMiniPot() + ` 
            </div>    

            <div class="horizontale">
                <h3 class="select">Wave</h3>
                <select name="lfoWave${i}" id="lfoWave${i}"></select>
            </div>

            <div class="horizontale">`
                + miniPotLFORetrgPt.constMiniPot() + ` `
                + miniPotLFOAmpli.constMiniPot() + ` `
                + miniPotLFOModRp.constMiniPot() + ` 
            </div>   

            <div class="horizontale">
                <div class="verticale">
                    <div class="horizontale">
                        <h3>Mode Trig</h3>
                        
                        <input type="radio" id="modeTrig-off-lfo${i}" name="modeTrig-lfo${i}" checked>
                        <label class="radio" for="modeTrig-off-lfo${i}">Off</label> 
                    
                        <input type="radio" id="modeTrig-STrig-lfo${i}" name="modeTrig-lfo${i}">
                        <label class="radio" for="modeTrig-STrig-lfo${i}">STrig</label> 
                    
                        <input type="radio" id="modeTrig-MTrig-lfo${i}" name="modeTrig-lfo${i}">
                        <label class="radio" for="modeTrig-MTrig-lfo${i}">MTrig</label> 
                    
                        <input type="radio" id="modeTrig-XTrig-lfo${i}" name="modeTrig-lfo${i}">
                        <label class="radio" for="modeTrig-XTrig-lfo${i}">XTrig</label> 
                    </div>
                    
                    <div class="horizontale">
                        <h3>Lag</h3>
                    
                        <input type="radio" id="lfoLag-off-lfo${i}" name="lfoLag-lfo${i}" checked>
                        <label class="radio" for="lfoLag-off-lfo${i}">Off</label> 
                    
                        <input type="radio" id="lfoLag-on-lfo${i}" name="lfoLag-lfo${i}">
                        <label class="radio" for="lfoLag-on-lfo${i}">On</label> 
                    </div>  
                </div>  
            </div>    
            
            <div class="horizontale">
                <h3 class="select">Sample Input</h3>
                <select name="samplInput${i}" id="samplInput${i}"></select>
            </div>
        `); 
        alimListe($(`#lfoWave${i}`), listWave);
        alimListe($(`#samplInput${i}`), listSamplInput);
    };  
};