import React from 'react';
import Card from '../card';
import AddCard from '../add-card';
import './index.css';

function SwimLane(props){

    const {cards = [], name, cardData, id, handleCardChange, handleAddCard, handleDeleteClick} = props;

    function CardList(){

        return cards.map((each)=>{
            const currentCard = cardData[each]

            return(<Card {...currentCard} key={currentCard.id} handleCardChange={handleCardChange} handleDeleteClick={handleDeleteClick}/>)
        })
    }

    function handleDrop(event){
        const cardId = event.dataTransfer.getData('card_id');
        handleCardChange(cardId, id)
    }

    function handleDragOver(e){
        e.preventDefault()
    }
    return(
    <div
        className='trello__swim-lane'
        onDrop={handleDrop}
        onDragOver={handleDragOver}
    >
        <div className='trello__swim-lane-title'>{name}</div>
        <CardList />
        <AddCard handleAddCard={handleAddCard} columnId={id}/>
    </div>)
}

export default SwimLane