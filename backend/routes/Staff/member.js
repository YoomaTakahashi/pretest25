const express = require('express')
const bc = require('bcrypt')
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')
const router = express.Router()

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{
    try {
        
        const {fname,lname,email,username,password,role} = req.body
        const hash = await bc.hash(password,10)
        const [rows] = await db.query(`insert into tb_member(fname,lname,email,username,password,role) values(?,?,?,?,?,?)`,[fname,lname,email,username,password,role])
        res.json(rows)
    } catch (error) {
        console.error("Error regis",error);
        res.status(500).json({message:"Error regis"})
    }
})

router.post('/login',async(req,res)=>{
    try {
        
        const {username,password,role} = req.body
        const [rows] = await db.query(`select * from tb_member where username = ? and role=?`,[username,role])
        const m = rows[0]
        if(!m || !password || !(await bc.compare(password,m.password))){
            return res.status(400).json({message:"รหัสผ่านไม่ถูกต้อง"})
        }
        const token = jwt.sign(
            {id_member:m.id_member,username:m.username,role:m.role},JWT_SECRET,{expiresIn:'24h'}
        )
        res.json({token,role:m.role})
    } catch (error) {
        console.error("Error login",error);
        res.status(500).json({message:"Error login"})
    }
    
})

module.exports = router