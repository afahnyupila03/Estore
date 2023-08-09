

const dataProd = [
    {
        name: 'Lum',
        due: '12/05/1994',
        amount: '27000',
        number: 42000
    },
    {
        name: 'Afah',
        due: '12/05/2000',
        amount: '25000',
        number: 22000
    },
    {
        name: 'Ajie',
        due: '12/05/2000',
        amount: '23000',
        number: 2010
    },
    {
        name: 'Abin',
        due: '12/05/2001',
        amount: '6000',
        number: 2400
    },
]

export function getProd() {
    return dataProd
}

export function getProdNum (number) {
    return dataProd.find(
        product => product.number === number
    )
}