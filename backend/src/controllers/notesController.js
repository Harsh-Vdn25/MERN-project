const {NoteModel}=require('../models/Note')


async function createNotes(req,res){
    const {title,content}=req.body;
    try{
        const Notes=await NoteModel.create({
            title:title,
            content:content
        })
        if(!Notes){
            res.status(500).json({message:"Couldnot create"});
        }
        res.status(200).json({message:"Note Created"});
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"Internal server error"});
    }
}

async function getAllNotes(req,res){
    try{
        const Notes=await NoteModel.find()
        if(!Notes){
            res.status(400).json({message:"No notes"});
        }
        res.status(200).json(Notes)
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"Internal server error"});
    }
}

async function updateNotes(req,res){
    const id=req.params.id;
    const {title,content}=req.body;
    try{
        const updated=await NoteModel.updateOne({
            _id:id
        },{
            title:title,
            content:content
        })
        if(!updated){
            res.status(400).json({message:"Requested note doesn't exist."});
        }
        res.status(200).json(updated);
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"Internal server error"});
    }
}

async function deleteNotes(req,res){
    const id=req.params.id;
    try{
        const deletedNote=await NoteModel.deleteOne({
            _id:id
        })
        if(!deletedNote.deletedCount>0){
            res.status(400).json({message:"Failed to delete"});
        }
        console.log("deleted")
        res.status(200).json({
            message:"Deleted"
        })
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"Internal server error"});
    }
}

async function getNote(req,res){
    const id=req.params.id;
    try{
        const Note=await NoteModel.findOne({
            _id:id
        })
        if(!Note){
            res.status(400).json({message:"Requested note doesn't exist."});
        }
        res.status(200).json(Note);
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:"Internal server error"});
    }
}


module.exports={
    createNotes,
    getAllNotes,
    updateNotes,
    deleteNotes,
    getNote
}