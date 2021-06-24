import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import AddCardForm from './AddCardForm';

const AddCardButton = ({ newCard, setNewCard, columns, setColumns }) => {
  console.log('add button', setNewCard);
  const [buttonClicked, setButtonClicked] = useState(false);

  const toggleButton = () => {
    setButtonClicked(buttonClicked ? false : true);
    console.log('buttonClicked', buttonClicked);
  };
  if (!buttonClicked) {
    return (
      <div>
        <Button className="add-card-button" variant="secondary" onClick={toggleButton}>
          +
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <Button className="add-card-button" variant="secondary" onClick={toggleButton}>
          +
        </Button>
        <AddCardForm
          buttonClicked={buttonClicked}
          newCard={newCard}
          setNewCard={setNewCard}
          columns={columns}
          setColumns={setColumns}
        />
      </div>
    );
  }
};

export default AddCardButton;
