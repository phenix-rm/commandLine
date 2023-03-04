const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const fs = require('fs')
const path = require('path')

let outFile 

yargs(hideBin(process.argv))
  .command(
    'file', 
    'output file name', 
    (yargs) => {
      return yargs
        .option('path', {
          alias: 'p',
          type: 'string',
          description: 'path to file with game results'
        })
    },
    (argv) => {
      if (argv.path) {
        console.log(argv.path);
        outFile = path.join(__dirname, argv.path)
      } 
    }
  ).argv

  fs.readFile(outFile, 'utf-8', (err, data) => {
    if(err) throw Error(err)
    const result = AnalizeFile(data)
    console.log(`
    общее количество партий: ${result.numberOfGames}
    количество выигранных партий: ${result.numberOfGames}
    количество проигранных партий: ${result.numberOfGames}
    процентное соотношение выигранных партий: ${result.percent}%
    `);
  })

  const AnalizeFile = (data) => {
    const result = {
      wins: 0,
      fails: 0
    }
    const games = data.split('\n')
    if (games[games.length-1] === '') {
      games.pop()
    }
    result.numberOfGames = games.length
    for (let game of games) {
      if (game === 'Вы выиграли!') {
        result.wins ++
      } else {
        result.fails ++
      }
    }
    const percent = Math.floor((result.wins / result.numberOfGames) * 100)
    result.percent = percent
    return result
  }