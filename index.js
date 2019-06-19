// Orquestrador

const readline = require('readline-sync')
const rssParser = require('rss-parser')
const robots = {
    text: require('./robots/text.js')
}

async function start() {
    // definição do objeto content (estrutura de dados)
    const content = {}

    console.log('Video Maker Bot')
    console.log(' by Andalik Industries')

    content.language = askAndReturnLanguage()
    content.searchTerm = await askAndReturnSearchTerm()
    content.prefix = askAndReturnPrefix()

    await robots.text(content)

    // askAndReturnLanguage
    function askAndReturnLanguage() {
        const languages = ['pt', 'en']
        const selectLanguageIndex = readline.keyInSelect(languages, 'Selecione o idioma da pesquisa: ')
        const selectLanguageText = languages[selectLanguageIndex]

        if(selectLanguageText === 'pt') {
            content.geoGoogleTrends = 'BR' 
        }
        else {
            content.geoGoogleTrends = 'US'
        }

        return selectLanguageText
    }

    // askAndReturnSearchTerm
    async function askAndReturnSearchTerm() {
        const searchTermTyped = readline.question('Digite o termo de busca ou G para listar Google Trends: ')

        return (searchTermTyped.toUpperCase() === 'G') ?  await askAndReturnGoogleTrends() : searchTermTyped
    }

    // askAndReturnGoogleTrends
    async function askAndReturnGoogleTrends() {
        console.log('Obtendo Google Trends. Aguarde...')

        const googleTrends = await getGoogleTrends()
        const selectedGoogleTrendsIndex = readline.keyInSelect(googleTrends, 'Selecione uma opção: ')

        return googleTrends[selectedGoogleTrendsIndex] 
    }

    // getGoogleTrends
    async function getGoogleTrends() {
        const GOOGLE_TRENDS_URL = 'https://trends.google.com/trends/trendingsearches/daily/rss?geo=' + content.geoGoogleTrends

        const parser = new rssParser()
        const googleTrends = await parser.parseURL(GOOGLE_TRENDS_URL)

        return googleTrends.items.map(({title}) => title) 
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