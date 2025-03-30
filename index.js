import Card from './Card.js';
import Deck from './Deck.js';

const StraightLowA = [new Card('A', 'Hearts'), new Card('5', 'Hearts'), new Card('2', 'Hearts'), new Card('3', 'Hearts'), new Card('4', 'Hearts')];
const NotStraight = [new Card('A', 'Hearts'), new Card('5', 'Hearts'), new Card('3', 'Hearts'), new Card('4', 'Hearts'), new Card('6', 'Hearts')];
const StraightReverse = [new Card('6', 'Hearts'), new Card('7', 'Hearts'), new Card('10', 'Hearts'), new Card('9', 'Hearts'), new Card('8', 'Hearts')];
const StraightHighA = [new Card('10', 'Hearts'), new Card('K', 'Hearts'), new Card('A', 'Hearts'), new Card('J', 'Hearts'), new Card('Q', 'Hearts')];
const AlmostStraight = [new Card('2', 'Hearts'), new Card('3', 'Hearts'), new Card('4', 'Hearts'), new Card('5', 'Hearts'), new Card('7', 'Hearts')]; 
const DuplicateValueNotStraight = [new Card('5', 'Hearts'), new Card('6', 'Hearts'), new Card('7', 'Hearts'), new Card('8', 'Hearts'), new Card('8', 'Diamonds')]; 
const WraparoundNotStraight = [new Card('Q', 'Hearts'), new Card('K', 'Hearts'), new Card('A', 'Hearts'), new Card('2', 'Hearts'), new Card('3', 'Hearts')];
const UnsortedStraight = [new Card('7', 'Hearts'), new Card('4', 'Hearts'), new Card('6', 'Hearts'), new Card('3', 'Hearts'), new Card('5', 'Hearts')];
const AceLowStraightDifferentSuits = [new Card('A', 'Clubs'), new Card('2', 'Hearts'), new Card('3', 'Diamonds'), new Card('4', 'Spades'), new Card('5', 'Hearts')];
const SequentialStraightWithFaceCards = [new Card('9', 'Hearts'), new Card('10', 'Hearts'), new Card('J', 'Hearts'), new Card('Q', 'Hearts'), new Card('K', 'Hearts')];

function InitializeDeck(){
    return new Deck();
}

function isFlush(cards){
    const firstSuit = cards[0].suit;
    return cards.every(card => card.suit === firstSuit);
}


function isStraight(cards){
    if (cards.length != 5) return false;

    let sortedCards =[];
    let isAceHigh = false;
    //check for king and if found use A as 14
    if (cards.some(card => card.rank === 'K')) {
        sortedCards = sortCards(cards, true);
        isAceHigh = true;
    }else{
        sortedCards = sortCards(cards);
    }
        for (let i = 0; i < sortedCards.length - 1; i++) {
            if(sortedCards[i].getCardValue(isAceHigh) != sortedCards[i+1].getCardValue(isAceHigh)-1){
                return false;
            }
        }
    
    return true;
}
const card = new Card('A', 'Hearts');
function sortCards(cards, isAceHigh = false){
    return cards.sort((a, b) => {
        return a.getCardValue(isAceHigh) - b.getCardValue(isAceHigh);
    });
}

const deck = InitializeDeck();
console.log(isFlush(StraightLowA));
console.log("Above should be true");
console.log(isFlush(AceLowStraightDifferentSuits));
console.log("Above should be false");
console.log(isStraight(NotStraight));
console.log("Above should be false");
console.log(isStraight(StraightReverse));
console.log("Above should be true");
console.log(isStraight(StraightHighA));
console.log("Above should be true");
console.log(isStraight(StraightLowA));
console.log("Above should be true");
console.log(isStraight(AlmostStraight));
console.log("Above should be false");
console.log(isStraight(DuplicateValueNotStraight));
console.log("Above should be false");
console.log(isStraight(WraparoundNotStraight));
console.log("Above should be false");
console.log(isStraight(UnsortedStraight));
console.log("Above should be true");
console.log(isStraight(AceLowStraightDifferentSuits));
console.log("Above should be true"); 
console.log(isStraight(SequentialStraightWithFaceCards));
console.log("Above should be true");

