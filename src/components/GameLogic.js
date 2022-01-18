import { useState, useEffect, useCallback } from 'react'
import Beedrill from '../images/pokemons/Beedrill.png'
import Blastoise from '../images/pokemons/Blastoise.png'
import Bulbasaur from '../images/pokemons/Bulbasaur.png'
import Charmander from '../images/pokemons/Charmander.png'
import Squirtle from '../images/pokemons/Squirtle.png'
import Charizard from '../images/pokemons/Charizard.png'
import Empty from '../images/pokemons/Empty.png'
import ScoreBoard from './ScoreBoard.js'
import TimeBoard from './TimerBoard'
import * as React from 'react'
import Button from '@mui/material/Button' 
import AudioElement from './AudioElement'




const width = 8;
const pokemons =  [
  Beedrill,
  Blastoise,
  Bulbasaur,
  Charmander,
  Squirtle,
  Charizard
]
const emptyPic = Empty;
 
const GameLogic = () => {
      const [currentPokemonArrangement, setCurrentPokemonArrangement] = useState([])
  const [scoreDisplay, setScoreDisplay] = useState(0);
  const [activeId, setActiveId] = useState(null);



  const checkForColumnOfFour = useCallback(() =>{
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentPokemonArrangement[i];
      const isBlank = currentPokemonArrangement[i] === emptyPic;
      if (columnOfFour.every(square => currentPokemonArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4)
        columnOfFour.forEach(square => currentPokemonArrangement[square] = emptyPic)
        return true
      }
    }
  }, [currentPokemonArrangement]);

  const checkForRowOfFour = useCallback(() =>{
    for (let i = 0; i < 39; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentPokemonArrangement[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
      const isBlank = currentPokemonArrangement[i] === emptyPic;
      if (notValid.includes(i)) continue
      if (rowOfFour.every(square => currentPokemonArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4)
        rowOfFour.forEach(square => currentPokemonArrangement[square] = emptyPic)
        return true
      }
    }
  }, [currentPokemonArrangement]);

  const checkForColumnOfThree = useCallback(() =>{
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentPokemonArrangement[i];
      const isBlank = currentPokemonArrangement[i] === emptyPic;
      if (columnOfThree.every(square => currentPokemonArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        columnOfThree.forEach(square => currentPokemonArrangement[square] = emptyPic)
        return true
      }
    }
  }, [currentPokemonArrangement]);

  const checkForRowOfThree = useCallback(() =>{
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentPokemonArrangement[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
      const isBlank = currentPokemonArrangement[i] === emptyPic;
      if (notValid.includes(i)) continue
      if (rowOfThree.every(square => currentPokemonArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        rowOfThree.forEach(square => currentPokemonArrangement[square] = emptyPic)
        return true
      }
    
    }
  }, [currentPokemonArrangement]);

  const moveIntoSquareBelow = useCallback(() => {
    for (let i = 0; i <= 55; i++){
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const findNumber = firstRow.includes(i);

      if (findNumber && currentPokemonArrangement[i] === emptyPic) {
        let radnomNumber = Math.floor(Math.random() * pokemons.length);
        let randomColor = pokemons[radnomNumber];
        currentPokemonArrangement[i] = randomColor;
      }

      if (currentPokemonArrangement[i + width] === emptyPic) {
        currentPokemonArrangement[i + width] = currentPokemonArrangement[i];
        currentPokemonArrangement[i] = emptyPic;
      }
    }
  }, [currentPokemonArrangement]);

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

    
 
  const cardActive = (e) => {
    if (!e.target.classList.contains('dragCard')) {
      e.target.classList.toggle('activeCard');
      let dragCardArray = [
        document.getElementById(parseInt(e.target.id) - 1),
        document.getElementById(parseInt(e.target.id) + 1),
        document.getElementById(parseInt(e.target.id) - width),
        document.getElementById(parseInt(e.target.id) + width)
      ]
    
      let leftSideActiveCard = [8, 16, 24, 32, 40, 48, 56];
      let rightSideActiveCard = [7, 15, 23, 31, 39, 47, 55];
      if (e.target.classList.contains('activeCard')) {
        
        dragCardArray.forEach(el => el?.classList.add('dragCard'));
        let newCardBlockArray = document.querySelectorAll('img');
        newCardBlockArray.forEach(el => el.classList.add('nonClick'));
        if (leftSideActiveCard.includes(parseInt(e.target.id))) {
          document.getElementById(parseInt(e.target.id) - 1).classList.remove('dragCard');
        }
        if (rightSideActiveCard.includes(parseInt(e.target.id))) {
          document.getElementById(parseInt(e.target.id) + 1).classList.remove('dragCard');
        }
        dragCardArray.forEach(el => el?.classList.contains('dragCard')? el.classList.remove('nonClick') : true);
        e.target.classList.remove('nonClick');
        let activeCardId = e.target.id;
        activeTravelField(e, dragCardArray);
        setActiveId(activeCardId);
      } else {
        stopActiveTravelField(e, dragCardArray);
        dragCardArray.forEach(el => el?.classList.remove('dragCard')); 
        document.querySelectorAll('img').forEach(function (el){
          el.classList.remove('nonClick');
      })}
    } 
    else {
      travelCard(e.target, activeId);
      clearActiveTravelField();
    } 
  }
const activeTravelField = (activeCard, dragCardArr) => {
  const newArr =  dragCardArr.filter(el => el?.classList.contains('dragCard'));
  console.log(newArr)
  const arrCardBox = document.querySelectorAll('.gameCardBox');
  arrCardBox[parseInt(activeCard.target.id)].classList.add('borderBox');
  newArr.forEach(el => arrCardBox[parseInt(el.id)].classList.add('borderBox'));
}

const stopActiveTravelField = (activeCard, dragCardArr) => {
  const newArr =  dragCardArr.filter(el => el?.classList.contains('dragCard'));
  console.log(newArr)
  const arrCardBox = document.querySelectorAll('.gameCardBox');
  arrCardBox[parseInt(activeCard.target.id)].classList.remove('borderBox');
  newArr.forEach(el => arrCardBox[parseInt(el.id)].classList.remove('borderBox'));
}

const clearActiveTravelField = () => {
  const arrCardBox = document.querySelectorAll('.gameCardBox');
  arrCardBox.forEach(el => el.classList?.remove('borderBox'));
}
const travelCard = (e, startCardId) => {
  let startCard = document.getElementById(startCardId);
  let dragCard = e;
  let start = Date.now();
  let timers = setInterval( () => {
    let timePassed = Date.now() - start;
      if ((parseInt(dragCard.id) - parseInt(startCard.id)) === 1) {
          startCard.style.left = timePassed / 4.3 + 'px';
          dragCard.style.right = timePassed / 4.3 + 'px';
      }

        if ((parseInt(dragCard.id) - parseInt(startCard.id)) === -1) { 
          startCard.style.right = timePassed / 4.3 + 'px';
          dragCard.style.left = timePassed / 4.3 + 'px';
        
        }

        if ((parseInt(dragCard.id) - parseInt(startCard.id)) === -width) {
          startCard.style.bottom = timePassed / 4.3 + 'px';
          dragCard.style.top = timePassed / 4.3 + 'px';
        }

        if ((parseInt(dragCard.id) - parseInt(startCard.id)) === width) {
          startCard.style.top = timePassed / 4.3 + 'px';
          dragCard.style.bottom = timePassed / 4.3 + 'px';
        }
      
        if (timePassed >= 300){
          clearInterval(timers);
     
         
        let oldStartPosition = currentPokemonArrangement[parseInt(startCard.id)]
          currentPokemonArrangement[parseInt(startCard.id)] = currentPokemonArrangement[parseInt(dragCard.id)];
          currentPokemonArrangement[parseInt(dragCard.id)] = oldStartPosition;
          setCurrentPokemonArrangement([...currentPokemonArrangement]); 
        
     
          if (CheckDrag()) {
            console.log('vse Ok')
            let dragCardArrayUse = document.querySelectorAll('.dragCard');
            dragCardArrayUse.forEach(el => el.classList.remove('dragCard'));
            document.getElementById(parseInt(activeId)).classList.remove('activeCard');
            document.querySelectorAll('img').forEach(function (el){
              el?.classList.remove('nonClick');
              el.removeAttribute('style');
            })
          } else {
            console.log('vse ne ok');
            dragCardsBack(e, startCardId);
          }
        } 
      }, 20); 
       
  
       
      }
    
  const CheckDrag = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentPokemonArrangement[i];
      const isBlank = currentPokemonArrangement[i] === emptyPic;
      if (columnOfFour.every(square => currentPokemonArrangement[square] === decidedColor && !isBlank)) { 
        return true
      }
      
    }
    for (let i = 0; i < 39; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentPokemonArrangement[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
      const isBlank = currentPokemonArrangement[i] === emptyPic;
      if (notValid.includes(i)) continue
      if (rowOfFour.every(square => currentPokemonArrangement[square] === decidedColor && !isBlank)) {
       return true
      }
    }
      for (let i = 0; i <= 47; i++) {
        const columnOfThree = [i, i + width, i + width * 2];
        const decidedColor = currentPokemonArrangement[i];
        const isBlank = currentPokemonArrangement[i] === emptyPic;
        if (columnOfThree.every(square => currentPokemonArrangement[square] === decidedColor && !isBlank)) {
          return true
      } 
    }
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentPokemonArrangement[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
      const isBlank = currentPokemonArrangement[i] === emptyPic;
      if (notValid.includes(i)) continue
      if (rowOfThree.every(square => currentPokemonArrangement[square] === decidedColor && !isBlank)) {
       return true
      } 
    }
    return false   
  }

  const dragCardsBack = (e, startCardId) => {

    let startCard = document.getElementById(startCardId);
    let dragCard = e;
    
    startCard.classList.add('moveCard');
    dragCard.classList.add('moveCard');

 
    let start = Date.now();
    let timers = setInterval( () => {
      let timePassed = Date.now() - start;
        if ((parseInt(dragCard.id) - parseInt(startCard.id)) === 1) {
            startCard.style.left = timePassed / 4.3 + 'px';
            dragCard.style.right = timePassed / 4.3 + 'px';
        }
  
          if ((parseInt(dragCard.id) - parseInt(startCard.id)) === -1) { 
            startCard.style.right = timePassed / 4.3 + 'px';
            dragCard.style.left = timePassed / 4.3 + 'px';
          
          }
  
          if ((parseInt(dragCard.id) - parseInt(startCard.id)) === -width) {
            startCard.style.bottom = timePassed / 4.3 + 'px';
            dragCard.style.top = timePassed / 4.3 + 'px';
          }
  
          if ((parseInt(dragCard.id) - parseInt(startCard.id)) === width) {
            startCard.style.top = timePassed / 4.3 + 'px';
            dragCard.style.bottom = timePassed / 4.3 + 'px';
          }
        
          if (timePassed >= 300){
            clearInterval(timers);
       
           let oldStartPosition = currentPokemonArrangement[parseInt(startCard.id)]
           currentPokemonArrangement[parseInt(startCard.id)] = currentPokemonArrangement[parseInt(dragCard.id)];
           currentPokemonArrangement[parseInt(dragCard.id)] = oldStartPosition;
           setCurrentPokemonArrangement([...currentPokemonArrangement]); 
           let dragCardArrayUse = document.querySelectorAll('.dragCard');
           dragCardArrayUse.forEach(el => el.classList.remove('dragCard'));
           document.getElementById(parseInt(activeId)).classList.remove('activeCard');
           document.querySelectorAll('img').forEach(function (el){
             el?.classList.remove('nonClick');
             el.removeAttribute('style');
           })
           

          } 
        }, 20); 
         
         
        }



  const timerGame = () => {
      document.querySelector('.pikachuPic').classList.add('pikachuAnimation');
      let sec = 60;
      let min = 1;
      let timer = setInterval(() => {
          sec--;
          if (sec < 10 && sec > 0) {
              document.getElementById('time').innerHTML = min + ':0' + sec;   
              return
          }
          if (sec < 60 && sec > 0) {
              document.getElementById('time').innerHTML = min + ':' + sec;   
              return
          } if (sec === 0) {
              document.getElementById('time').innerHTML = min + ':0' + sec;  
              min--;
              sec = 60;  
          }
          if (min < 0) {
              clearInterval(timer);
              alert('finish Game')
          }
      }, 1000)
     
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
    <div>
      <div className='logoBlock'> 
        <div className='pokemonLogo'></div>
      </div>
      <Button variant="outlined" onClick={timerGame}>Start Game</Button>
      <div className="mainGameField">
        <div className="gameBox">
          <div className="gameBorder">  
            <div className="gameLogic">
              {currentPokemonArrangement.map((candyColor, index) => (
                <div className='gameCardBox'>
                  <img 
                    id={index}
                    key={index} 
                    src={candyColor}
                    alt={candyColor}
                    data-id={index}
                    onClick={cardActive}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='leftsideInfoBar'>
          <TimeBoard />
          <AudioElement />
          <ScoreBoard score={scoreDisplay} />
        </div>
      </div>
      


    </div>
  )
}

export default GameLogic