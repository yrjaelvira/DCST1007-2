//Oppgave 2 på nytt: 


class Terning {
    antKast = 0;
    disabled = false;

    verdi = Math.floor(Math.random() * 6 + 1);

    kast(){
        spareTerninger = [];
        antKast++;

        switch(this.antKast) {
            case 1:
                for (i=0; i < 5; i++) {
                    this.kast1Terninger.push(this.verdi);
                }
                if(spareTerninger.length === 5){
                    this.avslutt();
                } 
                break;

            case 2:
                for(i=0; i < 5 - spareTerninger.length; i++){
                    this.kast2Terninger.push(this.verdi);
                }
                if(spareTerninger.length === 5){
                    this.avslutt();
                } 
                break;

            case 3: 
                for(i=0; i < 5 - spareTerninger.length; i++){
                    this.kast3Terninger.push(this.verdi);
                }
                if(spareTerninger.length === 5 || this.antKast === 3){
                    this.avslutt();
                } 
                break;
        }

        this.kast();
    }

    spar(){
        this.spareTerninger.push(utfall);

    }

    avslutt(){
        let sum = 0;

        for(let number of this.spareTerninger) sum += number;

        return sum;
    }

    render(){
        muligUtfall = [1,2,3,4,5,6];
        kast1Terninger = [];
        kast2Terninger = [];
        kast3Terninger = [];

        return(
            <div>
                <button onclick={this.kast()}>Kast Terning</button>

                <div id="knapperDiv">
                   { this.muligUtfall.map((utfall) => {
                        <button id="button" 
                            value={utfall} 
                            onclick={() => {
                                this.spar(utfall);
                                this.kast();
                            }}
                        >
                        {utfall}
                        </button>
                        })
                    } 
                </div>

                <card>

                </card>

                <card id="kastDiv">
                    <div>Sparte terninger: { sparteTerninger.map((terning) => {
                        <div>{terning.verdi}</div>
                    }) }</div>
                </card>

                <button id="finishBtn" onclick={this.avslutt()}>Reset</button>

            </div>
        )
    }

}