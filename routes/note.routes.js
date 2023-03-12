const express = require("express");
const { NoteModel } = require("../model/NotesModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");

const noteRouter = express.Router();

noteRouter.use(authenticator)


noteRouter.get("/",async(req,res)=>{
    let token = req.headers.authorization
    jwt.verify(token,"as3121gsdf443faafaafa",async(err,decode)=>{
        try {

            let data = await NoteModel.find({user:decode.userId})
            res.send({
                data:data,
                message:"Success",
                status:1
            })
        } catch (error) {
            res.send({
                message:error.message,
                status:0
            })
        }
    
        
    })

   
   

})



















    // res.send({
    //     message:"all the notes",
    //     status:1
    // })


noteRouter.post("/create",async (req,res)=>{

    try {

        let note = new NoteModel(req.body)
        await note.save()
        res.send({

            message:"note created ",
            status:1

        })
        
    } catch (error) {

        res.send({

            message:error.message,
            status:0

        })
        
    }



})



noteRouter.patch("/",async (req,res)=>{
    let {id} =req.headers
    
    try {

        await NoteModel.findByIdAndUpdate({_id:id},req.body)
        res.send({
            message:"Note updated",
            status:1
        })
        
    } catch (error) {

        res.send({
            message:error.message,
            status:0
        })
        
    }

})


noteRouter.delete("/",async (req,res)=>{
    let {id} =req.headers
    
    try {

        await NoteModel.findByIdAndDelete({_id:id})
        res.send({
            message:"Note deleted",
            status:1
        })
        
    } catch (error) {

        res.send({
            message:error.message,
            status:0
        })
        
    }

})



module.exports={
    noteRouter
}