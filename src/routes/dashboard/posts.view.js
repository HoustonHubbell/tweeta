module.exports = async (req, res) => {
    res.render('posts', { user: req.verifiedUser.user });
}