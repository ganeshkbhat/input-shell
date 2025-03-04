# input-shell
python like `input` function using `input-shell` in nodejs


---

#### EXPORTED FUNCTIONS: 

The asynchronous callback versions and promise versions of input, inputSelect, inputSelectMultiple:

- `input` : input(text: string)
- `inputAsync` : inputAsync(text: string, callback: function)
- `inputSelect` : inputSelect(questionText: string, options: string, type: string)
- `inputSelectAsync` : inputSelectAsync(questionText : string, options: string, type: string, callback: function)
- `inputSelectMultipleAsync` : inputSelectMultipleAsync(questions: string, finalCallback: function)
- `inputSelectMultiple` : inputSelectMultiple(questions: string)


---

#### DEMOS: 


```

var { input } = require("input-shell");

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

var { inputAsync } = require("input-shell");

inputAsync("Enter some text: ", (err, result) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Input:", result.toString());
    }
});

```

```

var { inputSelectAsync } = require("input-shell");

// Example usage: checkboxes
inputSelectAsync(
    'Which fruits do you like? (Use space to select, enter to finish)',
    ['Apple', 'Banana', 'Orange', 'Grape'],
    'checkbox',
    (selections) => {
        console.log('You selected:', selections);
    }
);

```

```

var { inputSelectAsync } = require("input-shell");

// Example usage: radio button
inputSelectAsync(
    'What is your favorite color?',
    ['Red', 'Blue', 'Green', 'Yellow'],
    'radio',
    (selection) => {
        console.log('You selected:', selection);
    }
);

```

```

var { inputSelect } = require("input-shell");

// Example usage: checkboxes
inputSelect(
    'Select multiple options:',
    ['Checkbox A', 'Checkbox B', 'Checkbox C', 'Checkbox D'],
    'checkbox'
).then(e => console.log(e))

```

```

var { inputSelect } = require("input-shell");

// Example usage: radio button
inputSelect(
    'Choose an option:',
    ['Option 1', 'Option 2', 'Option 3'],
    'radio'
).then(e => console.log(e))

```

```

var { inputSelectMultipleAsync } = require("input-shell");

// Example usage: Multiple questions with Radio, Checkbox, and Text answers
const questions = [
  { text: 'What is your name?', type: 'text' },
  { text: 'What is your favorite color?', type: 'radio', options: ['Red', 'Blue', 'Green'] },
  { text: 'Which fruits do you like?', type: 'checkbox', options: ['Apple', 'Banana', 'Orange', 'Grape'] },
  { text: 'What is your age?', type: 'text' },
];

inputSelectMultipleAsync(questions, (err, results) => {
  if (err) {
    console.error('Error:', err);
    process.exit(1);
  } else {
    console.clear();
    console.log('Answers:');
    <!-- results.forEach((result) => {
      console.log(`${result.question}: ${Array.isArray(result.answer) ? result.answer.join(', ') : result.answer}`);
    }); -->
    console.log("results: ", results);
    process.exit();
  }
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


