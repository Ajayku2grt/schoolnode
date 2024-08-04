const asyncHandler = require("express-async-handler");

const getContact = asyncHandler( async (req, res) => {
  res.status(200).json( {message : 'from controller'} );  
});

const createContact = asyncHandler( async (req, res) => {
    const {name, email, mobile } = req.body;
    if(!name || !email ||!mobile){
        res.status(422);
        throw new Error("All fields are mandatory!");
    }
    res.status(200).json( {message : 'from create'} );
});

const editContact = asyncHandler( async (req, res) => {
    res.status(200).json({message : `from edit ${req.params.id}`} );
});

const updateContact = asyncHandler( async (req, res) => {
    res.status(200).json( {message : `from put ${req.params.id}`} );
});

const deleteContact = asyncHandler( async (req, res) => {
    res.status(200).json( {message : `from delete ${req.params.id}`} );
});


module.exports = { getContact, createContact, editContact, updateContact, deleteContact };