const express = require ('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const path = require('path');
const hbs = require('hbs');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');

//  const conexion = mysql.createConnection({
//      host: process.env.host,
//      user: process.env.user,
//     password: process.env.password,
//      database: process.env.database,
//  });

// conexion.connect(function(err) {
//     if (err) {
//    console.error(`error en la conexion: ${err.stack}`)
//       return;
//     }
    
//  console.log(`conectado a la base de datos ${process.env.database}`);
//   });

  app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs', );
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.get('/', (req, res, next) => {
    res.render('index', {
        titulo : 'Bienvenidos a la APP de la UTN'
    })
});

app.get('/nosotros', (req, res, next) => {
res.render('nosotros')
} );

app.get('/experiencias', (req, res, next) => {
    res.render('experiencias', {
    style : 'experiencias.css'
   })

} ); 


app.get('/contacto', (req, res, next) => {
    res.render('contacto')
    } );
    
app.post('/contacto',(req,res) => {
    const { nombre, email } = req.body

    if (nombre == '' || email == '') {

      let validacion = 'Por favor rellene los campos correctamente';
    res.render('contacto', {
        titulo: 'formulario para contacto' ,
        validacion
        });

}
else {



    console.log(nombre)
    console.log(email) 

async function envioEmail(){
let transporter = nodemailer.createTransport({
host: 'smtp.gmail.com',
port: 465,
secure: true,
auth: {
    user: 'nico.gruszka@gmail.com',
    pass: 'rhctpltamlldhdyg'
}

});

let envio = await transporter.sendMail({
    from: 'nico.gruszka@gmail.com',
    to: `${email}`,
    subject: 'Gracias por contactarte con Mallorca Fun Tours',
    html: `Gracias por contratar uno de nuestros tours, te responderemos a la brevedad con los pasos a seguir para tu proxima aventura!!`
});

res.render('enviado', {
    titulo: 'Mail enviado',
    nombre,
    email
})
}
envioEmail().catch(console.error) ;

}
    });
    
      
app.listen(PORT, () => {
 //  console.log(`El servidor esta trabajando en el puerto ${PORT}`);
})
