const express=require('express');
const noteRouter=express.Router();

const {
    createNotes,
    getAllNotes,
    updateNotes,
    deleteNotes,
    getNote
}=require('../controllers/notesController')


noteRouter.post('/',createNotes);

noteRouter.get('/',getAllNotes);

noteRouter.put('/:id',updateNotes);

noteRouter.delete('/:id',deleteNotes);

noteRouter.get('/:id',getNote);

module.exports=noteRouter;