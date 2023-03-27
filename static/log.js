// Get the form element and add event listeners for submit
const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

// Handle the submit form event
function submitForm(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const username = formData.get('username');
  const password = formData.get('password');

  // Check if the form is for login or sign up
  if (e.target.id === 'login-form') {
    login(username, password);
  } else if (e.target.id === 'signup-form') {
    const confirmPassword = formData.get('confirmPassword');
    signUp(username, password, confirmPassword);
  }
}

// Handle the login function
function login(username, password) {
  // Make an API call to check if the user exists and the password is correct
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // If the login is successful, redirect to the home page
      window.location.href = '/';
    } else {
      // If the login is unsuccessful, show an error message
      const error = document.querySelector('.error');
      error.textContent = 'Invalid username or password.';
    }
  })
  .catch(error => console.error(error));
}

// Handle the sign up function
function signUp(username, password, confirmPassword) {
  // Make an API call to create a new user
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password, confirmPassword})
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // If the sign up is successful, redirect to the login page
      window.location.href = '/login';
    } else {
      // If the sign up is unsuccessful, show an error message
      const error = document.querySelector('.error');
      error.textContent = data.message;
    }
  })
  .catch(error => console.error(error));
}
