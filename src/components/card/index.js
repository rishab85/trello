import React from 'react';
import './index.css';

function Card(props){

    const {handleCardChange, column, id, handleDeleteClick}=props;
    function handleDragStart(e){
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData('card_id', id)

        setTimeout(()=>{
            e.target.style.display = 'none'
        },0)
    }

    function handleDragOver(e){
        e.preventDefault()
        e.stopPropagation()
    }

    function handleDragEnd(e){
        
    }

    function handleDrop(e){
        const cardId = e.dataTransfer.getData('card_id')
        handleCardChange(cardId, column, id );
    }

    function handleDelete(){
        handleDeleteClick(id, column)
    }

    return(
        <div className='trello__card'
            draggable={true}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
        >
            <button className='secondary__btn delete__btn' onClick={handleDelete}>X</button>
            {props.description}
        </div>
    )
}

export default Card;