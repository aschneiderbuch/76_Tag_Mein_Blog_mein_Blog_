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
let count_id_POST = 0


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
/* app.use(express.json()) */
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
 * * **** GET       fetch       ALLE  Post
 * 
 *** ****************************************************************/
app.get("/api/v1/getPost", (req, res) => {

    loadFile()
        .then(data => res.json(data))

        .catch(err => () => console.log(err))
})


/** ****************************************************************
 * 
 * * **** GET       fetch       sucht nach  ID  Post
 * 
 *** ****************************************************************/
app.get("/api/v1/getPost/:id", (req, res) => {
    const { id } = req.params
    console.log(id)

    loadFile()
        .then(data => res.json(data[id-1]))  // da Array ja bei 0 beginnt, der Counter aber den ersten Post mit 1 macht
      


        .catch(err => () => console.log(err))

})




/** ****************************************************************
 * 
 * * **** POST          fetch
 *  ! sollte ID haben wenn er kommt, zwecks Detail Seite    Route :id und mit param 
 * 
 *** ****************************************************************/
// * upload.single lädt Middleware für multer    lädt das Einzelne Bild/Image mit !wichtig"postImage"-muss auch im FrontEnd so sein 
// * dann wird der rest vom POST Endpunkt weiter geladen /api/v1/addPost
app.post("/api/v1/addPost", upload.single("postImage"), (req, res) => {
    const data = req.body
    console.log(data)

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
                        console.log(count_id_POST)
                        count_id_POST++
                        data.id = count_id_POST

                        // ** jetzt ganze data Objekt ins fs schreiben   in die db_Posts.json
                        appendFile(data)
                            .then(newData => res.json(newData))
                            .catch(err => console.log(err))
                        console.log(req.file)
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

})



/** ****************************************************************
 * 
 * * **** PUT   ändern      fetch
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

