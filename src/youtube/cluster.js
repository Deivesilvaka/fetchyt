'use strict'

const { Cluster } = require("puppeteer-cluster")

async function robot(musics, type = "") {

    const cluster = await Cluster.launch({
        concurrency:Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency:10,
        puppeteerOptions: { args: ['--no-sandbox'] }
    })

    await cluster.task(fetchMusicsOnYoutube)

    const JSONLinks = {}

    await runForAllMusics(musics)

    return JSONLinks

    async function runForAllMusics(musics) {
        for(const music in musics){
            const keyName = musics[music].replace(/\s/g, "").toLowerCase()
            //JSONLinks[keyName] = await fetchMusicsOnYoutube(musics[music])
            //JSONLinks[keyName] = await cluster.queue({music:musics[music]})
            await cluster.queue({music:musics[music], keyname: keyName })
        }
        await cluster.idle()
        await cluster.close()
    }

    async function fetchMusicsOnYoutube({page, data: {music, keyname}}) {
    
        await page.goto(`https://www.youtube.com/results?search_query=${music} ${type}`)

        const videos = await page.evaluate(async() => {

            const videoTitle = document.querySelectorAll("yt-formatted-string.ytd-video-renderer")
            const elements = document.querySelectorAll(".ytd-thumbnail")
            const thumbnails = document.querySelectorAll(".yt-img-shadow")

            //document.querySelectorAll(".ytd-video-renderer")

            //yt-formatted-string.ytd-video-renderer
            
            const titlesArray = [...videoTitle]
            const array = [...elements]
            const arrayThumb = [...thumbnails]


            const title = titlesArray.map(({innerText}) => ({
                innerText
            }))

            const links = array.map(({href}) => ({
                href
            }))

            const thumbLink = arrayThumb.map(({src}) => ({
                src
            }))

            return {
                links,
                thumbLink,
                title
            }
        })
        

        const links = videos.links.filter((item) => {
            if(item.href){
                return true
            }

            return false
        })

        const thumbs = videos.thumbLink.filter((item) => {
            if(item.src){
                return true
            }

            return false
        })

        const allTitles = videos.title.filter((item) => {
            if(item.innerText){
                return true
            }

            return false
        })

        //console.log({
        //    href: links[0].href,
        //    thumbnail: thumbs[0].src,
        //    title:allTitles[0].innerText
        //})

        JSONLinks[keyname] = {
            href: links[0].href,
            thumbnail: thumbs[0].src,
            title:allTitles[0].innerText
        }

        return

    }

}

module.exports = robot