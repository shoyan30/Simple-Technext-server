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
    const { search, sort } = req.query;

    let filteredUsers = alluser;

    if (search) {
        filteredUsers = filteredUsers.filter(user => {
            const fullName = `${user.firstName} ${user.lastName}`;
            return fullName.toLowerCase().includes(search.toLowerCase());
        });
    }

    if (sort) {
        switch (sort) {
            case 'name':
                filteredUsers.sort((a, b) => (a.firstName + ' ' + a.lastName).localeCompare(b.firstName + ' ' + b.lastName));
                break;
            case 'email':
                filteredUsers.sort((a, b) => a.email.localeCompare(b.email));
                break;
            case 'company.name':
                filteredUsers.sort((a, b) => a.company.name.localeCompare(b.company.name));
                break;
            default:
                return filteredUsers
        }
    }
    res.send({ users: filteredUsers });
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const selectedUser = alluser.find(n => n.id == id);
    res.send(selectedUser);
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
    console.log(`Server running on port:${port}`)
})