// 2022 eksamen

// Oppgave 1

class Elev {

    // 1a
    navn: string;
    alder: number;
    trinn: number | null;
    constructor(navn: string, alder: number, trinn: number | null){
        this.navn = navn;
        this.alder = alder;
        this.trinn = trinn;
    }
}

// 1b
const rune = new Elev("Rune", 16, 5);
const birger = new Elev("Birger", 15, 5);

console.log(Elev);

// 1c
class Ansatt {
    rolle: string;
    avdeling: string;
    mndLonn: number;
    constructor(rolle: string, avdeling: string, mndLonn: number){
        this.rolle = rolle;
        this.avdeling = avdeling;
        this.mndLonn = mndLonn;
    }
}

class Laerer extends Ansatt {
    navn: string;
    alder: number;

    // static ROLLE: string = "Underviser";
    // static AVD: string = "Fag";
    // static LONN: number = 25000;

    constructor(navn: string, alder: number, rolle: string, avdeling: string, mndLonn: number){
        // super(rolle, avdeling, mndLonn);

        // if(!rolle && !avdeling && !mndLonn){
        //     this.rolle = Laerer.ROLLE;
        //     this.avdeling = Laerer.AVD;
        //     this.mndLonn = Laerer.LONN;
        // }

        super("underviser", "fag", 25000);

        this.navn = navn;
        this.alder = alder;
    }
}

const lars = new Laerer("Lars", 28, this.rolle, this.avdeling, this.mndLonn);
// const lars = new Laerer("Lars", 28);

console.log(lars.toString());

class Fag {
    fagNavn: string;
    elever: Elev[] = [];
    ansatte: Ansatt[] = [];

    constructor(fagNavn: string, elever: [], ansatte: []){
        this.fagNavn = fagNavn;
        this.elever = elever;
        this.ansatte = ansatte;
    }

}

const samfunnsfag = new Fag("samfunnsfag", this.elever, this.ansatte);
console.log(samfunnsfag);

