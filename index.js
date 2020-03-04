const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

const game = require("./GameTurn");
const turn = new game.GameTurn();

console.log("\nWelcome to the open-close game!\n");

console.log(
  "Rules of the game:\nThis game is played between two players.\nOne player will be the predictor.\nTo play the game, after a count of three, the players will need to simultaneously show their hands with each hand either open or closed, and the predictor need to shout out how many hands they think will be open on total.\nIf the predictor is correct, they win, otherwise the other player becomes the predictor and they go again. This continues until the game is won."
);
console.log(
  "To show your hands in this game, you will specify whether your hands are open or close with 'O' or 'C'"
);
console.log(
  "each player has 2 hands so your hand would be 'CC', 'CO', 'OC' or 'OO'"
);
console.log(
  "for the predictor, you must guess how many hands are open in total. so it can be only 0-4 opened hand"
);
console.log(
  "You can guess the openning hand in this format: 'CO4'. Just add the number after the input!\n"
);

const recursiveAsyncReadLine = function() {
  readline.question(
    `\nYou are the ${
      turn.isUserBePredictor ? "predictor" : "non-predictor"
    }, what is your input?\n`,
    input => {
      input += "";
      input = input.toUpperCase();
      const validation_result = turn.isInputFormatCorrect(input);
      if (validation_result.passed) {
        const AIanswer = turn.randomHands();
        const totalOpenHands = turn.openHandCount([input, AIanswer]);
        const prediction = turn.isUserBePredictor
          ? input.match(/[0-4]/g)
          : AIanswer.match(/[0-4]/g);

        console.log(`AI: ${AIanswer}`);
        console.log(`total open hand = ${totalOpenHands}`);
        console.log(`prediction = ${prediction}`);

        if (totalOpenHands == prediction) {
          console.log("the prediction is correct!");
          console.log(
            turn.isUserBePredictor ? "\nYOU WON!!\n" : "\nYOU LOSE!!\n"
          );
          readline.question(
            "Do you want to play again? if yes, type 'Y' otherwise the game will be closed\n",
            input => {
              if (input === "Y") {
                turn.setUserPositionToPredictor(true);
                recursiveAsyncReadLine();
              } else {
                console.log("\nOk, Goodbye :). Have a nice day!\n");
                readline.close();
              }
            }
          );
        } else {
          console.log("the prediction is not correct. continue");
          turn.switchUserPosition();
        }
      } else {
        console.log(`${input} is a wrong format. please try again!`);
        console.log(validation_result.message);
      }

      recursiveAsyncReadLine();
    }
  );
};

recursiveAsyncReadLine();
