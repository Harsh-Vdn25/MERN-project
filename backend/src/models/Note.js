const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=Schema.Types.ObjectId;

const NoteSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    },
    {
        timestamps:true,
    }
);
const NoteModel=mongoose.model('notes',NoteSchema);

module.exports={
    NoteModel
}