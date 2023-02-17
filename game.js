const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });
const number = Math.floor(Math.random() * 100) + 1;

const game = (title) => {
  rl.question(`${title}`, (answer) => {
    if (answer == number) {
      console.log(`Отгадано число: ${answer}`);
      rl.close();
    } else if (answer < number) {
      console.log('Больше');
      game('')
    } else {
      console.log('Меньше');
      game('')
    }
  });
}

game('Загадано число в диапазоне от 0 до 100  \n')
