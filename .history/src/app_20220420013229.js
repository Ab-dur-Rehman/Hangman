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

let appRoot = document.getElementById("header");
let appSec1Root = document.getElementById("section_1");

ReactDOM.render(app_info, appRoot);
ReactDOM.render(start_game, appSec1Root);  
