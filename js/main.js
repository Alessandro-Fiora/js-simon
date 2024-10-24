// Descrizione:
// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
// Potete usare liste, input e bottoni non stilizzati, mettendo stampe di debug in console e risultato finale in un alert.
// Solo una volta finito, a piacere e facoltativamente, potete aggiungete lo stile.
// NOTA:  non è importante l'ordine con cui l'utente inserisce i numeri, basta che ne indovini il più possibile.
// BONUS
// Inseriamo la validazione: se l'utente mette due numeri uguali o inserisce cose diverse da numeri lo blocchiamo in qualche modo.
// Se l’utente ha inserito qualcosa di non valido, segnaliamolo visivamente nel form.
// Consigli del giorno
// Pensate prima in italiano.
// Dividete in piccoli problemi la consegna.
// Individuate gli elementi di cui avete bisogno per realizzare il programma.
// Immaginate la logica come fosse uno snack: "Dati 2 array di numeri, indica quali e quanti numeri ci sono in comune tra i due array"

// Al caricamento della pagina genero 5 numeri casuali (da 1 a 99), li salvo in un array e li stampo in pagina
const randomNumberArrayGenerator = () => {
  const randomArray = [];
  for (let i = 0; i < 5; i++) {
    const randomNumber = Math.floor(Math.random() * 100);
    randomArray.push(randomNumber);
  }
  return randomArray;
};
const printArray = () => {
  // per ogni slot, inserisco nel testo html il numero casuale corrispondente
  slotArray.forEach((currentSlot, index) => {
    currentSlot.innerHTML = `<span>${SimonNumbers[index]}</span>`;
  });
};
const printInputs = () => {
  slotArray.forEach((currentSlot, index) => {
    currentSlot.innerHTML = `<input
        type="number"
        class="form-control"
        id="number-input${index}"
        min="0"
        max="99"
        required
        />`;
    submitButtonEl.classList.remove("d-none");
  });
};
const countdownHandler = () => {
  // Recupero nodo dove piazzare il countdown
  const countdownEl = document.getElementById("remaining-time");
  if (countdown > 0) {
    countdownEl.innerText = countdown;
    countdown--;
  } else {
    countdownEl.innerText = 0;
    printInputs();
    clearInterval(countdownInterval);
  }
};
// creo array di numeri casuali
const SimonNumbers = randomNumberArrayGenerator();
// Recupero i nodi che mi servono
let slot1 = document.getElementById("slot-1");
let slot2 = document.getElementById("slot-2");
let slot3 = document.getElementById("slot-3");
let slot4 = document.getElementById("slot-4");
let slot5 = document.getElementById("slot-5");
const submitButtonEl = document.getElementById("submit-button");
const inputForm = document.getElementById("input-form");

// creo array di nodi
let slotArray = [slot1, slot2, slot3, slot4, slot5];

printArray();
// Inizializzo countdown
let countdown = 2;

const getInputValues = () => {
  input1 = document.getElementById("number-input0");
  input2 = document.getElementById("number-input1");
  input3 = document.getElementById("number-input2");
  input4 = document.getElementById("number-input3");
  input5 = document.getElementById("number-input4");

  inputArray = [
    input1.value,
    input2.value,
    input3.value,
    input4.value,
    input5.value,
  ];
  return inputArray;
};
const checkGuesses = (arrayToCheck, whitelist) => {
  //   let counter = 0;
  const guessedNumbers = [];
  arrayToCheck.forEach((currentSlot) => {
    const currentInputNumber = parseInt(currentSlot);
    if (whitelist.includes(currentInputNumber)) {
      guessedNumbers.push(currentInputNumber);
    }
  });
  return guessedNumbers;
};
// Parte un timer di 30 secondi
// Allo scadere del timer sostituisco i numeri con degli input numerici
const countdownInterval = setInterval(countdownHandler, 1000);

// All'invio del form controllo ad uno ad uno se i numeri inseriti sono contenuti nell'arrray dei numeri casuali
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputArray = getInputValues();
  const guessed = checkGuesses(inputArray, SimonNumbers);

  console.log("inputArray", inputArray);
  console.log("SimonNumbers", SimonNumbers);
  console.log("guessed", guessed);
  console.log("guessed.length", guessed.length);
});

// SE il numero è presente, aggiorno il contatore e salvo il numero nell'array di numeri indovinati
// Stampo il risultato in pagina
