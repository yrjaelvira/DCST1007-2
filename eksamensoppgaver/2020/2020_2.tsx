abstract class SpilleBrikke {
    protected _name: string = "brikke";
    private _color: string = '';
    private _xPos: string = '';
    private _yPos: number;
    private _validX: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
    private _validY: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

    constructor(color: string, xPos: string, yPos: number) {
        this._color = color;

        if (this.validateX(xPos)) this._xPos = xPos;
        else throw new Error('Posisjonen til X må være en bokstav mellom A og H');

        if (this.validateY(yPos)) this._yPos = yPos;
        else throw new Error('Posisjonen til y må være et tall mellom 1 og 8');
    }

    get color() { return this._color; }
    get xPos() { return this._xPos; }
    get yPos() { return this._yPos; }

    validateX(pos: string): boolean {
        for (const letter of this._validX) if (pos.toUpperCase() === letter) return true;
        return false;
    }

    validateY(pos: number): boolean {
        for (const number of this._validY) if (pos === number) return true;
        return false;
    }

    toString(){
        return(
            `${this._color} ${this._name} har posisjon ${this._xPos}${this._yPos}`
        );
    }
}

//lager klasser for spillebrikkene som arver fra superklassen. 
class Bonde extends SpilleBrikke{
    _name = "Bonde";

    constructor(color: string, xPos: string, yPos: number){
        super(color, xPos, yPos);
    }
}

class Taarn extends SpilleBrikke{
    _name = "Tårn";

    constructor(color: string, xPos: string, yPos: number){
        super(color, xPos, yPos);
    }
}

class Loper extends SpilleBrikke{
    _name = "Løper";

    constructor(color: string, xPos: string, yPos: number){
        super(color, xPos, yPos);
    }
}

class Springer extends SpilleBrikke{
    _name = "Springer";

    constructor(color: string, xPos: string, yPos: number){
        super(color, xPos, yPos);
    }
}

class Konge extends SpilleBrikke{
    _name = "Konge";

    constructor(color: string, xPos: string, yPos: number){
        super(color, xPos, yPos);
    }
}

class Dronning extends SpilleBrikke{
    _name = "Dronning";

    constructor(color: string, xPos: string, yPos: number){
        super(color, xPos, yPos);
    }
}

//oppretter alle brikkene på brettet med riktig farge og posisjon
const bønder: Bonde[] = [];
const tårn: Taarn[] = [new Taarn("white", "A", 1), new Taarn("white", "H", 1), new Taarn("black", "H", 8), new Taarn("black", "A", 8)];
const springere: Springer[] = [new Springer("white", "B", 1), new Springer("white", "G", 1), new Springer("black", "B", 8), new Springer("black", "G", 8)]
const løpere: Loper[] = [new Loper("white", "C", 1), new Loper("white", "F", 1), new Loper("black", "F", 8), new Loper("black", "C", 8)];
const konger: Konge[] = [new Konge("white", "E", 1), new Konge("black", "E", 8)];
const dronninger: Dronning[] = [new Dronning("white", "D", 1), new Dronning("black", "D", 8)];

const letters: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
/*her lager vi en array for bokstavene slik at vi kan kjøre gjennom dem som løkke og plassere 
alle bøndene i samme funksjon, se neste linje*/
for (let i = 0; i < 8; i++) bønder.push(new Bonde("white", letters[i], 2));
for (let i = 0; i < 8; i++) bønder.push(new Bonde("black", letters[i], 7));

for (const bonde of bønder) console.log(bonde.toString());
for (const t of tårn) console.log(t.toString());
for (const springer of springere) console.log(springer.toString());
for (const løper of løpere) console.log(løper.toString());
for (const konge of konger) console.log(konge.toString());
for (const dronning of dronninger) console.log(dronning.toString());