const express = require('express');
const cors = require('cors');
const app = express();
const port = 3006;

app.use(express.json())
app.use(cors())
const langArr = [
    "Java",
    "JavaScript",
    "PHP",
    "JSP",
    "ASP",
    "nodejs",
    "ECMAScript",
    "ReactScript",
    "Vue",
    "AngluerScript",
    "SCSS",
    "CSS",
    "Pythone",
    "json",
    "JSonJava",
    "Spring"
]
app.get('/languages', (req, res) => {
    const keyword = req.query.keyword;
    let nLangArr = langArr.filter(list => list.toLowerCase()
    .includes(keyword.toLocaleLowerCase()))
    res.send(nLangArr)
})
app.listen(port, function () {
    console.log('테스트 서버가 동작중입니다.')
})