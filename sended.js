let express = require('express');
let bodyParser = require('body-parser');
let nodemailer = require('nodemailer');

let mail = '';

let testMail = nodemailer.createTestAccount();

let transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
       user: '*HERE U SHOULD WRITE GMAIL NAME LIKE example@gmail.com (but real)*',
       pass: '*PLACE FOR PASSWORD OF GMAIL MAIL*'
     }
   });


let app = express();

const PORT = 3000;


let urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/testpage.html');
});

app.post("/testpage", urlencodedParser, function (req, res) {
    res.sendFile(__dirname + '/testpage.html');
    if(!req.body) return res.sendStatus(400);
    mail = req.body.mail;
    console.log(mail);

    transporter.sendMail({
      from: '"Тести онлайн 🌏" <nodejs@example.com>',
      to: mail,
      subject: "Тук-тук! Результати Вашого тесту! 💁‍📩",
      text: "Ваш темперамент, за результатом тесту, має наступну характеристику:",
      html: `<h2>Ваш темперамент, за результатом тесту, має наступну характеристику:<h2><br/>
        <h2>Холерик - ${req.body.toSendChol}</h2>
        <h2>Сангвінік - ${req.body.toSendSang}</h2>
        <h2>Флегматік - ${req.body.toSendFleg}</h2>
        <h2>Меланхолік - ${req.body.toSendMelan}</h2><br/>Якщо цей лист надійшов випадково, проігноруйте його. Але краще пройдіть тест на site.com 🥰 <br/>(Виконано командою Павла та інших, чиї імена не мають значення 🥺)`
    });

});

app.listen(PORT, () => console.log(`Started at ${PORT}`));
