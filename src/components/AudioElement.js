import { useState, useRef } from 'react';
import musicPokemon from '../music/pokemon.mp3';
import pokemonMusicPicActive from '../images/pokemonActive.gif';
import pokemonMusicPicStatic from '../images/pokemonStatic.png';

const AudioElement = ({stateMusicPokemon}) => {
    const [inputDisplay, setInputDisplay] = useState(false);
    const [pikachMusicPic, setPikachuMusicPic] = useState(pokemonMusicPicStatic)
    const pokemonMusic = musicPokemon;
    const audio = useRef(new Audio(pokemonMusic)) ;
    const inputRef = useRef(null);
    const pikachuMusicBox = useRef(null);
    
    const playClick = (e) => {
        if (inputRef) {
            audio.current.volume = inputRef.current.value
        }
        setInputDisplay((prev) => !prev)
        e.target.classList.toggle('activePikachuBox');
        if (e.target.classList.contains('activePikachuBox')) {
            pikachuMusicBox.current.classList.add("pikachuMusicBoxActive");
            setPikachuMusicPic(pokemonMusicPicActive);
        }
        else {
            pikachuMusicBox.current.classList.remove("pikachuMusicBoxActive");
            setPikachuMusicPic(pokemonMusicPicStatic);
        }
        
        audio.current.paused ? audio.current.play() : audio.current.pause()
    }

    const changeVolume = (e) => {
        audio.current.volume = e.target.value
    }


    return (
        <div ref={pikachuMusicBox} className="pikachuMusicBox">
            <div className='pikachuBox' onClick={playClick}>
                <img className='pikachuMusicImage' src={stateMusicPokemon} alt='musicImage' />
            </div>
            <div className='inputBox'>
                <input onInput={changeVolume} className="audio-item__volume" ref={inputRef} type='range' min='0' max='1' step="0.01" defaultValue="0.1" style={{visibility: inputDisplay ? 'visible' : 'hidden'}} />
            </div>
           
        </div>
        
    )
};

export default AudioElement


