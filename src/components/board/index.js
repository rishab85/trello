import React from 'react';
import SwimLane from '../swim-lane';
import './index.css';

function Board(props){

    const {columnData = [], cardData, ...otherProps} = props;

    function ColumnList(){

        return columnData.map((each)=>{
            return(<SwimLane {...each} cardData={cardData} key={each.id} {...otherProps}/>)
        })
    }

    return(<div className='trello__board'>
        <ColumnList />
    </div>)
}

export default Board