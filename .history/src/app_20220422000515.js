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
    <div>
        <form>
            <button>Let's Play</button>
        </form>
    </div>
);

const game_structure = (
    <div className="section_2_wrapper">
        <div id="hangman">
            <div className="hm_wrapper">
                <div className="hm_stand">
                    <div className="hm_hook"></div>
                    <div className="left_bar"></div>
                    <div className="top_hanger"></div>
                    <div className="bottom_stand"></div>
                </div>
                <div className="hman">
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

let appRoot = document.getElementById("header");
let appSec1Root = document.getElementById("section_1");
let appSec2Root = document.getElementById("section_2");

ReactDOM.render(app_info, appRoot);
ReactDOM.render(start_game, appSec1Root);
ReactDOM.render(game_structure, appSec2Root);
