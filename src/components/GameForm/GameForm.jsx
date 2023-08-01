/* eslint-disable react/prop-types */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const GameForm = ({ originalPokemon, setCards, clearCards }) => {
  const DEFAULT_NUM_MATCHES = 1;
  const DEFAULT_NUM_CARDS_MATCH = 2;
  const INITIAL_FORM_DATA = { numMatches: DEFAULT_NUM_MATCHES };
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  // https://medium.com/@will.software.engineer/generate-an-array-of-unique-non-repeating-elements-in-javascript-992b585da29a
  const getRandomPokemon = (numMatches) => {
    let randomPokemon = [];
    for (let i = 0; i < numMatches; i++) {
      let randNum = Math.floor(Math.random() * originalPokemon.length);
      let splicedPokemon = [...originalPokemon].splice(randNum, 1)[0];
      randomPokemon.push(splicedPokemon);
    }
    console.log({ randomPokemon });
    return randomPokemon;
  }

  const generateCards = (randomPokemon) => {
    for (let pokemon of randomPokemon) {
      for (let j = 0; j < DEFAULT_NUM_CARDS_MATCH; j++) {
        let newCard = {
          id: uuidv4(),
          pokemonId: pokemon.id,
          name: pokemon.name,
          imageUrl: pokemon.imageUrl,
        };
        setCards((prevCards) => [...prevCards, newCard]);
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    clearCards();
    const randomPokemon = getRandomPokemon(formData.numMatches);
    generateCards(randomPokemon);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  }

  return (
    <div className='GameForm'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="numMatches">Number of Matches:</label>
        <input
          type="number"
          name="numMatches"
          value={formData.numMatches}
          onChange={handleChange}
        />
        <button>
          Create
        </button>
      </form>
    </div >
  );
}

export default GameForm;
