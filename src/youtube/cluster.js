'use strict'
const yts = require( 'yt-search' )

async function robot(musics, type = "") {

    const JSONLinks = {}

    await runForAllMusics(musics)

    return JSONLinks

    async function runForAllMusics(musics) {
        for(const music in musics){
            const keyName = musics[music].replace(/\s/g, "").toLowerCase()
            JSONLinks[keyName] = await searchVideo(musics[music], type)
        }
    }

    async function searchVideo(search, type) {
        const r = await yts(`${search} ${type}`)

        const videos = r.videos.slice( 0, 1 )

        const obj = {
            href: videos[0].url,
            thumbnail: videos[0].image,
            title: videos[0].title
        }

        return obj
    }

}

module.exports = robot