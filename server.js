const Instagram = require("instagram-web-api");

const FB = require("fb")

FB.setAccessToken(process.env.KEY)

const getLatestPost = async () => {
    const { data: [{ message, full_picture }] } = await FB.api('RZVIROVNIA/feed',
        {
            limit: 1,
            fields: ['message', 'full_picture']
        })
    return { message, full_picture }
}

const postToInstagram = async () => {

    const client = new Instagram({
        username: process.env.LOGIN,
        password: process.env.PASS
    })

    const { message, full_picture } = await getLatestPost()

    await client.login()

    if (!full_picture) {
        console.error('no picture to post')
        return
    }

    const { media } = await client.uploadPhoto(
        {
            photo: full_picture,
            caption: message,
            post: 'feed'
        })
    console.log(`https://www.instagram.com/p/${media.code}/`)
}

postToInstagram()