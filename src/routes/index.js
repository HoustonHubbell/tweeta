module.exports = function(app) {
    app.use("/auth", require("./auth"))  
    app.use("/", require("./dashboard"))
    app.use("/post", require("./post") ) 

    
};