const axios = require('axios')

module.exports = async (req, res) => {
    const slug = req.params.slug
    let postData = {}

    const query = `
        query posts { 
            posts {
                id,
                text,
                user {
                    username
                }
            }
        }`

    try {
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, 
            { 
                query
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });   
            
        postData = data.data.posts

        console.log(postData)

        // quizData.questions = quizData.questions.sort((a,b) => a-b)

        console.log(postData)
        res.render('post', { user: req.verifiedUser.user, posts: postData });
    } catch(e) {
        console.log(e.data.response.errors)
        res.redirect('/')
    }   

}