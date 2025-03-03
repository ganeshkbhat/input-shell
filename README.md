# input-shell
python like `input` function using input-shell in nodejs

```

var { input } = require(input-shell);

// Example usage:
input("Input Text: ")
    .then((buffer) => {
        console.log("Input (buffer):", buffer);
        console.log("Input (text):", buffer.toString('utf8')); // Convert to text
        process.exit(0);
    })
    .catch((error) => {
        console.error("Error:", error);
        process.exit(1);
    });

```


```

var { inputSelect } = require(input-shell);

// Example usage: checkboxes
inputSelect(
    'Which fruits do you like? (Use space to select, enter to finish)',
    ['Apple', 'Banana', 'Orange', 'Grape'],
    'checkbox',
    (selections) => {
        console.log('You selected:', selections);
    }
);

```

```

var { inputSelect } = require(input-shell);

// Example usage: radio button
inputSelect(
    'What is your favorite color?',
    ['Red', 'Blue', 'Green', 'Yellow'],
    'radio',
    (selection) => {
        console.log('You selected:', selection);
    }
);

```

```

var { inputSelectMultipleAsync } = require(input-shell);

// Example usage: Multiple questions with Radio, Checkbox, and Text answers
const questions = [
  { text: 'What is your name?', type: 'text' },
  { text: 'What is your favorite color?', type: 'radio', options: ['Red', 'Blue', 'Green'] },
  { text: 'Which fruits do you like?', type: 'checkbox', options: ['Apple', 'Banana', 'Orange', 'Grape'] },
  { text: 'What is your age?', type: 'text' },
];

inputSelectMultipleAsync(questions, (results) => {
  console.log('Results:', results);
});

```

```

var { inputSelectMultiple } = require("input-shell");

// Example usage:
const questions = [
  { text: 'What is your name?', type: 'text' },
  { text: 'What is your favorite color?', type: 'radio', options: ['Red', 'Blue', 'Green'] },
  { text: 'Which fruits do you like?', type: 'checkbox', options: ['Apple', 'Banana', 'Orange', 'Grape'] },
  { text: 'What is your age?', type: 'text' },
];

inputSelectMultiple(questions).then((results) => {
  console.log('Results:', results);
}).catch((error) => {
  console.log('Error:', error);
});

```

#### TESTS

* no tests written: use on your risk. But it works and should work for all use cases. 
* the function written is just a sugar for process.stdin and/or its error.
* all the functions `input`, `inputSelect`, `inputSelectMultiple` do not work with each other in one file together. 
* if you want multiple questions to be asked then use the `inputSelectMultiple` function.


