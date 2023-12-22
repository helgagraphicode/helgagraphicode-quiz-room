let data;
let currentQuestion = 0;
let score = 0;

function displayQuestion() {
  const questionElem = document.getElementById('question');
  const optionsElem = document.getElementById('options');

  const currentQuizData = data[currentQuestion];
  questionElem.innerText = currentQuizData.question;

  optionsElem.innerHTML = '';
  currentQuizData.options.forEach((option, index) => {
    const listItem = document.createElement('li');
    const button = document.createElement('button');
    button.innerText = option;
    button.onclick = () => checkAnswer(index);
    listItem.appendChild(button);
    optionsElem.appendChild(listItem);
  });

  questionElem.style.display = 'block';
  optionsElem.style.display = 'block';
}

function checkAnswer(answerIndex) {
  const currentQuizData = data[currentQuestion];

  if (currentQuizData.options[answerIndex] === currentQuizData.answer) {
    score += 2; // Mengubah penambahan skor dari 1 menjadi 4
    document.getElementById('score-value').textContent = score;
  }

  currentQuestion++;
  if (currentQuestion < data.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}


function startQuiz() {
  const username = document.getElementById('username').value;
  if (username) {
    document.getElementById('username').style.display = 'none';
    document.querySelector('button').style.display = 'none';
    loadQuestion();
  } else {
    alert('Please enter your name to start the quiz.');
  }
}

function loadQuestion() {
  const request = new XMLHttpRequest();
  request.open('GET', 'quizdata.json');
  request.onload = function () {
    if (request.status === 200) {
      data = JSON.parse(request.responseText);
      displayQuestion();
    }
  };
  request.send();
}

function endQuiz() {
  const username = document.getElementById('username').value;
  const scoreValue = score;

  const message = `ID: ${username}\nNILAI: ${scoreValue}\nwww.helgaweb.site`;
  const webhookURL = 'https://discord.com/api/webhooks/1186674759434514483/4iCa8eF9V2EdeoKXFRqfwwVhP6AtTHqxZZwb7J0n0Ti2ei2A-H5ZUlbguV7mfqKqGg4y'; // Replace with your Discord webhook URL

  fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: '',
      embeds: [
        {
          title: '**HelgaGraphiCode**',
          description: `ID: ${username}\nNILAI: ${scoreValue}\n"Jangan pernah menyerah, karena yang terbaik akan datang pada waktu yang tepat."`,
          image: {
            url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzViNHN5YWU4cTVyN3JtNmF1aDdqeDNubmY4dDhnMnB0dDNsZGFsMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kMIydq55rRliFH5vWw/source.gif', // Ganti dengan URL gambar GIF Anda
          },
          footer: {
            text: 'www.helgaweb.site',
          } 
        },
      ],
    }),
  })
    .then((response) => {
      console.log('Pesan berhasil dikirim ke Discord');
    })
    .catch((error) => {
      console.error('Ada masalah dalam mengirim pesan ke Discord:', error);
    });

  const questionElem = document.getElementById('question');
  const optionsElem = document.getElementById('options');

  questionElem.innerText = `Quiz finished! Your score is: ${score}`;
  optionsElem.innerHTML = '';
}
