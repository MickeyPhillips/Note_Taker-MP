const router = require('express').Router();
const { createNewNote, validateNote, findNote, deleteNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json');
const { v1: uuidv1, v4: uuidv4 } = require('uuid') 

router.get('/notes', (req, res) => {
    res.json(notes);
})

router.post('/notes', (req, res) => {
    req.body.id = uuidv4();

    if(!validateNote(req.body)) {
        res.status(400).send('The Note is not properly formatted.')
    }
    else {
        const note = createNewNote(req.body, notes);
        res.json(note)
    }
})

router.delete('/notes/:id', (req, res) => {
    const result = findNote(req.params.id, notes);
    deleteNote(result, notes);
    res.json(notes);
})

module.exports = router;