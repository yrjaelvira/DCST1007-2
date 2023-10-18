// oppgave 1

class Land {
    //a
    navn: string;
    areal: number;
    folketall: number;
    toppdomene: string;

    component(navn: string, areal: number, folketall: number, toppdomene: string){
        this.navn = navn;
        this.areal = areal;
        this.folketall = folketall;
        this.toppdomene = toppdomene;
    }

    //b
    befolkningstetthet(){
        Land.prototype.befolkningstetthet = () => {
            this.folketall / this.areal;
        }
    }

    //d
    toString(){
        return(
            `${this.navn} (${this.toppdomene}) har ${this.folketall} innbyggere og har et areal på ${this.areal} km2. <br />`
        )
    }
}

//c
const norge = new Land("Norge", 323802, 5320045, ".no");
const sverige = new Land("Sverige", 450295, 9960487, ".se");
const russland = new Land("Russland", 17098242, 142257519, ".ru");
const kina = new Land("Kina", 9596960, 1379302771, ".cn");

//d
console.log(norge.toString());
console.log(sverige.toString());
console.log(russland.toString());
console.log(kina.toString());

//e
function finnLand (toppdomene: string) {
    switch(toppdomene){
        case ".no" : return norge.toString();
        case ".se" : return sverige.toString();
        case ".ru" : return russland.toString();
        case ".cn" : return kina.toString();

        default : return "Domenet tilhører ingen land";
    }
}
