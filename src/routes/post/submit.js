const axios = require('axios')

module.exports = async (req, res) => {

    

    const mutation = `
        mutation createPost($userId: String!, $text: String) { 
            createPost( userId: $userId, text: $text )
        }`

    try {
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, 
            { 
                query: mutation,
                variables: {
                    text: req.body.text,
                    userId: req.verifiedUser.user._id,
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });   
            console.log('hello life')
            console.log(data)
            console.log({
                text: req.body.text,
                userId: req.verifiedUser.user._id,
            })
                
        } catch(e) {
        console.log(e)
    }   

    res.redirect(`/`)
}