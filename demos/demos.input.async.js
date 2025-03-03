
var { inputAsync } = require("../index");


inputAsync("Enter some text: ", (err, result) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Input:", result.toString());
    }
});

