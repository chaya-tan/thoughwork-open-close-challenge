const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

const game = require("./GameTurn");
const turn = new game.GameTurn();

console.log("\n🎈🎈 Welcome to the OPEN CLOSE game! 🎈🎈\n");

console.log(
  "📒 RULES 📒\n🖍  This game is a prediction game. \n🖍  One player is the predictor in each turn. \n🖍  He/she has to predict how many open hands in totals. Every player has to show 2 hands, either OPEN or CLOSE.\n🖍  the predictor is changed in each round.\n🖍  The player who predict correctly is win.\n\n"
);
console.log(
  "📒 How to play:📒\n🖍  To show your hands in this game, you will specify whether your hands are open or close with 'O' or 'C'"
);
console.log(
  "🖍  each player has 2 hands so your hand would be 'CC', 'CO', 'OC' or 'OO'"
);
console.log(
  "🖍  for the predictor, you must guess how many hands are open in total. so it can be only 0-4 opened hand"
);
console.log(
  "🖍  You can guess the openning hand in this format: 'CO4'. Just add the number after the input!\n"
);

const recursiveAsyncReadLine = function() {
  readline.question(
    `\n📍 📍 📍 📍 📍 📍 📍 📍 📍 📍 📍 📍 📍 \nYou are the ${
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

        console.log(`\n👽 AI: ${AIanswer}`);
        console.log(`✋ total open hand = ${totalOpenHands}`);
        console.log(`💭 prediction = ${prediction}`);

        if (totalOpenHands == prediction) {
          console.log("⭕️ the prediction is correct!");
          console.log(
            turn.isUserBePredictor
              ? "\n🎉 🎉 YOU WON!!🎉 🎉\n"
              : "\n☠️ ☠️ YOU LOSE!!☠️ ☠️\n"
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
          console.log("\nthe prediction is not correct. continue");
          turn.switchUserPosition();
        }
      } else {
        console.log(`\n❌  '${input}' is a wrong format  please try again!`);
        console.log(`➡️  ${validation_result.message}`);
      }

      recursiveAsyncReadLine();
    }
  );
};

recursiveAsyncReadLine();
