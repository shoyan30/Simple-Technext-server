const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const users = require('./users.json');
const alluser = users.users;

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => { 
    res.send('User Data is Running')
});

app.get('/users', (req, res) => {
    res.send(users);
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const selectedNews = alluser.find(n => n.id == id);
    res.send(selectedNews);
})
app.get('/users/firstName/:firstName', (req, res) => {
    const name = req.params.firstName;
    const selectedNews = alluser.find(n => n.firstName == name);
    res.send(selectedNews);
})

// app.get('/news', (req, res) => {
//     res.send(news);
// })

// app.get('/news/:id', (req, res) => {
//     const id = req.params.id;
//     const selectedNews = news.find(n => n._id == id);
//     res.send(selectedNews);
// })

// app.get('/categories/:id', (req, res) => {
//     const id = parseInt(req.params.id);

//     if (id === 0) {
//         res.send(news)
//     }
//     else {
//         const categoryNews = news.filter(n => parseInt(n.category_id) === id)
//         res.send(categoryNews);
//     }


// })

app.listen(port, () => {
    console.log(`Dragon API is running on port:${port}`)
})