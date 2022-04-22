/*
    Tony-Steel. 
    30/12/2021. 
    Projet d'application Web Midi
    API Midi Web : Gestion des commandes Midi 
*/
/*-----------------------------------------------------------------------------------------------------------------------------*/
function envoiSysex(manufacturerIdSysex, SynthOut, chnMidiOut, control, valMidi) { 
    chnMidiOut = Number(chnMidiOut)       

    let sysex = [0xF0, manufacturerIdSysex, 0x06, 0x05, 0x00, 0xF7] // Matrix-6 Control
    visualisationSysex(sysex)
    SynthOut.channels[chnMidiOut].send(sysex); // Matrix-6 Patch Edit Quick

    if(control !== undefined && valMidi !== undefined){
        sysex = [0xF0, manufacturerIdSysex, 0x06, 0x06, control, valMidi, 0xF7] // Matrix-6 Control
        visualisationSysex(sysex)
        SynthOut.channels[chnMidiOut].send(sysex);
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
            return [0,63]            
        }
}

/*---*/

class Parametres {
    static get MANUFACT_ID_SYSEX() {
        return 0x10 // Oberheim
    }

    static get SYSEX_CONTROL() {
        return {
            // DCO 1
            'pot-val-Freq-DCO1': 0,
            'pot-val-Mod-DCO1': 1,
            'sync-dco1': 2,
            'pot-val-PW-DCO1': 3,
            'pot-val-PWM-DCO1': 4,
            'pot-val-Shape-DCO1': 5,
            'wave-dco1': 6,
            'levers-dco1': 7,
            'porta-dco1': 8,
            'click-dco1': 9,

            // DCO 2
            'pot-val-Freq-DCO2': 10,
            'pot-val-Mod-DCO2': 11,
            'pot-val-Detune-DCO2': 12,
            'pot-val-PW-DCO2': 13,
            'pot-val-PWM-DCO2': 14,
            'pot-val-Shape-DCO2': 15,
            'wave-dco2': 16,
            'levers-dco2': 17,
            'porta-dco2': 18,
            'click-dco2': 19,

            // Balance
            'pot-val-DCO1-2-Balance': 20,
            'keybMode': 48,

            // VCF
            'pot-val-Freq-VCF': 21,
            'pot-val-Mod-Ev-VCF': 22,
            'pot-val-Mod-Prs-VCF': 23,
            'pot-val-Reson-VCF': 24,
            'levers-vcf': 25,
            'porta-vcf': 26,
            
            // VCA
            'pot-val-Volume-VCA': 27,
            'pot-val-Mod-Vel-VCA': 28,
            'pot-val-Md-Ev2-VCA': 29,
            
            // FM
            'pot-val-Amount-Fm': 30,
            'pot-val-Md-Ev3-Fm': 31,
            'pot-val-Mod-Prs-Fm': 32,
            
            // Track
            'inTrack': 33,
            'pot-val-Point-1-Track': 34,
            'pot-val-Point-2-Track': 35,
            'pot-val-Point-3-Track': 36,
            'pot-val-Point-4-Track': 37,
            'pot-val-Point-5-Track': 38,
            
            // Ramp
            'pot-val-Rate-Ramp1': 40,
            'decl-ramp1': 41,
            'pot-val-Rate-Ramp2': 42,
            'decl-ramp2': 43,
            
            // Portamento
            'pot-val-Porta-Porta': 44,
            'pot-val-Mod-Vel-Porta': 45,
            'mode-porta': 46,
            'legato-porta': 47,
            
            // Env 1
            'pot-val-Delay-Env1': 50,
            'pot-val-Attack-Env1': 51,
            'pot-val-Decay-Env1': 52,
            'pot-val-Sustain-Env1': 53,
            'pot-val-Release-Env1': 54,
            'pot-val-Ampli-Env1': 55,
            'pot-val-Mod-Vel-Env1': 56,
            'envTrig1': 57,
            'mode-env1': 58,
            'lfoTrig-env1': 59,
            
            // Env 2
            'pot-val-Delay-Env2': 60,
            'pot-val-Attack-Env2': 61,
            'pot-val-Decay-Env2': 62,
            'pot-val-Sustain-Env2': 63,
            'pot-val-Release-Env2': 64,
            'pot-val-Ampli-Env2': 65,
            'pot-val-Mod-Vel-Env2': 66,
            'envTrig2': 67,
            'mode-env2': 68,
            'lfoTrig-env2': 69,
            
            // Env 3
            'pot-val-Delay-Env3': 70,
            'pot-val-Attack-Env3': 71,
            'pot-val-Decay-Env3': 72,
            'pot-val-Sustain-Env3': 73,
            'pot-val-Release-Env3': 74,
            'pot-val-Ampli-Env3': 75,
            'pot-val-Mod-Vel-Env3': 76,
            'envTrig3': 77,
            'mode-env3': 78,
            'lfoTrig-env3': 79,
            
            // LFO 1
            'pot-val-Speed-LFO1': 80,
            'pot-val-Mod-Sp-LFO1': 81,
            'lfoWave1': 82,
            'pot-val-Retrg-Pt-LFO1': 83,
            'pot-val-Ampli-LFO1': 84,
            'pot-val-Mod-Rp-LFO1': 85,
            'modeTrig-lfo1': 86,
            'lfoLag-lfo1': 87,
            'samplInput1': 88,
            
            // LFO 2
            'pot-val-Speed-LFO2': 90,
            'pot-val-Mod-Sp-LFO2': 91,
            'lfoWave2': 92,
            'pot-val-Retrg-Pt-LFO2': 93,
            'pot-val-Ampli-LFO2': 94,
            'pot-val-Mod-Rp-LFO2': 95,
            'modeTrig-lfo2': 96,
            'lfoLag-lfo2': 97,
            'samplInput2': 98,
        };
    }

    static get SYSEX_VALUE() {
        return {
            // DCO 1  
            'sync-off-dco1': 0,
            'sync-soft-dco1': 1,
            'sync-med-dco1': 2,
            'sync-full-dco1': 3,
            
            'wave-off-dco1': 0,
            'wave-pulse-dco1': 1,
            'wave-saw-dco1': 2,
            'wave-both-dco1': 3,

            'levers-off-dco1': 0,
            'levers-bend-dco1': 1,
            'levers-vib-dco1': 2,
            'levers-both-dco1': 3,

            'porta-keyb-dco1': 0,
            'porta-porta-dco1': 1,

            'click-off-dco1': 0,
            'click-click-dco1': 1,   
            
            // DCO 2         
            'wave-off-dco2': 0,
            'wave-pulse-dco2': 1,
            'wave-saw-dco2': 2,
            'wave-both-dco2': 3,
            'wave-noise-dco2': 4,

            'levers-off-dco2': 0,
            'levers-bend-dco2': 1,
            'levers-vib-dco2': 2,
            'levers-both-dco2': 3,

            'porta-off-dco2': 0,
            'porta-porta-dco2': 1,
            'porta-keyb-dco2': 2,

            'click-off-dco2': 0,
            'click-click-dco2': 1, 

            // VCF
            'levers-off-vcf': 0,
            'levers-bend-vcf': 1,
            'levers-vib-vcf': 2,
            'levers-both-vcf': 3,

            'porta-off-vcf': 0,
            'porta-porta-vcf': 1,
            'porta-keyb-vcf': 2,

            // Ramp Trigger
            'decl-STrig-ramp1': 0,
            'decl-MTrig-ramp1': 1,
            'decl-XTrig-ramp1': 2,
            'decl-GateX-ramp1': 3,

            'decl-STrig-ramp2': 0,
            'decl-MTrig-ramp2': 1,
            'decl-XTrig-ramp2': 2,
            'decl-GateX-ramp2': 3,

            // Portamento mode
            'mode-lin-porta': 0,
            'mode-const-porta': 1,
            'mode-exp-porta': 2,
            
            // Portamento legato
            'legato-off-porta': 0,
            'legato-on-porta': 1,

            // Enveloppe 1 
            //Mode
            'mode-Norm-env1': 0,
            'mode-DADR-env1': 1,
            'mode-Free-env1': 2,
            'mode-Both-env1': 3,

            // LFO1 Trig
            'lfoTrig-Norm-env1': 0,
            'lfoTrig-G-LFO1-env1': 1,
            'lfoTrig-LFO1-env1': 2,

            // Enveloppe 2 
            //Mode
            'mode-Norm-env2': 0,
            'mode-DADR-env2': 1,
            'mode-Free-env2': 2,
            'mode-Both-env2': 3,

            // LFO1 Trig
            'lfoTrig-Norm-env2': 0,
            'lfoTrig-G-LFO1-env2': 1,
            'lfoTrig-LFO1-env2': 2,

            // Enveloppe 3 
            //Mode
            'mode-Norm-env3': 0,
            'mode-DADR-env3': 1,
            'mode-Free-env3': 2,
            'mode-Both-env3': 3,

            // LFO1 Trig
            'lfoTrig-Norm-env3': 0,
            'lfoTrig-G-LFO1-env3': 1,
            'lfoTrig-LFO1-env3': 2,

            // LFO 1
            //Mode trig
            'modeTrig-off-lfo1': 0,
            'modeTrig-STrig-lfo1': 1,
            'modeTrig-MTrig-lfo1': 2,
            'modeTrig-XTrig-lfo1': 3,
            // Lag
            'lfoLag-off-lfo1': 0,
            'lfoLag-on-lfo1': 1,

            // LFO 2
            //Mode trig
            'modeTrig-off-lfo2': 0,
            'modeTrig-STrig-lfo2': 1,
            'modeTrig-MTrig-lfo2': 2,
            'modeTrig-XTrig-lfo2': 3,
            // Lag
            'lfoLag-off-lfo2': 0,
            'lfoLag-on-lfo2': 1,
        };
    }

    static get MINIMAXI_MINIPOT() {
        return {
            'pot-val-Detune-DCO2': [0, 31], //[-31, 31]
            'pot-val-Freq-VCF1': [0, 127],             
        }
    }
}