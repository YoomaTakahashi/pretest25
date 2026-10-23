const express =require('express')
const db= require('../../db')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')


router.get('/commit',verifyToken,requireRole('ผู้รับการประเมินผล'),async(req,res)=>{
    try {
        const id_member =req.user.id_member
        const [rows] = await db.query(`select * from tb_member m,tb_eva e,tb_system s,tb_commit c where c.id_member=? and c.id_member=m.id_member and c.id_eva=e.id_eva and e.id_sys=s.id_sys order by id_eva desc`,[id_member])
        res.json(rows[0])
    } catch (error) {
        console.error("Error get",error);
        res.status(500).json({message:"Error get"})
    }
})

router.get('/topic',verifyToken,requireRole('ผู้รับการประเมินผล'),async(req,res)=>{
    try {
        const id_member = req.user.id_member
        const [[evaRow]] = await db.query(`select * from tb_member m,tb_eva e,tb_system s where e.id_member=? and e.id_member=m.id_member and e.id_sys=s.id_sys order by id_eva desc`,[id_member])
        const id_eva = evaRow.id_eva
        const [topics] = await db.query(`select * from tb_topic `)
        const [indicates] = await db.query(`select * from tb_indicate i,tb_evadetail d where d.id_indicate and d.id_indicate=i.id_indicate and status_eva in (2,3,4) and id_eva=?`,[id_eva])
        const result = topics.map(t=>({
            ...t, indicates:indicates.filter((i)=> i.id_topic === t.id_topic)
        }))
        res.json(result)
    } catch (error) {
        console.error("Error get",error);
        res.status(500).json({message:"Error get"})
    }
})


module.exports = router