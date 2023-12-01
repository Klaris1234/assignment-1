function toggleAnswer(answerId, buttonId) {
    var answer = document.getElementById(answerId);
    var button = document.getElementById(buttonId);
  
    if (answer.style.display === 'none' || answer.style.display === '') {
      answer.style.display = 'block';
      button.innerHTML = '-';
    } else {
      answer.style.display = 'none';
      button.innerHTML = '+';
    }
  }
  