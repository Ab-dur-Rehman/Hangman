console.log("App.js is running!");

const top_header = {
    title: "Hangman",
    subTitle: "by Abdur Rehman",
}

const app_info = (
    <div>
        <h1>{top_header.title}</h1>
        <p>{top_header.subTitle}</p>
    </div>
);

const start_game = (
    <div className="startGame_wrapper">
        <div id="startGame_button" onClick={gameFunction}>Let's Play</div>
        <div id="gameWordBox">
            <ul id="gameWord">

            </ul>
        </div>
    </div>
);

const game_hangman = (
    <div className="hm_wrapper">
        <div className="hm_stand">
            <div className="left_bar"></div>
            <div className="top_hanger"></div>
            <div className="bottom_stand"></div>
        </div>
        <div className="hman">
            <div className="hm_hook"></div>
            <div className="hm_head"></div>
            <div className="hm_body"></div>
            <div className="hm_l_arm"></div>
            <div className="hm_r_arm"></div>
            <div className="hm_l_leg"></div>
            <div className="hm_r_leg"></div>
        </div>
    </div>
);

const gameFunction = () => {
    let word = 0;
    let url = 'https://random-word-api.herokuapp.com/word?number=1'; // will return one random word.
    
    $.getJSON(url, randomWord);
    function randomWord(data) {
        word = data;
        let strWord = word[0];
        setGameWord(strWord);
        hideHangman();
        //storeWord(strWord);
    }

    const setGameWord = (word) => {
        let wordArray = word.split('');
        console.log(wordArray);
        let word_length = wordArray.length;
        console.log(word_length);
        let gameWord = document.getElementById("gameWord");
        let gameButton = document.getElementById("startGame_button");
        //gameWord.innerHTML = '';
        gameButton.style.display = "none";
        let classCounter = 0;
        wordArray.map (
            (letter) => {
                let letter_box = document.createElement("li");
                letter_box.className = "letter_box box_" + classCounter;
                letter_box.innerHTML = '<span class="ind_letter_'+ classCounter +'">'+letter+'</span>';
                gameWord.appendChild(letter_box);
                classCounter++;
            }
        );
    }

    //Hide hamgman
    const hideHangman = () => {
        let hangMan_hook = document.getElementsByClassName("hm_hook")[0];
        let hangMan_head = document.getElementsByClassName("hm_head")[0];
        let hangMan_body = document.getElementsByClassName("hm_body")[0];
        let hangMan_hm_l_arm = document.getElementsByClassName("hm_l_arm")[0];
        let hangMan_hm_r_arm = document.getElementsByClassName("hm_r_arm")[0];
        let hangMan_hm_l_leg = document.getElementsByClassName("hm_l_leg")[0];
        let hangMan_hm_r_leg = document.getElementsByClassName("hm_r_leg")[0];
        hangMan_hook.style.display = "none";
        hangMan_head.style.display = "none";
        hangMan_body.style.display = "none";
        hangMan_hm_l_arm.style.display = "none";
        hangMan_hm_r_arm.style.display = "none";
        hangMan_hm_l_leg.style.display = "none";
        hangMan_hm_r_leg.style.display = "none";
    }
}

//draw keypad
const gameKeypad = {
    letters : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    generateKeyPad() {
        let key_counter = 0
        return this.letters.map(
            (letter) => <button key={key_counter++} type="button" onClick={e => this.matchWord(e, "value")} value={letter}>{letter}</button>
        );
    },
    matchWord (el) {
        let selected_letter = (el.target.value);
        var gLetters = document.getElementById("gameWord").getElementsByTagName("span");
        let ind_letters = [];
        for (let i = 0; i < gLetters.length; i++) {
            ind_letters[i] = gLetters[i].innerHTML;
        }
        let letter_index = [];
        var wordContainsLetter = (ind_letters.indexOf(selected_letter) > -1);
        let counter = 0;
        if (wordContainsLetter == true){
            ind_letters.map(
                (letter) => {
                    if (letter == selected_letter) {
                        letter_index.push(counter);
                    }
                    counter++;
                }
            );
        }
        
        if (letter_index.length > 0) {
            letter_index.map(
                (index) => {
                    let letter_box = document.getElementsByClassName("ind_letter_"+index)[0];
                    letter_box.style.opacity = "1";
                }
            );
        } else {
            
            let letterPool.push(selected_letter);
            let hm_body = document.getElementsByClassName("hm_body")[0];
            let hm_l_leg = document.getElementsByClassName("hm_l_leg")[0];
            let hm_r_leg = document.getElementsByClassName("hm_r_leg")[0];
            let hm_l_arm = document.getElementsByClassName("hm_l_arm")[0];
            let hm_r_arm = document.getElementsByClassName("hm_r_arm")[0];
            let hm_head = document.getElementsByClassName("hm_head")[0];
            let hm_hook = document.getElementsByClassName("hm_hook")[0];

            if (hm_hook.style.display == "none"){
                hm_hook.style.display = "block";
            } else if (hm_head.style.display == "none"){
                hm_head.style.display = "block";
            } else if(hm_body.style.display == "none"){
                hm_body.style.display = "block";
            } else if(hm_l_arm.style.display == "none"){
                hm_l_arm.style.display = "block";
            } else if(hm_r_arm.style.display == "none"){
                hm_r_arm.style.display = "block";
            } else if(hm_l_leg.style.display == "none"){
                hm_l_leg.style.display = "block";
            } else if(hm_r_leg.style.display == "none"){
                hm_r_leg.style.display = "block";
            }
            console.log(letterPool);
        }
        console.log(letter_index);
    },
}

const game_keypad = (
    <form>
        {gameKeypad.generateKeyPad()}
    </form>
);

let appRoot = document.getElementById("header");
let appSec1Root = document.getElementById("section_1");
let appSec2Root = document.getElementById("hangman");
let appKeypad = document.getElementById("keypad");

ReactDOM.render(app_info, appRoot);
ReactDOM.render(start_game, appSec1Root);
ReactDOM.render(game_hangman, appSec2Root);
ReactDOM.render(game_keypad, appKeypad);


const renderStartGame = () => {
    const start_game = (
        <div className="startGame_wrapper">
            <div id="startGame_button" onClick={gameFunction}>Let's Play</div>
            <div id="gameWordBox">
                <ul id="gameWord">

                </ul>
            </div>
        </div>
    );
    ReactDOM.render(start_game, appSec1Root);
};

renderStartGame();

// const renderCheckWord = () => {
//     const game_keypad = (
//         <form>
//             {gameKeypad.generateKeyPad()}
//         </form>
//     );
//     ReactDOM.render(game_keypad, appKeypad);
// }
// renderCheckWord();