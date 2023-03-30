/** ****************************************************************
 * 
 * * ************* imports
 * 
 *** ****************************************************************/
import fs from 'fs'
import { constants } from 'fs/promises'






/** ****************************************************************
 * 
 * * **** loadFile              readFile
 * 
 *** ****************************************************************/
export const loadFile = () => {
    // Promise für fetch
    return new Promise((resolve, reject) => {
        // liest Datei ./dp_Posts.json
        fs.readFile('./db_Posts.json', (err, data) => {
            if (err) reject(err)
            else {
                resolve(JSON.parse(data.toString()))
            }
        })
    })
}


/** ****************************************************************
 * 
 * * **** saveFile              writeFile
 * 
 *** ****************************************************************/
export const saveFile = (data) => {
    // Promise
    return new Promise((resolve, reject) => {
        // schreiben    null + 2 = Zeilenumbrüche
        fs.writeFile('./db_Posts.json', JSON.stringify(data, null, 2), (err) => {
            if (err) reject(err)
            else {
                resolve("Daten wurden erfolgreich geschrieben")
            }
        })
    })

}


/** ****************************************************************
 * 
 * * **** appendFile   hinzufügen       
 * 
 *  loadFile ()  dann -> saveFile ()
 * 
 *** ****************************************************************/
export const appendFile = (newPost) => {
    // Promise
    return new Promise((resolve, reject) => {
        // loadFile () einlesen
        loadFile()
            .then(oldPost => {
                // * neue Daten die oben übergeben werden     mit alten zusammenführen aus db_Posts.json zusammenführen
                const newData = [...oldPost, newPost]
                // saveFile () speichern
                saveFile(newData)
                    .then(res => resolve(newData))

                    .catch(err => reject(`--> Fehler saveFile ${err}`))
            })

            .catch(err => reject(`--> Fehler loadFile ${err}`))
    })
}


/** ****************************************************************
 * 
 * * **** counter   hochzählen       
 * * erzeugt counter Datei und zählt bei jedem Post hoch
 *          * prüft erzeugt Datei, lädt, zählt hoch schreibt
 * 
 *** ****************************************************************/
export const counterFunktion = () => {
    // Promise
    return new Promise((resolve, reject) => {

        // * prüft ob Datei existiert
        fs.access('./counter.txt', constants.F_OK, (err) => {
            if (err) {
                // * erzeugt Datei, wenn nicht vorhanden mit Anfangswert
                fs.writeFile('./counter.txt', '0', 'utf-8', (err) => {
                    if (err) reject(err)
                    else {
                        resolve(0)
                    }
                })
            }
            else {
                // * wenn da, dann lesen
                fs.readFile('./counter.txt', 'utf-8', (err, data) => {
                    if (err) reject(err)
                    else {
                        let count = parseInt(data)

                        // * hochzählen
                        count++

                        // * in Datei schreiben
                        fs.writeFile('./counter.txt', count.toString(), 'utf-8', (err) => {
                            if (err) reject(err)
                            else {

                                console.log(count)
                                resolve(count)
                            }
                        })
                    }
                })
            }
        })
    })
}

