


const ScoreBoard = ({score}) => {
    return (
        <div className="score-board">
            <div class='score-text'>Score</div> 
            <div className='box-score'>
                <div class='score-value'>{score}</div>
            </div>
        </div>
    )
}

export default ScoreBoard