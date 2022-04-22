/*
    Tony-Steel. 
    30/12/2021. 
    Projet d'application Web Midi
    API Midi Web : Gestion des commandes Midi 
*/
/*-----------------------------------------------------------------------------------------------------------------------------*/

/* Fonctions */

function envoiSysex(manufacturerIdSysex, SynthOut, chnMidiOut, control, valMidi) { 
  let channel = Number(chnMidiOut)-1 // channel 0-15
  chnMidiOut = Number(chnMidiOut) 
  let sysex = []  

  if(control !== undefined && valMidi !== undefined){
      sysex = [0xF0, manufacturerIdSysex, 0x36, channel, 0x23, 0x20, 0x01, control, valMidi, 0xF7]
      SynthOut.channels[chnMidiOut].send(sysex);
      visualisationSysex(sysex)
    }
  return sysex
}

function envoiSysexGlobal(SynthOut, chnMidiOut, sysex) { 
  if(sysex.length >= 1){
      SynthOut.channels[chnMidiOut].send(sysex);
      visualisationSysex(sysex)
    }
  return sysex
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

/* Classes */

class Parametres {
  static get GLOBAL_CONTROL() {
    return {
      'keyblocal': 122, //0xBn 0x7A       
      'hold': 64, //0xBn 0x40
      'pot-val-Volume-Global': 7, //0xBn 0x07
      'chk-Porta-Global': 65, //0xBn 0x41,
      'pot-val-Porta-Global': 5, //0xBn 0x05
    }
  }

  static get SYSEX_CONTROL() {
    return {
      // DCO
      'range-dco': 6,
      'bendDCO': 35,
      'saw': 4,
      'pulse': 3,
      'pot-val-PW-DCO': 14,
      'pot-val-PWM-DCO': 15,
      'sub': 5,
      'sublvl':7,
      'envModeDCO': 0,
      'pot-val-Env-Deph-DCO': 12,
      'pot-val-LFO-Deph-DCO': 11,
      'afterDeph': 13,
      'noise': 8,
      
      // VCF
      'hpfcutoff': 9,
      'pot-val-Cutoff-VCF': 16,
      'pot-val-Resonance-VCF': 17,
      'pot-val-LFO-Deph-VCF': 18,
      'pot-val-Env-VCF': 19,
      'envModeVCF': 1,
      'pot-val-envModeVCF-VCF': 1,
      'pot-val-Key-Flw-VCF': 20,
      'pot-val-After-Dph-VCF': 21,
      
      // VCA
      'pot-val-Level-VCA': 22,
      'envModeVCA': 2,
      'pot-val-After-Dph-VCA': 23,
      
      // Env 
      'pot-val-T1-Env': 26,
      'pot-val-L1-Env': 27,
      'pot-val-T2-Env': 28,
      'pot-val-L2-Env': 29,
      'pot-val-T3-Env': 30,
      'pot-val-L3-Env': 31,
      'pot-val-T4-Env': 32,
      'pot-val-Keyboard-Env': 33,       
      
      // LFO 
      'pot-val-Rate-LFO': 24,
      'pot-val-Delay-LFO': 25,
      
      // Chorus        
      'chk-Chorus-chorus': 10,
      'pot-val-Chorus-chorus': 34,
    };
  }

  static get SYSEX_VALUE() {
    return {
      // DCO  
      'range-4-dco': 0,
      'range-8-dco': 1,
      'range-16-dco': 2,
      'range-32-dco': 3,
    };
  }

  static get MINIMAXI_MINIPOT() {
    return [0, 127]
  }
}

/*---*/