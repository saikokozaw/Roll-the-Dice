/*
function Person(first, last, age, eye){
    this.firstName = first;
    this.lastName = last;
    this.personAge = age;
    this.personEye = eye;
}
var myFather = new Person("John", "Doe", 50, "blue")
var myMother = new Person("Milly", "Louise", 40, "black")


function printableMessage(){
    var message = "hello";

    function printMessage(){
        // console.log(message)
    }

    function setMessage(newMessage){
        message = newMessage;
    }
    return {
        printMessage : printMessage,
        setMessage : setMessage
    }
}
var awesomeOne = printableMessage();
awesomeOne.printMessage();

var awesomeTwo = printableMessage()
awesomeTwo.setMessage('Greeting');
awesomeTwo.printMessage();

awesomeOne.printMessage();
*/

// JSON
// const json = '{"first_name": "Joe", "last_name": "Jone", "age" : 25, "social_media" : ["facebook","Twitter", "Instragram"], "online": true, "phone_numbers": {"home": "916-123-4567", "work": "916-123-9876", "mobile": "530 212-1111"}, "status" : "active"}';
// const user = JSON.parse(json);
// // console.log(json)
// // console.log(user.first_name);
// user.first_name = "Bob"
// console.log(json)

// delete user.phone_numbers.home;
// console.log(user)

// user.social_media[3] = "Wordpress.com"
// console.log(user)

(function(){ 
    "use strict";
    var startGame = document.getElementById('startgame');
    var gameControl = document.getElementById('gamecontrol');
    var game = document.getElementById('game');
    var score = document.getElementById('score');
    var actionArea = document.getElementById('actions');
    var gameData = {
        dice: ['img/1die.jpg','img/2die.jpg','img/3die.jpg','img/4die.jpg','img/5die.jpg','img/6die.jpg'],
        players: ['player 1', 'player 2'],
        score : [0, 0],
        rollOne : 0,
        rollTwo : 0,
        rollSum : 0,
        index: 0,
        gameEnd : 29
    };

    startGame.addEventListener('click', function(){

        gameData.index = Math.round(Math.random());

        gameControl.innerHTML = '<h2>The game has started</h2>';
        gameControl.innerHTML += '<button id="quit">Do you like to quit?</button>';

        document.getElementById('quit').addEventListener('click', function(){
            location.reload();
        });
        setUpTurn();

    })

    function setUpTurn(){
        game.innerHTML = `<p>Roll the dice for play ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';
        document.getElementById('roll').addEventListener('click', function(){
            throwDice();
        })
    }

    function throwDice(){
        actionArea.innerHTML = "";
        gameData.rollOne = Math.floor(Math.random() * 6) +1;
        gameData.rollTwo = Math.floor(Math.random() * 6) +1;
        
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src ="${gameData.dice[gameData.rollOne - 1]}" alt = "die">`;
        game.innerHTML +=  `<img src = "${gameData.dice[gameData.rollTwo - 1]}">`;
                    
        gameData.rollSum = gameData.rollOne + gameData.rollTwo;
        console.log(gameData.rollSum)
        
        if (gameData.rollSum === 2) {
            game.innerHTML += '<p>Snake Eyes</p>';
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            checkWinningCondi();
            setTimeout(setUpTurn, 3000)


        }else if(gameData.rollOne === 1 || gameData.rollTwo === 1){
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p>Sorry, one of your rolls was 1, switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 3000)
        }else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;

            actionArea.innerHTML = '<button id="rollagain">Roll Again </button> or <button id="pass">Pass</button>';
            document.getElementById('rollagain').addEventListener('click', function(){
                throwDice()
            });
            document.getElementById('pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            checkWinningCondi();
            
        }
        
    }

    function checkWinningCondi(){
        if(gameData.score[gameData.index] >= gameData.gameEnd){
            score.innerHTML = `<h2>${gameData.players[gameData.index]} win the game with ${gameData.score[gameData.index]} points </h2>`;
            
            setTimeout(() => {
                gameControl.innerHTML = location.reload(); 
            }, 1000 * 10); 

            actionArea.innerHTML = '';
            document.getElementById('quit').innerHTML = "Start a New Game"
        }else{
            score.innerHTML = `<p>The socre for ${gameData.players[0]} is <strong>${gameData.score[0]}</strong>  and the score for ${gameData.players[1]} is ${gameData.players[1]} is <strong>${gameData.score[1]}</strong> </p>`;
        }
    }

 })();


        