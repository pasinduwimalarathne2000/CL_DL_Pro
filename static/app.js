const form = document.querySelector('#form');
const answer = document.querySelector('#answer');
const filename = document.querySelector('#filename');
const saveButton = document.querySelector('#save-button');

form.addEventListener('submit', event => {
  event.preventDefault();
  const text = document.querySelector('#text').value;
  const question = document.querySelector('#question').value;
  const url = '/answer';
  const data = new FormData();
  data.append('text', text);
  data.append('question', question);
  fetch(url, {
    method: 'POST',
    body: data
  })
  .then(response => response.json())
  .then(data => {
    answer.innerHTML = data.answer;
    saveButton.disabled = false;
  });
});

saveButton.addEventListener('click', () => {
  const content = `Question: ${document.querySelector('#question').value}\nAnswer: ${answer.innerHTML}`;
  const blob = new Blob([content], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = `${filename.value}.txt`;
  a.href = url;
  a.click();
  URL.revokeObjectURL(url);
});                