const Instagram = require("instagram-web-api");

const FB = require("fb")

FB.setAccessToken('EAADckJh3bY0BAGz1zZAOpnbvPivaDJZBb0bDEWcaZCZAvltlGSfH0U9vwFIV2DPRy5kpfYxFsbd4H4Uvgb5ZAtjWWRlwi98BSFVVhYhZBMdKsEix4FxqHaG9sUbVPZA2FksZCSvDnHOfYBikjYfjGB1zmsL1RguNZBFEoa2pt9t8XBa2ybaiRCOfPlJVnCEUdObh56dZACKD9jhZA5vZAboQZBZAIU')

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
        username: 'rzwirowniaofficial@gmail.com',
        password: 'Rzwirek123!'
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