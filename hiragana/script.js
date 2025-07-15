const hiraganaList = [
  { char: "あ", romaji: "a" },   { char: "い", romaji: "i" },
  { char: "う", romaji: "u" },   { char: "え", romaji: "e" },
  { char: "お", romaji: "o" },

  { char: "か", romaji: "ka" },  { char: "き", romaji: "ki" },
  { char: "く", romaji: "ku" },  { char: "け", romaji: "ke" },
  { char: "こ", romaji: "ko" },

  { char: "さ", romaji: "sa" },  { char: "し", romaji: "shi" },
  { char: "す", romaji: "su" },  { char: "せ", romaji: "se" },
  { char: "そ", romaji: "so" },

  { char: "た", romaji: "ta" },  { char: "ち", romaji: "chi" },
  { char: "つ", romaji: "tsu" }, { char: "て", romaji: "te" },
  { char: "と", romaji: "to" },

  { char: "な", romaji: "na" },  { char: "に", romaji: "ni" },
  { char: "ぬ", romaji: "nu" },  { char: "ね", romaji: "ne" },
  { char: "の", romaji: "no" },

  { char: "は", romaji: "ha" },  { char: "ひ", romaji: "hi" },
  { char: "ふ", romaji: "fu" },  { char: "へ", romaji: "he" },
  { char: "ほ", romaji: "ho" },

  { char: "ま", romaji: "ma" },  { char: "み", romaji: "mi" },
  { char: "む", romaji: "mu" },  { char: "め", romaji: "me" },
  { char: "も", romaji: "mo" },

  { char: "や", romaji: "ya" },  { char: "ゆ", romaji: "yu" },
  { char: "よ", romaji: "yo" },

  { char: "ら", romaji: "ra" },  { char: "り", romaji: "ri" },
  { char: "る", romaji: "ru" },  { char: "れ", romaji: "re" },
  { char: "ろ", romaji: "ro" },

  { char: "わ", romaji: "wa" },  { char: "を", romaji: "wo" },
  { char: "ん", romaji: "n" }
];

let currentQuestion;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generateCard() {
  const index = getRandomInt(hiraganaList.length);
  currentQuestion = hiraganaList[index];
  
  document.getElementById("card").textContent = currentQuestion.char;
  document.getElementById("result").textContent = "";

  let options = [currentQuestion.romaji];
  while (options.length < 4) {
    const option = hiraganaList[getRandomInt(hiraganaList.length)].romaji;
    if (!options.includes(option)) {
      options.push(option);
    }
  }

  options = shuffle(options);
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const result = document.getElementById("result");
  if (selected === currentQuestion.romaji) {
    result.textContent = "✅ Correct!";
    result.style.color = "green";
  } else {
    result.textContent = `❌ Wrong! `;
    result.style.color = "red";
  }
}

function nextCard() {
  generateCard();
}
function toggleHelp() {
  console.log("clicked help");

  const helpDiv = document.getElementById("help-content");
  helpDiv.classList.toggle("hidden");

  const grid = helpDiv.querySelector(".grid");

  if (!grid) {
    console.error("Grid not found!");
    return;
  }

  // Prevent re-rendering if already filled
  if (grid.children.length > 0) {
    console.log("Grid already filled");
    return;
  }

  hiraganaList.forEach(item => {
    const div = document.createElement("div");
    div.textContent = `${item.char} = ${item.romaji}`;
    grid.appendChild(div);
  });
}

window.onload = generateCard;
