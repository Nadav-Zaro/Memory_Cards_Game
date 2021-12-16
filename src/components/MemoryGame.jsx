import { Component } from 'react'
import Cards from './Cards'
import Message from './Message'
// import ScoreBoard from './ScoreBoard'
import * as style from './MemoryGame.module.css'

export default class MemoryGame extends Component {
    SCORE_BOARD_KEY = "ScoreBoard"
    state={cards:[],gameSeconds:0,gameOver:false,gameMoves:0,scoreBoard:[],stopGame:false,click:false}
    timeHandler = null;
    firstCard = null
    secondCard = null 
    firstFlip = null
    secondFlip = null
    cardBack = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/06cb28af-a15c-45d3-b1b6-fcbc1910e0c3/dbwk3sn-1ad1083a-5b15-4f77-af59-66dc07024a73.jpg/v1/fill/w_739,h_1081,q_70,strp/back_card_yugioh_hd_by_carlos123321_dbwk3sn-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQ5NiIsInBhdGgiOiJcL2ZcLzA2Y2IyOGFmLWExNWMtNDVkMy1iMWI2LWZjYmMxOTEwZTBjM1wvZGJ3azNzbi0xYWQxMDgzYS01YjE1LTRmNzctYWY1OS02NmRjMDcwMjRhNzMuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.hzaBSJ4Hs23sjOCzVznIn1Qjgx2-c0BY__I1E7-rQKg"
    cardsToCompare = []
    componentDidMount(){
       this.stopTimer()
       this.shuffleCards()
       this.startTimer()
    }
    startGame=()=>{
       this.stopTimer()
       this.startTimer()
       this.shuffleCards()
       this.setState({click:false,gameOver:false})
        for (let i = 0; i < this.cardsToCompare.length; i++) {
            this.cardsToCompare[i].background = `url(${this.cardBack})`
            this.cardsToCompare[i].backgroundSize = `100% 100%`
            }
    }
    shuffleCards=()=>{
        let cardsArr =[
            {id:1,img:"https://images.saymedia-content.com/.image/t_share/MTc0NDYwODEwMDEyNDY4ODcw/top-10-cards-you-need-for-your-exodia-yu-gi-oh-deck.png",click:false},
            {id:1,img:"https://images.saymedia-content.com/.image/t_share/MTc0NDYwODEwMDEyNDY4ODcw/top-10-cards-you-need-for-your-exodia-yu-gi-oh-deck.png",click:false},
            {id:2,img:"https://static2.cards-capital.com/4285/dragon-de-metal-noir-aux-yeux-rouges.jpg",click:false},
            {id:2,img:"https://static2.cards-capital.com/4285/dragon-de-metal-noir-aux-yeux-rouges.jpg",click:false},
            {id:3,img:"https://i.pinimg.com/736x/b7/d4/a7/b7d4a70799a49090539688f7ef78a81c--jed-yo-gi-oh.jpg",click:false},
            {id:3,img:"https://i.pinimg.com/736x/b7/d4/a7/b7d4a70799a49090539688f7ef78a81c--jed-yo-gi-oh.jpg",click:false},
            {id:4,img:"https://www.sell2bbnovelties.com/mm5/yugioh/YU_BPT005.jpg",click:false},
            {id:4,img:"https://www.sell2bbnovelties.com/mm5/yugioh/YU_BPT005.jpg",click:false},
            {id:5,img:"https://www.yu-gi-wang.nl/shops/tradingcardsshop/twin-headed-behemoth-ss02-ena06-common-1st-edi-twi.jpg",click:false},
            {id:5,img:"https://www.yu-gi-wang.nl/shops/tradingcardsshop/twin-headed-behemoth-ss02-ena06-common-1st-edi-twi.jpg",click:false},
            {id:6,img:"https://www.duelshop.com.br/15010-large_default/destiny-hero-plasma-lehd-ena02-common.jpg",click:false},
            {id:6,img:"https://www.duelshop.com.br/15010-large_default/destiny-hero-plasma-lehd-ena02-common.jpg",click:false},
        ]
        cardsArr.sort(()=>Math.random() - .5)
        this.setState({cards:cardsArr})
    }
    startTimer=()=>{
        this.timeHandler = null
        this.setState({gameSeconds:0,gameMoves:0})
        this.timeHandler=setInterval(() => {
            this.setState({gameSeconds:this.state.gameSeconds + 1})
        }, 1000);
    }

    resumeGame=()=>{
        this.timeHandler=setInterval(() => {
            this.setState({gameSeconds:this.state.gameSeconds + 1})
        }, 1000);
    }

    stopTimer=()=>{
        clearInterval(this.timeHandler)
        this.timeHandler = null
    }

    isGameOver=()=>{
        for (let i = 0; i < this.state.cards.length; i++) {
            const card = this.state.cards[i];
            if (!card.click) {
                return false
            }
        }
        console.log(this.state.scoreBoard);
        return true
    }

    gameOver=()=>{
        this.stopTimer()
        this.addToScoreBoard(this.state.gameSeconds,this.state.gameMoves)
    }

    getScoreBoard=()=>{
        let scoreJson = localStorage.getItem(this.SCORE_BOARD_KEY)
        return scoreJson ? JSON.parse(scoreJson) : []
    }
    
    addToScoreBoard=(seconds,moves)=>{
        let temp = this.getScoreBoard()
        const date = new Date();
        temp.push({
            seconds,
            moves,
            date: (date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear()),
            hour: (date.getHours() + "." + date.getMinutes() + "." + date.getSeconds())
        })
        this.setState({scoreBoard:temp})
        localStorage.setItem(this.SCORE_BOARD_KEY,JSON.stringify(temp))
    }

    render() {
        const {cards,gameSeconds,gameMoves,gameOver,scoreBoard,stopGame,click} = this.state
        const firstFlpstyle = (card,img)=>{
            card.style.transition= `1.2s`;
            card.style.transform =  `rotateY(180deg)`;
            card.style.background = `url(${img})`;
            card.style.backgroundSize = `100% 100%`;
        }
        const secondFlpstyle = (card,img)=>{
            card.style.transition= `1.2s`;
            card.style.transform =  `rotateY(360deg)`;
            card.style.background = `url(${img})`;
            card.style.backgroundSize = `100% 100%`;
        }
        const cardElemnt = cards.map((it,i)=>(
            <Cards
            key={i}
            click={stopGame}
            clickHandler={(e)=>{
                it.click = true
                this.setState({gameOver:this.isGameOver()})
                let temp = [...cards]
                if (this.isGameOver()) {
                    this.gameOver()
                    }
                if (this.firstCard == null ) {
                    this.firstCard = temp[i]
                    this.firstFlip = e.target
                    firstFlpstyle(this.firstFlip,this.firstCard.img)
                    return
                }
                else if (this.secondCard == null ) {
                    this.secondCard = temp[i]
                    this.secondFlip = e.target
                    firstFlpstyle(this.secondFlip,this.secondCard.img)
                    if (this.firstCard.id === this.secondCard.id) {
                        this.cardsToCompare.push(this.firstFlip.style,this.secondFlip.style)
                        this.setState({gameMoves:this.state.gameMoves + 1})
                        this.firstCard=null;this.secondCard=null;
                        return
                    }
                    else{
                        setTimeout(() => {
                        secondFlpstyle(this.firstFlip,this.cardBack)
                        secondFlpstyle(this.secondFlip,this.cardBack)
                        this.firstCard.click =false
                        this.secondCard.click =false
                        this.firstCard=null;this.secondCard=null;
                        this.setState({gameMoves:this.state.gameMoves + 1})
                        }, 1500);
                        return
                }} 
            }} />
        ))
        const scoreBoardHistory =()=>{
            if (click) {
               return (
                   <div className={style.scoreBoard}>
                    <h1>Score Board</h1>
                    <table className={style.table}>
                    <tbody className={style.tbody}>
                        <tr>
                            <th className={style.th}>No.</th>
                            <th className={style.th}>Seconds</th>
                            <th className={style.th}>Moves</th>
                            <th className={style.th}>Date</th>
                            <th className={style.th}>Hour</th>
                        </tr>
                        {scoreBoard.map((it,i)=>(
                        <tr className={style.tr} key={i}>
                            <td className={style.td}>{i}</td>
                            <td className={style.td}>{it.seconds}</td>
                            <td className={style.td}>{it.moves}</td>
                            <td className={style.td}>{it.date}</td>
                            <td className={style.td}>{it.hour}</td>
                        </tr>
                        ))}
                   </tbody>
                </table>
                </div>
        )
            }}

        const gameOverMessage = (gameOver? <div className={style.gameOverDiv}><h1>Game Over</h1><h4>Seconds: {gameSeconds} sec</h4><h4>Moves: {gameMoves} </h4></div>:"")
        return (
            <div className={style.memoryGame}>
                <img className={style.background} src="https://wallpapercave.com/wp/wp2279298.jpg"/>
                <span style={{fontSize:"40px",fontFamily:"cursive",textShadow:"2px 1px 2px white"}}>Yu Gi Oh</span><br/>
                <span style={{fontSize:"25px",fontFamily:"cursive",textShadow:"1px 1px 2px white"}}>Memory Game</span>
                <div className={style.game}>
                <button className={style.btn} onClick={()=>{this.startGame();this.setState({stopGame:false})}}>New Game</button>
                {stopGame?<button className={style.btn} onClick={()=>{this.setState({stopGame:false});this.resumeGame()}}>Resume Game</button> : <button className={style.btn} onClick={()=>{this.setState({stopGame:true});this.stopTimer()}}>Pause Game</button>}
                {/* <button className={style.btn} onClick={()=>{this.setState({stopGame:true});this.stopTimer()}}>Pause Game</button>
                <button disabled={this.timeHandler != null ? true : false} className={style.btn} onClick={()=>{this.setState({stopGame:false});this.resumeGame()}}>Resume Game</button> */}
                <Message gameSeconds={gameSeconds} gameMoves={gameMoves}/>
                <div className={style.cardsHolder}>
                {cardElemnt}
                {gameOverMessage}
                </div>
                {scoreBoardHistory()}<br/>
                {click? <img className={style.exit} onClick={()=>this.setState({click:false})} src="https://img.icons8.com/ios-glyphs/30/ffffff/multiply.png"/>:""}
                <button className={style.btn} onClick={()=>{this.setState({scoreBoard:this.getScoreBoard(),click:true});scoreBoardHistory()}}>Score Board</button>
                </div>
            </div>
        )
    }
}
