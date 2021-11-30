import { useEffect, useState } from 'react'
import ScoreBoard from './components/ScoreBoard'
import Beedrill from './images/pokemons/Beedrill.png'
import Blastoise from './images/pokemons/Blastoise.png'
import Bulbasaur from './images/pokemons/Bulbasaur.png'
import Charmander from './images/pokemons/Charmander.png'
import Squirtle from './images/pokemons/Squirtle.png'
import Charizard from './images/pokemons/Charizard.png'



const width = 8;
const pokemons =  [
  Beedrill,
  Blastoise,
  Bulbasaur,
  Charmander,
  Squirtle,
  Charizard
]
/*
[
  'blue',
  'yellow',
  'red',
  'black',
  'pink',
  'green'
]

[
  'Beedrill',
  'Blastoise',
  'Bulbasaur',
  'Charmander',
  'Squirtle',
  'Charizard'
]



*/

const App = () => {
  const [currentPokemonArrangement, setCurrentPokemonArrangement] = useState([])
  const [squareBeingDragged, setSqareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0);



  const checkForColumnOfFour = () =>{
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentPokemonArrangement[i];
      const isBlank = currentPokemonArrangement[i] === '';
      if (columnOfFour.every(square => currentPokemonArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4)
        columnOfFour.forEach(square => currentPokemonArrangement[square] = '')
        return true
      }
    }
  }

  const checkForRowOfFour = () =>{
    for (let i = 0; i < 39; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentPokemonArrangement[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
      const isBlank = currentPokemonArrangement[i] === '';
      if (notValid.includes(i)) continue
      if (rowOfFour.every(square => currentPokemonArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4)
        rowOfFour.forEach(square => currentPokemonArrangement[square] = '')
        return true
      }
    }
  }

  const checkForColumnOfThree = () =>{
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentPokemonArrangement[i];
      const isBlank = currentPokemonArrangement[i] === '';
      if (columnOfThree.every(square => currentPokemonArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        columnOfThree.forEach(square => currentPokemonArrangement[square] = '')
        return true
      }
    }
  }

  const checkForRowOfThree = () =>{
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentPokemonArrangement[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
      const isBlank = currentPokemonArrangement[i] === '';
      if (notValid.includes(i)) continue
      if (rowOfThree.every(square => currentPokemonArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        rowOfThree.forEach(square => currentPokemonArrangement[square] = '')
        return true
      }
    }
  }

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++){
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const findNumber = firstRow.includes(i);

      if (findNumber && currentPokemonArrangement[i] === '') {
        let radnomNumber = Math.floor(Math.random() * pokemons.length);
        let randomColor = pokemons[radnomNumber];
        currentPokemonArrangement[i] = randomColor;
      }

      if (currentPokemonArrangement[i + width] === '') {
        currentPokemonArrangement[i + width] = currentPokemonArrangement[i];
        currentPokemonArrangement[i] = '';
      }
    }
  }

  /*


  const dragStart = (e) => {

    setSqareBeingDragged(e.target)
  }

  const dragDrop = (e) => {

    setSquareBeingReplaced(e.target)
  }

  const dragEnd = (e) => {


    const squareBeingDragedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

    currentPokemonArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentPokemonArrangement[squareBeingDragedId] = squareBeingReplaced.getAttribute('src')


    const validMoves = [
      squareBeingDragedId - 1,
      squareBeingDragedId - width,
      squareBeingDragedId + 1,
      squareBeingDragedId + width,
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)
    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();


    if (squareBeingReplacedId && validMove && (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)) {
      setSqareBeingDragged(null)
      setSquareBeingReplaced(null)
    } else {
      currentPokemonArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
      currentPokemonArrangement[squareBeingDragedId] = squareBeingDragged.getAttribute('src')
      setCurrentPokemonArrangement([...currentPokemonArrangement])
    }
  }

      */

  const createBoard = () =>{
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const radnomNumber = Math.floor(Math.random() * pokemons.length);
      const randomColor = pokemons[radnomNumber];
      randomColorArrangement.push(randomColor);
    }
    setCurrentPokemonArrangement(randomColorArrangement);
  }

  useEffect(() => {
    createBoard()

  }, []);



 /* let start = Date.now();
  let timers = setInterval(() => {
    let timePassed = Date.now() - start;
      if ((parseInt(dragCard.target.id) - parseInt(startCard.target.id)) === -1) {
        startCard.target.style.left = timePassed / 4.3 + 'px';
        dragCard.target.style.right = timePassed / 4.3 + 'px';
      }

      if ((parseInt(dragCard.target.id) - parseInt(startCard.target.id)) === 1) {
        startCard.target.style.right = timePassed / 4.3 + 'px';
        dragCard.target.style.left = timePassed / 4.3 + 'px';
      }

      if ((parseInt(dragCard.target.id) - parseInt(startCard.target.id)) === width) {
        startCard.target.style.bottom = timePassed / 4.3 + 'px';
        dragCard.target.style.top = timePassed / 4.3 + 'px';
      }

      if ((parseInt(dragCard.target.id) - parseInt(startCard.target.id)) === -width) {
        startCard.target.style.top = timePassed / 4.3 + 'px';
        dragCard.target.style.bottom = timePassed / 4.3 + 'px';
      }


     
      if (timePassed >= 300) clearInterval(timers);
    }, 20); */

    
 
  const cardActive = (e) => {
    e.target.classList.toggle('activeCard');
    let dragCardArray = [
      document.getElementById(parseInt(e.target.id) - 1),
      document.getElementById(parseInt(e.target.id) + 1),
      document.getElementById(parseInt(e.target.id) - width),
      document.getElementById(parseInt(e.target.id) + width)
    ]
    if (e.target.classList.contains('activeCard')) {
      dragCardArray.forEach(el => el?.classList.add('dragCard'))
      dragCardArray.forEach(el => el?.addEventListener('mousedown', moveCards));
     
     
    } else {
      dragCardArray.forEach(el => el?.classList.remove('dragCard'))
      dragCardArray.forEach(el => el?.removeEventListener('mousedown', moveCards));
    }   
   }

   const moveCards = () => {
    console.log('ddd')
   }

   

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      moveIntoSquareBelow()
      setCurrentPokemonArrangement([...currentPokemonArrangement])
    }, 100)
    return () => clearInterval(timer)

  }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentPokemonArrangement]);


  return (
    <div className="app">
      <div className="game">
        {currentPokemonArrangement.map((candyColor, index) => (
          <img 
            id={index}
            key={index} 
            src={candyColor}
            alt={candyColor}
            data-id={index}
            onClick={cardActive}
            /*draggable={true}
            
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}*/
          />
        ))}
      </div>
      <ScoreBoard score={scoreDisplay} />
    </div>
  )
}

export default App;
