let players = [];
let newsLeaderboard = {};
let currentQuestionIndex = 0;
let currentPlayer = {
    pseudonym: '',
    score: 0
};

let player2 = {
    pseudo: 'Player 2',
    score: 0
};
let answerGiven = false;

const questions = [
    {
        type: 'text',
        content: 'Breaking news: Scientists have discovered a pill that extends human life by 50 years!',
        correct: false,
        feedback: 'This is false. Although there are ongoing studies, no such pill currently exists. This is an example of clickbait headlines.',
        technique: 'Clickbait'
    },
    {
        type: 'image',
        content: 'images/example_image.jpg',  // Placeholder for an example image
        correct: false,
        feedback: 'This image was manipulated using Photoshop. It shows a fake scenario that never happened.',
        technique: 'Image Manipulation'
    },
    {
        type: 'audio',
        content: 'audio/example_audio.wav',  // Placeholder for an example audio
        correct: false,
        feedback: 'This audio clip was altered to include fabricated statements.',
        technique: 'Audio Manipulation'
    },
    {
        type: 'video',
        content: 'video/example_video.mp4',  // Placeholder for an example video
        correct: false,
        feedback: 'This video has been edited to misrepresent the events.',
        technique: 'Video Manipulation'
    }
];

function startQuiz() {
    const usernameInput = document.getElementById('username').value;
    if (usernameInput.trim() === '') {
        alert('Please enter a pseudonym to start the quiz.');
        return;
    }
    currentPlayer.pseudonym = usernameInput;
    currentPlayer.score = 0;
    players.push(currentPlayer);
    enableTabs();
    showSection('quiz-section');
    displayQuestion();
}

function enableTabs() {
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.classList.remove('disabled');
    });
}

function disableTabs() {
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.classList.add('disabled');
    });
}

function navigateTo(sectionId) {
    if (currentPlayer.pseudonym === '') {
        alert('Please enter your pseudonym first!');
        return;
    }
    showSection(sectionId);
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const cardFront = document.querySelector('.flip-card-front');
    const cardBack = document.querySelector('.flip-card-back');

    // Load content based on the question type
    switch (question.type) {
        case 'text':
            cardFront.innerHTML = `<p>${question.content}</p>`;
            break;
        case 'image':
            cardFront.innerHTML = `<img src="${question.content}" alt="Question Image" style="max-width:100%;">`;
            break;
        case 'audio':
            cardFront.innerHTML = `<audio controls><source src="${question.content}" type="audio/mpeg"></audio>`;
            break;
        case 'video':
            cardFront.innerHTML = `<video controls><source src="${question.content}" type="video/mp4"></video>`;
            break;
    }

    cardBack.innerHTML = "<p>Is this information true or false?</p>";
    document.getElementById('question-text').textContent = "Is this information true or false?";
    answerGiven = false;
}
function displayQuestion2() {
    const question = questions[currentQuestionIndex];
    const cardFront = document.querySelector('.flip-card-front2');
    const cardBack = document.querySelector('.flip-card-back2');

    // Load content based on the question type
    switch (question.type) {
        case 'text':
            cardFront.innerHTML = `<p>${question.content}</p>`;
            break;
        case 'image':
            cardFront.innerHTML = `<img src="${question.content}" alt="Question Image" style="max-width:100%;">`;
            break;
        case 'audio':
            cardFront.innerHTML = `<audio controls><source src="${question.content}" type="audio/mpeg"></audio>`;
            break;
        case 'video':
            cardFront.innerHTML = `<video controls><source src="${question.content}" type="video/mp4"></video>`;
            break;
    }

    cardBack.innerHTML = "<p>Is this information true or false?</p>";
    document.getElementById('question-text2').textContent = "Is this information true or false?";
    answerGiven = false;
}



function showFeedback(isCorrect) {
    const feedbackText = document.querySelector('.flip-card-back');
    const cardInner = document.querySelector('.flip-card-inner');

    if (answerGiven) {
        alert("You have already answered this question!");
        return;
    }

    // Determine feedback correctness and display appropriate message
    let feedbackContent = isCorrect ? `<p>Correct! ${questions[currentQuestionIndex].feedback}</p>` : `<p>Incorrect. ${questions[currentQuestionIndex].feedback}</p>`;

    // Add the Next Question button
    feedbackContent += '<button class="btn" id="next-btn">Next Question</button>';

    feedbackText.innerHTML = feedbackContent;
    currentPlayer.score += isCorrect ? 10 : 0;
    answerGiven = true;
    updatePlayerLeaderboard();
    cardInner.style.transform = 'rotateY(180deg)';

    // Add event listener to the newly created Next Question button
    document.getElementById('next-btn').addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            currentQuestionIndex = 0;  // Reset to the first question if it's the last one
        }
        displayQuestion();
        cardInner.style.transform = '';  // Reset flip card to show the front side
        document.getElementById('feedback-section').classList.add('hidden');
    });
}
function showSection(sectionId) {
    const sections = document.querySelectorAll('main > section, aside');
    sections.forEach(section => section.classList.add('hidden'));

    document.getElementById(sectionId).classList.remove('hidden');

}

function updatePlayerLeaderboard() {
    const leaderboard = document.getElementById('player-leaderboard').querySelector('tbody');
    leaderboard.innerHTML = '';

    players.sort((a, b) => b.score - a.score);

    players.forEach(player => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const scoreCell = document.createElement('td');
        nameCell.textContent = player.pseudonym;
        scoreCell.textContent = player.score;
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        leaderboard.appendChild(row);
    });
}

function updateNewsLeaderboard() {
    const leaderboard = document.getElementById('news-leaderboard').querySelector('tbody');
    leaderboard.innerHTML = '';

    const sortedNews = Object.entries(newsLeaderboard).sort((a, b) => b[1] - a[1]);

    sortedNews.forEach(([link, score]) => {
        const row = document.createElement('tr');
        const linkCell = document.createElement('td');
        const scoreCell = document.createElement('td');
        linkCell.textContent = link;
        scoreCell.textContent = score;
        row.appendChild(linkCell);
        row.appendChild(scoreCell);
        leaderboard.appendChild(row);
    });
}

function submitFakeNews(event) {
    event.preventDefault();
    const newsLink = document.getElementById('fake-news-url').value;
    const manipulationTechnique = document.getElementById('manipulation-technique').value;
    if (newsLink.trim() === '' || manipulationTechnique.trim() === '') {
        alert('Please enter both a news URL and a manipulation technique.');
        return;
    }

    if (newsLeaderboard[newsLink]) {
        newsLeaderboard[newsLink] += 10;
    } else {
        newsLeaderboard[newsLink] = 10;
    }

    updateNewsLeaderboard();
    alert('Thank you for your submission!');
}

document.getElementById('true-btn').addEventListener('click', () => {
    const isCorrect = questions[currentQuestionIndex].correct === true;
    showFeedback(isCorrect);
});

document.getElementById('false-btn').addEventListener('click', () => {
    const isCorrect = questions[currentQuestionIndex].correct === false;
    showFeedback(isCorrect);
});

document.getElementById('2min-btn').addEventListener('click', () => {
    console.log("Button clicked!");
    beginBattle(12);

});
document.getElementById('5min-btn').addEventListener('click', () => {
    beginBattle(300);
});

document.getElementById('10min-btn').addEventListener('click', () => {
    beginBattle(600);
});
function beginBattle(time) {
    const feedbackText = document.querySelector('.battle-menu-back');
    const cardInner = document.querySelector('.battle-menu-inner');



    cardInner.style.transform = 'rotateY(180deg)';
    currentQuestionIndex = 0;
    showSection('quiz-section2');
    displayQuestion2();// Correspond à la moitié de la durée de la transition pour synchroniser avec l'animation
    document.getElementById('player1-pseudo').textContent = currentPlayer.pseudonym;
    document.getElementById('player2-pseudo').textContent = "John";
    startBattleTimer(time);
    simulateOpponent();
}

document.getElementById('true-btn2').addEventListener('click', () => {
    const isCorrect = questions[currentQuestionIndex].correct === true;
    showFeedback2(isCorrect);
});

document.getElementById('false-btn2').addEventListener('click', () => {
    const isCorrect = questions[currentQuestionIndex].correct === false;
    showFeedback2(isCorrect);
});


function showFeedback2(isCorrect) {
    const feedbackText = document.querySelector('.flip-card-back2');
    const cardInner = document.querySelector('.flip-card-inner2');

    if (answerGiven) {
        alert("You have already answered this question!");
        return;
    }

    // Determine feedback correctness and display appropriate message
    let feedbackContent = isCorrect ? `<p>Correct! ${questions[currentQuestionIndex].feedback}</p>` : `<p>Incorrect. ${questions[currentQuestionIndex].feedback}</p>`;
    updateScore(currentPlayer,isCorrect);
    // Add the Next Question button
    feedbackContent += '<button class="btn" id="next-btn2">Next Question</button>';

    feedbackText.innerHTML = feedbackContent;
    answerGiven = true;

    cardInner.style.transform = 'rotateY(180deg)';

    // Add event listener to the newly created Next Question button
    document.getElementById('next-btn2').addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            currentQuestionIndex = 0;  // Reset to the first question if it's the last one
        }
        displayQuestion2();
        cardInner.style.transform = '';  // Reset flip card to show the front side
        //document.getElementById('feedback-section').classList.add('hidden');
    });
}

function checkPlayer1Score() {
    const player1Score = currentPlayer.score;
    const resultMessage = document.createElement('p'); // Crée un élément pour afficher le message

    resultMessage.id = 'result-message';
    document.getElementById("battle-section").appendChild(resultMessage); // Ajoute l'élément au body (ou dans une section spécifique)

    // Vérifie le score du player1
    if (player1Score > player2.score) { // Par exemple, si le score est supérieur ou égal à 50, le joueur gagne
        resultMessage.textContent = "You Win!";
        resultMessage.classList.add('blink-green'); // Ajoute l'animation verte pour clignoter
    } else {
        resultMessage.textContent = "You loose!";
        resultMessage.classList.add('blink-red'); // Ajoute l'animation rouge pour clignoter
    }

    // Optionnel : Retirer le message après quelques secondes (par exemple, 5 secondes)
    setTimeout(() => {
        resultMessage.remove();
    }, 5000);
}

function startBattleTimer(timeLimit) {
    const cardInner = document.querySelector('.battle-menu-inner');
    const timeLeftElement = document.getElementById('time-left');
    const progressBar = document.getElementById('progress-bar');
    const timerContainer = document.getElementById('timer-container');
    let timeRemaining = timeLimit;

    // Set the initial value for time and progress bar
    timeLeftElement.textContent = timeRemaining;
    progressBar.style.width = '100%';

    const timerInterval = setInterval(() => {
        timeRemaining--;

        // Update the displayed time
        timeLeftElement.textContent = timeRemaining;

        // Calculate the percentage of time remaining
        const progressPercentage = (timeRemaining / timeLimit) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        // Calculate the color transition from dark green (120°) to red (0°) using HSL
        const hue = (120 * progressPercentage) / 120;  // Interpolate between 120 (green) and 0 (red)
        progressBar.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;  // Keep saturation 100% and lightness 50%

        // If time remaining is less than 10%, make the counter blink
        if (progressPercentage <= 10) {
            timerContainer.classList.add('blink');
        } else {
            timerContainer.classList.remove('blink');
        }

        // When time is up, stop the timer
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert('Battle time is up!');
            timerContainer.classList.remove('blink');
            checkPlayer1Score();
            // Show results or move to the next part
            showSection('battle-section')
            cardInner.style.transform = ''; 
        }
    }, 1000);
}



function updateScore(player, isCorrect) {
    if (isCorrect) {
        player.score += 5;
    } else {
        player.score -= 2;
    }

    // Met à jour l'affichage des scores en temps réel
    document.getElementById(`${player === currentPlayer ? 'player1' : 'player2'}-score`).textContent = player.score;
}

function simulateOpponent(time) {
    const simulationInterval = setInterval(() => {
        time-=7;
        const randomAnswer = Math.random() > 0.5;  // Génère une réponse aléatoire (vrai ou faux)
        updateScore(player2, randomAnswer); // Met à jour le score pour l'adversaire

        // Si le temps est écoulé, arrêter la simulation
        if (time<=0) {
            clearInterval(simulationInterval);
        }
    }, 7000); // Simule une réponse toutes les 7 secondes
}
// Disable tabs initially
disableTabs();
