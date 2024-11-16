// const http = require("http")
// const PORT = 3000

// const app = http.createServer((req, res) => {
//     res.write("Our Server is up and running")
//     res.end()
// })

// app.listen(PORT, () => {
//     console.log("server is running")
// })


const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json())

mongoose.connect("mongodb+srv://obasyemeka:RU7bv2E3I1AjwTbI@cluster0.euhdc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err))

const childSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    stateOfOrigin: {
        type: String,
        require: true
    }
});

const userModel = new mongoose.model("children", childSchema)

app.get("/", (request, response) => {
    response.json({
        message: "welcome to our backend application"
    })
})

app.get("/listOfUsers", (req, resp) => {

})

app.post("/signUp", (req, resp) => {
    console.log(req.body)
    resp.send("Request Recieved")
})

app.post("/addChild", (req, res) => {
    console.log(req.body)
    const newChild = new userModel()
    newChild.name = req.body.name;
    newChild.age = req.body.age;
    newChild.stateOfOrigin = req.body.stateOfOrigin;

    newChild.save()
    .then(() => res.send("child registration successful"))
    .catch(err => {
        console.log(err)
        res.send("Child could not be added")
    })

    // res.send("Request Recieved")
})

app.get("/allChildren", (req, res) => {
    userModel.find()
    .then(data => {
        console.log(data)
        res.json({
            message: "Data found",
            data
        })
    })
    .catch(err =>{
        console.log(err)
        res.send("An error occured")
    })
})

const port = process.env.PORT || 4000;

app.listen(port, console.log("I am in the kitchen", port))