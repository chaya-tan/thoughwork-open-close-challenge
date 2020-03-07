const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

const game = require("./GameTurn");
const turn = new game.GameTurn();

const greeting = function() {
  try {
    var data = fs.readFileSync("greeting.txt", "utf8");
    console.log(data.toString());
  } catch (e) {
    console.log("Error:", e.stack);
  }
};

const reportGameStatus = function(AIanswer, totalOpenHands, prediction) {
  console.log(`\n👽 AI: ${AIanswer}`);
  console.log(`✋ total open hand = ${totalOpenHands}`);
  console.log(`💭 prediction = ${prediction}`);
};

const askIfStartNewGame = function() {
  readline.question(
    "Do you want to play again? if yes, type 'Y' otherwise the game will be closed\n",
    input => {
      if (input === "Y") {
        turn.setUserPositionToPredictor(true);
        playGame();
      } else {
        console.log("\nOk, Goodbye :). Have a nice day!\n");
        readline.close();
      }
    }
  );
};

const playGame = function() {
  readline.question(
    `\n📍 📍 📍 📍 📍 📍 📍 📍 📍 📍 📍 📍 📍 \nYou are the ${
      turn.isUserBePredictor ? "predictor" : "non-predictor"
    }, what is your input?\n`,
    input => {
      const validation_result = turn.isInputFormatCorrect(input);
      if (validation_result.passed) {
        const AIanswer = turn.randomHands();
        const totalOpenHands = turn.openHandCount([input, AIanswer]);
        const prediction = turn.getPredictionNumber(input, AIanswer);

        reportGameStatus(AIanswer, totalOpenHands, prediction);

        if (totalOpenHands == prediction) {
          turn.reportGameResult();
          askIfStartNewGame();
        } else {
          console.log("\nthe prediction is not correct. continue");
          turn.switchUserPosition();
        }
      } else {
        console.log(
          `\n❌  '${input}' is a wrong format  please try again!\n➡️  ${validation_result.message}`
        );
      }
      playGame();
    }
  );
};

greeting();
playGame();
