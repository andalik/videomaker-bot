// Orquestrador

const readline = require('readline-sync')
const robots = {
    text: require('./robots/text.js')
}

async function start() {
    // definição do objeto content (estrutura de dados)
    const content = {}

    console.log('Video Maker Bot')
    console.log(' by Andalik Industries')

    content.language = askAndReturnLanguage()
    content.searchTerm = askAndReturnSearchTerm()
    content.prefix = askAndReturnPrefix()

    await robots.text(content)

    // askAndReturnLanguage
    function askAndReturnLanguage() {
        const languages = ['pt', 'en']
        const selectLanguageIndex = readline.keyInSelect(languages, 'Selecione o idioma da pesquisa: ')
        const selectLanguageText = languages[selectLanguageIndex]

        return selectLanguageText
    }

    // askAndReturnSearchTerm
    function askAndReturnSearchTerm() {
        return readline.question('Digite o termo de busca na Wikipedia: ')
    }

    // askAndReturnPrefix
    function askAndReturnPrefix() {
        const prefixes = ['Quem é', 'Quem foi', 'O que é', 'O que foi', 'A história de', 'A história da', 'A história do']
        const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Selecione uma opção: ')
        const selectedPrefixText = prefixes[selectedPrefixIndex]

        return selectedPrefixText
    }

    console.log(content)
}

start()