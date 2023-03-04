const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, 'game-results')

fs.stat(dir, function(err) {
  if (err) {
    fs.mkdir(dir, (err) => {
     if (err) throw Error(err)
    })
  }
});

let outFile = path.join(__dirname, 'game-results', 'defaultFile.txt')

yargs(hideBin(process.argv))
  .command(
    'start', 
    'start game', 
    (yargs) => {
      return yargs
        .option('file', {
          alias: 'f',
          type: 'string',
          description: 'set output file name'
        })
    },
    (argv) => {
      if (argv.file) {
        outFile = path.join(__dirname, 'game-results', argv.file)
      } 
    }
  ).argv

const rl = readline.createInterface({ input, output });
const number = Math.floor(Math.random() * 2) + 1

let result = ''
const game = (title) => {
  rl.question(`${title}`, (answer) => {
    if (answer == number) {
      result = 'Вы выиграли!\n'
      fs.appendFile(outFile, result, (err) => {
        if(err) throw Error(err)
      })
      console.log(`Результаты игры в ${outFile}`);
      rl.close();
    }  else {
      result = 'Вы проиграли :(\n'
      fs.appendFile(outFile, result, (err) => {
        if(err) throw Error(err)
      })
      console.log(`Результаты игры в ${outFile}`);
      rl.close();
    }
  });
}

game('Испытайте удачу! Выберите: 1 (орел) или 2 (решка) \n')
