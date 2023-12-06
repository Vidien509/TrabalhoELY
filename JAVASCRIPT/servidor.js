
async function getReceita(id) {
    obj = {
        method: 'GET'
    }
    var url = ''
    if (id != undefined) {
        url = 'http://localhost:8080/servertrabely/receitas?idusuario='+id
    } else {
        url = 'http://localhost:8080/servertrabely/receitas'
    }
    var dados = await new Promise(function (resolve, reject) {
        fetch(url, obj).then(async function (response) {
            if (response.status >= 200 && response.status < 300) {
                const retorno = await response.json();
                resolve(retorno);
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        })
    }).catch(error => {
        console.error("Error:", error);
    })
    return dados
}

async function postReceita(info) {
    obj = {
        method: 'POST',
        body: JSON.stringify(info),
    }
    var url = 'http://localhost:8080/servertrabely/receitas'
    await new Promise(function (resolve, reject) {
        fetch(url, obj).then(async function (response) {
            if (response.status >= 200 && response.status < 300) {
                const retorno = response;
                listaReceitas()
                mostraLista()
                resolve(retorno);
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        })
    }).catch(error => {
        console.error("Error:", error);
    })

}


async function postLogin(info) {
    obj = {
        method: 'POST',
        body: JSON.stringify(info),
    }
    var url = 'http://localhost:8080/servertrabely/login'
    var dados = await new Promise(function (resolve, reject) {
        fetch(url, obj).then(async function (response) {
            if (response.status >= 200 && response.status < 300) {
                const retorno = response;
                // listaReceitas()
                // mostraLista()
                resolve(retorno);
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        })
    }).catch(error => {
        console.error("Error:", error);
    })
    document.querySelector('#load').style.display = 'none'
    return dados
}

async function putLogin(info) {
    obj = {
        method: 'PUT',
        body: JSON.stringify(info),
    }
    var url = 'http://localhost:8080/servertrabely/login'
    var dados = await new Promise(function (resolve, reject) {
        fetch(url, obj).then(async function (response) {
            if (response.status >= 200 && response.status < 300) {
                const retorno = response;
                // listaReceitas()
                // mostraLista()
                resolve(retorno);
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        })
    }).catch(error => {
        console.error("Error:", error);
    })
    return dados
}


async function deleteReceita(id) {
    obj = {
        method: 'DELETE',
    }
    var url = 'http://localhost:8080/servertrabely/receitas/'+id
    console.log(url)
    var dados = await new Promise(function (resolve, reject) {
        fetch(url, obj).then(async function (response) {
            if (response.status >= 200 && response.status < 300) {
                const retorno = response;
                // listaReceitas()
                // mostraLista()
                resolve(retorno);
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        })
    }).catch(error => {
        console.error("Error:", error);
    })
    return dados
}


async function getLogin(info) {
    obj = {
        method: 'GET'
    }
    var url = 'http://localhost:8080/servertrabely/login?usuario=' + info.usuario + '&senha=' + info.senha
    var dados = await new Promise(function (resolve, reject) {
        fetch(url, obj).then(async function (response) {
            if (response.status >= 200 && response.status < 300) {
                const retorno = await response.json();
                resolve(retorno);
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        })
    }).catch(error => {
        console.error("Error:", error);
    })

    document.querySelector('#load').style.display = 'none'
    return dados
}