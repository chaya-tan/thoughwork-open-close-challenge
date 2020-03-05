# The Thoughwork Open-Closed Game

## Rules

This game is played between two players.

One player will be the predictor.

To play the game, after a count of three, the players will need to
simultaneously show their hands with each hand either open or closed, and the
predictor need to shout out how many hands they think will be open on total.

If the predictor is correct, they win, otherwise the other player becomes the
predictor and they go again. This continues until the game is won.

## How to play

For each round, the computer will expect player input in the following format if
you are the predictor:

```
OC2
```

Or if you are not:

```
CO
```

That is, the first two characters will show how you will play your hands, O for
open or C for closed. If you are the predictor, you also need to enter a third
character which is your prediction for how many open hands in total.

The program should then reveal the “AI” players input and indicate if the game
was won, or move to the next round.

## How to start playing

This is a console application. So

1. Make sure you have installed node. If not check out
   [Node.js](https://nodejs.org/en/). This program is developed and tested in
   v10.16.3
2. Go to this directory in any shell program
3. type `node index.js`
4. start playing!

## How to run test

1. Make sure you have [jasmine](https://jasmine.github.io/) command line
   installed. If not check out
   [Jasmine Documentation](https://jasmine.github.io/)
2. Go to this directory in any shell program
3. type `jasmine`

## Note

this program is compatible with Node v10.16.3
