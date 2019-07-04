// Orquestrador

const robots = {
    input: require('./robots/input.js'),
    text: require('./robots/text.js'),
    state: require('./robots/state.js')
}

async function start() {
    console.log('Video Maker Bot')
    console.log(' by Andalik Industries')

    robots.input()
    await robots.text()

    const content = robots.state.load()
    console.dir(content, { depth: null })
}

start() 