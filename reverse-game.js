function randomInt(max, min) {
  let range = max - min + 1;
  let randInt = Math.floor(Math.random() * range + min);

  return randInt;
} // began by entering in random number generator function

const { Console } = require("console");
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
} // then added in the readline function

start();

async function start() {
  // started an async function similar to previous project.
  console.log(
    "Let's play a game where I (computer) make up a number between 1 and 100, and you (human) try to guess it."
  );

  const magicNum = randomInt(100, 1);

  let userGuess = await ask(
    "Okay I've come up with the number, what do you think it is?"
  );
  userGuess = +userGuess;
  while (userGuess < magicNum || userGuess > magicNum) {
    // the last if statement would not return congratulatory message when number was guessed when (userGuess !== magicNum)
    if (userGuess < magicNum) {
      userGuess = await ask("My number is higher, guess again.");
    } else if (userGuess > magicNum) {
      userGuess = await ask("My number is lower, guess again.");
    }
  }
  if ((userGuess = magicNum)) {
    //for some reason would not work with ( userGuess === magicNumber)
    console.log(
      "My number was " + userGuess + ". Congratulations, you win bruh!!"
    ); // can't seem to make this work
  }

  process.exit();
}
//
//inserted my the random number generator from the lab
/*function randomInt(max, min) {
  let range = max - min + 1;
  let randInt = Math.floor(Math.random() * range + min);

  return randInt;
}*/

const { Console } = require("console");
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

gameSelect();

async function gameSelect() {
  let gameType = await ask(
    `Let's play a guessing game. If you would like to pick the number, enter: "user". If you would like me (the computer) to pick the number enter: "computer". `
  );
  gameType = gameType.toLowerCase(); // to allow the user to have an option between games I made an if/ else if condition
  let accpetableAnsTwo = ["user", "computer"];
  while (gameType !== "user" && gameType !== "computer") {
    //finally this worked, after numerous attempts I finally found a solution. You (bob) were right, it is a great feeling!!!!!!!!
    gameType = await ask(
      `Sorry I didn't understand that, please enter "user" or "computer". `
    );
  }
  if (gameType === "user") {
    userPicksNum();
  } else if (gameType === "computer") {
    compPicksNum();
  }
}
//having a hard time with these catch alls. Seems like it should work but does not accept input.
/*if (gameType !== accpetableAnsTwo) {
    gameType = await ask(
      `Sorry I didn't understand that, please enter "user" or "computer".` have also tried a while loop and it is not working either nor is else afer the if/else if conditions
    );}
 */ async function userPicksNum() {
  //changing name to distinguish from the reverse-game

  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  let max = await ask("what would you like the range to be?");
  while (isNaN(max)) {
    max = await ask("That was not a number, pleast enter a number. "); //can't seem to get this to work when user enters a NaN
  }
  max = +max;
  function smartGuess(max, min) {
    let range = (max + min) / 2;
    return Math.floor(range); // created a new function for smart guess
  }
  let min = 1;
  let numberGen = smartGuess(max, min);
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  while (isNaN(secretNumber)) {
    secretNumber = await ask("Let's try this again. Please enter a number. "); //worked to make sure user enters a number
    console.log("You entered: " + secretNumber);
  }
  // Now try and complete the program.
  // I want to begin by having the computer ask a random number between 1 and 100.
  let acceptableAnswers = ["equal", "lower", "higher", "yes"];
  let answerOne = await ask(
    `Is your number higher, lower or equal to ${numberGen}? `
  );
  answerOne = answerOne.toLowerCase(); // makes user enetered data no longer case sensitive
  // Now I would like to create a way for the user to enter yes/equal, higher(H) or lower(L)
  let counter = 1; // attempting to make a guess counter, originally set value to 0, but it did not count intial guess
  while (answerOne !== "yes" && answerOne !== "equal") {
    // originally put this on line 66 moved up because it wasn't working
    counter += 1;
    if (answerOne === "higher" && max <= min) {
      console.log(
        "Cheater, cheater, pumpkin eater!!! You said it was lower than " +
          (min + 1) +
          " so it can't be higher than " +
          max +
          "!"
      );
      answerOne = await ask(
        "is your number lower, higher or equal to " + numberGen + "?" //added to hopefully prevent infinite loop from occurring : update it work
      );
    } else if (answerOne === "lower" && max <= min) {
      console.log(
        "Cheater, cheater, pumpkin eater!!! You said it was lower than " +
          max +
          " so it can't be higher than " +
          (min - 1) +
          "!"
      ); // at this point im pretty sure max and min are equal so either could be used
      answerOne = await ask(
        "is your number lower, higher or equal to " + numberGen + "?" //added to hopefully prevent infinite loop from occurring : update it work
      );
    } else if (answerOne === "higher") {
      min = numberGen + 1; //not working as desired, needed to add the plus one
      numberGen = smartGuess(max, min); // replaced existing number generated with smart one; moved it down to allow user to make range.
      answerOne = await ask(
        "is your number lower, higher or equal to " + numberGen + "?"
      );
    } else if (answerOne === "lower") {
      // want to loop it so it repeats
      // need to make a new range
      max = numberGen - 1;
      numberGen = smartGuess(max, min);
      answerOne = await ask(
        `is your number higher, lower or equal to ${numberGen}?`
      );
    } else if (answerOne !== acceptableAnswers) {
      counter -= 1; // inserted so that an unacceptable entry will not count as a guess
      answerOne = await ask(
        "I did not understand that. Please enter equal, lower, or higher."
      );
    }

    // need to make a function to find the middle of min and max : update, done
    // insert else statement later to return "I don't understand, please enter lower, higher or equal"
    //need to figure out how to generate numbers H or L than random number initially generated
  }

  if (answerOne === "equal" || answerOne === "yes") {
    console.log(
      "Your number was " +
        secretNumber +
        " I guessed it in " +
        counter +
        " guesses, I win! Game Over!!!"
    );
  }
  let playAgain = await ask(
    'Would you like to play again? If so enter "yes". '
  );

  if ((playAgain = "yes")) {
    // this is good but user cannot put a space before yes or it won't work, so I replaced the === with a single =.
    gameSelect();
  } else {
    console.log("K BYE!!!!");
    process.exit();
  }
}
async function compPicksNum() {
  // started an async function similar to previous project.
  console.log(
    "Let's play a game where I (computer) make up a number between 1 and 100, and you (human) try to guess it."
  );

  function randomInt(max, min) {
    let range = max - min + 1;
    let randInt = Math.floor(Math.random() * range + min);

    return randInt;
  }
  const magicNum = randomInt(100, 1);

  let userGuess = await ask(
    "Okay I've come up with the number, what do you think it is? "
  );
  let counter = 1; // intially set at 0, but it would not count the first attempt
  while (isNaN(userGuess)) {
    userGuess = await ask("That was not a number, pleast enter a number. ");
  }
  //userGuess = +userGuess;
  while (userGuess < magicNum || userGuess > magicNum) {
    // the last if statement would not return congratulatory message when number was guessed when (userGuess !== magicNum)
    counter += 1;
    if (userGuess < magicNum) {
      userGuess = await ask("My number is higher, guess again. ");
    } else if (userGuess > magicNum) {
      userGuess = await ask("My number is lower, guess again. ");
    }
  }
  if ((userGuess = magicNum)) {
    //for some reason would not work with ( userGuess === magicNumber)
    console.log(
      "My number was " +
        userGuess +
        ". Congratulations bruh, you guessed it in " +
        counter +
        " guesses, you win!!"
    ); // can't seem to make this work
  }

  let playAgain = await ask(
    'Would you like to play again? If so enter "yes". '
  );

  if (playAgain = "yes") { //also changed the === to a single =, may be bad practice but it is more functional in this case because program is less strict about the yes entered in. 
  } else {
    console.log("K BYE!!!!");
    process.exit();
  }

  // can't seem to make this work
}

/*async function replay() {
  let playAgain = await ask("Would you like to play again?"); // not working need to create a new async function or could add to previous two functions, 

  if ((playAgain = "yes")) {
    gameSelect();
  } else {
    process.exit();
  }
}*/
//seems to be working, now I need to make it right.
// not really actually has some kinks that need to be worked out */
