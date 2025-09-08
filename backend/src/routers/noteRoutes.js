const express=require('express');
const noteRouter=express.Router();

const {
    createNotes,
    getAllNotes,
    updateNotes,
    deleteNotes,
    getNote
}=require('../controllers/notesController')

const {
    decodeToken
}=require('../middleware/usermidware');

const CheckNote=require('../middleware/notemiddleware');


noteRouter.post('/',decodeToken,createNotes);

noteRouter.get('/',decodeToken,getAllNotes);

noteRouter.put('/:id',decodeToken,CheckNote,updateNotes);

noteRouter.delete('/:id',decodeToken,CheckNote,deleteNotes);

noteRouter.get('/:id',decodeToken,CheckNote,getNote);

module.exports=noteRouter;