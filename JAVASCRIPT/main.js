
var criarReceitaHtml = '' 

async function initMain() {
    var receitas = await getReceita()
    // console.log(receitas)
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
    criarReceitaHtml = document.querySelector('.contentBlock').innerHTML
    document.querySelector('.contentBlock').innerHTML += receitaHtml
}

async function salvarReceita() {
    if (document.querySelector('#inputAutor').value == '') {
        document.querySelector('#inputAutor').classList.toggle('semvalor')
        setTimeout(function () {
            document.querySelector('#inputAutor').classList.toggle('semvalor')
        }, 300)
    } else if (document.querySelector('#inputTitulo').value == '') {
        document.querySelector('#inputTitulo').classList.toggle('semvalor')
        setTimeout(function () {
            document.querySelector('#inputTitulo').classList.toggle('semvalor')
        }, 300)
    } else if (document.querySelector('#inputDescricao').value == '') {
        document.querySelector('#inputDescricao').classList.toggle('semvalor')
        setTimeout(function () {
            document.querySelector('#inputDescricao').classList.toggle('semvalor')
        }, 300)
    } else if (document.querySelector('#inputIngredientes').value == '') {
        document.querySelector('#inputIngredientes').classList.toggle('semvalor')
        setTimeout(function () {
            document.querySelector('#inputIngredientes').classList.toggle('semvalor')
        }, 300)
    } else if (document.querySelector('#inputPreparo').value == '') {
        document.querySelector('#inputPreparo').classList.toggle('semvalor')
        setTimeout(function () {
            document.querySelector('#inputPreparo').classList.toggle('semvalor')
        }, 300)
    } else {
        var dataAtual = new Date()
        var dia = dataAtual.getDate()
        var mes = dataAtual.getMonth() + 1
        var ano = dataAtual.getFullYear()

        var autor = document.querySelector('#inputAutor').value
        var titulo = document.querySelector('#inputTitulo').value
        var descricao = document.querySelector('#inputDescricao').value
        var ingredientes = document.querySelector('#inputIngredientes').value
        var preparo = document.querySelector('#inputPreparo').value
        var info = {
            autor: autor,
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

async function listaReceitas(){
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
    document.querySelector('.tituloContentCriar').style.display = 'none'
    document.querySelector('.tituloContentLista').style.display = 'block'
    document.querySelector('.botaoEditar').style.display = 'block'
    document.querySelector('.botaoListar').style.display = 'none'

    document.querySelector('.editarReceitaBlock').style.display = 'none'
    document.querySelectorAll('.viewReceitaBlock').forEach(el => el.style.display = 'block')
}

function criarReceita() {
    document.querySelector('.tituloContentCriar').style.display = 'block'
    document.querySelector('.tituloContentLista').style.display = 'none'
    document.querySelector('.botaoEditar').style.display = 'none'
    document.querySelector('.botaoListar').style.display = 'block'

    document.querySelector('.editarReceitaBlock').style.display = 'block'
    document.querySelectorAll('.viewReceitaBlock').forEach(el => el.style.display = 'none')
}
