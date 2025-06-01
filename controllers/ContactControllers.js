const asyncHandler = require('express-async-handler')
const Contact = require('./../models/contactModals')
//@desc Get All contacts
//@route GET /api/contacts

const GetContact = asyncHandler(async (req, res) => {
    await Contact.find({userId: req.user.id}).then((contacts)=> {
        res.status(200).json(contacts)
    }).catch((err)=> {
        res.status(400)
        throw new Error("No contacts")
    })
})

const CreateContact = asyncHandler(async (req, res)=> {
    const {name, phone, email} = req.body

    if(!name || !phone || !email){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    await Contact.create({
        name,
        email,
        phone,
        userId: req.user.id
    }).then((contact)=> {
        res.status(201).json(contact)
    }).catch(err=> {
        res.status(400).json("Unable to create contact")
        console.log(err)
    })
})

const GetContactById = asyncHandler( async(req, res) => {
    await Contact.findById(req.params.id)
        .then(contact => {
            res.status(200).json(contact);
        })
        .catch(err => {
            res.status(404);
            throw new Error("Contact not Found");
        });
});


const UpdateContact = asyncHandler(async(req, res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404).json();
        throw new Error("Contact not Found");
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updateContact)
})

const DeleteContact = asyncHandler(async(req, res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404)
        throw new Error("Contact not Found");
    }
    await contact.deleteOne({userId: req.params.id})
    res.status(200).json(contact)
})

module.exports = {GetContact, CreateContact, GetContactById, DeleteContact, UpdateContact}