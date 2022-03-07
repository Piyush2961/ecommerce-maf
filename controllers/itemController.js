const Item = require('./../models/itemModel')

exports.addItem=(req,res)=>{
    const newItem = new Item(req.body)
    newItem.save((err,item)=>{
        if(err){
            console.log(err.message)
           return res.status(400).json({
                error:err
            })
        }
        res.status(200).json({
            item
        })
    })
}

exports.getAllItems=(req,res)=>{
    Item.find({},(err,items)=>{
        if(err){
            console.log(err.message)
           return res.status(400).json({
                error:err
            })
        }
        res.status(200).json({
            items
        })
    })
}

exports.deleteItem=(req,res)=>{
    Item.findByIdAndDelete(req.params.id,(err,item)=>{
        if(err){
            console.log(err.message)
           return res.status(400).json({
                error:err
            })
        }
        res.status(200).json({
            item
        })
    })
}

exports.getItem=(req,res)=>{
    Item.findById(req.params.id,(err,item)=>{
        if(err){
            console.log(err.message)
           return res.status(400).json({
                error:err
            })
        }
        res.status(200).json({
            item
        })
    })
}