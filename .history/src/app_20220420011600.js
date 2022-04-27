console.log("App.js is running!");

const top_header = {

}

const app_info = {
    title: "Hangman App",
    description: "It's a Hangman Game",
    version: "01.00.00",
    Author: "Abdur Rehman",
    options: ['Item One', 'Item Two', 'Item Three'],
    //orgOpt: [options],
    //options: [],
    appOptions() {
        let key_counter = 0;
        return this.options.map((option) => <li key={key_counter++}>{option}</li>);
    },
}
function getTitle(title) {
    if (title) {
        return title;
    } else {
        return "It's default title";
    }
}

const onFormSubmit = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value;
    if (option) {
        app_info.options.push(option);
        e.target.elements.option.value = '';
        render_app();
    }
};

const clearOptions = () => {
    app_info.options = ['Item One', 'Item Two', 'Item Three'];
    render_app();
};

var appRoot = document.getElementById("section_1");

const render_app = () => {
    const template = (
        <div>
            <h1>App Title: {getTitle(app_info.title)}</h1>
            <h4>App Description: {app_info.description}</h4>
            <p>App Version: {app_info.version}</p>
            <h6>App Author: {app_info.Author}</h6>
            <p>{app_info.options.length} Options are available.</p>
            <ol>
                {app_info.options.length > 0 ? app_info.appOptions() : 'No Options'}
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option" /> 
                <button>Add Option</button>
                <button onClick={clearOptions}>Clear Options</button>
            </form>
        </div>
    );    
    ReactDOM.render(template, appRoot);  
};

render_app();