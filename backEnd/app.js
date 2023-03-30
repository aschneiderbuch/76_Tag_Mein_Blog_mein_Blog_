/** ****************************************************************
 * 
 * * ************* imports
 * 
 *** ****************************************************************/
import express from 'express';  // zum bauen
import morgan from 'morgan';    // zum loggen
import cors from 'cors';        // für CORS Sicherheit
import multer from 'multer';    // für Bilder 
import { fileTypeFromBuffer } from 'file-type';   // für Bilder in Buffer / Memory
import fs from 'fs';            // für Bilder


// *** import      files aus funktionen.js
import { loadFile, appendFile } from './funktionen.js'



/** ****************************************************************
 * 
 * * ************* Variablen
 * 
 *** ****************************************************************/
const PORT = 9999
const app = express()

/** ****************************************************************
 * 
 * * **** für Bilder
 * 
 *** ****************************************************************/
const upload = multer({
    storage: multer.memoryStorage(),   // für Magic Bite zum filtern von DateiEndungen
    limits: { fileSize: 200000 }        // image Bild Größe begrenzen
})




/** ****************************************************************
 * 
 * * ************* Middelleware
 * 
 *** ****************************************************************/
// **** logger
app.use(morgan('dev'))

// **** CORS Sicherheit
app.use(cors({ origin: 'http://localhost:5173' }))

// **** React HEAD BODY JSON Parser
app.use(express.json())

/** ****************************************************************
 * 
 * * ************** static Routes 
 * 
 *** ****************************************************************/
// **** images
app.use("/images", express.static("./images"))
// **** admin Seite?
// **** Detail Seite?


/** ****************************************************************
 * 
 * * ************** für fetches
 * 
 *** ****************************************************************/

/** ****************************************************************
 * 
 * * **** GET
 * 
 *** ****************************************************************/



/** ****************************************************************
 * 
 * * **** POST
 * 
 *** ****************************************************************/
// ** Prüfung Datei Endung             im Buffer, bevor es ins fs geschrieben wird
fileTypeFromBuffer(req.file.buffer)
    .then(result => {
        if (result.ext === 'png' || result.ext === 'jpeg' || result.ext === 'jpg') {

            // dadurch bekommt er Einzigartigen Faktor, da in Millisekunden 
            let filename = new Date().getTime()
            filename += '.' + result.ext

            // Bilder ins fs schreiben 
            fs.writeFile('./images/' + filename, req.file.buffer, (err) => {
                if (err) console.log(err)
                else {

                    // Bild zum bestehenden Objekt data hinzufügen    
                    data.image = filename
                    console.log(data)

                    // ** jetzt ganze data Objekt ins fs schreiben   in die db_Posts.json

                }
            })

        }
        else {
            result.status(418).end()  // gehört zur if Prüfung Datei Endung
        }
    })
    .catch(err => () => {
        console.log(err)
    })

/** ****************************************************************
 * 
 * * **** PUT   ändern
 * 
 *** ****************************************************************/






/** ****************************************************************
 * 
 * * ************* Server Port
 * 
 *** ****************************************************************/
app.listen(PORT, () => {
    console.log("Server läuft auf Port: " + PORT)
})