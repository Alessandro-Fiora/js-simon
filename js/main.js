// * Alert con le istruzioni
alert(
  'Simon Says!\nHai 30 secondi per memorizzare 5 numeri\nInseriscili nei campi e schiaccia "Conferma" per vedere quanti ne hai indovinati.\nSe non sei soddisfatto del risultato puoi sempre riprovare!'
);

// ! ------------------------------------   TUTTE LE FUNZIONI
/**
 * Generates an array of 5 random numbers between 1 and 99
 * @returns {Array} the array of random numbers
 */
const randomNumberArrayGenerator = (min, max, tot) => {
  const randomArray = [];
  for (let i = 1; i <= tot; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    randomArray.push(randomNumber);
  }
  return randomArray;
};
/**
 * Prints the elements of the given array into the indicated positions
 * @param {Array} arrayToPrint Array of values to print
 * @param {Array} arrayOfNodesToPrintInto Array of objects in which values to print into
 */
const printArray = (arrayToPrint, arrayOfNodesToPrintInto) => {
  // per ogni slot, inserisco nel testo html il numero casuale corrispondente
  arrayOfNodesToPrintInto.forEach((currentSlot, index) => {
    const currentRandomNumber = arrayToPrint[index];
    currentSlot.innerHTML = `<span>${currentRandomNumber}</span>`;
  });
};
/**
 * Generates input tags and for each of the elements of the given array it replaces it with an input
 * @param {Array} whereToPrint Array of nodes where to put input tags
 */
const printInputs = (whereToPrint) => {
  // Per ognuno degli slot sostituisco i numeri con degli input
  whereToPrint.forEach((currentSlot, index) => {
    currentSlot.innerHTML = `<input
        type="number"
        class="form-control"
        id="number-input${index}"
        min="0"
        max="99"
        required
        />`;
    // Recupero il nodo dei bottoni
    const buttonsEl = document.getElementById("buttons");
    // Tolgo la classe display none per mostrarli in pagina
    buttonsEl.classList.remove("d-none");
  });
};
const countdownHandler = () => {
  // Recupero nodo dove piazzare il countdown
  const countdownEl = document.getElementById("remaining-time");
  // Se il countdown è maggiore di 0
  if (countdown > 0) {
    // Stampo in pagina i secondi rimasti
    countdownEl.innerText = countdown;
    // Decremento i secondi
    countdown--;
  } else {
    // Se il countdown è 0 allora lo lascio settato a 0
    countdownEl.innerText = 0;
    // Sostituisco i numeri con degli input
    printInputs(slotArray);
    // Fermo il conto alla rovescia
    clearInterval(countdownInterval);
  }
};
/**
 * Gets nodes where to print numbers or inputs in and returns an array of these elements
 * @returns {Array} array of nodes where to print numbers or inputs
 */
const getSlotElements = () => {
  // Recupero i nodi che mi servono
  const slot1 = document.getElementById("slot-1");
  const slot2 = document.getElementById("slot-2");
  const slot3 = document.getElementById("slot-3");
  const slot4 = document.getElementById("slot-4");
  const slot5 = document.getElementById("slot-5");

  // li inserisco in un array di nodi
  return [slot1, slot2, slot3, slot4, slot5];
};
/**
 * Gets input nodes and returns an array of these elements
 * @returns {Array} array of nodes of the inputs in html
 */
const getInputValues = () => {
  input1 = document.getElementById("number-input0");
  input2 = document.getElementById("number-input1");
  input3 = document.getElementById("number-input2");
  input4 = document.getElementById("number-input3");
  input5 = document.getElementById("number-input4");

  return [input1, input2, input3, input4, input5];
};
/**
 * Checks if each element of an array is included in another array, it returns an array of the elements that are included
 * @param {Array} arrayToCheck Array of elements to check
 * @param {Array} whitelist Witelist array to check into
 * @returns {Array} Array of elements in the array to check that are included in whitelist
 */
const checkGuesses = (arrayToCheck, whitelist) => {
  //   let counter = 0;
  const guessedNumbers = [];
  arrayToCheck.forEach((currentSlot) => {
    const currentInputNumber = parseInt(currentSlot.value);
    // SE il numero è presente, salvo il numero nell'array di numeri indovinati
    if (
      whitelist.includes(currentInputNumber) &&
      !guessedNumbers.includes(currentInputNumber)
    ) {
      guessedNumbers.push(currentInputNumber);
      // Aggiungo anche una classe per far capire se è stato indovinato
      currentSlot.classList.add("is-valid");
    } else currentSlot.classList.add("is-invalid");
  });
  return guessedNumbers;
};
const checkGuessHandler = () => {
  // Recupero gli input e li metto in un array
  const inputArray = getInputValues();

  // Controllo le corrispondenze
  const guessed = checkGuesses(inputArray, SimonNumbers);

  // Recupero il nodo dove stampare il testo di output
  outputTextEl = document.getElementById("output-text");

  // Ci inserisco il testo di output
  outputTextEl.innerText = `Ne hai indovinati ${guessed.length} : ${guessed}
  Riprova!`;
};
// ! ------------------------------------   -----------------
// * Creo array di nodi dove stampare i numeri dell'array e in seguito gli inputs
const slotArray = getSlotElements();

// * Al caricamento della pagina genero 5 numeri casuali (da 1 a 99) e li salvo in un array
const SimonNumbers = randomNumberArrayGenerator(1, 99, slotArray.length);

// * Stampo i numeri generati
printArray(SimonNumbers, slotArray);

// * Inizializzo un timer di 30 secondi (1 secondo prima che venga eseguito l'intervallo e 29 intervalli)
let countdown = 29;

// * Stampo il countdown in pagina e allo scadere del timer sostituisco i numeri con degli input
const countdownInterval = setInterval(countdownHandler, 1000);

// * Recupero il nodo del form
const inputForm = document.getElementById("input-form");

// * All'invio del form (pressione sul bottone conferma)
inputForm.addEventListener("submit", (e) => {
  // Prevengo l'invio dei dati al back-end e il refresh della pagina
  e.preventDefault();
  // * Controllo ad uno ad uno se i numeri inseriti sono contenuti nell'arrray dei numeri casuali e stampo l'output in pagina
  checkGuessHandler();
});

// * Recupero il nodo del bottone 'Riprova'
const retryButton = document.getElementById("retry-button");

// * Alla pressione del bottone 'Riprova' ricarico la pagina
retryButton.addEventListener("click", () => {
  location.reload();
});
