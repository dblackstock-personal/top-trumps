//---this bit is for creating the cards---

class Card {
    constructor(name, tastinessNo, sizeNo, vowelsNo, difficultyToEat) {
        this.name = name;
        this.tastiness = { number: tastinessNo, highestWins: true };
        this.size = { number: sizeNo, highestWins: true };   //length or diameter in inches
        this.vowels = { number: vowelsNo, highestWins: true };
        this.difficulty = { number: difficultyToEat, highestWins: false };  //the lowest result wins for this one
        this.winsNum = 0;
    }
}

const orange = new Card(`Orange`, 7, 3, 3, 3);
const pineapple = new Card(`Pineapple`, 2, 12, 4, 5);
const grapeWithSeeds = new Card(`Seeded Grape`, 2, 0.5, 5, 1);
const grapeNoSeeds = new Card(`Unseeded Grape`, 4, 0.5, 6, 1);
const mango = new Card(`Mango`, 10, 9, 2, 4);
const apple = new Card(`Apple`, 6, 3, 2, 3);
const pear = new Card(`Pear`, 3, 6, 2, 3);
const watermelon = new Card(`Watermelon`, 9, 24, 4, 4);
const honeydew = new Card(`Honeydew Melon`, 7, 7, 5, 4);
const coconut = new Card(`Coconut`, 4, 15, 3, 5);
const banana = new Card(`Banana`, 5, 8, 3, 2);
const strawberry = new Card(`Strawberry`, 7, 1.5, 2, 1);
const raspberry = new Card(`Raspberry`, 8, 0.5, 2, 1);
const peach = new Card(`Peach`, 6, 3, 2, 2);
const plum = new Card(`Plum`, 5, 2, 1, 2);
const blueberry = new Card(`Blueberry`, 7, 0.5, 3, 1);
const blackberry = new Card(`Blackberry`, 6, 0.5, 2, 1);
const cherry = new Card(`Cherry`, 6, 0.5, 1, 2);
const kiwifruit = new Card(`Kiwifruit`, 4, 2, 4, 3);
const lychee = new Card(`Lychee`, 6, 1, 2, 3);
const date = new Card(`Date`, 3, 1.5, 2, 3);
const fig = new Card(`Fig`, 2, 1.5, 1, 3);
const lemon = new Card(`Lemon`, 1, 2.5, 2, 2);
const lime = new Card(`Lime`, 1, 2, 2, 2);
const passionfruit = new Card(`Passionfruit`, 6, 2.5, 5, 3);
const pomegranate = new Card(`Pomegranate`, 7, 3, 5, 3);
const persimmon = new Card(`Persimmon`, 2, 2, 3, 2);
const tamarind = new Card(`Tamarind`, 1, 5, 3, 4);
const blackcurrant = new Card(`Blackcurrant`, 2, 0.3, 3, 1);
const cranberry = new Card(`Cranberry`, 5, 0.3, 2, 1);



//---this bit is for creating the decks and deck manipulation---
//I created this in order to better manipulate the decks with the defined functions
class Deck {
    constructor(cards, player) {
        this.cards = cards;
        this.player = player;
    }
    //gives p1 and p2 top cards to the chosen deck
    giveCardsToDeck() {
        let card1 = deckPlayer1.cards.shift();
        let card2 = deckPlayer2.cards.shift();
        this.cards.push(card1, card2);
        this.giveTieCardsToDeck();
    }
    //this is phrased oddly in order to have it work with the tieDeck (with no change to the tieDeck)
    giveTieCardsToDeck() {
        let tieCards = tieDeck.cards.splice(0, tieDeck.cards.length);
        this.cards = this.cards.concat(tieCards);
    }
}


let initalDeck = new Deck([orange, pineapple, grapeWithSeeds, grapeNoSeeds, mango, apple, pear, watermelon, honeydew, coconut, banana, strawberry, raspberry, peach, plum, blueberry, blackberry, cherry, kiwifruit, lychee, date, fig, lemon, lime, passionfruit, pomegranate, persimmon, tamarind, blackcurrant, cranberry]);

let deckPlayer1 = new Deck(initalDeck.cards.slice(0, Math.floor(initalDeck.cards.length / 2)), `Player1`);
let deckPlayer2 = new Deck(initalDeck.cards.slice(Math.floor(initalDeck.cards.length / 2), initalDeck.cards.length), `Player2`);

let tieDeck = new Deck([]); //cards get put in it when there is a tie

//---this bit is for the rest of the code---


const compare = (value) => {
    value = value.toLowerCase();
    let card1 = deckPlayer1.cards[0];
    let card2 = deckPlayer2.cards[0];
    
    //if an invalid value was passed in it should be picked up here
    if (!card1.hasOwnProperty(value)) {
        return `please enter a value type.`;
        //p1 wins if it has the highest value (or lowest if the value isn't highestWins)
    } else if ((card1[value].number > card2[value].number && card1[value].highestWins == true) || (card1[value].number < card2[value].number && card1[value].highestWins == false)) {
        return cardWins(deckPlayer1, value, deckPlayer2);
        //p2 wins if it has the highest value (or lowest if the value isn't highestWins)
    } else if ((card2[value].number > card1[value].number && card1[value].highestWins == true) || (card2[value].number < card1[value].number && card1[value].highestWins == false)) {
        return cardWins(deckPlayer2, value, deckPlayer1);
        //in the case of a tie
    } else if (card2[value].number == card1[value].number) {
        return cardWins(deckPlayer1, value, deckPlayer2, true);
        //some extra error handling
    } else {
        return `something went wrong...`;
    }
}

const cardWins = (deckWin, value, deckLose, tie) => {   //tie is passed in as a true argument if the result is a tie
    if (tie) {
        let response = `${deckWin.player} and ${deckLose.player} tie with a value of ${deckWin.cards[0][value].number}! The ${deckWin.cards[0].name} and ${deckLose.cards[0].name} cards have been placed on the tie deck.`;
        tieDeck.giveCardsToDeck();
        return response;

    } else {
        deckWin.cards[0].winsNum++;
        console.log(`${deckWin.cards[0].name} has won ${deckWin.cards[0].winsNum} times.`);
        let response = `${deckWin.player}'s ${deckWin.cards[0].name} wins with a value of ${deckWin.cards[0][value].number} compared to ${deckLose.player}'s ${deckLose.cards[0].name} of value ${deckLose.cards[0][value].number}.`;
        deckWin.giveCardsToDeck();
        return response;
    }

}

const playGame = () => {
    while (deckPlayer1.cards.length != 0 && deckPlayer2.cards.length != 0) {
        //this is the initial screen and every card-selection screen
        let compareNumber = prompt(`Player1: ${deckPlayer1.cards.length} cards. Player2: ${deckPlayer2.cards.length} cards. Tie Deck: ${tieDeck.cards.length} cards.\n
        Player1: Your current card is ${deckPlayer1.cards[0].name}. It's values are
        ↑Tastiness = ${deckPlayer1.cards[0].tastiness.number}
        ↑Size = ${deckPlayer1.cards[0].size.number}
        ↑Vowels = ${deckPlayer1.cards[0].vowels.number}
        ↓Difficulty = ${deckPlayer1.cards[0].difficulty.number}
       Please choose a value to compare.`);
        alert(compare(compareNumber));
    }

    const whoWon = () => {
        if (deckPlayer1.cards.length > deckPlayer2.cards.length) {
            return `Player 1`;
        }
        else return `Player 2`;
    }
    alert(`The game is over! ${whoWon()} won!`)
}


playGame();

//todo: maybe have it remember your name?
//add more values for each fruit