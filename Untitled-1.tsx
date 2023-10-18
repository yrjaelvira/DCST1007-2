//oppgave 1
class Bil {
    hastighet: number;
    regNr: any;
    merke: string;
    aarsmodell: number;
    constructor(regNr: number, merke: string, aarsmodell: number, hastighet: number){
      this.regNr = regNr;
      this.merke = merke;
      this.aarsmodell = aarsmodell;
      this.hastighet = hastighet;
      hastighet = 0;
    }
  
    //oppgave 3 : gass og brems
    gass(){
      if(this.hastighet) return this.hastighet += 10;
      //øker farten med 10
    }
  
    brems(){
      if(this.hastighet >= 10) return this.hastighet -= 10;
      //senker farten med 10 
    }
  }
  
  //oppgave 2
  const volvo: any = new Bil(1234, "Volvo", 2012, 60);
  const ferrari: any = new Bil(4321, "Ferrari", 2021, 120);
  const lada: any = new Bil(2314, "Lada", 2020, 80);

  const biler: Bil[] = [];
//   biler.push(volvo);
//   biler.push(ferrari);
//   biler.push(lada);

const createBilDivs = (biler: Bil[]) => {
    return new Promise<void>((resolve) => {
      biler.forEach((bil) => {
        createBilDiv(bil);
      });
      resolve();
    });
  };
  
  //oppgave 4
  
  const createBilDiv = (bil: Bil) => {
    let bilDiv = document.createElement("div");
  
    let gassBtn = document.createElement("button");
    gassBtn.innerText = "Gi gass";
    gassBtn.onclick = () => {
      bil.gass();
    }
  
    bilDiv.appendChild(gassBtn);
  
    let bremsBtn = document.createElement("button");
    bremsBtn.innerText = "Brems";
    bremsBtn.onclick = () => {
      bil.brems();
    }
  
    bilDiv.appendChild(bremsBtn);
  
    document.body.appendChild(bilDiv);
  }
  
 
  
//   createBilDivs([volvo, ferrari, lada])
//     .then(() => {
//       console.log("Alle bildiver er opprettet");
//     })
//     .catch((error) => {
//       console.error(error);
//     });
  