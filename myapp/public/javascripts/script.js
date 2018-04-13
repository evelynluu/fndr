$(document).ready(function () {

    var emailRegister = $('#register-email')
    var pwRegister = $('#register-pw')
    var register = $('#register')
  
    register.on('click', function(event) {
      event.preventDefault()
  
      var emailText = emailRegister.val()
      var passwordText = pwRegister.val()
      
      if(emailText != "" && passwordText != ""){
        $.ajax({
          url: "/users",
          method: "POST",
          data: { email: emailText, password: passwordText }
        })
          .done(function (data) {
            console.log(data)
            window.location.assign('/register');
          })
        }
    })

    var emailLogin = $('#login-email')
    var pwLogin = $('#login-pw')
    var login = $('#login')

    login.on('click', function(event) {
        event.preventDefault()
    
        var emailText = emailLogin.val()
        var passwordText = pwLogin.val()
    
        if(emailText != "" && passwordText != ""){
          $.ajax({
            url: "/users",
            method: "POST",
            data: { email: emailText, password: passwordText }
          })
            .done(function (data) {
              console.log(data)
              window.location.assign('/login');
            })
          }
      })

      var logout = $('#logout-link')

      logout.on('click', function(event){
        window.location.assign('/');
      })
  })