"use strict";

console.log("App.js is running!");

var top_header = {
    title: "Hangman",
    subTitle: "by Abdur Rehman"
};

var app_info = React.createElement(
    "div",
    null,
    React.createElement(
        "h1",
        null,
        top_header.title
    ),
    React.createElement(
        "p",
        null,
        top_header.subTitle
    )
);

var start_game = React.createElement(
    "div",
    { className: "startGame_wrapper" },
    React.createElement(
        "div",
        { id: "startGame_button", onClick: gameFunction },
        "Let's Play"
    ),
    React.createElement(
        "div",
        { id: "gameWordBox" },
        React.createElement("ul", { id: "gameWord" })
    )
);

var restart_game = React.createElement(
    "div",
    { className: "re-startGame_wrapper" },
    React.createElement("div", { id: "gameMessage" }),
    React.createElement("div", { id: "gameWordInfo" }),
    React.createElement(
        "div",
        { id: "startGame_button2", onClick: gameFunction },
        "Let's Play Again"
    )
);

var game_hangman = React.createElement(
    "div",
    { className: "hm_wrapper" },
    React.createElement(
        "div",
        { className: "hm_stand" },
        React.createElement("div", { className: "left_bar" }),
        React.createElement("div", { className: "top_hanger" }),
        React.createElement("div", { className: "bottom_stand" })
    ),
    React.createElement(
        "div",
        { className: "hman" },
        React.createElement("div", { className: "hm_hook" }),
        React.createElement("div", { className: "hm_head" }),
        React.createElement("div", { className: "hm_body" }),
        React.createElement("div", { className: "hm_l_arm" }),
        React.createElement("div", { className: "hm_r_arm" }),
        React.createElement("div", { className: "hm_l_leg" }),
        React.createElement("div", { className: "hm_r_leg" })
    )
);
var gameFunction = function gameFunction() {

    // Backup Api

    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
    //         'X-RapidAPI-Key': '52bcf7f47fmsh9cb2ce60eb6a148p1a2b86jsnff3fa2c4423a'
    //     }
    // };

    // fetch('https://random-words5.p.rapidapi.com/getMultipleRandom?count=1', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));

    var word = 0;
    var url = 'https://random-word-api.herokuapp.com/word?length=5&lang=en'; // will return one random word.

    $.getJSON(url, randomWord);
    function randomWord(data) {
        word = data;
        var strWord = word[0];
        resetGame();
        setGameWord(strWord);
        hideHangman();
        //storeWord(strWord);
        gameKeypad.letterPool = [];
        gameKeypad.count = 0;
    }
};

var setGameWord = function setGameWord(word) {
    var wordArray = word.split('');
    console.log(wordArray);
    var word_length = wordArray.length;
    console.log(word_length);
    var gameWord = document.getElementById("gameWord");
    var gameButton = document.getElementById("startGame_button");
    //gameWord.innerHTML = '';
    gameButton.style.display = "none";
    var classCounter = 0;
    wordArray.map(function (letter) {
        var letter_box = document.createElement("li");
        letter_box.className = "letter_box box_" + classCounter;
        letter_box.innerHTML = '<span class="ind_letter ind_letter_' + classCounter + '">' + letter + '</span>';
        gameWord.appendChild(letter_box);
        classCounter++;
    });
};

//Hide hamgman
var hideHangman = function hideHangman() {
    var hangMan_hook = document.getElementsByClassName("hm_hook")[0];
    var hangMan_head = document.getElementsByClassName("hm_head")[0];
    var hangMan_body = document.getElementsByClassName("hm_body")[0];
    var hangMan_hm_l_arm = document.getElementsByClassName("hm_l_arm")[0];
    var hangMan_hm_r_arm = document.getElementsByClassName("hm_r_arm")[0];
    var hangMan_hm_l_leg = document.getElementsByClassName("hm_l_leg")[0];
    var hangMan_hm_r_leg = document.getElementsByClassName("hm_r_leg")[0];
    hangMan_hook.style.display = "none";
    hangMan_head.style.display = "none";
    hangMan_body.style.display = "none";
    hangMan_hm_l_arm.style.display = "none";
    hangMan_hm_r_arm.style.display = "none";
    hangMan_hm_l_leg.style.display = "none";
    hangMan_hm_r_leg.style.display = "none";
};

//Reset the game incase of restart
var resetGame = function resetGame() {
    var resetWord = document.getElementById("gameWord");
    resetWord.innerHTML = '';
    var showKeypad = document.getElementById("keypad");
    showKeypad.style.display = "block";
    var hideGameMessage = document.getElementById("reStart");
    hideGameMessage.style.display = "none";
};

//draw keypad
var gameKeypad = {
    letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    generateKeyPad: function generateKeyPad() {
        var _this = this;

        var key_counter = 0;
        return this.letters.map(function (letter) {
            return React.createElement(
                "button",
                { key: key_counter++, type: "button", onClick: function onClick(e) {
                        return _this.matchWord(e, "value");
                    }, value: letter, className: "alphaButtons" },
                letter
            );
        });
    },

    letterPool: [],
    count: 0,
    matchWord: function matchWord(el) {
        var _this2 = this;

        var selected_letter = el.target.value;
        var gLetters = document.getElementById("gameWord").getElementsByTagName("span");
        var ind_letters = [];
        for (var i = 0; i < gLetters.length; i++) {
            ind_letters[i] = gLetters[i].innerHTML;
        }
        var letter_index = [];
        var wordContainsLetter = ind_letters.indexOf(selected_letter) > -1;
        var counter = 0;
        if (wordContainsLetter == true) {
            ind_letters.map(function (letter) {
                if (letter == selected_letter) {
                    letter_index.push(counter);
                }
                counter++;
            });
        }
        if (letter_index.length > 0) {
            letter_index.map(function (index) {
                var letter_box = document.getElementsByClassName("ind_letter_" + index)[0];
                if (letter_box.getAttribute("style") == null) {
                    letter_box.style.opacity = "1";
                    _this2.count++;
                }
            });
            if (this.count == ind_letters.length) {
                console.log(ind_letters.length);
                console.log(this.count);
                var hideKeypad = document.getElementById("keypad");
                hideKeypad.style.display = "none";
                var gameRestart = document.getElementById("reStart");
                gameRestart.style.display = "block";
                document.getElementById("gameMessage").innerHTML = '<p>Congratulations You win</p>';
            }
        } else {
            console.log(this.letterPool.length);
            console.log(this.letterPool.indexOf(selected_letter));
            if (this.letterPool.indexOf(selected_letter) == -1 && this.letterPool.length < 6) {
                this.letterPool.push(selected_letter);
                var hm_body = document.getElementsByClassName("hm_body")[0];
                var hm_l_leg = document.getElementsByClassName("hm_l_leg")[0];
                var hm_l_arm = document.getElementsByClassName("hm_l_arm")[0];
                var hm_r_arm = document.getElementsByClassName("hm_r_arm")[0];
                var hm_head = document.getElementsByClassName("hm_head")[0];
                var hm_hook = document.getElementsByClassName("hm_hook")[0];

                if (hm_hook.style.display == "none") {
                    hm_hook.style.display = "block";
                } else if (hm_head.style.display == "none") {
                    hm_head.style.display = "block";
                } else if (hm_body.style.display == "none") {
                    hm_body.style.display = "block";
                } else if (hm_l_arm.style.display == "none") {
                    hm_l_arm.style.display = "block";
                } else if (hm_r_arm.style.display == "none") {
                    hm_r_arm.style.display = "block";
                } else if (hm_l_leg.style.display == "none") {
                    hm_l_leg.style.display = "block";
                }
                console.log(this.letterPool);
            } else {
                var hm_r_leg = document.getElementsByClassName("hm_r_leg")[0];
                hm_r_leg.style.display = "block";
                var _hideKeypad = document.getElementById("keypad");
                _hideKeypad.style.display = "none";
                var _gameRestart = document.getElementById("reStart");
                _gameRestart.style.display = "block";
                document.getElementById("gameMessage").innerHTML = '<p>Sorry! You Lost</p>';

                //let restartGame = document.getElementById("reStart");
                //ReactDOM.render(restart_game, restartGame);

                var word_display = Array.from(document.getElementsByClassName("ind_letter"));
                word_display.forEach(function (wd) {
                    wd.style.opacity = '1';
                });
            }
        }
        console.log(letter_index);
    }
};

var game_keypad = React.createElement(
    "form",
    null,
    gameKeypad.generateKeyPad()
);

var appRoot = document.getElementById("header");
var appSec1Root = document.getElementById("section_1");
var appSec2Root = document.getElementById("hangman");
var appKeypad = document.getElementById("keypad");
var restartGame = document.getElementById("reStart");

ReactDOM.render(app_info, appRoot);
ReactDOM.render(start_game, appSec1Root);
ReactDOM.render(game_hangman, appSec2Root);
ReactDOM.render(game_keypad, appKeypad);
ReactDOM.render(restart_game, restartGame);

var renderStartGame = function renderStartGame() {
    var start_game = React.createElement(
        "div",
        { className: "startGame_wrapper" },
        React.createElement(
            "div",
            { id: "startGame_button", onClick: gameFunction },
            "Let's Play"
        ),
        React.createElement(
            "div",
            { id: "gameWordBox" },
            React.createElement("ul", { id: "gameWord" })
        )
    );
    ReactDOM.render(start_game, appSec1Root);
};

renderStartGame();

var renderReStartGame = function renderReStartGame() {
    var restart_game = React.createElement(
        "div",
        { className: "re-startGame_wrapper" },
        React.createElement("div", { id: "gameMessage" }),
        React.createElement("div", { id: "gameWordInfo" }),
        React.createElement(
            "div",
            { id: "startGame_button", onClick: gameFunction },
            "Let's Play Again"
        )
    );
    ReactDOM.render(restart_game, restartGame);
};

renderReStartGame();
