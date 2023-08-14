const express = require("express")
const router = express.Router()

router.get("/", (req, res)=> {
    res.send({
        name : "kanishk",
        age : 22
    })
})

module.exports = router