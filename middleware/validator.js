const userSchema = require("../model/userSchema");
const threadSchema = require("../model/threadSchema")
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
        if (username.length > 20) return res.send({
            success: false,
            errMsg: "Vartotojo vardas per ilgas (Max - 20 simboliu)"
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
        if (!user) return res.send({success: false, errMsg: "Vartotojas nerastas"});
        if (password !== user.password) return res.send({
            success: false,
            errMsg: "Neteisingas slaptazodis."});
        next()
    },

    threadValidator: async (req, res, next) => {
        const name = req.body.name;
        const user = req.body.user;
        const threads = await threadSchema.find();
        const thread = threads.find(x => name === x.name);
        if (!name) return res.send({success: false, errMsg: "Temos pavadinimas negali buti tuscias."});
        if (name.length > 20) return res.send({
            success: false,
            errMsg: "Temos pavadinimas per ilgas."
        });
        if (thread) return res.send({success: false, errMsg: "Tema tokiu pavadinimu jau egzistuoja."});
        if (!user) return res.send({success: false, errMsg: "Vartotojas neprisijunges."});
        next();
    },

    commentValidator: async (req, res, next) => {
        const user = req.body.user;
        const comment = req.body.comment;
        if (!user) return res.send({success: false, errMsg: "Turite prisijungti, jeigu norite komentuoti."});
        if (!comment) return res.send({success: false, errMsg: "Negalima parašyti tuscio komentaro."});
        if (comment.length > 200) return res.send({
            success: false,
            errMsg: "Maksimalus komentaro ilgis - 200 simboliu."
        });
        next();
    }
}
