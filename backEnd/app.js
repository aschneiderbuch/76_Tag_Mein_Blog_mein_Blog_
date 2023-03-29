// imports
import express from 'express';  // zum bauen
import morgan from 'morgan';    // zum loggen
import cors from 'cors';        // für CORS Sicherheit
import multer from 'multer';    // für Bilder 
import { fileTypeFromBuffer } from 'file-type';   // für Bilder Buffern



// import files aus funktionen.js
import { loadFile, appendFile     } from './funktionen.js'




// ************* Variablen
const PORT = 9999
const app = express()

// **** für Bilder
const upload = multer( {
    storage: multer.memoryStorage(),   // für Magic Bite zum filtern von DateiEndungen
    limits: { fileSize: 200000}        // image Bild Größe begrenzen
})


// ************* Middelleware
// **** logger
app.use(morgan('dev'))

// **** CORS Sicherheit
app.use(cors({ origin: 'http://localhost:5173' }))

// **** React HEAD BODY JSON Parser
app.use(express.json())

// ************** static Routes 
// **** images
app.use("/images", express.static("./images"))
// **** admin Seite?
// **** Detail Seite?


// ************** für fetches
// **** GET



// **** POST



// **** PUT   ändern





// ************* Server Port
app.listen(PORT, () => {
    console.log("Server läuft auf Port: " + PORT)
})