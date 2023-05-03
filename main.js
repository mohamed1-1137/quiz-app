
let container=document.querySelector(".container")
let questionsNum=document.querySelector(".quiz-info .questions .questinos-num")
let bullets =document.querySelector(".bullets-countdown .bullets-container")
let quizArea=document.querySelector(".quiz-area")
let answersArea=document.querySelector(".answers-area")
let submitbutton =document.querySelector(".submit-button")
let countdownMinutes=document.querySelector(".countdown .minutes")
let countdownSecondes=document.querySelector(".countdown .seconds")
let evaluation=document.querySelector(".evaluation")

let questionNum=0;
let rightAnswer=0;
// get API
function getAPI(){
    let myRequest=new XMLHttpRequest();
    myRequest.open("GET","./questions.json",true);
    myRequest.send()
    myRequest.onreadystatechange=function(){
        if(this.status===200 && this.readyState==4){
            let data=JSON.parse(this.responseText)
            // give the questions number to quiz-info and create bullets
            createBullets(data.length)
            // create the questino and it's answer
            createQuestionData(data,data.length)

            ////////////////// CLICK ON THE SUBMIT BUTTON ////////////////////////////
            submitbutton.addEventListener("click",function(){
                
            //End the test
            if(questionNum===data.length-1){
                container.remove()
                document.querySelector(".results").classList.add("show")
                // create the result of the test 

                    let rightAnswerco=document.querySelector(".right-answer")
                    let numQuestion=document.querySelector(".num-question")
                    if(rightAnswer===data.length-1){
                        rightAnswerco.textContent=rightAnswer+1
                    }else{
                        rightAnswerco.textContent=rightAnswer;
                    }
                    numQuestion.textContent=data.length;

                    if((rightAnswerco.textContent/data.length)*100<50){
                        evaluation.textContent="Failed"
                        evaluation.classList.add("Failed")
                    }
                    if((rightAnswerco.textContent/data.length)*100>50 && (rightAnswerco.textContent/data.length)*100<65 ){
                        evaluation.textContent="Acceptable"
                        evaluation.classList.add("Acceptable")
                    }
                    if((rightAnswerco.textContent/data.length)*100>65 && (rightAnswerco.textContent/data.length)*100<75 ){
                        evaluation.textContent="Good"
                        evaluation.classList.add("Good")
                    }
                    if((rightAnswerco.textContent/data.length)*100>75 && (rightAnswerco.textContent/data.length)*100<85 ){
                        evaluation.textContent="Very Good"
                        evaluation.classList.add("Very-Good")
                    }
                    if((rightAnswerco.textContent/data.length)*100>85  ){
                        evaluation.textContent="Excellent"
                        evaluation.classList.add("Excellent")
                    }

            }
            let labelList=document.querySelectorAll(".answer label")
            // count the right answer
            labelList.forEach((label)=>{
                if(label.classList.contains("right")){
                    rightAnswer++
                    }
            })

            // remove the last question
            let title=[...quizArea.children]
            title.forEach((h3)=>{h3.remove()})
            let answerarea=document.querySelectorAll(".answer")
            answerarea.forEach((answer)=>{answer.remove()})

            // move to the next question
            questionNum++
            createQuestionData(data,data.length)

            //link the bullets with the questions
            let bulletsContainer=document.querySelectorAll(".bullets-container")
            bulletsContainer.forEach((span)=>{
                span.children[questionNum].classList.add("on")
            })

            //return the default value of timer
            countdownMinutes.textContent=0
            countdownSecondes.textContent=59
            })
        }
    }
}
getAPI()

function createBullets(num){
        questionsNum.textContent=num
        for(let i=0;i<num;i++){
            let span =document.createElement("span");
            bullets.appendChild(span)
        //active the first bullet
        if(i===0){
            span.setAttribute("class","on")
        }
        }
}

function createQuestionData(obj,num){

    // create the title of question
    let title=document.createElement("h3")
    title.setAttribute("class","question-title")
    title.dataset.Right=obj[questionNum].right_answer;
    
    let titleText=document.createTextNode(`${questionNum+1}: ${obj[questionNum].title}`)
    title.appendChild(titleText)
    quizArea.appendChild(title)
    //create the answers
    for(let i=1;i<=4;i++){
        let containerDiv=document.createElement("div");
        containerDiv.setAttribute("class","answer")
        containerDiv.setAttribute("name","answer")

        let radio=document.createElement("input")
        radio.setAttribute("type","radio")
        radio.setAttribute("id",`answer-${i}`)
        radio.setAttribute("name","question")

        let label=document.createElement("label")
        label.setAttribute("for",`answer-${i}`)
        label.textContent=obj[questionNum][`answer_${i}`]
        label.dataset.answer=obj[questionNum][`answer_${i}`]

        containerDiv.appendChild(radio)
        containerDiv.appendChild(label)
        answersArea.appendChild(containerDiv)
    }
    // know the right answer and false answer
    writeAnswers(title.dataset.Right,obj.length)
}

// know the right answer and false answer
function writeAnswers(titleDataRight,obj){
let labelList=document.querySelectorAll(".answer label")
    labelList.forEach((label)=>{
        label.addEventListener("click",function(e){
            if(e.target.textContent===titleDataRight){
                e.target.classList.add("right")
            }else{
                labelList.forEach((label)=>{
                    label.classList.remove("right")
                })
            }
        })
})}

// countdown timer
function countdown(){
    setInterval(function(){
        countdownSecondes.textContent=+(countdownSecondes.textContent)-1
        if(+countdownSecondes.textContent===0){
            if(+countdownSecondes.textContent===0 && +countdownMinutes.textContent===0 ){
                countdownMinutes.textContent=0
                countdownSecondes.textContent=59
                submitbutton.click()
                }
        }
    },1000)
}

countdown()
// to another test
document.querySelector(".Another-Test").addEventListener("click",function(){
    location.reload()
})
// to prevent user to open the inspect or print
// document.addEventListener('contextmenu', event=> event.preventDefault()); 
//     document.onkeydown = function(e) { 
//     if(event.keyCode == 123) { 
//     return false; 
//     } 
//     if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){ 
//     return false; 
//     } 
//     if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){ 
//     return false; 
//     } 
//     if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){ 
//     return false; 
//     } 
//     } 

