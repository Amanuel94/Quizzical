import React, {useState} from "react"


export default function Quiz(props){
    
    const randomIndex = Math.floor(Math.random()*3)
    const [choiceArr, setChoiceArr] = useState(
        generateChoiceArr(props.data.correct_answer, props.data.incorrect_answers, randomIndex))
 

    
    
    function handleSelection(id){
        setChoiceArr((choices => choices.map(choice => {
            return {id: choice.id, answer: choice.answer, correct:choice.correct, isSelected: choice.id == id? true: false  }
        })))
        
    }
    React.useEffect(()=>{
        setChoiceArr(generateChoiceArr(props.data.correct_answer, props.data.incorrect_answers, randomIndex))
    }, [props.data])
    
    React.useEffect(()=>{
    if(props.taken){
        for(let i= 0; i < 4; i++){
            if(choiceArr[i].correct && choiceArr[i].isSelected){
                props.add_score()
                break;}
        }
    }
    }, [props.taken])
        
    

    
    function generateChoiceArr(corr, incor, index){
        let choices = []
        for(let i = 0, j = 0; i < 4; i++){
            
            if(i == index){
                choices.push({id: i, correct:true, answer:corr, isSelected: false})
            }
                
            else{
                choices.push({id: i, correct: false, answer:incor[j], isSelected:false})
                j++
            }
        }
        return choices
    }
    
    function style(isSelected, correct){
        let styles = {}
        if(!props.taken){
            styles = isSelected? {backgroundColor:"#D6DBF5"}:{backgroundColor:"white"}
        }
        else{
            if(correct) {
                styles = {backgroundColor:"#94D7A2"}
                
                }
            if(!correct && isSelected) styles = {backgroundColor:"#F8BCBC", opacity:"0.5"}
            if(!correct && !isSelected) styles = {opacity:"0.5"}
        }
        return styles
    }
    
    return( 
        <div className = "quiz-cont">
            <h3 className = "ques" dangerouslySetInnerHTML={{__html: props.data.question}}/>
           
            <div className ="choices" >
                {choiceArr.map(choice =>  <span dangerouslySetInnerHTML = {{__html:choice.answer}} onClick = {()=>handleSelection(choice.id)} style = {style(choice.isSelected, choice.correct)} key = {choice.id} className = "choice"/> )}
            </div>
             <hr />
            
            
        </div>
    )
}