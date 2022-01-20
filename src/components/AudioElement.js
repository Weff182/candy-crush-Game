import { useState, useRef } from 'react';
import musicPokemon from '../music/pokemon.mp3';
import pokemonMusicPicActive from '../images/pokemonActive.gif';
import pokemonMusicPicStatic from '../images/pokemonStatic.png';

const AudioElement = ({stateMusicPokemon}) => {
    const [inputDisplay, setInputDisplay] = useState(false);
    //const [pikachMusicPic, setPikachuMusicPic] = useState(pokemonMusicPicStatic)
    const pokemonMusic = musicPokemon;
    const audio = useRef(new Audio(pokemonMusic));
    const PikachuRef = useRef(null)
    const inputRef = useRef(null);
    const pikachuMusicBox = useRef(null);
 
    const playClick = (e) => {
        if (inputRef) {
            audio.current.volume = inputRef.current.value
        }

       
        e.target.classList.toggle('activePikachuBox');
        if (PikachuRef.current.src = pokemonMusicPicStatic) {
            pikachuMusicBox.current.classList.add("pikachuMusicBoxActive");
            //setPikachuMusicPic(pokemonMusicPicActive);
           PikachuRef.current.src = pokemonMusicPicActive;
         
        }
        else {
            pikachuMusicBox.current.classList.remove("pikachuMusicBoxActive");
           //setPikachuMusicPic(pokemonMusicPicStatic);
           PikachuRef.current.src = pokemonMusicPicStatic;
         
        }
        setInputDisplay((prev) => !prev)
       audio.current.paused ? audio.current.play() : audio.current.pause()
    }

    const changeVolume = (e) => {
        audio.current.volume = e.target.value
    }
  


    return (
        <div ref={pikachuMusicBox} className="pikachuMusicBox">
            <div className='pikachuBox' onClick={playClick}>
                <img ref={PikachuRef} className='pikachuMusicImage' src={stateMusicPokemon} alt='musicImage' />
            </div>
            <div className='inputBox'>
                <input onInput={changeVolume} className="audio-item__volume" ref={inputRef} type='range' min='0' max='1' step="0.01" defaultValue="0.1" style={{visibility: inputDisplay ? 'visible' : 'hidden'}} />
            </div>     
        </div>
        
    )
};

export default AudioElement


