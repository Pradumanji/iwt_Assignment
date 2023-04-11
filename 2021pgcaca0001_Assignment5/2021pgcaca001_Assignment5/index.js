const express = require('express');
const path = require("path");
const helmet = require("helmet");
const cookieParser = require('cookie-parser');
const con = require("./DBconection");

const fs = require('fs')
const root = __dirname;
const app = express()
const log = console.log;

const bodyParser = require("body-parser")

app.use(helmet());
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.json());

/*  new*/// allow the express server to read and render the static css file
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");

// render the ejs views
app.set("views", path.join(__dirname, "views"));

// app.get("/",(req,resp)=>{

// })


app.use(express.urlencoded({ extended: true }));
// app.get('/setcookie', (req, res) => {
//     res.cookie(`Cookie token name`,`encrypted cookie string Value`);
//     res.send('Cookie have been saved successfully');
// });

// app.get('/getcookie', (req, res) => {
//     //show the saved cookies
//     console.log(req.cookies)
//     res.send(req.cookies);
// });

// app.post('/register', (req, res) => {
//     log(req.body)
// })

app.get('/', (req, res) => {
    res.sendFile(root + '/main.html')
    // fs.readFile(root + '/main.html', (err, data) => {
    //     res.setHeader('content-type', 'text/html')
    //     res.write(data)
    //     res.end()
    // })
})

app.get('/register', (req, res) => {
    res.sendFile(root + '/register.html')
})

app.get('/loginpage', (req, res) => {
    res.sendFile(root + '/loginpage.html')
})

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    const mysql_query = `insert into mydata values("${name}","${email}","${password}")`;

    con.query(mysql_query, (err, result, fields) => {
        if (err) {
            console.log(err);
            res.sendFile(root + '/register.html')
        }
        else {
            console.log(result);
            res.sendFile(root + '/loginpage.html');
        }
    })
});
// app.post("/logout", (req, res) => {
//     res.clearCookie("Cookie token name");
//     res.redirect("/");
// });

app.post("/loginpage", (req, res) => {
    const { email, password } = req.body;

    const mysql_query = `select * from mydata where email = "${email}" and password="${password}"`;
    con.query(mysql_query, (err, result, fields) => {
        if (err) {
            console.log(err);
            return;
        }
        else if (result.length == 1) {
            res.send(`<h1>Welcome ${result[0].name}
            <form >
            <button type="submit">Logout</button>
            <a href="/main.html"></a>
        </form>
            `
            );
            res.sendFile(root + '/logout.html');
        }
        else {
            res.send(`<p>Invalid login credentials</p>
            <form action="/register" method="GET">
        <button type="submit">Register</button>
    </form>
    <form action="/loginpage" method="GET">
        <button type="submit">Login</button>
    </form>`)
        }
    })
})

/*
    res.send()
*/

/*
    readFile('filename', (err, data) => {


    })


*/

/*

get('rout', (req, res) => {

})

*/

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("running at 3000");
    }
});

/*
    listen(port, (err) => {


    })

*/