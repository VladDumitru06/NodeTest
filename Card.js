class Card {

    static RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    static SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    
    constructor(rank, suit) {
        if (!Card.RANKS.includes(rank) || !Card.SUITS.includes(suit)) {
            throw new Error('Invalid card');
        }
        this._rank = rank;
        this._suit = suit;
    }

    getCardValue(isHigh = true) {
        if (isHigh && this._rank === 'A') {
            return 14;
        }
        if (!isHigh && this._rank === 'A') {
            return 1;
        }
        return Card.RANKS.indexOf(this._rank) + 2;
    }

    getCardName() {
        return `${this._rank} of ${this._suit}`;
    }

    get suit(){
        return this._suit;
    }
    
    get rank(){
        return this._rank;
    }
}

export default Card;
