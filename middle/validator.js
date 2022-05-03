const userSchema = require("../schemas/userSchema");
const threadSchema = require("../schemas/threadSchema")


module.exports = {
    validateRegister: async (req, res, next) => {
        const {username, password, passwordAgain} = req.body
        const users = await userSchema.find()
        const user = users.find(x => username === x.username)
        if (user) res.send({success: false, errorMessage: "Vartotojo vardas uzimtas"})
        if (!username) return res.send({success: false, errorMessage: "Reikalingas vartotojo vardas"})
        if (password !== passwordAgain) return res.send({success: false, errorMessage: "Slaptazodžiai nesutampa"})
        next()
    },

    validateLogin: async (req, res, next) => {
        const {username, password} = req.body
        const users = await userSchema.find()
        const user = users.find(x => username === x.username)
        if (!user) return res.send({success: false, errorMessage: "Vartotojas nerastas"})
        if (password !== user.password) return res.send({success: false, errorMessage: "Neteisingas slaptazodis."})
        if (password.length < 0 && password.length > 20) return res.send({success: false, errorMessage: "Slaptazodis per ilgas/trumpas."})
        next()
    },

    validateThread: async (req, res, next) => {
        const {name, user, comments} = req.body
        const threads = await threadSchema.find()
        const thread = threads.find(x => name === x.name)
        // if (name.length < 0) return res.send({success: false, errorMessage: "Temos pavadinimas negali buti tuscias."})
        if (name.length > 20) return res.send({success: false, errorMessage: "Temos pavadinimas per ilgas."})
        if (thread) return res.send({success: false, errorMessage: "Tema tokiu pavadinimu jau egzistuoja."})
        if (!user) return res.send({success: false, errorMessage: "Vartotojas neprisijunges."})
        if (comments.length > 0) return ({success:false, errorMessage: ""})
        next()
    },

    validateComment: async (req, res, next) => {
        const {comment, user} = req.body
        if(comment.length > 100) return res.send({success: false, errorMessage: "Maksimalus komentaro ilgis - 200 simboliu."})
        if(comment.length === 0) return res.send({success: false, errorMessage: "Negalima parašyti tuscio komentaro."})
        if(!user) return res.send({success: false, errorMessage: "Turite prisijungti, jeigu norite komentuoti."})
        next()
    }

}
