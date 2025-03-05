const assert = require('chai').assert;
const sinon = require('sinon');
const { interactiveShell, askTextQuestion, askRadioQuestion, askCheckboxQuestion } = require('./interactive-shell'); // Assuming you saved the file as interactive-shell.js

describe('interactiveShell', () => {
    let rlStub;

    beforeEach(() => {
        rlStub = {
            question: sinon.stub(),
            close: sinon.stub(),
            write: sinon.stub(),
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should handle text questions', async () => {
        const questions = [{ name: 'name', type: 'text', message: 'Enter name' }];
        rlStub.question.callsFake((message, callback) => {
            callback('test');
        });

        const answers = await interactiveShell(questions, rlStub);
        assert.deepEqual(answers, { name: 'test' });
    });

    it('should handle radio questions', async () => {
        const questions = [{ name: 'choice', type: 'radio', message: 'Choose', choices: ['a', 'b'] }];
        rlStub.question.callsFake((message, callback) => {
            callback('1');
        });
        const answers = await interactiveShell(questions, rlStub);
        assert.deepEqual(answers, { choice: 'a' });

        rlStub.question.callsFake((message, callback) => {
            callback('2');
        });
        const answers2 = await interactiveShell(questions, rlStub);
        assert.deepEqual(answers2, { choice: 'b' });

    });

    it('should retry radio questions on invalid input', async () => {
        const questions = [{ name: 'choice', type: 'radio', message: 'Choose', choices: ['a', 'b'] }];
        let callCount = 0;
        rlStub.question.callsFake((message, callback) => {
            if (callCount === 0) {
                callCount++;
                callback('3'); // Invalid input
            } else {
                callback('1');
            }
        });

        const answers = await interactiveShell(questions, rlStub);
        assert.deepEqual(answers, { choice: 'a' });
    });

    it('should handle checkbox questions', async () => {
        const questions = [{ name: 'choices', type: 'checkbox', message: 'Select', choices: ['a', 'b', 'c'] }];
        rlStub.question.callsFake((message, callback) => {
            callback('1, 3');
        });

        const answers = await interactiveShell(questions, rlStub);
        assert.deepEqual(answers, { choices: ['a', 'c'] });

        rlStub.question.callsFake((message, callback) => {
            callback('2');
        });

        const answers2 = await interactiveShell(questions, rlStub);
        assert.deepEqual(answers2, { choices: ['b'] });

    });

    it('should retry checkbox questions on invalid input', async () => {
        const questions = [{ name: 'choices', type: 'checkbox', message: 'Select', choices: ['a', 'b'] }];
        let callCount = 0;
        rlStub.question.callsFake((message, callback) => {
            if (callCount === 0) {
                callCount++;
                callback('3'); // Invalid input
            } else {
                callback('1');
            }
        });

        const answers = await interactiveShell(questions, rlStub);
        assert.deepEqual(answers, { choices: ['a'] });
    });

    it('should handle default text values', async () => {
        const questions = [{ name: 'name', type: 'text', message: 'Enter name', default: 'defaultName' }];
        rlStub.question.callsFake((message, callback) => {
            callback('');
        });

        const answers = await interactiveShell(questions, rlStub);
        assert.deepEqual(answers, { name: 'defaultName' });
    });

});

describe('askTextQuestion', () => {
    it('should return the user input', async () => {
        const rlStub = { question: sinon.stub() };
        rlStub.question.callsFake((message, callback) => {
            callback('user input');
        });

        const question = { message: 'Enter text' };
        const result = await askTextQuestion(rlStub, question);
        assert.strictEqual(result, 'user input');
    });
});

describe('askRadioQuestion', () => {
    it('should return the selected choice', async () => {
        const rlStub = { question: sinon.stub(), write: sinon.stub() };
        rlStub.question.callsFake((message, callback) => {
            callback('1');
        });

        const question = { message: 'Choose', choices: ['a', 'b'] };
        const result = await askRadioQuestion(rlStub, question);
        assert.strictEqual(result, 'a');
    });
});

describe('askCheckboxQuestion', () => {
    it('should return the selected choices', async () => {
        const rlStub = { question: sinon.stub(), write: sinon.stub() };
        rlStub.question.callsFake((message, callback) => {
            callback('1, 3');
        });

        const question = { message: 'Select', choices: ['a', 'b', 'c'] };
        const result = await askCheckboxQuestion(rlStub, question);
        assert.deepEqual(result, ['a', 'c']);
    });
});