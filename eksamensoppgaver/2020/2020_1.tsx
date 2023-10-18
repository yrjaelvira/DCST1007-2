//oppgave a

class Sirkel{
    private _radius?: number = 1;
    private _color?: string = 'red';

    constructor(radius?: number, color?: string){
        if (radius && radius > 0) this._radius = radius;
        if (color) this._color = color;
       
    }

    get radius() {return this._radius};
    get color() {return this._color};

    set radius(value: number|undefined) {this._radius = value};
    set color(value: string|undefined) {this._color = value};
    
    get areal() { if (this._radius) return (Math.PI * this._radius)**2; }
    get omkrets() { if (this._radius) return 2*Math.PI * this._radius; }

    toString() {
        if (this._radius) {
            return(
                `Sirkelen har en radius på ${this._radius}, areal på ${this.areal} og omkrets på ${this.omkrets}. `
            );
        } else {
            `Sirkelen mangler radius`;
        }
         
    }
}

//Oppgave b
const opprettSirkel = new Sirkel();
const nySirkel = new Sirkel(2, "blue");
console.log(opprettSirkel.toString());
console.log(nySirkel.toString());

//Oppgave c
class Kube {
    private _side: number;
    private _sirkel: Sirkel;

    constructor(side: number, sirkel: Sirkel){
        this._side = side;
        this._sirkel = sirkel;
    }
}

const kube = new Kube(2, nySirkel);