$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

function isValidEmail(email){
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

$(document).ready(function() {
  //signup
  $('form[name="signup"]').submit(function(event) {
      event.preventDefault();
      if($(this).find('input[name="email"]').val() == ""){
        alert('Insira um e-mail.');
      }
      else if(!isValidEmail($(this).find('input[name="email"]').val())){
        alert('Insira um e-mail válido.');
      }
      else if($(this).find('input[name="password"]').val() == ""){
        alert('Insira uma senha.');
      }
      else if($(this).find('input[name="password"]').val().length < 6){
        alert('A senha deve ter no mínimo 6 caracteres.');
      }
      else if($(this).find('input[name="confirm_password"]').val() == ""){
        alert('Confirme sua senha.');
      }
      else if($(this).find('input[name="password"]').val() != $(this).find('input[name="confirm_password"]').val()){
        alert(unescape('As senhas não conferem.'));
      }else{
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: "http://127.0.0.1/AdEventos/signup",
            dataType: "json",
            data: JSON.stringify( $(this).serializeObject() ),
            success: function(data, textStatus, jqXHR){
              console.log(data)
                if(data.error == "0"){
                  //sucesso
                  alert('Cadastro concluído com sucesso.');
                }else{
                  //erro
                  if(data.code == "23000"){
                    alert('Esse usuário já está cadastrado.');
                  }else{
                    alert('Ops! Ocorreu um erro. Tente mais tarde.');
                  }
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('Ops! Ocorreu um erro. Erro: ' + textStatus);
            }
        });
      }
	});

  //signin
  $('form[name="signin"]').submit(function(event) {
      event.preventDefault();
      // if($(this).find('input[name="email"]').val() == ""){
      //   alert('Insira um e-mail.');
      // }
      // else if(!isValidEmail($(this).find('input[name="email"]').val())){
      //   alert('Insira um e-mail válido.');
      // }
      // else if($(this).find('input[name="password"]').val() == ""){
      //   alert('Insira uma senha.');
      // }
      // else if($(this).find('input[name="password"]').val().length < 6){
      //   alert('A senha deve ter no mínimo 6 caracteres.');
      // }
      // else{
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: "http://127.0.0.1/AdEventos/signin",
            dataType: "json",
            data: JSON.stringify( $(this).serializeObject() ),
            success: function(data, textStatus, jqXHR){
              console.log(data)
                // if(data.error != undefined){
                //   //sucesso
                //   alert('Logado');
                // }else{
                //   //erro
                //   alert('Ops! Ocorreu um erro. Tente mais tarde.');
                // }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert('Ops! Ocorreu um erro. Erro: ' + textStatus);
            }
        });
      // }
  });
});