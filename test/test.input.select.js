const assert = require('chai').assert;
const sinon = require('sinon');
const { inputSelect } = require('../index'); // Replace 'your-file-name'

// describe('inputSelect', () => {
//   let stdinStub, stdoutStub, processExitStub;
//   let originalRawMode;

//   beforeEach(() => {
//     stdinStub = sinon.stub(process.stdin);
//     stdoutStub = sinon.stub(process.stdout);
//     processExitStub = sinon.stub(process, 'exit');
//     originalRawMode = process.stdin.isRaw;
//   });

//   afterEach(() => {
//     sinon.restore();
//     process.stdin.setRawMode(originalRawMode); // Restore original raw mode
//   });

//   it('should handle radio button selection correctly', (done) => {
//     const options = ['Option 1', 'Option 2', 'Option 3'];
//     const selectedOption = 'Option 2';

//     const callback = (result) => {
//       assert.strictEqual(result, selectedOption);
//       done();
//     };

//     inputSelect('Test radio question', options, 'radio', callback);

//     stdinStub.emit('keypress', null, { name: 'down' });
//     stdinStub.emit('keypress', null, { name: 'return' });
//   });

//   it('should handle checkbox selection correctly', (done) => {
//     const options = ['Option 1', 'Option 2', 'Option 3'];
//     const expectedSelections = ['Option 1', 'Option 3'];

//     const callback = (result) => {
//       assert.deepStrictEqual(result, expectedSelections);
//       done();
//     };

//     inputSelect('Test checkbox question', options, 'checkbox', callback);

//     stdinStub.emit('keypress', null, { name: 'space' });
//     stdinStub.emit('keypress', null, { name: 'down' });
//     stdinStub.emit('keypress', null, { name: 'down' });
//     stdinStub.emit('keypress', null, { name: 'space' });
//     stdinStub.emit('keypress', null, { name: 'return' });
//   });

//   it('should handle up and down arrow key navigation', () => {
//     const options = ['Option 1', 'Option 2', 'Option 3'];
//     inputSelect('Test navigation', options, 'radio', () => {});

//     stdinStub.emit('keypress', null, { name: 'down' });
//     stdinStub.emit('keypress', null, { name: 'up' });

//     assert.ok(stdoutStub.called);
//   });

//   it('should handle ctrl+c exit', () => {
//     inputSelect('Test exit', ['Option 1'], 'radio', () => {});

//     stdinStub.emit('keypress', null, { ctrl: true, name: 'c' });

//     assert.ok(processExitStub.called);
//   });

//   it('should correctly display radio buttons', () => {
//     const options = ['Option 1', 'Option 2'];
//     inputSelect('Test radio display', options, 'radio', () => {});
//     assert.ok(stdoutStub.calledWith(sinon.match('> Option 1')));
//     assert.ok(stdoutStub.calledWith(sinon.match('  Option 2')));
//   });

//   it('should correctly display checkboxes', () => {
//     const options = ['Option 1', 'Option 2'];
//     inputSelect('Test checkbox display', options, 'checkbox', () => {});
//     assert.ok(stdoutStub.calledWith(sinon.match('[ ] Option 1')));
//     assert.ok(stdoutStub.calledWith(sinon.match('[ ] Option 2')));
//   });

//   it('should correctly display checked checkboxes', (done) => {
//     const options = ['Option 1', 'Option 2'];

//     const callback = (result) => {
//       assert.deepStrictEqual(result, ['Option 1']);
//       done();
//     };

//     inputSelect('Test checked checkbox display', options, 'checkbox', callback);

//     stdinStub.emit('keypress', null, { name: 'space' });
//     stdinStub.emit('keypress', null, { name: 'return' });
//   });
// });


