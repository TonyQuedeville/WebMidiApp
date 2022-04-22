/*
    Tony-Steel. 
    17/02/2022. 
    Projet d'application Web Midi
    miniPot.js : Gestion du mini potentiomètre. 
*/
/*-----------------------------------------------------------------------------------------------------*/

class MiniPot {
    constructor(groupe, i='', param, value=0, bouton = false) { //, mini=0, maxi=127) {
        this.namePot = groupe + i
        this.valMidi = value
        this.param = param
        this.bouton = bouton
        /*this.mini = mini
        this.maxi = maxi
        this.angle = -150
        this.Yinit = 0
        this.Ychange = false
        this.deplacementY = 0

        ecouteBtn()
        /*-*/
    }

    /* Methode de construction du mini poterntiomètre */
    constMiniPot(){
        let txthtml = `
            <div class="cell verticale">                             
                <div class="pot"> 
                    <div class="pot-fond" id="pot-fond-${this.param}-${this.namePot}"></div>                         
                    <div class="rep-graduations"></div>`
                    if(this.bouton==false){
                        txthtml = txthtml + `<div id="pot-curs-${this.param}-${this.namePot}" name="${this.param}-${this.namePot}" class="curseur-cir curseur-cir-actif"></div>`
                    }else{
                        txthtml = txthtml + `<div id="pot-curs-${this.param}-${this.namePot}" name="${this.param}-${this.namePot}" class="curseur-cir"></div>`                    
                    }
                    txthtml = txthtml + `<div class="pot-cir">
                        <div class="pot-lin" name="${this.param}-${this.namePot}" id="pot-${this.param}-${this.namePot}"></div>`
                        if(this.bouton==false){
                            txthtml = txthtml + `<input class="pot-val pot-val-actif" name="${this.param}-${this.namePot}" id="pot-val-${this.param}-${this.namePot}" value=0 ></input>`
                        }else{
                            txthtml = txthtml + `<input class="pot-val" name="${this.param}-${this.namePot}" id="pot-val-${this.param}-${this.namePot}" value=0 ></input>`
                        }    
                        txthtml = txthtml + `</div>
                    </div>`
                    
                    if(this.bouton==true){
                        txthtml = txthtml + ` 
                        <input type="checkbox" class="btn-pot" name="chk-${this.param}-${this.namePot}" id="chk-${this.param}-${this.namePot}"></input>
                        <label class="checkbox" for="chk-${this.param}-${this.namePot}">${this.param}</label> `
                    }else{
                        txthtml = txthtml + `<h3 class="etiq-pot">${this.param}</h3>`
                    }
                    txthtml = txthtml + `
            </div>`         
        return txthtml;
    }
    /*---*/

    /* Méthodes */
    /*afficheValMiniPot(){ 
        if(this.valMidi < this.mini){this.valMidi = this.mnii}
        if(this.valMidi > this.maxi){this.valMidi = this.maxi}
        $(`#val-${this.namePot}`).val(this.valMidi);
        this.angle = Math.floor(this.valMidi * (300/(this.maxi-this.mini)) + this.angle);    
        this.rotationMiniPot()
    }

    rotationMiniPot(){ 
        $(`#cur-${this.namePot}`).animate(
            {deg: this.angle},
            {
                duration: 0,
                step: function() {
                    $(this).css({transform: 'rotate('+ this.angle + 'deg)'});
                    $(`#fond-${this.namePot}`).css({transform: 'rotate('+ -this.angle + 'deg)'});
                }            
            }
        );    
    };
    /*---*/
}