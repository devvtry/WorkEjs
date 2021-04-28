var express = require('express');
app = express();
mongojs = require('mongojs');
const bodyParser = require('body-parser');
const path = require('path');
const ObjectId = mongojs.ObjectId
const expressValidator = require('express-validator')

// for data base connection

/*
const db = mongojs('customerapp', ['users']);
*/



// set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'backend/views'))


//set static path
// app.use(express.static(path.join(__dirname, 'backend/public')))


// Express Validators

// app.use(expressValidator({
//     errorFormatter: function () {

//     }
// }))



// Global Variables

app.use(function (req, res, next) {
    res.locals.error = null;
    next();

})





// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// if (process.env.NODE_ENV === 'production') {
//     //  Express will serve up production assets like our main.js files,
//     // or main.css files !
//     app.use(express.static('client/build'));

//     //Express will serve up the index.html files if it doesn't 
//     // recognize the router !
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }


const PORT = process.env.PORT || 3001

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Ejs from index',
        users: [{
            first_name: 'John',
            last_bname: 'Doe',
            email: 'johndoe@gmail.com',
            age: 21
        },
        {
            first_name: 'Smith',
            last_bname: 'Json',
            email: 'smith@gmail.com',
            age: 21
        },
        ]
    })


    // db.users.find(function (err, docs) {
    //     res.render('index', {
    //         title: 'Ejs from index',
    //         users: docs 
    // })



})


app.post('/user/add', (req, res) => {

    // set rules
    req.checkBody('first_name', 'First name is require').notEmpty();

    const error = req.validationErrors()
    if (error) {
        res.render('index', {
            error: error,
            title: 'Ejs from index',
            users: [{
                first_name: 'John',
                last_bname: 'Doe',
                email: 'johndoe@gmail.com',
                age: 21
            },
            {
                first_name: 'Smith',
                last_bname: 'Json',
                email: 'smith@gmail.com',
                age: 21
            },
            ]
        })
    } else {
        const newuser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
        }
        // db.users.insert(newuser, (err, res) => {
        //     if (err) {
        //         console.log(err, "db error")
        //     } else {
        //         res.redirect('/')
        //     }
        // })
    }
})

app.delete('/users/delete/:id', ((req, res) => {
    // console.log(req.prams.id)
    db.users.remove({ _id: ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
    })

}))



app.listen(PORT, () => {
})