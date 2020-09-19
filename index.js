
const puppeteer = require('puppeteer')

async function robot(musics) {

    const JSONLinks = {}

    await runForAllMusics(musics)

    return JSONLinks

    async function runForAllMusics(musics) {
        for(const music in musics){
            const keyName = musics[music].replace(/\s/g, "").toLowerCase()
            JSONLinks[keyName] = await fetchMusicsOnYoutube(musics[music])
        }
    }

    async function fetchMusicsOnYoutube(music) {
        const browser = await puppeteer.launch({headless:true})
        const page = await browser.newPage()
        await page.goto(`https://www.youtube.com/results?search_query=${music} lyrics`)

        const videos = await page.evaluate(async() => {
            const elements = document.querySelectorAll(".ytd-thumbnail")
            
            const array = [...elements]

            const links = array.map(({href}) => ({
                href
            }))

            return links
        })

        await browser.close()

        const links = videos.filter((item) => {
            if(item.href){
                return true
            }

            return false
        })

        return links[0].href
    }

}

module.exports = robot