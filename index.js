//HTML elements
const amountRange = document.getElementById("amountRange");
const amountNumber = document.getElementById("amountNumber");
const uppercase = document.getElementById("uppercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const form = document.getElementById("passwordGenerator");
const password = document.getElementById("password");

//ASCII values. Ĺooped and returned by arrayFromLowToHigh(low, high)
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
    .concat(arrayFromLowToHigh(91, 96))
    .concat(arrayFromLowToHigh(123, 126))
);

//Each time change the value of the input range, call the function to synchronyze it
amountNumber.addEventListener("input", syncAmount);
amountRange.addEventListener("input", syncAmount);

//Function to sync the input range values
function syncAmount(e) {
  const value = e.target.value;
  amountNumber.value = value;
  amountRange.value = value;
}

//On form submit: prevent page refresh, get the current options, call the function to generate the password and render it into the html element
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const characterAmount = amountNumber.value;
  const includeUppercase = uppercase.checked;
  const includeNumbers = numbers.checked;
  const includeSymbols = symbols.checked;

  const passwordCode = generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );

  password.innerText = passwordCode;
});

//Function that returns the password, created randomly based on the options given
function generatePassword(
  characterAmount,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  let charCodes = LOWERCASE_CHAR_CODES;
  if (includeUppercase) {
    charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  }
  if (includeSymbols) {
    charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
  }
  if (includeNumbers) {
    charCodes = charCodes.concat(NUMBER_CHAR_CODES);
  }

  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }

  return passwordCharacters.join("");
}

//Function to loop through the ascii codes, from low to top, on an option given (lowercase, uppercase, numbers and symbols), and returned the array with all the characters selected
function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}
