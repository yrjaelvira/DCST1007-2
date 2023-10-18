// Oppgave 2 - yatzee
const muligeUtfall: number[] = [1,2,3,4,5,6]

let aktiveTerninger: number[] = [];

class Terning {
    verdi: number = muligeUtfall[Math.floor(Math.random() * muligeUtfall.length)];
    antKast: number = 1;

    constructor(verdi: number){
        this.verdi = verdi;
    }

    // render() {
    //     return(

    //     )
    // }

    kast(){
        if(this.antKast === 3){
            this.regnSum();
            return;
        }

        this.antKast += 1;
        result += `Kast ${this.antKast.toString()}:`
    }

    regnSum(){
        let sum = 0;

        // for (const number of this.spareTerninger) sum += number;

        return sum;
    }
}

// lager knapper for å kaste terning

const spareTerninger: number[] = [];

//bruker push og splice for å overføre fra terninger du bruker til de du sparer på 



let result: string = "";

// lager knapp for å kaste terninger
let kastBtn = document.createElement("button");
kastBtn.id = "btn";
kastBtn.innerText = "Kast terning";
let i: number;

kastBtn.onclick = () => {
     //lager terninger
     for(i=0; i<5; i++){
        let terning = new Terning(Math.floor(Math.random() * 6 + 1));
        aktiveTerninger.push(terning.verdi);

        result += `${terning.verdi}`;
    }
}


//lager knapper for hver mulige terning
muligeUtfall.forEach(value => {
    let button = document.createElement("button");
    button.innerText = value.toString();
    button.onclick = () => {
        if(aktiveTerninger[i] == value){
            spareTerninger.push(value);
        }
    }
})
