
var criarReceitaHtml = ''
var user = JSON.parse(window.sessionStorage.getItem('user'))

async function initMain() {
    console.log(user)
    var receitas = await getReceita()
    // console.log(receitas)
    var receitaHtml = ''

    // setTimeout(function () {
    //     //console.log(document.querySelector('body').clientHeight)
    //     document.querySelector('.contentReceitas').style.height = `${document.querySelector('body').clientHeight / 5}px`
    // }, 300)

    console.log(receitas)
    if (receitas.length > 0) {
        for (i of receitas) {
            receitaHtml += `
        <div class="viewReceitaBlock">
            <div class="headerReceitas">
                <h2>Autor: ${i.autor}</h2>
                <h3>${i.data}</h3>
                <h2>${i.titulo}</h2>
                <h3>${i.descricao}</h3>    
            </div>
            <div class="bodyReceitas">
                <h4>Ingredientes: ${i.ingredientes}</h4>       
                <h4 style="margin-bottom: 7%;">Modo de preparo: ${i.preparo}</h4>
            </div>
        </div>`
        }
    }
    criarReceitaHtml = document.querySelector('.contentBlock').innerHTML
    document.querySelector('.contentBlock').innerHTML += receitaHtml


}

async function salvarReceita() {
    if (document.querySelector('.editarReceitaBlock #inputTitulo').value == '') {
        document.querySelector('.editarReceitaBlock #inputTitulo').classList.toggle('semvalor')
        setTimeout(function () {
            document.querySelector('.editarReceitaBlock #inputTitulo').classList.toggle('semvalor')
        }, 300)
    } else if (document.querySelector('.editarReceitaBlock #inputDescricao').value == '') {
        document.querySelector('.editarReceitaBlock #inputDescricao').classList.toggle('semvalor')
        setTimeout(function () {
            document.querySelector('.editarReceitaBlock #inputDescricao').classList.toggle('semvalor')
        }, 300)
    } else if (document.querySelector('.editarReceitaBlock #inputIngredientes').value == '') {
        document.querySelector('.editarReceitaBlock #inputIngredientes').classList.toggle('semvalor')
        setTimeout(function () {
            document.querySelector('.editarReceitaBlock #inputIngredientes').classList.toggle('semvalor')
        }, 300)
    } else if (document.querySelector('.editarReceitaBlock #inputPreparo').value == '') {
        document.querySelector('.editarReceitaBlock #inputPreparo').classList.toggle('semvalor')
        setTimeout(function () {
            document.querySelector('.editarReceitaBlock #inputPreparo').classList.toggle('semvalor')
        }, 300)
    } else {
        var dataAtual = new Date()
        var dia = dataAtual.getDate()
        var mes = dataAtual.getMonth() + 1
        var ano = dataAtual.getFullYear()

        var titulo = document.querySelector('.editarReceitaBlock #inputTitulo').value
        var descricao = document.querySelector('.editarReceitaBlock #inputDescricao').value
        var ingredientes = document.querySelector('.editarReceitaBlock #inputIngredientes').value
        var preparo = document.querySelector('.editarReceitaBlock #inputPreparo').value
        var info = {
            idusuario: user.idusuario,
            autor: user.usuario,
            titulo: titulo,
            descricao: descricao,
            data: dia + '/' + mes + '/' + ano,
            ingredientes: ingredientes,
            preparo: preparo
        }
        document.querySelector('#load').style.display = ''
        console.log(info)
        await postReceita(info)
        document.querySelector('#load').style.display = 'none'
    }
}

async function listaReceitas() {
    var receitas = await getReceita()
    var receitaHtml = ''
    for (i of receitas) {
        receitaHtml += `
        <div class="viewReceitaBlock">
            <div class="headerReceitas">
                <h2>Autor: ${i.autor}</h2>
                <h3>${i.data}</h3>
                <h2>${i.titulo}</h2>
                <h3>${i.descricao}</h3>    
            </div>
            <div class="bodyReceitas">
                <h4>Ingredientes: ${i.ingredientes}</h4>       
                <h4 style="margin-bottom: 7%;">Modo de preparo: ${i.preparo}</h4>
            </div>
        </div>`
    }
    document.querySelector('.contentBlock').innerHTML = criarReceitaHtml
    document.querySelector('.contentBlock').innerHTML += receitaHtml
}

function mostraLista() {
    document.querySelector('.tituloContentLista').style.display = 'flex'
    document.querySelector('.tituloContentPerfil').style.display = 'none'
    document.querySelector('.tituloContentCriar').style.display = 'none'
    document.querySelector('.botaoEditar').style.display = 'none'
    document.querySelector('.botaoPerfil').style.display = 'flex'
    document.querySelector('.botaoListar').style.display = 'none'
    document.querySelector('.botaoListar').style['left'] = '92%'
    document.querySelector('.botaoPerfil').style['left'] = '92%'
    document.querySelector('.botaoEditar').style['left'] = '92%'

    document.querySelector('.editarReceitaBlock').style.display = 'none'
    document.querySelector('.perfilBlock').style.display = 'none'
    document.querySelectorAll('.viewReceitaBlock').forEach(el => el.style.display = 'block')

    document.querySelector('.tituloContentMyReceitas').classList.remove('active')
    document.querySelector('.tituloContentInfo').classList.remove('active')
}

function criarReceita() {
    document.querySelector('.tituloContentCriar').style.display = 'flex'
    document.querySelector('.tituloContentLista').style.display = 'none'
    document.querySelector('.tituloContentPerfil').style.display = 'none'
    document.querySelector('.botaoPerfil').style.display = 'flex'
    document.querySelector('.botaoEditar').style.display = 'none'
    document.querySelector('.botaoListar').style.display = 'flex'
    document.querySelector('.botaoListar').style['left'] = '92%'
    document.querySelector('.botaoPerfil').style['left'] = '85%'
    document.querySelector('.botaoEditar').style['left'] = '92%'

    document.querySelector('.editarReceitaBlock').style.display = 'block'
    document.querySelector('.perfilBlock').style.display = 'none'
    document.querySelectorAll('.viewReceitaBlock').forEach(el => el.style.display = 'none')

    document.querySelector('.tituloContentMyReceitas').classList.remove('active')
    document.querySelector('.tituloContentInfo').classList.remove('active')
}

function perfil() {
    if (!document.querySelector('.tituloContentInfo').classList.contains('active')) {
        var userHtml = `
        <div class="headerReceitas">
            <div class="tituloContentPerfil" style="margin-bottom: 5%">Informações</div>
            <p>Usuario</p>
            <input class="inputReceitas" id="inputUsuario" value="${user.usuario}" type="text" placeholder="Autor da receita" required style="margin-bottom: 30px;"></input>
            <p>E-mail</p>
            <input class="inputReceitas" id="inputEmail" value="${user.email}" type="text" placeholder="Titulo" required></input>
        </div>
        <input class="inputSalvarPerfil" type="button" value="Salvar" onclick="salvarPerfil()">`

        document.querySelector('.infoBlock').innerHTML = userHtml
        document.querySelector('.minhasReceitasBlock').style.display = 'none'
        document.querySelector('.infoBlock').style.display = 'block'

        document.querySelector('.tituloContentMyReceitas').classList.remove('active')
        document.querySelector('.tituloContentInfo').classList.toggle('active')

        document.querySelector('.tituloContentCriar').style.display = 'none'
        document.querySelector('.tituloContentLista').style.display = 'none'
        //document.querySelector('.tituloContentPerfil').innerHTML = user.usuario
        document.querySelector('.tituloContentPerfil').style.display = 'flex'

        document.querySelector('.botaoEditar').style.display = 'flex'
        document.querySelector('.botaoListar').style.display = 'flex'
        document.querySelector('.botaoPerfil').style.display = 'none'
        document.querySelector('.botaoListar').style['left'] = '92%'
        document.querySelector('.botaoPerfil').style['left'] = '92%'
        document.querySelector('.botaoEditar').style['left'] = '85%'

        document.querySelector('.editarReceitaBlock').style.display = 'none'
        document.querySelector('.perfilBlock').style.display = 'block'
        document.querySelectorAll('.viewReceitaBlock').forEach(el => el.style.display = 'none')
    }
}


async function minhasReceitas() {
    if (!document.querySelector('.tituloContentMyReceitas').classList.contains('active')) {

        var receitas = await getReceita(user.idusuario)
        var receitaHtml = ''

        if (receitas.length > 0) {
            for (i of receitas) {
                console.log(i)
                receitaHtml += `
                <div class="viewReceitaBlock">
                    <div class="headerReceitas">
                        <h2>Autor: ${i.autor}</h2>
                        <h3>${i.data}</h3>
                        <h2>${i.titulo}</h2>
                        <h3>${i.descricao}</h3>    
                    </div>
                    <div class="bodyReceitas">
                        <h4>Ingredientes: ${i.ingredientes}</h4>       
                        <h4 style="margin-bottom: 7%;">Modo de preparo: ${i.preparo}</h4>
                    </div>
                    <input class="inputDeletar" type="button" id="${i.idreceita}" value="Deletar" onclick="deletarReceita(this)">
                </div>`
            }
        }


        document.querySelector('.minhasReceitasBlock').innerHTML = receitaHtml
        document.querySelector('.infoBlock').style.display = 'none'
        document.querySelector('.minhasReceitasBlock').style.display = 'block'

        document.querySelector('.tituloContentMyReceitas').classList.toggle('active')
        document.querySelector('.tituloContentInfo').classList.remove('active')

        document.querySelector('.tituloContentCriar').style.display = 'none'
        document.querySelector('.tituloContentLista').style.display = 'none'
        //document.querySelector('.tituloContentPerfil').innerHTML = user.usuario
        document.querySelector('.tituloContentPerfil').style.display = 'flex'

        document.querySelector('.botaoEditar').style.display = 'flex'
        document.querySelector('.botaoListar').style.display = 'flex'
        document.querySelector('.botaoPerfil').style.display = 'none'
        document.querySelector('.botaoListar').style['left'] = '92%'
        document.querySelector('.botaoPerfil').style['left'] = '92%'
        document.querySelector('.botaoEditar').style['left'] = '85%'

        document.querySelector('.editarReceitaBlock').style.display = 'none'
        document.querySelector('.perfilBlock').style.display = 'block'
        // document.querySelectorAll('.viewReceitaBlock').forEach(el => el.style.display = 'none')
    }
}



async function salvarPerfil() {
    if (document.querySelector('.perfilBlock #inputEmail').value == '') {
        document.querySelector('.perfilBlock #inputEmail').classList.toggle('semvalor')
        setTimeout(function () {
            document.querySelector('.perfilBlock #inputEmail').classList.toggle('semvalor')
        }, 300)
    } else if (document.querySelector('.perfilBlock #inputUsuario').value == '') {
        document.querySelector('.perfilBlock #inputUsuario').classList.toggle('semvalor')
        setTimeout(function () {
            document.querySelector('.perfilBlock #inputUsuario').classList.toggle('semvalor')
        }, 300)
    } else {
        console.log('cadstro')
        var usuario = document.querySelector('.perfilBlock #inputUsuario').value
        var email = document.querySelector('.perfilBlock #inputEmail').value
        var info = {
            usuario: usuario,
            email: email,
            idusuario: user.idusuario
        }
        document.querySelector('#load').style.display = ''
        var cadastro = await putLogin(info)
        if (cadastro.ok) {
            console.log(cadastro)
            perfil()
        }
        document.querySelector('#load').style.display = 'none'
    }
}


async function deletarReceita(e){
    document.querySelector('#load').style.display = ''
    await deleteReceita(e.id)
    perfil()
    document.querySelector('#load').style.display = 'none'
}


function sair(){
    window.sessionStorage.setItem('user', '')
    window.location.href = "index.html";
}