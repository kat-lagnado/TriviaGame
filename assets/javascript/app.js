$(document).ready(function () {


  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click', '.option', trivia.guessChecker);

})

var trivia = {

  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId: '',

  questions: {
    q1: 'Who formulated the Periodic Law and create periodic table of elements ?',
    q2: 'Who from list below is NOT a scientist?',
    q3: 'How many ounces in a gallon?',
    q4: 'How many years Nelson Mandela spent in prison?',
    q5: "What is the speed of sound (mph)?",
  },
  options: {
    q1: ['Amedeo Avogadro', 'Dimitri Mendeleev', 'Robert Boyle', 'John Dalton'],
    q2: ['Albert Einstein', 'Nikola Tesla', 'Leo Tolstoy', 'Thomas Edison'],
    q3: ['67', '128', '5', '100'],
    q4: ['1', '42', '27', '12'],
    q5: ['767.269', '314', '200', '210.018'],
  },
  answers: {
    q1: 'Dimitri Mendeleev',
    q2: 'Leo Tolstoy',
    q3: '128',
    q4: '27',
    q5: '767.269'
  },

  startGame: function () {

    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);


    $('#game').show();
    $('#results').html('');
    $('#timer').text(trivia.timer);
    $('#start').hide();
    $('#remaining-time').show();


    trivia.nextQuestion();

  },

  nextQuestion: function () {
    trivia.timer = 10;
    $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);


    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }


    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);

    var questionOptions = Object.values(trivia.options)[trivia.currentSet];


    $.each(questionOptions, function (index, key) {
      $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
    })

  },

  timerRunning: function () {

    if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
      $('#timer').text(trivia.timer);
      trivia.timer--;
      if (trivia.timer === 2) {
        $('#timer').addClass('last-seconds');
      }
    }

    else if (trivia.timer === -1) {
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h2>Out of time! Correct answer' + Object.values(trivia.answers)[trivia.currentSet] + '</h2>');
    }

    else if (trivia.currentSet === Object.keys(trivia.questions).length) {


      $('#results')
        .html('<p>Correct: ' + trivia.correct + '</p>' +
          '<p>Incorrect: ' + trivia.incorrect + '</p>' +
          '<p>Unaswered: ' + trivia.unanswered + '</p>');


      $('#game').hide();
      $('#start').show();
    }

  },

  guessChecker: function () {

    var resultId;


    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    if ($(this).text() === currentAnswer) {
      $(this).addClass('btn-success').removeClass('btn-info');

      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }

    else {

      $(this).addClass('btn-danger').removeClass('btn-info');

      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>The answer is incorrect! ' + currentAnswer + '</h3>');
    }

  },

  guessResult: function () {


    trivia.currentSet++;
    $('.option').remove();
    $('#results h3').remove();
    trivia.nextQuestion();

  }

}