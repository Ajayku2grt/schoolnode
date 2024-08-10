const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels")

const getContact = asyncHandler( async (req, res) => {
    const contacts = await Contact.find({user_id : req.user.id});
    res.status(200).json(contacts );  
});

const createContact = asyncHandler( async (req, res) => {
    const {name, email, mobile } = req.body;
    if(!name || !email ||!mobile){
        res.status(422);
        throw new Error("All fields are mandatory!");
    }
    const contact = await Contact.create({
        user_id: req.user.id,
        name,
        email,
        mobile
    });
    res.status(200).json( {message : 'Contact Created successful'} );
});

const editContact = asyncHandler( async (req, res) => {
    console.log(req.user.id);
    const contact = await Contact.findById({ _id : req.params.id, user_id:req.user.id });
    if(!contact){
        res.status(422).json({status: false, message:'No Data Found'});
    }
    res.status(200).json({list: contact, message : 'Fetch Succesfully'} );
});

const updateContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById({ _id : req.params.id, user_id:req.user.id });
    if(!contact){
        res.status(422).json({status: false, message:'No Data Found'});
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true }
    );
    res.status(200).json( {updatedContact:updatedContact, message : 'Updated Succesfully'} );
});

const deleteContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById({ _id : req.params.id, user_id:req.user.id });
    if(!contact){
        res.status(422).json({status: false, message:'No Data Found'});
    }
    console.log(contact);
    await Contact.deleteOne({ _id : req.params.id, user_id:req.user.id });
    res.status(200).json( {message : `Delete Sucessfully`} );
});


module.exports = { getContact, createContact, editContact, updateContact, deleteContact };