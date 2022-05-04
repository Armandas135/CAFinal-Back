const userSchema = require("../model/userSchema");
const bcrypt = require('bcrypt')

module.exports = {
    registerValidator: async (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
        const {passwordAgain} = req.body;
        const users = await userSchema.find();
        const user = users.find(x => username === x.username);
        if (user) return res.send({
            success: false,
            errMsg: "Vartotojo vardas uzimtas"});
        if (username.length > 10) return res.send({
            success: false,
            errMsg: "Vartotojo vardas per ilgas (Max - 10 simboliu)"
        });
        if (username.length < 3) return res.send({
            success: false,
            errMsg: "Vartotojo vardas per trumpas (Min - 3 simboliai)"
        });
        if (!username) return res.send({success: false, errMsg: "Reikalingas vartotojo vardas"});
        if (password !== passwordAgain) return res.send({
            success: false,
            errMsg: "Slaptazodžiai nesutampa"});
        if (!password) return res.send({success: false, errMsg: "Slaptazodis per trumpas."});
        next();
    },

    loginValidator: async (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
        const users = await userSchema.find();
        const user = users.find(x => username === x.username);
        if (!user) return res.send({
            success: false,
            errMsg: "Vartotojas nerastas"});
        if (password !== user.password) return res.send({
            success: false,
            errMsg: "Neteisingas slaptazodis."});
        next()
    },
}
