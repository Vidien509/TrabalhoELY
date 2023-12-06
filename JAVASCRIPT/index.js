function initIndex(){

}

async function fazerLogin(e){
    if(e.id == 'login'){
        if (document.querySelector('.loginBlock #inputUsuario').value == '') {
            document.querySelector('.loginBlock #inputUsuario').classList.toggle('semvalor')
            setTimeout(function () {
                document.querySelector('.loginBlock #inputUsuario').classList.toggle('semvalor')
            }, 300)
        } else if (document.querySelector('.loginBlock #inputSenha').value == '') {
            document.querySelector('.loginBlock #inputSenha').classList.toggle('semvalor')
            setTimeout(function () {
                document.querySelector('.loginBlock #inputSenha').classList.toggle('semvalor')
            }, 300)
        }else{
            var usuario = document.querySelector('.loginBlock #inputUsuario').value
            var senha = document.querySelector('.loginBlock #inputSenha').value
            var info = {
                usuario: usuario,
                senha: senha,
            }
            document.querySelector('#load').style.display = ''
            //console.log(info)
            var login = await getLogin(info)
            if(Object.keys(login).length < 1){
                window.alert('Login ou senha inválido!')
            }else{
                window.sessionStorage.setItem('user', JSON.stringify(login))
                window.location.href = "main.html";
            }

            document.querySelector('#load').style.display = 'none'
        }
    }else if(e.id == 'cadastro'){
        console.log(e.id)
        if (document.querySelector('.cadastroBlock #inputEmail').value == '') {
            document.querySelector('.cadastroBlock #inputEmail').classList.toggle('semvalor')
            setTimeout(function () {
                document.querySelector('.cadastroBlock #inputEmail').classList.toggle('semvalor')
            }, 300)
        } else if (document.querySelector('.cadastroBlock #inputUsuario').value == '') {
            document.querySelector('.cadastroBlock #inputUsuario').classList.toggle('semvalor')
            setTimeout(function () {
                document.querySelector('.cadastroBlock #inputUsuario').classList.toggle('semvalor')
            }, 300)
        } else if (document.querySelector('.cadastroBlock #inputSenha').value == '') {
            document.querySelector('.cadastroBlock #inputSenha').classList.toggle('semvalor')
            setTimeout(function () {
                document.querySelector('.cadastroBlock #inputSenha').classList.toggle('semvalor')
            }, 300)
        } else{
            console.log('cadstro')
            var usuario = document.querySelector('.cadastroBlock #inputUsuario').value
            var email = document.querySelector('.cadastroBlock #inputEmail').value
            var senha = document.querySelector('.cadastroBlock #inputSenha').value
            var info = {
                usuario: usuario,
                senha: senha,
                email: email
            }
            document.querySelector('#load').style.display = ''
            var cadastro = await postLogin(info)
            if(cadastro.ok){
                console.log(cadastro)
                entrar()
            }
            document.querySelector('#load').style.display = 'none'
        }
    }
}

function cadastro(){
    document.querySelector('.loginBlock').style.display = 'none'
    document.querySelector('.cadastroBlock').style.display = 'flex'
}

function entrar(){
    document.querySelector('.loginBlock').style.display = 'flex'
    document.querySelector('.cadastroBlock').style.display = 'none'
}
