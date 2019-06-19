// robo de texto
// captura conteúdo da Wikipedia, limpa e quebra em sentenças
const algorithmia = require('algorithmia')
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')
const sentenceBoundaryDetection = require('sbd')

const algorithmiaApiKey = require('../credentials/algorithmia.json').apikey
const watsonApiKey = require('../credentials/watson-nlu.json').apikey

const nlu = new NaturalLanguageUnderstandingV1({
    iam_apikey: watsonApiKey,
    version: '2018-11-16',
    url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
});

async function robot(content) {
    await fetchContentFromWikipedia(content)
    sanitizeContent(content)
    breakContentIntoSentences(content)
    limitMaximumSentences(content)
    await fetchKeywordsOfAllSentences(content)

    async function fetchContentFromWikipedia(content) {
        const wikipediaParserInput = {
            "articleName": content.searchTerm,
            "lang": content.language
        }

        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
        const wikipediaResponse = await wikipediaAlgorithm.pipe(wikipediaParserInput)
        const wikipediaContent = wikipediaResponse.get()

        content.sourceContentOriginal = wikipediaContent.content
    }

    function sanitizeContent(content) {
        const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
        const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown)
        
        content.sourceContentSanitized = withoutDatesInParentheses

        // remover linhas em branco
        function removeBlankLinesAndMarkdown(text) {
            const allLines = text.split('\n')
            
            const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
                if(line.trim().length === 0 || line.trim().startsWith('=')) {
                    return false
                }

                return true
            })

            return withoutBlankLinesAndMarkdown.join(' ')
        }

        // remover datas em parênteses
        function removeDatesInParentheses(text) {
            return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
        }
    }

    // quebrar o conteúdo em sentenças
    function breakContentIntoSentences(content) {
        content.sentences = []

        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
        sentences.forEach((sentence) => {
            content.sentences.push({
                text: sentence,
                keywords: [],
                images: []
            })
        })
    }

    function limitMaximumSentences(content) {
        content.sentences = content.sentences.slice(0, content.maximumSentences)
    }

    async function fetchKeywordsOfAllSentences(content) {
        for (const sentence of content.sentences) {
            sentence.keywords = await fetchWatsonAndReturnKeywords(sentence.text)
        }
    }

    async function fetchWatsonAndReturnKeywords(sentence) {
        return new Promise((resolve, reject) => {
            nlu.analyze({
                text: sentence,
                features: {
                    keywords: {}
                }
            }, (error, response) => {
                if (error) {
                    throw error
                }
    
                const keywords = response.keywords.map((keyword) => {
                    return keyword.text
                })
    
                resolve(keywords)
            })
        })
    }

}

module.exports = robot