class Ingrediens {
    navn: string;
    måleenhet: string;
    lagerMengde: number;
    innkjøpspris: number;
    holdbarhetsdato?: Date;

    constructor(navn: string, måleenhet: string, lagerMengde: number, innkjøpspris: number, holdbarhetsdato?: Date){
        this.navn = navn;
        this.måleenhet = måleenhet;
        this.lagerMengde = lagerMengde;
        this.innkjøpspris = innkjøpspris;
        this.holdbarhetsdato = holdbarhetsdato;
    }

    skrivUt(){
        let result: string = `Det er ${this.lagerMengde} ${this.måleenhet} på lager`;

        if(this.holdbarhetsdato){
            result += ` med holdbarhet til ${this.holdbarhetsdato}`;
        } else result += ".";

        return result;
    }

    utsalgspris(){
        let prosentTillegg: number = 1.25;
        let utsalgspris: number = this.innkjøpspris * prosentTillegg;

        return utsalgspris;

        //evt bare return this.innkjøpspris*1.25 direkte
    }
}

let mel = new Ingrediens("mel", "kg", 8, 20, new Date("07.11.2023"));
let sukker = new Ingrediens("sukker", "dl", 10, 40);

console.log(mel.skrivUt(), mel.utsalgspris());
console.log(sukker.skrivUt(), sukker.utsalgspris());