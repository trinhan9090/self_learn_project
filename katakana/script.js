const katakanaList = [
  { char: "ア", romaji: "a" },   { char: "イ", romaji: "i" },
  { char: "ウ", romaji: "u" },   { char: "エ", romaji: "e" },
  { char: "オ", romaji: "o" },

  { char: "カ", romaji: "ka" },  { char: "キ", romaji: "ki" },
  { char: "ク", romaji: "ku" },  { char: "ケ", romaji: "ke" },
  { char: "コ", romaji: "ko" },

  { char: "サ", romaji: "sa" },  { char: "シ", romaji: "shi" },
  { char: "ス", romaji: "su" },  { char: "セ", romaji: "se" },
  { char: "ソ", romaji: "so" },

  { char: "タ", romaji: "ta" },  { char: "チ", romaji: "chi" },
  { char: "ツ", romaji: "tsu" }, { char: "テ", romaji: "te" },
  { char: "ト", romaji: "to" },

  { char: "ナ", romaji: "na" },  { char: "ニ", romaji: "ni" },
  { char: "ヌ", romaji: "nu" },  { char: "ネ", romaji: "ne" },
  { char: "ノ", romaji: "no" },

  { char: "ハ", romaji: "ha" },  { char: "ヒ", romaji: "hi" },
  { char: "フ", romaji: "fu" },  { char: "ヘ", romaji: "he" },
  { char: "ホ", romaji: "ho" },

  { char: "マ", romaji: "ma" },  { char: "ミ", romaji: "mi" },
  { char: "ム", romaji: "mu" },  { char: "メ", romaji: "me" },
  { char: "モ", romaji: "mo" },

  { char: "ヤ", romaji: "ya" },  { char: "ユ", romaji: "yu" },
  { char: "ヨ", romaji: "yo" },

  { char: "ラ", romaji: "ra" },  { char: "リ", romaji: "ri" },
  { char: "ル", romaji: "ru" },  { char: "レ", romaji: "re" },
  { char: "ロ", romaji: "ro" },

  { char: "ワ", romaji: "wa" },  { char: "ヲ", romaji: "wo" },
  { char: "ン", romaji: "n" }
];

let currentQuestion;

let score = 0;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generateCard() {
  const index = getRandomInt(katakanaList.length);
  currentQuestion = katakanaList[index];
  
  document.getElementById("card").textContent = currentQuestion.char;
  document.getElementById("result").textContent = "";

  let options = [currentQuestion.romaji];
  while (options.length < 4) {
    const option = katakanaList[getRandomInt(katakanaList.length)].romaji;
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
  const points = document.getElementById("points");
  const op = document.getElementById("options");
  if (selected === currentQuestion.romaji) {
    result.textContent = "✅ Chính xác!";
    result.style.color = "green";
    score += 1; 
    points.textContent = score;
    op.style.display = "none";

  } else {
    result.textContent = `❌ Sai rầu! Đáp án chuẩn là:${currentQuestion.romaji} `;
    score -= 2;
    result.style.color = "red";
    op.style.display = "none";
  }
}

function nextCard() {
  const op = document.getElementById("options");
  op.style.display = "flex";
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

  katakanaList.forEach(item => {
    const div = document.createElement("div");
    div.textContent = `${item.char} = ${item.romaji}`;
    grid.appendChild(div);
  });
}

window.onload = generateCard;
