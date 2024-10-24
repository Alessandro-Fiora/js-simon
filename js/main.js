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
// Recupero i nodi che mi servono
const slot1 = document.getElementById("slot-1");
const slot2 = document.getElementById("slot-2");
const slot3 = document.getElementById("slot-3");
const slot4 = document.getElementById("slot-4");
const slot5 = document.getElementById("slot-5");

// creo array di nodi
const slotArray = [slot1, slot2, slot3, slot4, slot5];

const printArray = () => {
  // creo array di numeri casuali
  const SimonNumbers = randomNumberArrayGenerator();

  // per ogni slot, inserisco nel testo html il numero casuale corrispondente
  slotArray.forEach((currentSlot, index) => {
    currentSlot.innerHTML = `<span>${SimonNumbers[index]}</span>`;
  });
};

// printArray();
// Recupero nodo dove piazzare il countdown

const countdownEl = document.getElementById("remaining-time");
// Inizializzo countdown
let countdown = 3;

// Parte un timer di 30 secondi
const countdownInterval = setInterval(() => {
  if (countdown > 0) {
    countdownEl.innerText = countdown;
    countdown--;
  } else {
    countdownEl.innerText = 0;
    printInputs();
    clearInterval(countdownInterval);
  }
}, 1000);

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
  });
};

// Allo scadere del timer sostituisco i numeri con degli input numerici
// All'invio del form controllo ad uno ad uno se i numeri inseriti sono contenuti nell'arrray dei numeri casuali
// SE il numero è presente, aggiorno il contatore e salvo il numero nell'array di numeri indovinati
// Stampo il risultato in pagina
