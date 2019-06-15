// Orquestrador

const readline = require('readline-sync')
const robots = {
    text: require('./robots/text.js')
}

async function start() {
    // definição do objeto content (estrutura de dados)
    const content = {}

    content.searchTerm = askAndReturnSearchTerm()
    content.prefix = askAndReturnPrefix()

    await robots.text(content)

    // askAndReturnSearchTerm
    function askAndReturnSearchTerm() {
        return readline.question('Digite o termo de busca na Wikipedia: ')
    }

    // askAndReturnPrefix
    function askAndReturnPrefix() {
        const prefixes = ['Quem é', 'Quem foi', 'O que é', 'O que foi', 'A história de', 'A história da']
        const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Selecione uma opção: ')
        const selectedPrefixText = prefixes[selectedPrefixIndex]

        return selectedPrefixText
    }

    console.log(content)
}

start()