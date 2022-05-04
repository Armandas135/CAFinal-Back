const threadSchema = require("../model/threadSchema")
const bcrypt = require('bcrypt')

module.exports = {
    threadValidator: async (req, res, next) => {
        const name = req.body.name;
        const user = req.body.user;
        const threads = await threadSchema.find();
        const thread = threads.find(x => name === x.name);
        if (!name) return res.send({
            success: false,
            errMsg: "Temos pavadinimas negali buti tuscias."});
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
        if (!user) return res.send({
            success: false,
            errMsg: "Turite prisijungti, jeigu norite komentuoti."});
        if (!comment) return res.send({
            success: false,
            errMsg: "Negalima parašyti tuscio komentaro."});
        if (comment.length > 200) return res.send({
            success: false,
            errMsg: "Maksimalus komentaro ilgis - 200 simboliu."
        });
        next();
    }
}
