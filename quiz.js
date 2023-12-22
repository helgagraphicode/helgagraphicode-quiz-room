let data;
let currentQuestion = 0;
let score = 0;

function displayQuestion() {
  const questionElem = document.getElementById('question');
  const optionsElem = document.getElementById('options');

  const currentQuizData = data[currentQuestion];
  questionElem.innerText = currentQuizData.question;

  const startButton = document.querySelector('button'); // Mendapatkan tombol "Start Quiz"
  startButton.style.display = 'none'; // Menyembunyikan tombol "Start Quiz"

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

  if (answerIndex < currentQuizData.options.length) {
    if (currentQuizData.options[answerIndex] === currentQuizData.answer) {
      score += 4;
      document.getElementById('score-value').textContent = score;
    }
  }

  currentQuestion++;
  if (currentQuestion < data.length) {
    displayQuestion();
  } else {
    endQuiz();
  }

} // Menambahkan kurung kurawal penutup untuk fungsi checkAnswer()

function startQuiz() {
  const username = document.getElementById('username').value;
  if (username) {
    document.getElementById('username').style.display = 'none';
    document.querySelector('button').removeEventListener('click', startQuiz); // Menghapus event listener yang ditambahkan sebelumnya
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
      // Mengubah tampilan tombol Start Quiz menjadi none setelah kuis dimulai
      document.querySelector('button').style.display = 'none';
    }
  };
  request.send();
}

function endQuiz() {
  const username = document.getElementById('username').value;
  const scoreValue = score;

  const message = `ID: ${username}\nNILAI: ${scoreValue}\nwww.helgaweb.site`;
  const webhookURL = 'https://discord.com/api/webhooks/1186674759434514483/4iCa8eF9V2EdeoKXFRqfwwVhP6AtTHqxZZwb7J0n0Ti2ei2A-H5ZUlbguV7mfqKqGg4y';

  const payload = {
    content: message
  };

  fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (response.ok) {
      console.log('Pesan terkirim ke Discord');
      // Lakukan tindakan lain jika pesan berhasil terkirim
    } else {
      console.error('Gagal mengirim pesan ke Discord');
      // Lakukan tindakan jika pesan gagal terkirim
    }
  })
  .catch(error => {
    console.error('Terjadi kesalahan:', error);
    // Lakukan tindakan jika terjadi kesalahan
  });

  const questionElem = document.getElementById('question');
  const optionsElem = document.getElementById('options');

  questionElem.innerText = `Quiz finished! Your score is: ${score}`;
  optionsElem.innerHTML = '';

  // Additional logic or actions you want to perform after the quiz ends
}
