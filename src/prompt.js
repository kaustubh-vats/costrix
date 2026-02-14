const readline = require("readline");

function askProjectArg() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question("Enter app name (folder): ", (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

module.exports = {
  askProjectArg
};
