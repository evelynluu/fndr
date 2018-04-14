$(document).ready(function () {

    addClickActionToUserInputForm($('#register-btn'), $('#register-email'), $('#register-pw'), '/register');
    addClickActionToUserInputForm($('#login-btn'), $('#login-email'), $('#login-pw'), '/login');

      var logout = $('#logout-link')

      logout.on('click', function(event){
        window.location.assign('/');
      })
  })

  function addClickActionToUserInputForm(formButton, email, password, route){
    formButton.on('click', function(event) {
      event.preventDefault()
  
      var emailText = email.val()
      var passwordText = password.val()
  
      if(emailText != "" && passwordText != ""){
        $.ajax({
          url: "/users",
          method: "POST",
          data: { email: emailText, password: passwordText }
        })
          .done(function (data) {
            console.log(data)
            window.location.assign(route);
          })
        }
    })
  }