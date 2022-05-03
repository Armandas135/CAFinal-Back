const {v4: uuid} = require("uuid")
const userSchema = require("../schemas/userSchema")
const threadSchema = require("../schemas/threadSchema")


module.exports = {
    register: (req, res) => {
        const {username, password} = req.body
        const user = new userSchema()
        user.username = username
        user.password = password
        user.picture = 'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg'
        user.secret = uuid()
        user.save().then(() => {
            console.log(`${username} uzregistruotas`)
        })
        res.send({success: true})
    },
    login: async (req, res) => {
        const {username, stayLoggedIn} = req.body
        const users = await userSchema.find()
        const user = users.find(x => username === x.username)

        if (user) {
            stayLoggedIn ? req.session.username = username : req.session.username = null
            const threads = await threadSchema.find()
            return res.send({success: true, user, threads})
        } else {
            res.send({success: false})
        }
    },
    check: async (req, res) => {
        const {userSecret} = req.body
        const users = await userSchema.find()
        const user = users.find(x => userSecret === x.secret)
        const threads = await threadSchema.find()

        if (user) {
            res.send({success: true, user, threads})
        } else {
            res.send({success: false, threads, errorMessage: ""})
        }
    },
    addThread: async (req, res) => {
        const {name, user, comments} = req.body
        const thread = new threadSchema()
        thread.name = name
        thread.user = user
        thread.comments = comments
        thread.save().then(() => {
        })
        const threads = await threadSchema.find()
        console.log(threads)
        res.send({success: true, threads})
    },

    addComment: async (req, res) => {
        const{id, comment, user} = req.body
        const currentThread = await threadSchema.findOne({_id: id})
        const newComment = {
            comment,
            user
        }
        await threadSchema.updateOne(
            {_id: id},
            {comments: [...currentThread.comments, newComment]}
        )
        const threads = await threadSchema.find()
        res.send({success: true, threads})
    }
}