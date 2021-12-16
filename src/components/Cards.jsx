import * as style from './MemoryGame.module.css'
const Cards=({clickHandler,click})=>{
    return (
        <button disabled={click} className={style.cards} onClick={clickHandler}></button>
    )
}

export default Cards