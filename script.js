// Mindful Minutes - simple timer and message
function startMeditation(minutes) {
  const display = document.getElementById('meditationDisplay');
  let seconds = minutes * 60;
  display.textContent = `Meditation started for ${minutes} minute(s). Relax...`;

  const interval = setInterval(() => {
    seconds--;
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    display.textContent = `Time left: ${min}:${sec < 10 ? '0' : ''}${sec}`;
    if (seconds <= 0) {
      clearInterval(interval);
      display.textContent = `Session complete! Hope you feel relaxed.`;
    }
  }, 1000);
}

// Symptom Journal (localStorage)
const symptomForm = document.getElementById('symptomForm');
const journalEntries = document.getElementById('journalEntries');

function loadJournal() {
  const entries = JSON.parse(localStorage.getItem('symptomEntries') || '[]');
  if (!entries.length) {
    journalEntries.innerHTML = '<p>No entries yet.</p>';
    return;
  }
  journalEntries.innerHTML = entries.map(e =>
    `<div><strong>${e.date}</strong>: ${e.symptoms}</div>`
  ).join('');
}

symptomForm.addEventListener('submit', e => {
  e.preventDefault();
  const date = symptomForm.elements['date'].value;
  const symptoms = symptomForm.elements['symptoms'].value.trim();
  if (!date || !symptoms) return;

  const entries = JSON.parse(localStorage.getItem('symptomEntries') || '[]');
  entries.push({ date, symptoms });
  localStorage.setItem('symptomEntries', JSON.stringify(entries));
  loadJournal();
  symptomForm.reset();
});

loadJournal();

// Healthy Habits Tracker with personalized feedback
const habitForm = document.getElementById('habitForm');
const habitResults = document.getElementById('habitResults');

function getHabitFeedback(water, sleep) {
  let waterMsg = '';
  let sleepMsg = '';

  if (water === 0) waterMsg = "Try to start drinking water regularly today.";
  else if (water < 4) waterMsg = "Good start! Keep sipping water throughout the day.";
  else if (water < 8) waterMsg = "Almost there! Just a little more water to hit your goal.";
  else waterMsg = "Excellent! You're well hydrated today! 💧";

  if (sleep === 0) sleepMsg = "You need to get some rest to feel your best.";
  else if (sleep <= 4) sleepMsg = "You need more rest to feel your best.";
  else if (sleep <= 6) sleepMsg = "Not bad, but aim for at least 7 hours tonight.";
  else if (sleep <= 8) sleepMsg = "Great! You're getting enough sleep.";
  else sleepMsg = "Well rested! Don't oversleep though.";

  return { waterMsg, sleepMsg };
}

habitForm.addEventListener('submit', e => {
  e.preventDefault();

  const waterInput = habitForm.elements['water'];
  const sleepInput = habitForm.elements['sleep'];

  const water = parseInt(waterInput.value) || 0;
  const sleep = parseFloat(sleepInput.value) || 0;

  const feedback = getHabitFeedback(water, sleep);

  habitResults.innerHTML = `
    <div>
      <h3>Today's Healthy Habits</h3>
      <p>Water Intake: ${water} glass${water !== 1 ? 'es' : ''}</p>
      <p><strong>Feedback:</strong> ${feedback.waterMsg}</p>
    </div>
    <div>
      <p>Sleep Hours: ${sleep}</p>
      <p><strong>Feedback:</strong> ${feedback.sleepMsg}</p>
    </div>
  `;

  habitForm.reset();
});

// First Aid Quiz - simple demo
function startQuiz() {
  const quizBox = document.getElementById('quizBox');
  quizBox.innerHTML = `
    <p><strong>Q:</strong> What is the first step when you see someone collapse?</p>
    <button onclick="alert('Correct! Check for safety first.')">Check the scene for safety</button>
    <button onclick="alert('Not quite. Call for help only after ensuring safety.')">Call emergency services</button>
    <button onclick="alert('Wrong. Start CPR only after checking responsiveness and calling help.')">Start CPR</button>
  `;
}
