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
alert(
  'Simon Says!\nHai 30 secondi per memorizzare 5 numeri\nInseriscili nei campi e schiaccia "Conferma" per vedere quanti ne hai indovinati.\nSe non sei soddisfatto del risultato puoi sempre riprovare!'
);

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
    buttonsEl.classList.remove("d-none");
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
const buttonsEl = document.getElementById("buttons");
const inputForm = document.getElementById("input-form");
const retryButton = document.getElementById("retry-button");

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

  inputArray = [input1, input2, input3, input4, input5];
  return inputArray;
};
const checkGuesses = (arrayToCheck, whitelist) => {
  //   let counter = 0;
  const guessedNumbers = [];
  arrayToCheck.forEach((currentSlot) => {
    const currentInputNumber = parseInt(currentSlot.value);
    // SE il numero è presente, salvo il numero nell'array di numeri indovinati
    if (whitelist.includes(currentInputNumber)) {
      guessedNumbers.push(currentInputNumber);
      // Aggiungo anche una classe per far capire se è stato indovinato
      currentSlot.classList.add("is-valid");
    } else currentSlot.classList.add("is-invalid");
  });
  return guessedNumbers;
};
// Parte un timer di 30 secondi
// Allo scadere del timer sostituisco i numeri con degli input numerici
const countdownInterval = setInterval(countdownHandler, 1000);
// All'invio del form controllo ad uno ad uno se i numeri inseriti sono contenuti nell'arrray dei numeri casuali
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const checkGuessHandler = () => {
    const inputArray = getInputValues();
    const guessed = checkGuesses(inputArray, SimonNumbers);

    outputTextEl = document.getElementById("output-text");
    outputTextEl.innerText = `Ne hai indovinati ${guessed.length} : ${guessed}
    Riprova!`;
  };
  checkGuessHandler();
});
retryButton.addEventListener("click", () => {
  location.reload();
});

// Stampo il risultato in pagina
