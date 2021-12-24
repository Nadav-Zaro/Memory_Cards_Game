import { Component } from 'react'
import Cards from './Cards'
import Message from './Message'
import moment from 'moment'
import * as style from './MemoryGame.module.css'

export default class MemoryGame extends Component {
    SCORE_BOARD_KEY = "ScoreBoard"
    state={cards:[],gameSeconds:0,gameOver:false,gameMoves:0,scoreBoard:[],stopGame:false,click:false}
    timeHandler = null;
    firstCard = null
    secondCard = null 
    firstFlip = null
    secondFlip = null
    cardBack = "https://i.ibb.co/18KZH6C/cardback-optimized.jpg"
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
            {id:1,img:"https://i.ibb.co/cNhkhzr/card3-optimized.jpg",click:false},
            {id:1,img:"https://i.ibb.co/cNhkhzr/card3-optimized.jpg",click:false},
            {id:2,img:"https://i.ibb.co/HYSsftr/card2-optimized.jpg",click:false},
            {id:2,img:"https://i.ibb.co/HYSsftr/card2-optimized.jpg",click:false},
            {id:3,img:"https://i.ibb.co/q5gRG5n/card6-optimized.jpg",click:false},
            {id:3,img:"https://i.ibb.co/q5gRG5n/card6-optimized.jpg",click:false},
            {id:4,img:"https://i.ibb.co/WKqCj92/card1.png",click:false},
            {id:4,img:"https://i.ibb.co/WKqCj92/card1.png",click:false},
            {id:5,img:"https://i.ibb.co/JrLLj4S/card4-optimized.jpg",click:false},
            {id:5,img:"https://i.ibb.co/JrLLj4S/card4-optimized.jpg",click:false},
            {id:6,img:"https://i.ibb.co/8jRLtjC/card5-optimized.jpg",click:false},
            {id:6,img:"https://i.ibb.co/8jRLtjC/card5-optimized.jpg",click:false},
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
            date: moment().format("DD/MM/YYYY"),
            hour: moment().format("HH:mm:ss")
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
                    <tbody>
                        <tr>
                            <th>No.</th>
                            <th>Seconds</th>
                            <th>Moves</th>
                            <th>Date</th>
                            <th>Hour</th>
                        </tr>
                        {scoreBoard.map((it,i)=>(
                        <tr key={i}>
                            <td>{i}</td>
                            <td>{it.seconds}</td>
                            <td>{it.moves}</td>
                            <td>{it.date}</td>
                            <td>{it.hour}</td>
                        </tr>
                        ))}
                   </tbody>
                </table>
                </div>
        )
            }}

        const gameOverMessage = (!gameOver? <div className={style.gameOverDiv}><h1>Game Over</h1><h4>Seconds: {gameSeconds} sec</h4><h4>Moves: {gameMoves} </h4></div>:"")
        return (
            <div className={style.memoryGame}>
                <img className={style.background} src="https://i.ibb.co/RSZLdhB/background-optimized.jpg"/>
                <span style={{fontSize:"40px",fontFamily:"cursive",textShadow:"2px 1px 2px white"}}>Yu Gi Oh</span><br/>
                <div className={style.game}>
                <button className={style.btn} onClick={()=>{this.startGame();this.setState({stopGame:false})}}>New Game</button>
                {stopGame?<button className={style.btn} onClick={()=>{this.setState({stopGame:false});this.resumeGame()}}>Resume</button> : <button className={style.btn} onClick={()=>{this.setState({stopGame:true});this.stopTimer()}}>Pause</button>}
                <Message gameSeconds={gameSeconds} gameMoves={gameMoves}/>
                <div className={style.cardsHolder}>
                {cardElemnt}
                {gameOverMessage}
                </div>
                {scoreBoardHistory()}<br/>
                {click? <img className={style.exit} onClick={()=>this.setState({click:false})} src="https://img.icons8.com/ios-glyphs/30/ffffff/multiply.png"/>:""}
                <button className={style.btn} onClick={()=>{this.setState({scoreBoard:this.getScoreBoard(),click:true});scoreBoardHistory()}}>Score</button>
                </div>
            </div>
        )
    }
}
