import Card from './Card.js';

class Deck {
    //creates a deck with the given cards/deck or a standard 52 card deck if no cards are provided
    constructor(cards) {
        if (cards instanceof Deck) {
            this.cards = [...cards.getCards()]; 
        } else if (Array.isArray(cards)) {
            this.cards = [...cards]; 
        } else if (cards === undefined) {
            this.cards = [];
            for (const suit of Card.SUITS) {
                for (const rank of Card.RANKS) {
                    this.cards.push(new Card(rank, suit));
                }
            }
        } else {
            throw new Error('Invalid cards parameter');
        }
    }


    getCards(){
        return this.cards;
    }
    shuffle() {
        // Fisher-Yates shuffle algorithm
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        return this;
    }
}

export default Deck;    

