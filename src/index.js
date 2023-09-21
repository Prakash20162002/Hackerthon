const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
const LogInCollection = require("./mongo")
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))
const tempelatePath = path.join(__dirname, '../templates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


// hbs.registerPartials(partialPath)


app.get('/signup', (req, res) => {
    res.render('sign')
})
app.get('/login', (req, res) => {
    res.render('login')
})



// app.get('/home', (req, res) => {
//     res.render('home')
// })

// app.post('/sign', async (req, res) => {
    
//     // const data = new LogInCollection({
//     //     name: req.body.name,
//     //     password: req.body.password
//     // })
//     // await data.save()

//     const data = {
//         name: req.body.firstname,
//         password: req.body.password,
//         email:req.body.email
//     }

//     const checking= LogInCollection.findOne({ name: req.body.email }).then()
    
//     console.log(req.body)
//    try
//    {
//     if (checking.name === req.body.name && checking.password===req.body.password && checking.email===req.body.email) {
//         res.send("user details already exists")
//     }
//     else{
//         await LogInCollection.insertMany([data])
//     }
//    }
//    catch(e){
//     console.log(e)
//     res.send("wrong inputs")
//    }

//     // res.status(201).render("home", {
//     //     naming: req.body.name
//     // })
// })


// app.post('/login', async (req, res) => {

    
//     try {
       
//         const check = await LogInCollection.findOne({ name: req.body.email })


//         if (check.password === req.body.password) {
//             res.status(201).render("home", { naming: `${req.body.password}+${req.body.email}` })
//         }

//         else {
//             res.send("incorrect password")
//         }
//     } 
//     catch (e) {
//         console.log(e)
//         res.send(e)
//     }
// })

app.post('/sign', async (req, res) => {

    try {

        const { email } = req.body;

        const validateUser = await LogInCollection.findOne({ email: email })

        if (validateUser) {
            return res.status(400).json({ error: "User Already Exist" })
        }

        const data = await LogInCollection(req.body)

        await data.save()

        res.status(200).redirect('/')


    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

app.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        const validateUser = await LogInCollection.findOne({ email: email })
        console.log(validateUser);
        console.log(req.body);
        if (!validateUser) {
            return res.status(400).json({ error: "User Not Found" })
        }

        if (validateUser.email === email && validateUser.password === password) {

            return res.status(200).redirect('/')

        } else {

            return res.status(400).json({
                error: "Invalid Credentials"
            })

        }

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });

    }

})

app.listen(port, () => {
    console.log('port connected');
})