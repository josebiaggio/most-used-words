const fs = require('fs')
const path = require('path')

const readDirectory = pathOfADirectory => {
    return new Promise((resolve, reject) => {
        try {
            let filePaths = fs.readdirSync(pathOfADirectory)
            const createAbsolutePath = filePath => path.join(pathOfADirectory, filePath)
            const absoluteFilePaths = filePaths.map(createAbsolutePath)
            resolve(absoluteFilePaths)
        } catch (e) {
            reject(e)
        }
    })
}

// Filtra os arquivos terminados com uma determinda extensão
const filesWithExtensions = pattern => array => array.filter(file => file.endsWith(pattern))

const readFile = absolutePath => {
    return new Promise((resolve, reject) => {
        try {
            const content = fs.readFileSync(absolutePath, { encoding: 'utf-8' })
            resolve(content.toString())
        } catch(e) {
            reject(e)
        }
    })
}

const readFiles = absolutePaths => Promise.all(absolutePaths.map(absolutePath => readFile(absolutePath)))

// Remove strings vazias
const removeElementsIfEmpty = array => array.filter(element => element.trim())

// Remove linhas que tiverem um determinado padrão incluído
const removeElementsIfInclude = pattern => array => array.filter(element => !element.includes(pattern))

// Remove linhas com apenas números
const removeElementsIfOnlyNumber = array => {
    return array.filter(element => {
        const number = parseInt(element.trim())
        return number !== number
    })
}

const removeSymbols = symbols => {
    return array => {
        return array.map(element => {
            let newLine = element
            symbols.forEach(symbol => {
                newLine = newLine.split(symbol).join('')
            })
            return newLine
        })
    }
}

const joinElements = contents => contents.join(' ')

const separateTextBy = symbol => {
    return text => {
        return text.split(symbol)
    }
}

// Agrupa palavras iguais
const groupWords = words => {
    return Object.values(words.reduce((accumulator, word) => {
        const element = word.toLowerCase()
        const amount = accumulator[element] ? accumulator[element].amount + 1 : 1
        accumulator[element] = { word: element, amount }
        return accumulator
    }, {}))
}

const sortByNumericAttribute = (attribute, order = 'downward') => {
    return array => {
        const upward = (o1, o2) => o1[attribute] - o2[attribute]
        const downward = (o1, o2) => o2[attribute] - o1[attribute]
        return array.sort(order === 'upward' ? upward : downward)
    }
}

const getThe100MostUsedWords = array => {
    const the100MostUsedWords = []
    for (let count = 0; count < 100; count++) {
        let element = array[count]
        the100MostUsedWords.push(element)
    }
    return the100MostUsedWords
}

module.exports = {
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
}