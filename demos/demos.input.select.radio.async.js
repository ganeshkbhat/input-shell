


var { inputSelectAsync } = require("../index");

// Example usage: radio button
inputSelectAsync(
    'What is your favorite color?',
    ['Red', 'Blue', 'Green', 'Yellow'],
    'radio',
    (selection) => {
        console.log('You selected:', selection);
    }
);
