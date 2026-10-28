const express = require('express')
const bc = require('bcrypt')
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')
const router = express.Router()

router.get('/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_eva} = req.params
        const [rows] = await db.query(`select * from tb_commit c,tb_eva e,tb_member m where c.id_eva =? and c.id_eva = e.id_eva and c.id_member = m.id_member`,[id_eva])
        res.json(rows)
    } catch (error) {
        console.error("Error status",error);
        res.status(500).json({message:"Error status"})
        
    }
})

module.exports = router