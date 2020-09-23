'use strict'

const puppeteer = require("puppeteer")

const fetch = require("node-fetch")

const btoa = require("btoa")

const spotifyWebApi = require("spotify-web-api-node")

async function robot(spotifyURL) {

    const withouInitialUrl = spotifyURL.replace("https://open.spotify.com/playlist/", "")

    const withoutStringDeforeInterrogation = await removeJunks(withouInitialUrl)

    const musics = await fetchSpotify(withoutStringDeforeInterrogation)

    const allMusics = await returnAllMusics(musics)

    return allMusics


    //const musics = await fetchSpotify(withoutStringDeforeInterrogation)

    //const allMusics = await returnAllMusics(musics)

    //return allMusics

    async function removeJunks(withouInitialUrl) {
        if(withouInitialUrl.includes("?")){
            return withouInitialUrl.substring(withouInitialUrl.indexOf("?"), -withouInitialUrl.length)
        }else{
            return withouInitialUrl
        }
        //
    }

    async function returnAllMusics(musicsOBJ) {
        return musicsOBJ.map(item => item.track.name + " " + item.track.artists[0].name)
    }

    async function fetchSpotify(URL) {
        //const browser = await puppeteer.launch({headless:false})
        //const page = await browser.newPage()

        //await page.goto(URL)
        const spotify = new spotifyWebApi({
            clientId: '2037cd7ed35447af9ae144c9e2b3e146',
            clientSecret: '1fc9756da1e94f7f893dbd6822c6c369'
        })

        const GetApiToken = async() => {
            const result = await fetch("https://accounts.spotify.com/api/token",  {
                method:"POST",
                headers: {
                    "Content-Type" : "application/x-www-form-urlencoded",
                    "Authorization" : "Basic " + btoa("2037cd7ed35447af9ae144c9e2b3e146" + ":" + "1fc9756da1e94f7f893dbd6822c6c369")
                },
                body:"grant_type=client_credentials"
            })
            const data = await result.json()
            return data.access_token
        }

        const token = await GetApiToken()

        spotify.setAccessToken(token)

        const musics = await spotify.getPlaylist(URL)
        .then(function(data) {
          return data.body.tracks.items
        }, function(err) {
          console.log('Something went wrong!', err);
        })

        return musics
    }

}

module.exports = robot