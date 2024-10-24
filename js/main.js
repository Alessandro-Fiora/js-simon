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
const generateRandomNumber = () => Math.floor(Math.random() * 100);
const randomNumberArray = () => {
  const randomArray = [];
  for (let i = 0; i < 5; i++) {
    randomArray.push(generateRandomNumber());
  }
  return randomArray;
};

const SimonNumbers = randomNumberArray();

// Parte un timer di 30 secondi
// Allo scadere del timer sostituisco i numeri con degli input numerici
// All'invio del form controllo ad uno ad uno se i numeri inseriti sono contenuti nell'arrray dei numeri casuali
// SE il numero è presente, aggiorno il contatore e salvo il numero nell'array di numeri indovinati
// Stampo il risultato in pagina
