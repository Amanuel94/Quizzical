import React, {useState} from "react"
import Quiz from "./Quiz"

export default function App(){
    const [start, setStart]  = useState(false)
    const [taken, setTaken] = useState(false)
    const [score, setScore] = useState(0)
    const [api, setApi] = useState([])

    
    function handleStart(){
        setStart(true)
    }
    
    function addScore(right){
            setScore(prev => prev+1)
        
    }
    
    
  React.useEffect(()=>{
      if(!taken){
      fetch("https://opentdb.com/api.php?amount=10&type=multiple&difficulty=easy")
	.then(response => response.json())
    .then(data => {
        
        setApi(data.results)
    })}
  }, [taken])
let i = 0
const items = api.map(item=>{
    return (
    <Quiz 
          key = {++i}  
          taken = {taken}
          add_score = {addScore}
          data = {item}  
    
    />
)})
    return(
        <main>
            <img className = "first-blob" src = "./images/blobs.png"/>
            {!start && (
                <div className = "start-container">
                    <h1 className = "title">Quizzical</h1>
                    <p className = "desc">Some description</p>
                    <button className = "start-btn" onClick = {handleStart}>
                        Start quiz
                    </button></div> )}
            {start && (
                <div className = "div-quiz">
                    {items}
                          
                    {!taken &&(
                    <div className = "score-btn2" >
                    <button onClick = {()=>{setTaken(true)}} className = "checkButton">Check Answers</button></div>)}
                    
                    {taken && <div className = "score-btn">
                        <div className = "res"> You scored {score}/10 correct answers.</div>
                        <button onClick = {()=>{
                        setTaken(false)
                        setScore(0)
                        }} className = "checkButton">Play Again </button>
                    </div>    
                    }
                    
                </div>
            )}
    <img className = "second-blob" src = "./images/blobs2.png"/>
        </main>
    )
}