
const listClientsIds = [{id: 1,
taxNumber: '86620855',
name: 'HECTOR ACUÑA BOLAÑOS'}, {
    id: 2,
    taxNumber: '7317855K',
    name: 'JESUS RODRIGUEZ ALVAREZ'
}, {
    id: 3,
    taxNumber: '73826497',
    name: 'ANDRES NADAL MOLINA'
}, {
    id: 4,
    taxNumber: '88587715',
    name: 'SALVADOR ARNEDO MANRIQUEZ'
}, {
    id: 5,
    taxNumber: '94020190',
    name: 'VICTOR MANUEL ROJAS LUCAS'
}, {
    id: 6,
    taxNumber: '99804238',
    name: 'MOHAMED FERRE SAMPER'
}];

let accounts = [{
    clientId: 6,
    bankId: 1,
    balance: 15000
},
{
    clientId: 1,
    bankId: 3,
    balance: 18000
},
{
    clientId: 5,
    bankId: 3,
    balance: 135000
},
{
    clientId: 2,
    bankId: 2,
    balance: 5600
},
{
    clientId: 3,
    bankId: 1,
    balance: 23000
},
{
    clientId: 5,
    bankId: 2,
    balance: 15000
},
{
    clientId: 3,
    bankId: 3,
    balance: 45900
},
{
    clientId: 2,
    bankId: 3,
    balance: 19000
},
{
    clientId: 4,
    bankId: 3,
    balance: 51000
},
{
    clientId: 5,
    bankId: 1,
    balance: 89000
},
{
    clientId: 1,
    bankId: 2,
    balance: 1600
},
{
    clientId: 5,
    bankId: 3,
    balance: 37500
},
{
    clientId: 6,
    bankId: 1,
    balance: 19200
},
{
    clientId: 2,
    bankId: 3,
    balance: 10000
},
{
    clientId: 3,
    bankId: 2,
    balance: 5400
},
{
    clientId: 3,
    bankId: 1,
    balance: 9000
},
{
    clientId: 4,
    bankId: 3,
    balance: 13500
},
{
    clientId: 2,
    bankId: 1,
    balance: 38200
},
{
    clientId: 5,
    bankId: 2,
    balance: 17000
},
{
    clientId: 1,
    bankId: 3,
    balance: 1000
},
{
    clientId: 5,
    bankId: 2,
    balance: 600
},
{
    clientId: 6,
    bankId: 1,
    balance: 16200
},
{
    clientId: 2,
    bankId: 2,
    balance: 10000
}
]

const banks = [
    { id: 1, name: 'SANTANDER' },
    { id: 2, name: 'CHILE' },
    { id: 3, name: 'ESTADO' }
];


function juntarClientesCuentasBancos() {
    var banksNewName = banks.map(bank => {
        return { bankId: bank.id, nameBank: bank.name };
    });
    var clientsNewName = clients.map(client => {
        return { clientId: client.id, taxNumber: client.taxNumber, name: client.name };
    });

    const mergeByClientId = (a1, a2) =>
        a1.map(itm =>
            ({...a2.find((item) =>
                    (item.clientId === itm.clientId) && item),
                ...itm
            }));
    const mergeByBankId = (a1, a2) =>
        a1.map(itm =>
            ({...a2.find((item) =>
                    (item.bankId === itm.bankId) && item),
                ...itm
            }));

    let mergeClientsAccounts = mergeByClientId(accounts, clientsNewName);
    let mergeClientsAccountsBanks = mergeByBankId(mergeClientsAccounts, banksNewName);

    return mergeClientsAccountsBanks;
}

/* 0 Arreglo con los ids de clientes */

function listClientsIds() {
    return clients.map((client) => client.id);
};


/*1 Arreglo con los ids de clientes ordenados por rut */

function listClientsIdsSortByTaxNumber(ascendente = true) {
    let clientsAux_ = clients.slice(0, clients.length);
    let clientsOrderByRut = clientsAux_.sort(function(a, b) {
        let aRut = a.taxNumber.slice(0, a.taxNumber.length - 1);
        let bRut = b.taxNumber.slice(0, b.taxNumber.length - 1);
        if (ascendente) {
            return aRut - bRut;
        } else {
            return bRut - aRut;
        }
    });
    return clientsOrderByRut.map((clientsOrderByRut) => clientsOrderByRut.id);
};


/*2 Arreglo con los nombres de cliente ordenados de mayor a menor por la suma TOTAL de los saldos de cada cliente en los bancos que participa. */

function sortClientesTotalBalances(cuentas = accounts, clientes = clients) {
    let balanceTotalCliente = cuentas.reduce((contadorTotales, cadaElemento) => {
        contadorTotales[cadaElemento.clientId] = (contadorTotales[cadaElemento.clientId] || 0) + cadaElemento.balance;
        return contadorTotales;
    }, {});

    let balanceTotalClienteOrdenados = Object.keys(balanceTotalCliente).sort(
        function(a, b) {
            return balanceTotalCliente[b] - balanceTotalCliente[a]
        });
    // Obtener nombres por id
    for (let x in balanceTotalClienteOrdenados) {
        for (let y in clientes) {
            if (clientes[y].id == balanceTotalClienteOrdenados[x]) {
                balanceTotalClienteOrdenados[x] = clientes[y].name;
            }
        }
    }
    return balanceTotalClienteOrdenados;
}

/* 3 Objeto en que las claves sean los nombres de los bancos y los valores un arreglo con los ruts de sus clientes ordenados alfabeticamente por nombre. */



/* 4 Arreglo ordenado decrecientemente con los saldos de clientes que tengan más de 25.000 en el Banco SANTANDER */
function richClientsBalances() {
    return unionClientsAccountsBanks.filter(client => client.nameBank === 'SANTANDER' && client.balance > 25000)
        .map((client) => client.balance).sort((a, b) => b - a);
}

/* 5 Arreglo con ids de bancos ordenados crecientemente por la cantidad TOTAL de dinero que administran. */
function banksRankingByTotalBalance() {
    let bankEstruct = accounts.reduce((contadorTotal, cadaElemento) => {
        contadorTotal[cadaElemento.bankId] = (contadorTotal[cadaElemento.bankId] || 0) + cadaElemento.balance;
        return contadorTotal;
    }, {});
    return Object.keys(bankEstruct).sort(function(a, b) { return bankEstruct[a] - bankEstruct[b] })
}

/* 6 Objeto en que las claves sean los nombres de los bancos y los valores el número de clientes que solo tengan cuentas en ese banco. */




/* 7 Objeto en que las claves sean los nombres de los bancos y los valores el id de su cliente con menos dinero. */
function banksPoorClients() {
    let banco = {};
    for (let indexBank in banks) {
        let totalBalanceByClient = (unionClientsAccountsBanks.filter(a => a.nameBank === banks[indexBank].name)
            .reduce((contadorTotal, cadaElemento) => {
                contadorTotal[cadaElemento.clientId] = (contadorTotal[cadaElemento.clientId] || 0) + cadaElemento.balance;
                return contadorTotal
            }, {}));
        // Se recorren los clientes y se deja el menor con su respectivo banco
        for (let index in totalBalanceByClient) {
            if (totalBalanceByClient[index] === Math.min(...Object.values(totalBalanceByClient))) {
                banco[banks[indexBank].name] = index;
            }
        }
    }
    return banco;
}


/* 8 Agregar nuevo cliente con datos ficticios a "clientes" y agregar una cuenta en el BANCO ESTADO con un saldo de 9000 para este nuevo empleado. 
 Luego devolver el lugar que ocupa este cliente en el ranking de la pregunta 2.
 No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución */
function newClientRanking() {
    const clientes = clientes.slice(0, clientes.length);
    const cuentas = accounts.slice(0, accounts.length);

    let saldoEmpleadoNuevo = 9000;

    let clienteNuevo = {
        id: Math.max(...clientes.map(a => a.id)) + 1,
        taxNumber: '128358897',
        name: 'ALEJANDRA RODRIGUEZ RODRIGUEZ'
    }
    let cuentaNueva = {
        clientId: clienteNuevo.id,
        bankId: 3,
        balance: saldoEmpleadoNuevo
    }
    clientes.push(clienteNuevo);
    cuentas.push(cuentaNueva);

    posicion = sortClientsTotalBalances(cuentas, clientes).findIndex(a => a === clienteNuevo.name) + 1;
    return (`El lugar que ocupa ${clienteNuevo.name} en el ranking es ${posicion}`)
}