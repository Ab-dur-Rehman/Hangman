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
        {/* <form>
            <button>Let's Play</button>
        </form> */}
        <div id="startGame_button" onClick={gameFunction}>Let's Play</div>
        <div id="gameWordBox"></div>
    </div>
);

const game_structure = (
    <div className="section_2_wrapper">
        <div id="hangman">
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
        </div>
        <div id="keypad">  

        </div>
    </div>
);

//draw keypad
const gameKeypad = () => {

}
const gameFunction = () => {
    let word = 0;
    let url = 'https://random-word-api.herokuapp.com/word?number=1'; // will return one random word.
    
    $.getJSON(url, randomWord);
    function randomWord(data) {
        word = data;
        let strWord = word[0];
        setGameWord(strWord);
        hideHangman();
    }

    const setGameWord = (word) => {
        let wordArray = word.split('');
        console.log(wordArray);
        let word_length = wordArray.length;
        console.log(word_length);
        let gameWordBox = document.getElementById("gameWordBox");
        let gameButton = document.getElementById("startGame_button");
        gameWordBox.innerHTML = '';
        gameButton.style.display = "none";
        let classCounter = 0;
        wordArray.map (
            (letter) => {
                let letter_box = document.createElement("span");
                letter_box.className = "letter_box box_" + classCounter++;
                letter_box.innerHTML = '';
                gameWordBox.appendChild(letter_box);
            }
        );
    }

    //Hide hamgman
    function hideHangman() {
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

let appRoot = document.getElementById("header");
let appSec1Root = document.getElementById("section_1");
let appSec2Root = document.getElementById("section_2");

ReactDOM.render(app_info, appRoot);
ReactDOM.render(start_game, appSec1Root);
ReactDOM.render(game_structure, appSec2Root);

const renderStartGame = () => {
    const start_game = (
        <div className="startGame_wrapper">
            <div id="startGame_button" onClick={gameFunction}>Let's Play</div>
            <div id="gameWordBox"></div>
        </div>
    );
    ReactDOM.render(start_game, appSec1Root);
};

renderStartGame();
