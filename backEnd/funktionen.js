import fs from 'fs'

/** ****************************************************************
 * 
 * * **** loadFile
 * 
 *** ****************************************************************/
export const loadFile = () => {
    // Promise für fetch
    return new Promise((resolve, reject) => {
        // liest Datei ./dpPosts.json
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
 * * **** saveFile
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