import * as style from './MemoryGame.module.css'
const Message =({gameSeconds,gameMoves})=>{
    return(
        <div className={style.timeAndMoves}>
            <img className={style.scoreIcon} src="https://img.icons8.com/external-photo3ideastudio-flat-photo3ideastudio/64/000000/external-clock-sleep-photo3ideastudio-flat-photo3ideastudio.png"/>
            <p>{gameSeconds} sec</p>
            <img className={style.scoreIcon} src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/000000/external-horse-russia-icongeek26-linear-colour-icongeek26.png"/>
            <p>{gameMoves} moves</p>
        </div>
    )
}

export default Message