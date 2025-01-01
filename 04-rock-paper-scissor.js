const score =JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0,
    ties:0
};

let isAutoPlay = false;
let intervalId ;

document.getElementById('score').innerHTML = `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;


function moveGenerator() {
    let computerMove = ''
    randomNum = Math.random()

    if (randomNum >= 0 && randomNum < 1 / 3) {
        computerMove = 'Rock'
    }
    else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
        computerMove = 'Paper'
    }

    else if (randomNum >= 2 / 3 && randomNum < 1) {
        computerMove = 'Scissor'
    }

    return computerMove
}

 function updateScore() {
    document.getElementById('score').innerHTML = `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;
 }

 function autoPlay(){
    if(!isAutoPlay){
        const playerMove = moveGenerator();
        
        intervalId = setInterval(() => {
            playGame(playerMove)
        }, 1500);
        isAutoPlay = true;
        document.querySelector('.autoPlayButton').innerText = 'Stop Playing'
    }
    else{
        clearInterval(intervalId);
        isAutoPlay = false;
        document.querySelector('.autoPlayButton').innerText = 'Auto Play'
    }
 }

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.setItem('score',JSON.stringify(score))
    updateScore();  
}

document.getElementById('js-rock-btn').addEventListener('click',()=>{
    playGame('Rock')
})

document.getElementById('js-paper-btn').addEventListener('click',()=>{
    playGame('Paper')
})

document.getElementById('js-scissor-btn').addEventListener('click',()=>{
    playGame('Scissor')
})

document.querySelector('.resetButton').addEventListener('click',()=>{
    resetConfirmation()
})

document.querySelector('.autoPlayButton').addEventListener('click',()=>{
    autoPlay()
})

document.body.addEventListener('keydown', (event) =>{
    console.log(event.key);
    
    if(event.key === 'r'){
        playGame('Rock')
    }else if(event.key === 'p'){
        playGame('Paper')
    }else if(event.key === 's'){
        playGame('Scissor')
    }else if(event.key === 'Backspace'){
        resetConfirmation()
    }else if(event.key === 'a'){
        autoPlay()
    } 
    
})

function resetConfirmation(){
    const reset = document.createElement('div');
    reset.id = 'reset'
    document.body.appendChild(reset);

    const confirmationMsg = document.createElement('span');
    confirmationMsg.id = 'confirmTxt'
    confirmationMsg.innerText = 'Are you sure you want to reset the score?';
    reset.appendChild(confirmationMsg);

    const yesBtn =  document.createElement('button');
    yesBtn.innerText = 'Yes';
    yesBtn.className ='btn btn-light px-4 border-orange';
    reset.appendChild(yesBtn);

    yesBtn.addEventListener('click',() => {
        resetScore()
        reset.remove()
    })

    const noBtn =  document.createElement('button');
    noBtn.innerText = 'No';
    noBtn.className ='btn btn-light px-4 border-orange';
    reset.appendChild(noBtn);

    noBtn.addEventListener('click',() => {
        reset.remove()
    })

}

function playGame(playerMove) {
    


    let computerMove = moveGenerator()
    let output = document.getElementById('result');
    let result ='';
    let move = document.getElementById('move');
    if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {

            move.innerHTML = `You  <span>✊</span>  <span>✊</span> Computer `;
            output.innerHTML = 'Tie';
            result ='Tie';

        }
        else if (computerMove === 'Paper') {

            move.innerHTML = `You  <span>✊</span>  <span>✋</span> Computer`;
            output.innerHTML = 'You Lose';
            result ='You Lose';

        }
        else if (computerMove === 'Scissor') {
            move.innerHTML = `You  <span>✊</span>  <span>✌️</span> Computer `;
            output.innerHTML = 'You Won';
            result ='You Won';

        }
    }
    else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {

            move.innerHTML = 'You  <span>✋</span>  <span>✊</span> Computer ';
            output.innerHTML = 'You Won';
            result ='You Won';
        }
        else if (computerMove === 'Paper') {

            move.innerHTML = 'You  <span>✋</span>  <span>✋</span> Computer ';
            output.innerHTML = 'Tie';
            result ='Tie';

        }
        else if (computerMove === 'Scissor') {
            move.innerHTML = 'You  <span>✋</span>  <span>✌️</span> Computer ';
            output.innerHTML = 'You Lose';
            result ='You Lose';

        }
    }

    else if (playerMove === 'Scissor') {
        if (computerMove === 'Rock') {

            move.innerHTML = 'You  <span>✌️</span>  <span>✊</span> Computer ';
            output.innerHTML = 'You Lose';
            result ='You Lose';
        }
        else if (computerMove === 'Paper') {

            move.innerHTML = 'You  <span>✌️</span>  <span>✋</span> Computer ';
            output.innerHTML = 'You Won';
            result ='You Won';

        }
        else if (computerMove === 'Scissor') {
            move.innerHTML = 'You  <span>✌️</span>  <span>✌️</span> Computer ';
            output.innerHTML = 'Tie';
            result ='Tie';

        }
    }

    if (result ==='You Won'){
        score.wins +=1;
    }else if (result ==='You Lose'){
        score.losses +=1;
    }else if (result ==='Tie'){
        score.ties +=1;
    }

    updateScore()

    localStorage.setItem('score',JSON.stringify(score))
}