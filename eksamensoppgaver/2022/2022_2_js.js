
 // Creating the Dice class
 let valueArr = [1, 2, 3, 4, 5, 6];

 class Dice {
     constructor() {
         this.side = 0;
     }

     roll(){
         this.side = valueArr[Math.floor(Math.random() * valueArr.length)];
     }
 }

 // Creating buttons
 let result = document.createElement('p');
 result.id = 'result';
 document.body.appendChild(result);

 let diceArr = [];

 // start button & dice
 let startButton = document.createElement('button');
 startButton.innerText = 'Roll dice';
 startButton.id = 'start';
 startButton.onclick = () => {
     result.innerText += `First roll: \n`;
     for(i=0; i<5; i++){
         let dice = new Dice();
         dice.roll();
         diceArr.push(dice);
         result.innerText += ` ${dice.side}`;
     }
     keepDiceInfo.style.visibility = 'visible';
     buttonBox.style.visibility = 'visible';
     startButton.style.visibility = 'hidden';
 }

// Creating info boxes & buttons
let keepDiceInfo = document.createElement('p')
keepDiceInfo.id = 'diceInfo';
keepDiceInfo.style.visibility = 'hidden';
keepDiceInfo.innerText = 'Which dice do you keep?'
document.body.appendChild(keepDiceInfo)
let buttonBox = document.createElement('div');
buttonBox.id = 'buttonBox';
buttonBox.style.visibility = 'hidden';
document.body.appendChild(buttonBox);

valueArr.forEach(value => {
 let button = document.createElement('button');
 button.innerText = value;
 button.onclick = () => reRoll(value);
 document.getElementById('buttonBox').appendChild(button);
 document.body.appendChild(startButton);
});

// defining count to keep track of rerolls
let count = 1;

// reroll function 
function reRoll(x){
 if(count === 3){
     final(x);
     return;
 }
 count +=1;
 result.innerText += `\n Roll ${count}:`;
 diceArr.forEach(dice => {
     if(dice.side !== x){
         // set this index to be new dice
         let die = new Dice();
         die.roll();
         diceArr[diceArr.indexOf(dice)] = die;
     }
 });
 show(diceArr);
}

function show(x){
result.innerText += `\n`;
x.map(dice => result.innerText += ` ${dice.side} `)
}

// reset button
let resetBtn = document.createElement('button');
resetBtn.innerText = 'Reset';
resetBtn.id = 'reset';
resetBtn.onclick = () => {
diceArr = [];
count = 1;
document.getElementById('result').innerText = '';
document.getElementById('reset').style.visibility = 'hidden';
document.getElementById('start').style.visibility = 'visible';
}
resetBtn.style.visibility = 'hidden';
document.body.appendChild(resetBtn);

function final(x){
result.innerText += `\n Score: \n`;
let score = diceArr.reduce((a, b) => {
 if(b.side === x){
     return a + x;
 }
 return a;
}, 0);
result.innerText += ` ${score}`;
document.getElementById('reset').style.visibility = 'visible';
document.getElementById('buttonBox').style.visibility = 'hidden';
document.getElementById('diceInfo').style.visibility = 'hidden';
}





// // Oppgave 2 - yatzee
// const muligeUtfall = [1, 2, 3, 4, 5, 6];
// const aktiveTerninger = [];
// const spareTerninger = [];

// let antKast = 0;

// // Lager knapp for å kaste terninger
// const kastBtn = document.createElement("button");
// kastBtn.id = "btn";
// kastBtn.innerText = "Kast terning";

// const result = document.createElement("div");

// class Terning {
//   constructor() {
//     this.verdi = Math.floor(Math.random() * 6) + 1;
//     this.erSparet = false;
//   }

//   kast() {
//     this.verdi = Math.floor(Math.random() * 6) + 1;
//   }

//   spar() {
//     this.erSparet = true;
//     aktiveTerninger.splice(aktiveTerninger.indexOf(this), 1);
//     spareTerninger.push(this);
//   }

//   avspark() {
//     this.erSparet = false;
//     spareTerninger.splice(spareTerninger.indexOf(this), 1);
//     aktiveTerninger.push(this);
//   }
// }

// // Legger til en terning for hvert kast
// function kast() {
//   antKast++;
//   for (let i = aktiveTerninger.length; i < 5; i++) {
//     const terning = new Terning();
//     aktiveTerninger.push(terning);
//   }
//   oppdaterResultat();
// }

// // Oppdaterer resultat-diven med verdien til hver terning
// function oppdaterResultat() {
//   result.innerText = aktiveTerninger
//     .map((terning) => terning.verdi)
//     .join(", ");
// }

// // Håndterer klikk på en terning
// function klikkTerning(terning) {
//   if (terning.erSparet) {
//     terning.avspark();
//   } else {
//     terning.spar();
//   }
//   oppdaterResultat();
// }

// // Kaster terningene og nullstiller antall kast
// kastBtn.onclick = () => {
//   kast();
//   antKast = 0;
//   if (antKast === 3) {
//     avsluttSpill();
//   }
// };

// // Oppretter en knapp for hver verdi fra 1 til 6
// for (let i = 1; i <= 6; i++) {
//   const knapp = document.createElement("button");
//   knapp.innerText = i;
//   knapp.onclick = () => {
//     for (let terning of spareTerninger) {
//       if (terning.verdi === i) {
//         return;
//       }
//     }
//     for (let terning of aktiveTerninger) {
//       if (terning.verdi === i) {
//         klikkTerning(terning);
//         break;
//       }
//     }
//   };
//   document.body.appendChild(knapp);
// }

// // Avslutter spillet og viser resultatet
// function avsluttSpill() {
//   let sum = 0;
//   for (let terning of spareTerninger) {
//     sum += terning.verdi;
//   }
//   result.innerText = `Spillet er avsluttet. Du oppnådde en sum på ${sum} poeng.`;
// }

// document.body.append(kastBtn, result);


//------------------------------------------------------------------------------------------

//Mulig løsning???? bare funksjoner ikke med klassene osv

// kast(){
//     antKast++;

//     this.result.innerHTML += `<br> Kast ${this.antKast}`;

//     for(i=0; i<5; i++){
//         let terning = new Terning();
//         aktiveTerninger.push(terning); //eller terning.verdi

//         this.result.innerText += terning.verdi;
//     }

// }

// kastIgjen(){
//     if(antKast == 3 || sparteTerninger.length == 5){
//         button.disabled = true;
//         this.avslutt();
//     } else {
//         this.kast();
//     }
// }

// spar(){
//     for(i=0; i<this.aktiveTerninger.length; i++){
//         if(this.utfall === this.aktiveTerninger[i]){
//             this.spareTerninger.push(this.aktiveTerninger[i]);
//             this.aktiveTerninger.splice(aktiveTerninger.indexOf(i), 1);
//         }
//     }
// }

// avslutt(){
//     if(sparteTerninger.length === 5 || antKast === 3){
//         let sum = 0;

//         for(let number of sparteTerninger){
//             sum += number;
//         }

//         this.aktiveTerninger = [];
//         this.spareTerninger = [];

//         return sum;
//     }
// }

// render(){

//     return(
//         <div id="skjermDiv">
//             <button onclick={this.kast()}>Kast terning</button>

//             <div id="knapperDiv">
//             { this.muligUtfall.map((utfall) => {
//                 <button id="button" 
//                     value={utfall} 
//                     onclick={() => 
//                     spar(utfall)}
//                 >
//                     {utfall}
//                 </button>
//                 })
//             } 
//             </div>

//             <card id="kastDiv">
//                 <div id={result}></div>
//                 <div>Sparte terninger: { sparteTerninger.map((terning) => {
//                     <div>{terning.verdi}</div>
//                 }) }</div>
//             </card>

//             <button id="finishBtn" onclick={this.avslutt()}>Reset</button>

//         </div>
//     );
// }

