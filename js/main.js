// script.js


$(document).ready(function() {
    const questions = [
        {
            question: "Quelle est la capitale de la France ?",
            answers: ["Paris", "Londres", "Berlin", "Madrid"],
            correct: "Paris",
            image: "../img/zah-remove.png"
        },

        {
            question: "Quel est le plus grand océan ?",
            answers: ["Atlantique", "Pacifique", "Indien", "Arctique"],
            correct: "Pacifique",
            image: "../img/design.jpg"
        },

        {
            question: "Combien de continents y a-t-il sur Terre ?",
            answers: ["5", "6", "7", "8"],
            correct: "7",
            image: "../img/image_1.jpg"
        },

        {
            question: "En quelle année la France gagne la Coupe du Monde?",
            answers: ["1930", "1934", "1938", "1942"],
            correct: "1938",
            image: "../img/zah-remove.png"
        },

        {
            question: "En quelle année la France gagne la Coupe de France?",
            answers: ["1900", "1912", "1918", "1924"],
            correct: "1912",
            image: "../img/zah-remove.png"
        },

        {
            question: "Quelle est la capitale de l'Angleterre?",
            answers: ["London", "Paris", "Berlin", "Madrid"],
            correct: "London",
            image: "../img/zah-remove.png"
        },

        {
            question: "Quel langage de programmation aimerez-vous le plus ?",
            answers: ["Python", "PHP", "C", "JavaScript"],
            correct: "Python",
            image: "../img/zah-remove.png"
        }
    ];


    let currentQuestionIndex = 0;
    let score = 0;
    let answering = false;
    let answerSelected = false;

    $('#restart').hide();

    function showQuestion(index) {
        const question = questions[index];
        $('#question').text(question.question);
        $('#answers').empty();
        $('#question-image').attr('src', `img/${question.image}`);

        question.answers.forEach(answer => {
            $('#answers').append(`<div class="answer">${answer}</div>`);
        });
    }

    function checkAnswer(selectedAnswer) {
        const correctAnswer = questions[currentQuestionIndex].correct;
        if (selectedAnswer.text() === correctAnswer) {
            selectedAnswer.addClass('correct');
            score++;
        } else {
            selectedAnswer.addClass('incorrect');
        }
    }

    $('#answers').on('click', '.answer', function() {
        if (answering) return;
        answering = true;
        const selectedAnswer = $(this);
        checkAnswer(selectedAnswer);
        answerSelected = true;
        $('.answer').off('click'); 

        $('#next').show();
    });

    $('#next').click(function() {
        if (!answerSelected) {
            alert('Veuillez choisir une réponse !');
            return;
        }
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
            $('#next').hide();
            answering = false; 
            answerSelected = false;
            
        } else {

            $('#question').hide();
            $('#answers').hide();
            $('#next').hide();
            $('#result').html(`Votre score est ${score}/${questions.length} !`);
            $('#restart').show();
            $('#result').show();
        }
    });

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];

            [array[i].image, array[j].image] = [array[j].image, array[i].image];
        }
        return array;
    }

    $('#quiz-container').on('click', '#restart',function() {
        currentQuestionIndex = 0;
        score = 0;
        $('#result').empty();
        $('#result').hide();
        $('#question').show();
        $('#answers').show();
        $('#restart').hide();
        answering = false;
        $('#result').html(`Votre score est 0/${questions.length} !`);

        questions.forEach(question => {
            question.answers = shuffle(question.answers);
        });

        showQuestion(currentQuestionIndex);
    });

    // Show the first question
    showQuestion(currentQuestionIndex);
});

