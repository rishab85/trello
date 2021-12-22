import React, {useState} from 'react';
import './index.css';

function AddCard(props){

    const [showForm, setShowForm]=useState(false);
    const [content, setContent]=useState('');
    const [error, setError]=useState(false)

    function toggleView(){
        setShowForm(!showForm)
    }

    function handleCloseClick(){
        setShowForm(!showForm);
        setContent('');
        setError('');
    }

    function handleChange(event){
       setContent(event.target.value)
       setError('')
    }

    function handleAddClick(){
        if(!content) return setError(true);
        const {handleAddCard, columnId} = props;
        handleAddCard(columnId, {
            id: `${new Date().getTime()}`,
            description: content,
            column: columnId
        })
    }

    if(!showForm) return (
        <button className='secondary__btn createnew__btn' onClick={toggleView}>Create new card +</button>
    )

    return( 
        <div className='addcard-form'>
            <textarea rows={5} onChange={handleChange}/>
            { error && <div className='error_message'>Please enter the content to add card.</div>}
            <div className='action__panel'>
                <button className='primary__btn' onClick={handleAddClick}>Add card</button>
                <button className='secondary__btn cancel__btn' onClick={handleCloseClick}>X</button>
            </div>
        </div>
    )

}

export default AddCard;