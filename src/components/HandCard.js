import React from 'react';
import "./HandCard.css"

export default function HandCard(card) {
    const color = ((card.suit === '♥') || (card.suit === '♦'))? 'red' : 'black';
    return (
        <div className={`handCard ${color}`}> {card.value} <br/> 
                {card.suit}
        </div>
    )
}