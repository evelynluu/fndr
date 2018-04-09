$(document).ready(function () {

    var emailRegister = $('#register-email')
    var pwRegister = $('#register-pw')
    var register = $('#register');
  
    register.on('click', function(event) {
      event.preventDefault()
  
      var emailText = emailRegister.val()
      var passwordText = pwRegister.val()
  
      $.ajax({
        url: "/users",
        method: "POST",
        data: { email: emailText, password: passwordText }
      })
        .done(function (data) {
          console.log(data)
        })
    })

    var emailLogin = $('#login-email')
    var pwLogin = $('#login-pw')
    var login = $('#login')

    login.on('click', function(event) {
        event.preventDefault()
    
        var emailText = emailLogin.val()
        var passwordText = pwLogin.val()
    
        $.ajax({
          url: "/users",
          method: "POST",
          data: { email: emailText, password: passwordText }
        })
          .done(function (data) {
            console.log(data)
          })
      })
  })