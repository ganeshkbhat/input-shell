
const assert = require('assert');
const sinon = require('sinon');
const { execSync } = require('child_process'); // For testing the callback version

// Promise-based version (assuming it's in a file called 'promise-main.js')
const promiseMain = require('./promise-main'); // Adjust the path

// Callback-based version (assuming it's in a file called 'callback-main.js')
const callbackMain = require('./callback-main'); // Adjust the path

describe('Promise-based main function', () => {
  it('should resolve with the correct results', async () => {
    const results = await promiseMain();
    assert.ok(Array.isArray(results));
    // Add more specific assertions based on your expected results
    assert.strictEqual(results[0].question, 'What is your name?');
    assert.strictEqual(results[1].question, 'Select your favorite colors:');
    assert.strictEqual(results[2].question, 'Choose your operating system:');
    assert.strictEqual(results[3].question, 'Enter your city?');
  });

  it('should handle errors correctly', async () => {
    // Simulate an error condition (e.g., by modifying the questions array)
    const originalQuestions = [
      { type: 'text', text: 'What is your name?' },
      { type: 'checkbox', text: 'Select your favorite colors:', options: ['Red', 'Green', 'Blue', 'Yellow'] },
      { type: 'radio', text: 'Choose your operating system:', options: ['Windows', 'macOS', 'Linux'] },
      { type: 'text', text: 'Enter your city?' },
    ];
    //simulates a question type that does not exist.
    const badQuestions = [{type: 'badType', text: 'bad question'}];

    promiseMain.questions = badQuestions;

    try {
      await promiseMain();
      assert.fail('Should have thrown an error');
    } catch (error) {
      assert.strictEqual(error.message, 'Unknown question type: badType');
    }
    promiseMain.questions = originalQuestions; //reset questions array.
  });

  // Add more tests as needed (e.g., for different input scenarios)
});

describe('Callback-based main function', () => {
  it('should call the callback with the correct results', (done) => {
    callbackMain((err, results) => {
      assert.ifError(err);
      assert.ok(Array.isArray(results));
      // Add more specific assertions based on your expected results
      assert.strictEqual(results[0].question, 'What is your name?');
      assert.strictEqual(results[1].question, 'Select your favorite colors:');
      assert.strictEqual(results[2].question, 'Choose your operating system:');
      assert.strictEqual(results[3].question, 'Enter your city?');
      done();
    });
  });

  it('should call the callback with an error on failure', (done) => {
    const originalQuestions = [
      { type: 'text', text: 'What is your name?' },
      { type: 'checkbox', text: 'Select your favorite colors:', options: ['Red', 'Green', 'Blue', 'Yellow'] },
      { type: 'radio', text: 'Choose your operating system:', options: ['Windows', 'macOS', 'Linux'] },
      { type: 'text', text: 'Enter your city?' },
    ];
    //simulates a question type that does not exist.
    const badQuestions = [{type: 'badType', text: 'bad question'}];

    callbackMain.questions = badQuestions;

    callbackMain((err, results) => {
      assert.ok(err);
      assert.strictEqual(err.message, 'Unknown question type: badType');
      assert.strictEqual(results, null);
      callbackMain.questions = originalQuestions; // reset questions array.
      done();
    });
  });

  // Add more tests as needed (e.g., for different input scenarios)
});
