const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=Schema.Types.ObjectId;

const UserSchema=new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:String,
    firstName:String,
    lastName:String
})

const NoteSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    userId:{
        type:ObjectId,
        ref:'user'
    }
    },
    {
        timestamps:true,
    }
);

const UserModel=mongoose.model('user',UserSchema);
const NoteModel=mongoose.model('notes',NoteSchema);

module.exports={
    UserModel,
    NoteModel
}