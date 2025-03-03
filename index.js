/**
 * 
 * Package: 
 * Author: Ganesh B
 * Description: 
 * Install: npm i input --save
 * Github: https://github.com/ganeshkbhat/
 * npmjs Link: https://www.npmjs.com/package/
 * File: index.js
 * File Description: 
 * 
 * 
*/

/* eslint no-console: 0 */

'use strict';

const readline = require('readline');

function inputSelect(questionText, options, type, callback) {
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


function inputSelectMultiple(questions, finalCallback) {
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


module.exports = { input, inputSelect, inputSelectMultiple }

