class Kjoretoy{
    makshastighet: Number;
    kjorelengde: Number;
    farge: string = "hvit";
    constructor(kjorelengde: Number, makshastighet: Number){
        this.makshastighet = makshastighet;
        this.kjorelengde = kjorelengde;
    }
}

let kjoretoy = new Kjoretoy(10000, 210);
console.log(kjoretoy);

class Buss extends Kjoretoy{
    makspassasjerer: number;
    constructor(kjorelengde: Number, makshastighet: Number, makspassasjerer: number){
        super(kjorelengde, makshastighet);
        this.makspassasjerer = makspassasjerer;
    }

    sjekkAnt(antallPassasjerer: number){
        if(antallPassasjerer > this.makspassasjerer) return false; 
        else return true;

        //evt: return antallPassasjerer <= this.makspassasjer;
    }

    dagsLeie(){
        let mva = 0.25;
        let leiePrPers = 100;
        let prisUmva = this.makspassasjerer * leiePrPers;
        let totalSum: Number = prisUmva * (1+mva)
        return totalSum;
    }
}

let buss = new Buss(8000, 100, 60);
console.log(buss.sjekkAnt(50));
console.log(buss.farge)
console.log(buss.dagsLeie());