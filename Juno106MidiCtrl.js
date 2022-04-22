/*
    Tony-Steel. 
    30/12/2021. 
    Projet d'application Web Midi
    API Midi Web : Gestion des commandes Midi 
*/
/*-----------------------------------------------------------------------------------------------------------------------------*/
function envoiSysex(manufacturerIdSysex, SynthOut, chnMidiOut, control, valMidi) { 
    let channel = Number(chnMidiOut)-1 // channel 0-15
    chnMidiOut = Number(chnMidiOut)   

    if(control !== undefined && valMidi !== undefined){
        let sysex = [0xF0, manufacturerIdSysex, 0x36, channel, 0x23, 0x20, 0x01, control, valMidi, 0xF7]
        visualisationSysex(sysex)
        SynthOut.channels[chnMidiOut].send(sysex);
        return true
    }
    else{
        return false
    }
}

function envoiSysexGlobal(SynthOut, chnMidiOut, sysex) { 
    if(sysex.length >= 1){
        SynthOut.channels[chnMidiOut].send(sysex);
        visualisationSysex(sysex)
        return true
    }
    else{
        return false
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

/*---*/

class Parametres {
    static get MANUFACT_ID_SYSEX() {
        return 0x41 // Roland
    }

    static get GLOBAL_CONTROL() {
        return {   
          'hold': 64, //0xBn 0x40
        }
    }

    static get SYSEX_CONTROL() {
        return {
            // DCO
            'pot-val-LFO-Deph-DCO': 2,
            'pot-val-PWM-DCO': 3,
            'pot-val-Noise-DCO': 4,
            'pot-val-Sub-DCO': 15,
            'range': 16,    //bin xxxxx000
            'pwmmode': 17,  //bin xxxxx000
            'pulse': 16,   //bin xxxx0xxx
            'saw': 16,     //bin xxx0xxxx
        
            // VCF
            'hpf': 17, //bin 00xxx 
            'pot-val-Cutoff-VCF': 5,
            'pot-val-Resonance-VCF': 6,
            'pot-val-Env-VCF': 7,
            'vcfenv': 17, //bin 0x
            'pot-val-LFO-Deph-VCF':8,
            'pot-val-Key-Flw-VCF': 9,
            
            // VCA
            'pot-val-Level-VCA': 10,
            'vcamode': 17, //bin 0xx
            
            // Env 
            'pot-val-Attack-Env': 11,
            'pot-val-Decay-Env': 12,
            'pot-val-Sustain-Env': 13,
            'pot-val-Release-Env': 14, 
            
            // LFO 
            'pot-val-Rate-LFO': 0,
            'pot-val-Delay-LFO': 1,

            // Chorus
            'choruson': 16,    //bin x0xxxxx
            'chorusmode': 16,  //bin 0xxxxxx
        };
    }

    static get SYSEX_VALUE() {
        return {
            // DCO  
            'range16': 1,  //16 bin xxxx001
            'range8': 2,   //16 bin xxxx010
            'range4': 4,   //16 bin xxxx100
            'pulse': 8,    //16 bin xxx1xxx
            'saw': 16,     //16 bin xx1xxxx
            'pwmlfo': 0,     //17 bin xxxx0
            'pwmmanual': 1,  //17 bin xxxx1

            // VCF
            'vcfenvinv': 2,   //17 bin xxx1x 
            'hpf3': 0,         //17 bin 00xxx
            'hpf2': 8,         //17 bin 01xxx
            'hpf1': 16,        //17 bin 10xxx
            'hpfoff': 24,      //17 bin 11xxx

            //VCA 
            'vcamodeenv': 0,  //17 bin xx0xx
            'vcamodegate': 4, //17 bin xx1xx

            // Chorus
            'choruson': 32,        //16 bin x1xxxxx
            'chorusmode1': 0,     //16 bin 0xxxxxx
            'chorusmode2': 64,    //16 bin 1xxxxxx
        };
    }

    static get MINIMAXI_MINIPOT() {
        return [0, 127]
    }
}