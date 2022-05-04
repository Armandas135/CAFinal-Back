const {v4: uuid} = require("uuid")
const threadSchema = require("../model/threadSchema")


module.exports = {
    newThread: async (req, res) => {
        const name = req.body.name;
        const user = req.body.user;
        const comments = req.body.comments;
        const thread = new threadSchema();
        thread.name = name;
        thread.user = user;
        thread.comments = comments;
        thread.save().then(() => {
        })
        const threads = await threadSchema.find()
        console.log(threads)
        res.send({success: true, threads})
    },
    newComment: async (req, res) => {
        const id = req.body.id;
        const comment = req.body.comment;
        const user = req.body.user;
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