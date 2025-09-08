const { NoteModel } = require('../models/Note');

async function CheckNote(req, res, next) {
    const {id}=req.params.id;
    const Note = await NoteModel.find({
        _id: id
    })
    if (!Note) {
        return res.status(400).json({ message: "Requested note doesn't exist." });
    }
    next();
}

module.exports = CheckNote;