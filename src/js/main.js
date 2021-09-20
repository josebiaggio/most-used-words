const fs = require('fs')
const path = require('path')
const {
    readDirectory,
    filesWithExtensions,
    readFile,
    readFiles,
    removeElementsIfEmpty,
    removeElementsIfInclude,
    removeElementsIfOnlyNumber,
    removeSymbols,
    joinElements,
    separateTextBy,
    groupWords,
    sortByNumericAttribute,
    getThe100MostUsedWords
} = require('./functions.js')

const directoryPathSubtitles = path.join(__dirname, '..', '..', 'data', 'subtitles')
const promise = readDirectory(directoryPathSubtitles)

const symbols = [
    '.', '?', ',', '"', '♪', '_',
    '<i>', '</i>', '\r', '[', ']',
    '(', ')', '-', '!', '…'
]

const saveArrayToFile = array => {
    const file = path.join(__dirname, '..', 'json', 'mostUsedWords.json')
    const arrayInJSON = JSON.stringify(array)
    fs.writeFile(file, arrayInJSON, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log('File created successfully!')
        }
    })
}

promise
    .then(filesWithExtensions('.srt'))
    .then(readFiles)
    .then(joinElements)
    .then(separateTextBy('\n'))
    .then(removeElementsIfEmpty)
    .then(removeElementsIfInclude('-->'))
    .then(removeElementsIfOnlyNumber)
    .then(removeSymbols(symbols))
    .then(joinElements)
    .then(separateTextBy(' '))
    .then(removeElementsIfEmpty)
    .then(removeElementsIfOnlyNumber)
    .then(groupWords)
    .then(sortByNumericAttribute('amount'))
    .then(getThe100MostUsedWords)
    .then(saveArrayToFile)

const file = path.join(__dirname, '..', 'json', 'mostUsedWords.json')
let jsonArray = null

fs.readFile(file, 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
    } else {
        jsonArray = JSON.parse(jsonString)
        console.log(jsonArray)
    }
})