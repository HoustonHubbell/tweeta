const MainDashboardRouter = require("express").Router()

MainDashboardRouter.route("/")
    .get(require("./dashboard.view.js") )
    .post(require("../post/submit.js"))

module.exports = MainDashboardRouter