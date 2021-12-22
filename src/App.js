import React, { useState } from 'react';
import Board from './components/board';
import './App.css';

function App() {
  const [columnData, setColumnData] = useState(
    [{
      name: 'Todo',
      id: 'column1',
      cards: ['card1', 'card12', 'card123']
    }, {
      name: 'Inprogress',
      id: 'column2',
    },
    {
      name: 'QA',
      id: 'column3',
    },
    {
      name: 'Done',
      id: 'column4',
    }]
  
  );

  const [cardData, setCardData] = useState({
    card1: {
      id: 'card1',
      description: '1234',
      column: 'column1'
    },
    card12: {
      id: 'card12',
      description: 'Second card',
      column: 'column1'
    },
    card123: {
      id: 'card123',
      description: 'Third card',
      column: 'column1'
    }
  })

  let swapped = false

  function handleCardChange(cardId, columnId, swapId) {
    const currentCard = cardData[cardId]
    const currentParent = currentCard.column;
    currentCard.column = columnId;

    const clonedColumn = JSON.parse(JSON.stringify(columnData));
    clonedColumn.forEach((each)=>{

      if(swapId && each.id===columnId ) {
        const newIndex = each.cards.indexOf(swapId)
        const clonedArray = each.cards.filter((eachCard)=>eachCard!==cardId);
        clonedArray.splice(newIndex,0, cardId);
        each.cards = clonedArray;
        swapped = true;
        return
      }

        if(each.id===currentParent) {
          each.cards = each.cards?.filter((eachChild)=>eachChild!==cardId)
        }
        if(each.id===columnId){
          const currentCards = each.cards || []
          each.cards = [...currentCards, cardId]
        }

    })

    if(!swapId && swapped ){ 
      swapped = false;
      return
    }

    setColumnData(clonedColumn)
    setCardData({...cardData, [cardId]: {...currentCard}})
  }

  function handleAddCard(columnId, cardContent){

    const clonedColumn = JSON.parse(JSON.stringify(columnData));
    clonedColumn.forEach((each)=>{
      const {cards, id} =each
      const {id: cardId} = cardContent;
      if(id===columnId) {
        const currentCards = cards||[];
        each.cards = [...currentCards, cardId]
      }
    });

    const {id} = cardContent;

    setColumnData(clonedColumn);
    setCardData({...cardData, [id]: {...cardContent}})
  }

  function handleDeleteClick(cardId, columnId) {
    const clonedColumn = JSON.parse(JSON.stringify(columnData));
    const clonedCardData = JSON.parse(JSON.stringify(cardData))
    clonedColumn.forEach((each)=>{
      const {cards, id}=each
      if(id===columnId) {
        const currentCards = cards||[];
        each.cards = currentCards.filter((each)=>each!==cardId)
      }
    });
    delete clonedCardData[cardId]
    setColumnData(clonedColumn);
    setCardData(clonedCardData);
  }


  return (
    <div className="trello__container">
      <Board 
        cardData={cardData}
        columnData={columnData}
        handleCardChange={handleCardChange}
        handleAddCard={handleAddCard}
        handleDeleteClick={handleDeleteClick}
      />
    </div> 
  );
}

export default App;
