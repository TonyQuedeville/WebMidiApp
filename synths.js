/*
    Tony-Steel. 
    14/01/2022. 
    Projet d'application Web Midi
    Patch Module
*/

/*-----------------------------------------------------------------------------------------------------------------------------*/

/* Classes */
class Synth {
    constructor(manufacturer, nom) {
        this.manufacturer = manufacturer
        this.nom = nom
        this.device = SynthEnumerations.DEVICES[this.nom]
    }

    afficheSynth(){
        $('#titre-controller').append(this.nom)

        let txthtml = `
            <div class="horizontale space-around">
                <div class="verticale">
                    <h3>Power</h3>
                    <a href="./index.html" class="horizontale">
                        <img src="img/icn-power.png" class="power icn">
                    </a>
                </div>
                
                <div class="verticale">
                    <h1 id="fabricant" name="${this.manufacturer}">${this.manufacturer}</h1>
                    <div class="horizontale">
                        <img src="img/${this.manufacturer}/${this.device.logo}" alt="${this.nom}" width="100" class="">
                    </div>
                </div>
            </div>

            <img src="img/${this.manufacturer}/${this.device.image}" alt="${this.nom}" class="image">

            <div class="verticale"> 
                <div class="horizontale">`
                    if(this.device.video !== undefined){
                        txthtml = txthtml + `
                        <h3>Demo</h3>
                        <a href="${this.device.video}" target="_blank">
                            <img src="img/icnVideo.png" class="icn" alt="démo vidéo" >
                        </a>`
                    }    
                    if(this.device.info !== undefined){
                        txthtml = txthtml + `
                        <h3>Information</h3>
                        <a href="${this.device.info}" target="_blank">
                            <img src="img/icn-info.jpg" height="30" class="icn" alt="info synth">
                        </a>`
                        }                                      
                        txthtml = txthtml + `  
                </div> 

                <div class="horizontale">`
                    if(this.device.ownerManual !== undefined){
                        txthtml = txthtml + `
                        <h3>Owner Manual</h3>
                        <a href="${this.device.ownerManual}" target="_blank">
                            <img src="img/icn-owner-manual.jpg" height="30" class="icn" alt="owner maunual">
                        </a>`
                    }
                    if(this.device.serviceManual !== undefined){
                        txthtml = txthtml + `
                        <h3>Service Manual</h3>
                        <a href="${this.device.serviceManual}" target="_blank">
                            <img src="img/icn-service-manual.jpg" height="30" class="icn" alt="service manual">
                        </a>`
                    }                                      
                    txthtml = txthtml + `  
                </div>
            </div>
        `
        $('#device').append(txthtml)
        
        /*-*/
    }
}

/*-----------------------------------------------------------------------------------------------------------------------------*/

/* Enumerations */

class SynthEnumerations {  
    static get MANUFACTACTURERS() {         
        return ['Roland', 'Oberheim', 'Baloran']
    }

    static get DEVICES_BY_MANUFACT() {         
        return {
            'Roland': [
                'Juno-106',
                'Alpha Juno-1',
                'Alpha Juno-2',
                'MKS-50',
            ],

            'Oberheim': [
                'Matrix-6',
                'Matrix-6R',
            ],

            'Baloran': [
                'The Pool',
            ],

            '':[]
        }
    }

    static get DEVICES() {         
        return {
        // Roland
            'Juno-106':    
            {
                fabricant: 'Roland',
                logo: 'logo-juno106.png',
                image: 'img-juno106.jpg',
                controleur: './Juno106Panel.html',
                video: 'https://www.youtube.com/watch?v=O_RnYnQ2Qtg',
                ownerManual: 'http://www.synthfool.com/docs/Roland/Juno_Series/Roland_Juno_106/Roland_Juno106_Owners_Manual.pdf',
                serviceManual: 'https://www.manualslib.com/manual/999786/Roland-Juno-106.html',
                info: undefined,
            },
    
            'Alpha Juno-1': 
                {
                    fabricant: 'Roland',
                    logo: 'logo-juno1.jpg',
                    image: 'img-juno1.jpg',
                    controleur: './alphaJunoPanel.html',
                    video: 'https://www.youtube.com/watch?v=v2R1VeXlhXY',
                    ownerManual: 'http://www.66khz.com/Assets/Synth-manuals-schematics/roland%20alpha%20juno1%20user%20manual.pdf',
                    serviceManual: 'https://www.polynominal.com/site/studio/gear/synth/Roland_alpha_juno/roland-alpha-juno1-service-manual.pdf',
                    info: undefined,
                },
            'Alpha Juno-2':
                {
                    fabricant: 'Roland',
                    logo: 'logo-juno2.jpg',
                    image: 'img-juno2.jpg',
                    controleur: './alphaJunoPanel.html',
                    video: 'https://www.youtube.com/watch?v=48ZvmK7f9PM',
                    ownerManual: 'http://synthfool.com/docs/Roland/Juno_Series/Roland_Alpha_Juno_2.pdf',
                    serviceManual: 'https://www.polynominal.com/site/studio/gear/synth/Roland_alpha_juno/roland-alpha-juno2-service-manual.pdf',
                    info: undefined,
                },
            'MKS-50':
                {
                    fabricant: 'Roland',
                    logo: 'logo-MKS50.jpg',
                    image: 'img-MKS50.jpg',
                    controleur: './alphaJunoPanel.html',
                    video: 'https://www.youtube.com/watch?v=uiCgFoZIH7w',
                    ownerManual: 'https://www.manualslib.com/manual/695917/Roland-Mks-50.html',
                    serviceManual: 'https://www.manualslib.com/manual/695917/Roland-Mks-50.html',
                    info: undefined,
                },
            
        // Oberheim
            'Matrix-6': 
                {
                    fabricant: 'Oberheim',
                    logo: 'Matrix6-logo.jpg',
                    image: 'img-Matrix-6.jpeg',
                    controleur: './matrix6Panel.html',
                    video: 'https://www.youtube.com/watch?v=BKy7bHe5hgg',
                    ownerManual: 'http://www.synthzone.com/midi/oberheim/Matrix6/Matrix6.pdf',
                    serviceManual: 'https://www.vintagesynthparts.com/wp-content/uploads/2018/01/oberheim_matrix-6_service_manual.pdf',
                    info:'http://www.synthzone.com/midi/oberheim/Matrix6/',
                },
            'Matrix-6R': 
                {
                    fabricant: 'Oberheim',
                    nom: 'Matrix-6R',
                    logo: 'Matrix6R-logo.jpg',
                    image: 'img-Matrix-6R.jpeg',
                    controleur: './matrix6Panel.html',
                    video: 'https://www.youtube.com/watch?v=wM9jt3nRZC4',
                    ownerManual: 'http://www.synthzone.com/midi/oberheim/Matrix6/manual_matrix6r.pdf',
                    serviceManual: undefined,
                    info:'http://www.synthzone.com/midi/oberheim/Matrix6/',
                },

        // Baloran
            'The Pool': 
                {
                    fabricant: 'Baloran',
                    logo: 'The Pool.svg',
                    image: 'img-ThePool.jpeg',
                    controleur: './poolPanel.html',
                    video: 'https://www.youtube.com/embed/ro3e6WaOZdE',
                    ownerManual: '',
                    serviceManual: '',
                    info: undefined,
                },            
        };
    }

    static get MANUFACT_ID_SYSEX() {
        //https://www.midi.org/specifications-old/item/manufacturer-id-numbers
        return{
            '': 0x00,
            'Oberheim': 0x10,
            'Roland': 0x41,
            'Korg': 0x42,
            'Yamaha': 0x43, 
            'SequentialCircuit': 0x01,
            'Moog': 0x04,
            'Lexicon': 0x06,  
            'Ensoniq': 0x0F,  
            'Emu': 0x18,  
            'Quasimidi': 0x3F,  
            'TcElectronics': [0x00, 0x20, 0x1F], 
            'Baloran': undefined,
        }
    }
}

/*-----------------------------------------------------------------------------------------------------------------------------*/


