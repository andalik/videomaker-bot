const readline = require('readline-sync')
const state = require('./state.js')

function robot() {
    const content = {
        maximumSentences: 10
    }

    content.language = askAndReturnLanguage()
    content.searchTerm = askAndReturnSearchTerm()
    content.prefix = askAndReturnPrefix()
    state.save(content)

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
}

module.exports = robot