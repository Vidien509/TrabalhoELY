
async function getReceita() {
    obj = {
        method: 'GET'
    }
    var url = 'http://localhost:8080/servertrabely/receitas'
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
