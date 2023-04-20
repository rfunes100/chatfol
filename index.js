

const qrcode = require('qrcode-terminal');
const axios = require('axios');
const express = require('express');
const handlebars = require('handlebars');
const   dotenv = require('dotenv')//.config();

const { Client , LocalAuth  } = require('whatsapp-web.js');

const puppeteer = require('puppeteer');

async function myFunction() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultTimeout(10000); // 10 segundos
  // Resto de tu código aquí
}

const http = require('http');
const codbar = ''


dotenv.config()
const app = express();
app.use(express.json())


const client = new Client({
    authStrategy: new LocalAuth()
});




// client.on('qr', qr => {



  // qrcode.generate(qr, {small: true}, function (code) {
  //   console.log('code',code);
//   } ) 

 //});

  client.on('ready',    ()  => {

    myFunction();
  console.log('Client is ready!');

});





client.on('message', async message => {
 let empevo ; 
 let codigoemp
 let responses = {}; 
 let telefono 




 if (message.body.toLowerCase() === 'menu'){ // verificar si el mensaje es 'empezar cuestionario'
  responses = {}; // reiniciar las respuestas del usuario
  await client.sendMessage(message.from, 'ingrese su codigo de empleado?'); // enviar la primera pregunta
} else if (!responses.codigo){ // si aún no se ha respondido a la primera pregunta
  
  
  responses.codigo = message.body; // almacenar la respuesta en la variable 'responses'
  codigoemp = message.body;
//  codigoemp = 226
  //console.log('codigoemp', codigoemp)


  try {
   // await   client.sendMessage(message.from, 'Ingrese codigo de empleado ' );
//   console.log('responses.codigo ',  message.body)

       //  const response = await axios.get('http://svapwebdev41/EvoWebApi/api/Empresas/empresa_pais/hn');
         const response = await axios.get(`${process.env.EVO_URL}/api/Empleado/GetById/hn${codigoemp}`);
         const data = response.data;
         empevo = data.Contenido[0].emp_CodEvo
         telefono =  data.Contenido[0].emP_TELEFONO 
   
 
       const ciaempresas = JSON.stringify(data.contenido)
       const empresas = JSON.stringify(data.contenido)
    
       let objeto = []
for (let prop in data.contenido) {
// console.log(`${prop}: ${data.contenido[prop].cia_codigo}, ${data.contenido[prop].cia_descripcion}`);
objeto.push(`${data.contenido[prop].cia_codigo}, ${data.contenido[prop].cia_descripcion}`)

}

//console.log(objeto)

//const empresa = JSON.stringify(objeto)
const empresa = JSON.stringify(objeto, null, "\n")

//console.log(JSON.stringify(objeto.slice(1, -1), null, "\n"));



// console.log(empresa)
 const str = empresa
const newStr = str.slice(1, -1)
//console.log(newStr)



       //  client.sendMessage(message.from, data.contenido[0].cia_codigo + ' '+ data.contenido[0].cia_descripcion);
       client.sendMessage(message.from, newStr);

   
       //  res.json(data);
       } catch (error) {
         console.error(error);
         res.status(500).send('Error interno del servidor');
       }

     try {
      //   const response = await axios.get('http://svapwebdev41/EvoWebApi/api/Empleado/GetByCiaId/422/226');
       //  const response = await axios.get(`http://rdwebsrvtst2:8093/api/ingresos/getcomprobanteempleado/${empevo}`);
       const response = await axios.get(`${process.env.EVO_URL}/api/ingresos/getcomprobanteempleado/${empevo}`);
           

       

         const data = response.data;
     //    console.log('comprobante de pago json', data.Contenido)
     //    const empresa = JSON.stringify (data.Contenido )// JSON.stringify(data, null, "\n")

       
        const filteredData = data.Contenido.map(({  tiempo,valor, descripcion ,  /*, tipo*/  }) => ({  tiempo,valor, descripcion /*, tipo*/  }));
    //    console.log('filteredData', filteredData)
         let empresa = String( JSON.stringify(filteredData)) // JSON.stringify ( filteredData )   
         empresa = empresa.slice(1, -1)
      //   console.log('empresa dentro de telefono ', empresa)
      //   empresa = empresa.replace('{', '')
      //   empresa = empresa.replace('"', '')
       //  empresa = empresa.replace('"', '')
       //  empresa = empresa.replace(/}/g, '')
       //  empresa = empresa.replace(/tiempo/g, 'horas')
     //    console.log('empresa formateada ', empresa.replace(/tiempo/g, 'horas') )

         const string = 'e851e2fa-4f00-4609-9dd2-9b3794c59619'

//console.log(string.replace(/-/g, ''))  



const replacements = {
  tiempo: 'HORAS',
  valor: 'VALOR',
"}": '',
  "{": '',
  '"': '',
  ',': ' ',
  ':': ' ',
  descripcion: ' '
};



const newString  = empresa.replace(
  new RegExp(Object.keys(replacements).join('|'), 'g'),
  match => replacements[match]
);

//console.log(newString);


const palabra = newString.replace(/\\n/g, '\n')

const palabras = palabra.replace(`/\//g`, '')

//const palabras = palabra.replace(/\/g, ' ')

const mensaje = "Hola" + String.fromCharCode(10) + "Mundo";
//console.log(mensaje);


//console.log('palabra',palabras );

            
let str = message.from;

str = str.substring(0, str.length - 5);


    //  console.log('numeros',str, telefono,  )
     // console.log('empresa ', empresa)
      if(str !==   telefono /* data.Contenido[0].emP_TELEFONO */   )
      {

      //  console.log('empresa dentro de telefono ', empresa)
        client.sendMessage(message.from, palabras.substring(17) /* empresa*/  );


      }
      else{
         client.sendMessage(message.from, 'numero no registrado en la base' );

      }
       //  res.json(data);
       } catch (error) {
         console.error(error);
         res.status(500).send('Error interno del servidor');
       }


} 

 

});
 

 

client.initialize();
 



app.get('/qr', (req, res) => {


  //function updateqr() {

 // setInterval(() => {
    
   // res.set('Cache-Control', 'no-cache');
    
  client.on('qr', qr => {


//    const  fecha = Date.now();

    const  fecha = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"numeric" , minute:"numeric", second:"numeric"}) 

  




    qrcode.generate(qr, {small: true}, function (code) {
      console.log(code);
    console.log('refresca Qr', fecha)


      res.send(`<!DOCTYPE html>

      <html>
     
          <head>
          <meta http-equiv="refresh" content="60">
              <title>titulo de la página</title>
          </head>
          <body>
          <div style="text-align:center" >
          </div>
         
          <h2> Codigo de QR para whassap web  ${fecha} </h2>
            <pre>${code}</pre>  
            
          </body>
      </html>`)
     // res.send(`<pre>${code}</pre>`);
    }) 
    
  
  });


  client.on('ready',    ()  => {

    console.log('Client is ready!');
  
  });


//}, 10000);


//setInterval(updateqr, 1 * 30 * 1000);




});


app.get('/api/cliente', async (req,res) => {
    try {
        const response = await axios.get('http://svapwebdev41/EvoWebApi/api/Empleado/GetByCiaId/422/226');
        const data = response.data;
        client.on('message', message => {
            if(message.body === 'hola mundo') {
                client.sendMessage(message.from, data);
            }
        });

        res.json(data);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
      }

   // res.send('enviar datos api')
} );

  


app.listen(3000, function () {
    console.log('La aplicación está en ejecución en http://localhost:3000');
  });


// app.get('/', function (req, res) {
//     res.send('Hola, mundo!');
//   });


