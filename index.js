/**
 * 
 * Package: 
 * Author: Ganesh B
 * Description: 
 * Install: npm i input-shell --save
 * Github: https://github.com/ganeshkbhat/
 * npmjs Link: https://www.npmjs.com/package/
 * File: index.js
 * File Description: 
 * 
 * 
*/

/* eslint no-console: 0 */

'use strict';

const { spawn } = require('child_process');
const readline = require('readline');


function inputSelectAsync(questionText, options, type, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  let selectedIndex = 0;
  let selectedOptionsArray = [];

  function displayOptions() {
    console.clear();
    console.log(questionText);
    options.forEach((option, index) => {
      if (type === 'radio') {
        if (index === selectedIndex) {
          console.log(`> ${option}`);
        } else {
          console.log(`  ${option}`);
        }
      } else if (type === 'checkbox') {
        let selected = selectedOptionsArray.includes(index) ? '[x]' : '[ ]';
        if (index === selectedIndex) {
          console.log(`> ${selected} ${option}`);
        } else {
          console.log(`  ${selected} ${option}`);
        }
      }
    });
  }

  displayOptions();

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.on('keypress', (str, key) => {
    if (key.name === 'up') {
      selectedIndex = Math.max(0, selectedIndex - 1);
      displayOptions();
    } else if (key.name === 'down') {
      selectedIndex = Math.min(options.length - 1, selectedIndex + 1);
      displayOptions();
    } else if (key.name === 'return') {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      rl.close();
      if (type === 'radio') {
        callback(options[selectedIndex]);
      } else if (type === 'checkbox') {
        const finalSelections = selectedOptionsArray.map((index) => options[index]);
        callback(finalSelections);
      }
    } else if (key.ctrl && key.name === 'c') {
      process.exit();
    } else if (type === 'checkbox' && key.name === 'space') {
      if (selectedOptionsArray.includes(selectedIndex)) {
        selectedOptionsArray = selectedOptionsArray.filter(
          (item) => item !== selectedIndex
        );
      } else {
        selectedOptionsArray.push(selectedIndex);
      }
      displayOptions();
    }
  });
}


function inputSelect(questionText, options, type) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
    });

    let selectedIndex = 0;
    let selectedOptionsArray = [];

    function displayOptions() {
      console.clear();
      console.log(questionText);
      options.forEach((option, index) => {
        if (type === 'radio') {
          if (index === selectedIndex) {
            console.log(`> ${option}`);
          } else {
            console.log(`  ${option}`);
          }
        } else if (type === 'checkbox') {
          let selected = selectedOptionsArray.includes(index) ? '[x]' : '[ ]';
          if (index === selectedIndex) {
            console.log(`> ${selected} ${option}`);
          } else {
            console.log(`  ${selected} ${option}`);
          }
        }
      });
    }

    displayOptions();

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on('keypress', (str, key) => {
      if (key.name === 'up') {
        selectedIndex = Math.max(0, selectedIndex - 1);
        displayOptions();
      } else if (key.name === 'down') {
        selectedIndex = Math.min(options.length - 1, selectedIndex + 1);
        displayOptions();
      } else if (key.name === 'return') {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        rl.close();
        if (type === 'radio') {
          resolve(options[selectedIndex]);
        } else if (type === 'checkbox') {
          const finalSelections = selectedOptionsArray.map((index) => options[index]);
          resolve(finalSelections);
        }
      } else if (key.ctrl && key.name === 'c') {
        process.exit();
      } else if (type === 'checkbox' && key.name === 'space') {
        if (selectedOptionsArray.includes(selectedIndex)) {
          selectedOptionsArray = selectedOptionsArray.filter(
            (item) => item !== selectedIndex
          );
        } else {
          selectedOptionsArray.push(selectedIndex);
        }
        displayOptions();
      }
    });
  });
}


function input(text) {
  console.log(text);
  return new Promise((resolve, reject) => {
    let buffer = Buffer.alloc(0); // Initialize an empty buffer

    process.stdin.on('readable', () => {
      let chunk;
      while ((chunk = process.stdin.read()) !== null) {
        // Find the index of the first newline character
        const newlineIndex = chunk.indexOf('\n');

        if (newlineIndex !== -1) {
          // Newline found, extract the line up to the newline
          const lineBuffer = Buffer.concat([buffer, chunk.slice(0, newlineIndex)]);
          process.stdin.pause(); // Stop reading
          resolve(lineBuffer);
          return; // Exit the readable event
        } else {
          // No newline, append the chunk to the buffer
          buffer = Buffer.concat([buffer, chunk]);
        }
      }
    });

    process.stdin.on('end', () => {
      if (buffer.length > 0) {
        resolve(buffer);
      } else {
        reject("No input received");
      }
    });

    process.stdin.on('error', (err) => {
      reject(err);
    });
  });
}


function inputAsync(text, callback) {
  console.log(text);
  let buffer = Buffer.alloc(0); // Initialize an empty buffer

  const readableHandler = () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
      const newlineIndex = chunk.indexOf('\n');

      if (newlineIndex !== -1) {
        const lineBuffer = Buffer.concat([buffer, chunk.slice(0, newlineIndex)]);
        process.stdin.pause(); // Stop reading
        process.stdin.off('readable', readableHandler); // Remove the event listener
        process.stdin.off('end', endHandler); // Remove the event listener
        process.stdin.off('error', errorHandler); // Remove the event listener
        callback(null, lineBuffer);
        return;
      } else {
        buffer = Buffer.concat([buffer, chunk]);
      }
    }
  };

  const endHandler = () => {
    process.stdin.off('readable', readableHandler); // Remove the event listener
    process.stdin.off('end', endHandler); // Remove the event listener
    process.stdin.off('error', errorHandler); // Remove the event listener
    if (buffer.length > 0) {
      callback(null, buffer);
    } else {
      callback("No input received", null);
    }
  };

  const errorHandler = (err) => {
    process.stdin.off('readable', readableHandler); // Remove the event listener
    process.stdin.off('end', endHandler); // Remove the event listener
    process.stdin.off('error', errorHandler); // Remove the event listener
    callback(err, null);
  };

  process.stdin.on('readable', readableHandler);
  process.stdin.on('end', endHandler);
  process.stdin.on('error', errorHandler);
}


function inputSelectMultipleAsync(questions, finalCallback) {
  let results = [];
  let questionIndex = 0;

  function askQuestion() {
    if (questionIndex >= questions.length) {
      finalCallback(results);
      return;
    }

    const question = questions[questionIndex];
    const { text, type, options } = question;

    if (type === 'text') {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      displayPreviousQuestions(); // Display previous questions

      rl.question(`${text} `, (answer) => {
        results.push({ text: text, answer: answer });
        rl.close();
        questionIndex++;
        askQuestion();
      });
    } else if (type === 'radio' || type === 'checkbox') {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true,
      });

      let selectedIndex = 0;
      let selectedOptionsArray = [];

      function displayOptions() {
        console.clear();
        displayPreviousQuestions(); // Display previous questions
        console.log(text);
        options.forEach((option, index) => {
          if (type === 'radio') {
            if (index === selectedIndex) {
              console.log(`> ${option}`);
            } else {
              console.log(`  ${option}`);
            }
          } else if (type === 'checkbox') {
            let selected = selectedOptionsArray.includes(index) ? '[x]' : '[ ]';
            if (index === selectedIndex) {
              console.log(`> ${selected} ${option}`);
            } else {
              console.log(`  ${selected} ${option}`);
            }
          }
        });
      }

      displayOptions();

      readline.emitKeypressEvents(process.stdin);
      process.stdin.setRawMode(true);

      process.stdin.on('keypress', (str, key) => {
        if (key.name === 'up') {
          selectedIndex = Math.max(0, selectedIndex - 1);
          displayOptions();
        } else if (key.name === 'down') {
          selectedIndex = Math.min(options.length - 1, selectedIndex + 1);
          displayOptions();
        } else if (key.name === 'return') {
          process.stdin.setRawMode(false);
          process.stdin.pause();
          rl.close();
          let answer;
          if (type === 'radio') {
            answer = options[selectedIndex];
          } else if (type === 'checkbox') {
            answer = selectedOptionsArray.map((index) => options[index]);
          }
          results.push({ text: text, answer: answer });
          questionIndex++;
          askQuestion();
        } else if (key.ctrl && key.name === 'c') {
          process.exit();
        } else if (type === 'checkbox' && key.name === 'space') {
          if (selectedOptionsArray.includes(selectedIndex)) {
            selectedOptionsArray = selectedOptionsArray.filter(
              (item) => item !== selectedIndex
            );
          } else {
            selectedOptionsArray.push(selectedIndex);
          }
          displayOptions();
        }
      });
    }
  }

  function displayPreviousQuestions() {
    results.forEach((result) => {
      console.log(`${result.text} ${result.answer}`);
    });
  }

  askQuestion();
}


// function inputSelectMultiple(questions) {
//   return new Promise((resolve, reject) => {
//     let results = [];
//     let questionIndex = 0;

//     function askQuestion() {
//       if (questionIndex >= questions.length) {
//         resolve(results);
//         return;
//       }

//       const question = questions[questionIndex];
//       const { text, type, options } = question;

//       if (type === 'text') {
//         const rl = readline.createInterface({
//           input: process.stdin,
//           output: process.stdout,
//         });

//         rl.question(`${text} `, (answer) => {
//           results.push({ text: text, answer: answer });
//           rl.close();
//           questionIndex++;
//           askQuestion();
//         });
//       } else if (type === 'radio' || type === 'checkbox') {
//         const rl = readline.createInterface({
//           input: process.stdin,
//           output: process.stdout,
//           terminal: true,
//         });

//         let selectedIndex = 0;
//         let selectedOptionsArray = [];

//         function displayOptions() {
//           console.clear();
//           console.log(text);
//           options.forEach((option, index) => {
//             if (type === 'radio') {
//               if (index === selectedIndex) {
//                 console.log(`> ${option}`);
//               } else {
//                 console.log(`  ${option}`);
//               }
//             } else if (type === 'checkbox') {
//               let selected = selectedOptionsArray.includes(index) ? '[x]' : '[ ]';
//               if (index === selectedIndex) {
//                 console.log(`> ${selected} ${option}`);
//               } else {
//                 console.log(`  ${selected} ${option}`);
//               }
//             }
//           });
//         }

//         displayOptions();

//         readline.emitKeypressEvents(process.stdin);
//         process.stdin.setRawMode(true);

//         process.stdin.on('keypress', (str, key) => {
//           if (key.name === 'up') {
//             selectedIndex = Math.max(0, selectedIndex - 1);
//             displayOptions();
//           } else if (key.name === 'down') {
//             selectedIndex = Math.min(options.length - 1, selectedIndex + 1);
//             displayOptions();
//           } else if (key.name === 'return') {
//             process.stdin.setRawMode(false);
//             process.stdin.pause();
//             rl.close();
//             let answer;
//             if (type === 'radio') {
//               answer = options[selectedIndex];
//             } else if (type === 'checkbox') {
//               answer = selectedOptionsArray.map((index) => options[index]);
//             }
//             results.push({ text: text, answer: answer });
//             questionIndex++;
//             askQuestion();
//           } else if (key.ctrl && key.name === 'c') {
//             process.exit();
//           } else if (type === 'checkbox' && key.name === 'space') {
//             if (selectedOptionsArray.includes(selectedIndex)) {
//               selectedOptionsArray = selectedOptionsArray.filter(
//                 (item) => item !== selectedIndex
//               );
//             } else {
//               selectedOptionsArray.push(selectedIndex);
//             }
//             displayOptions();
//           }
//         });
//       }
//     }

//     askQuestion();
//   });
// }


function recursiveFns() {

  function questionAsync(prompt) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(prompt, (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }

  async function checkboxMenu(choices, previousAnswers) {
    const selected = new Array(choices.length).fill(false);
    let currentIndex = 0;

    while (true) {
      console.clear();
      for (let i = 0; i < previousAnswers.length; i++) {
        console.log(`${previousAnswers[i].question}: ${Array.isArray(previousAnswers[i].answer) ? previousAnswers[i].answer.join(', ') : previousAnswers[i].answer}`);
      }

      console.log("Select with space, confirm with enter, navigate with arrows:");
      for (let i = 0; i < choices.length; i++) {
        const prefix = i === currentIndex ? '>' : ' ';
        const check = selected[i] ? '[x]' : '[ ]';
        console.log(`${prefix} ${check} ${choices[i]}`);
      }

      const key = await readKey();

      if (key === '\r') {
        return choices.filter((_, i) => selected[i]);
      } else if (key === '\u001b[A') {
        currentIndex = (currentIndex - 1 + choices.length) % choices.length;
      } else if (key === '\u001b[B') {
        currentIndex = (currentIndex + 1) % choices.length;
      } else if (key === ' ') {
        selected[currentIndex] = !selected[currentIndex];
      }
    }
  }

  async function radioMenu(choices, previousAnswers) {
    let currentIndex = 0;

    while (true) {
      console.clear();
      for (let i = 0; i < previousAnswers.length; i++) {
        console.log(`${previousAnswers[i].question}: ${Array.isArray(previousAnswers[i].answer) ? previousAnswers[i].answer.join(', ') : previousAnswers[i].answer}`);
      }
      console.log("Select with enter, navigate with arrows:");

      for (let i = 0; i < choices.length; i++) {
        const prefix = i === currentIndex ? '>' : ' ';
        const radio = i === currentIndex ? '(o)' : '( )';
        console.log(`${prefix} ${radio} ${choices[i]}`);
      }

      const key = await readKey();

      if (key === '\r') {
        return choices[currentIndex];
      } else if (key === '\u001b[A') {
        currentIndex = (currentIndex - 1 + choices.length) % choices.length;
      } else if (key === '\u001b[B') {
        currentIndex = (currentIndex + 1) % choices.length;
      }
    }
  }

  function readKey() {
    return new Promise((resolve) => {
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.once('data', (data) => {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        resolve(data.toString());
      });
    });
  }

  async function recursiveQuestion(questions, answers = [], currentIndex = 0) {
    if (currentIndex >= questions.length) {
      return answers;
    }

    const currentQuestion = questions[currentIndex];

    for (let i = 0; i < answers.length; i++) {
      console.log(`${questions[i].text}: ${Array.isArray(answers[i].answer) ? answers[i].answer.join(', ') : answers[i].answer}`);
    }

    console.log(`${currentQuestion.text}`);

    let answer;

    if (currentQuestion.type === 'text') {
      answer = await questionAsync('> ');
    } else if (currentQuestion.type === 'checkbox') {
      answer = await checkboxMenu(currentQuestion.options, answers);
    } else if (currentQuestion.type === 'radio') {
      answer = await radioMenu(currentQuestion.options, answers);
    } else {
      throw new Error(`Unknown question type: ${currentQuestion.type}`);
    }

    answers.push({ question: currentQuestion.text, answer: answer });
    return recursiveQuestion(questions, answers, currentIndex + 1);
  }

  return recursiveQuestion
}


function inputSelectMultiple(questions) {
  return new Promise(async (resolve, reject) => {
    try {
      const results = await recursiveFns().recursiveQuestion(questions);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}


function inputSelectMultipleAsync(questions, callback) {
  recursiveFns().recursiveQuestion(questions)
    .then((results) => {
      callback(null, results); // Pass null for error, results for success
    })
    .catch((error) => {
      callback(error, null); // Pass error, null for results
    });
}


function shellQuestions() {

  async function interactiveShell(questions) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const answers = {};

    for (const question of questions) {
      if (question.type === 'text') {
        answers[question.name] = await askTextQuestion(rl, question);
      } else if (question.type === 'radio') {
        answers[question.name] = await askRadioQuestion(rl, question);
      } else if (question.type === 'checkbox') {
        answers[question.name] = await askCheckboxQuestion(rl, question);
      } else {
        console.error(`Unsupported question type: ${question.type}`);
      }
    }

    rl.close();
    return answers;
  }

  async function askTextQuestion(rl, question) {
    return new Promise((resolve) => {
      rl.question(question.message + (question.default ? ` (default: ${question.default}): ` : ': '), (answer) => {
        resolve(answer || question.default || '');
      });
    });
  }

  async function askRadioQuestion(rl, question) {
    return new Promise((resolve) => {
      console.log(question.message);
      question.choices.forEach((choice, index) => {
        console.log(`${index + 1}. ${choice}`);
      });

      rl.question('Select an option: ', (answer) => {
        const index = parseInt(answer) - 1;
        if (index >= 0 && index < question.choices.length) {
          resolve(question.choices[index]);
        } else {
          console.log('Invalid selection.');
          resolve(askRadioQuestion(rl, question)); // Retry on invalid input
        }
      });
    });
  }

  async function askCheckboxQuestion(rl, question) {
    return new Promise((resolve) => {
      console.log(question.message);
      question.choices.forEach((choice, index) => {
        console.log(`${index + 1}. ${choice}`);
      });

      rl.question('Select options (comma-separated numbers): ', (answer) => {
        const selectedIndices = answer.split(',').map((index) => parseInt(index.trim()) - 1);
        const selectedChoices = selectedIndices
          .filter((index) => index >= 0 && index < question.choices.length)
          .map((index) => question.choices[index]);

        if (selectedIndices.some(index => index < 0 || index >= question.choices.length && answer.trim() !== "")) {
          console.log('Invalid selection(s).');
          resolve(askCheckboxQuestion(rl, question)); // Retry on invalid input
        } else {
          resolve(selectedChoices);
        }
      });
    });
  }

  return {
    interactiveShell,
    askTextQuestion,
    askRadioQuestion,
    askCheckboxQuestion
  }
}


function shellCommands() {

  async function startCommandLineShell(callback) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> ',
    });

    rl.prompt();

    const commandResults = []; // Array of objects to store command results

    rl.on('line', (input) => {
      const trimmedInput = input.trim();
      if (trimmedInput === 'exit') {
        rl.close();
        return;
      }

      const commandParts = parseCommand(trimmedInput);

      if (commandParts.length === 0) {
        rl.prompt();
        return;
      }

      const command = commandParts[0];
      const args = commandParts.slice(1);

      const child = spawn(command, args, { shell: true }); // Removed stdio: 'inherit'

      let stdoutData = '';
      let stderrData = '';

      child.stdout.on('data', (data) => {
        stdoutData += data;
      });

      child.stderr.on('data', (data) => {
        stderrData += data;
      });

      child.on('close', (code) => {
        const result = stderrData || stdoutData; // Use stderr if present, otherwise stdout

        commandResults.push({
          command: trimmedInput,
          result: result.trim(),
        });

        console.log(result);
        rl.prompt();
      });

      child.on('error', (err) => {
        commandResults.push({
          command: trimmedInput,
          result: `Error executing command: ${err.message}`,
        });
        console.error(`Error executing command: ${err.message}`);
        rl.prompt();
      });
    });

    rl.on('close', () => {
      console.log('\nExiting shell.');
      if (callback) {
        callback(commandResults); // Call the callback with results
      }
      process.exit(0);
    });
  }

  function parseCommand(input) {
    const parts = [];
    let currentPart = '';
    let inQuotes = false;

    for (let char of input) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ' ' && !inQuotes) {
        if (currentPart) {
          parts.push(currentPart);
          currentPart = '';
        }
      } else {
        currentPart += char;
      }
    }

    if (currentPart) {
      parts.push(currentPart);
    }

    return parts;
  }

  return startCommandLineShell
}


module.exports = {
  input,
  inputAsync,
  inputSelect,
  inputSelectAsync,
  inputSelectMultipleAsync,
  inputSelectMultiple,
  shellQuestions,
  shellCommands
}

