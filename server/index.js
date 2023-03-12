const express = require('express')
const cors = require('cors')
const PORT = 5000
const app = express()


//middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to my backend system bitch!!!"
    })
})

app.listen(PORT, () => console.log(`App is alive and Jiggy on PORT ${PORT},I dey code!!!!!!!`))
