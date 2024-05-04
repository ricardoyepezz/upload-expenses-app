import React from 'react';
import openai from '../../api/openai';



const Main = () => {

    async function main() {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Extrae la fecha y el monto total de la imagen y trae la respuesta en formato json como el siguiente ejemplo data { amount: monto total de la boleta, date: fecha de la boleta }" },
                        {
                            type: "image_url",
                            image_url: {
                                "url": "https://www.softwarepuntodeventa.cl/wp-content/uploads/2019/04/boleta-electronica.jpg",
                            },
                        },
                    ],
                },
            ],
        });
        console.log(response.choices[0].message.content);
    }

     main();


    // const { google } = require('googleapis');

    // async function writeToSheet(auth, spreadsheetId, range, values) {
    //     const sheets = google.sheets({ version: 'v4', auth });
    //     const resource = {
    //         values,
    //     };
    //     const result = await sheets.spreadsheets.values.update({
    //         spreadsheetId,
    //         range,
    //         valueInputOption: 'USER_ENTERED',
    //         resource,
    //     });
    //     return result;
    // }

    // async function main() {
    //     const auth = new google.auth.GoogleAuth({
    //         scopes: ['https://www.googleapis.com/auth/spreadsheets']
    //     });
    //     const client = await auth.getClient();
    //     const spreadsheetId = 'Expenses report TEST'; // Sustituye por el ID real de tu hoja de cálculo
    //     const range = 'Sheet1!B12'; // Ajusta según la hoja y celda donde deseas empezar a escribir
    //     const values = [
    //         ['Fecha', 'Monto', 'Link'], // Encabezados de columna
    //         ['2021-12-25', '123.45', 'hols'] // Datos a almacenar
    //     ];
    //     const result = await writeToSheet(client, spreadsheetId, range, values);
    //     console.log(result.status, result.statusText);
    // }

    // main();

    return (
        <>
        </>
    );

};


export default Main;
