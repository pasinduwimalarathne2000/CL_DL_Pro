  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCPFV3hC8sldKafJEDV5_jTAgHkS5kqsko",
    authDomain: "capturelearn-8227d.firebaseapp.com",
    projectId: "capturelearn-8227d",
    storageBucket: "capturelearn-8227d.appspot.com",
    messagingSenderId: "46520387928",
    appId: "1:46520387928:web:616495f19ff3f9de8cfd2d"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const database = firebase.database()

  function register() {
    email  = document.getElementById('email').value
    username = document.getElementById('username').value
    number = document.getElementById('number').value
    password = document.getElementById('password').value
    cpassword = document.getElementById('cpassword').value
  
    if (validate_field(email) == false || validate_field(username) == false || validate_field(number) == false || validate_field(password) == false)
    alert('Fill all the fields!')
    return 
  }

  auth.createUserWithEmailandPassword(email,password)
  .then(function(){

    var user = auth.currentUser
    
    var databse_ref = database.ref()

    var user_data = {
      email : email,
      username : username,
      number : number,
      last_login : Date.now()
    }

    databse_ref.child('users/' + user.uid).set(user_data)
    
    
    alert('User Created!')

  })
  .catch(function(error){
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })



  function validate_field(field){
    if (field == null){
      return false
    }

    if (field.length <= 0){
      return false
    }else{
      return true
    }
  }

