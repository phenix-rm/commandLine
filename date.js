const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const currentDate = new Date()

yargs(hideBin(process.argv))
  .command(
    'current', 
    'get current date', 
    (yargs) => {
      return yargs
        .option('year', {
          alias: 'y',
          type: 'boolean',
          description: 'get current year'
        })
        .option('month', {
          alias: 'm',
          type: 'boolean',
          description: 'get current month'
        })
        .option('date', {
          alias: 'd',
          type: 'boolean',
          description: 'get current date'
        })
    },
    (argv) => {
      if (argv.year) {
        console.log(currentDate.getFullYear())
      } else if (argv.month) {
        console.log(currentDate.getMonth() + 1)
      } else if (argv.date) {
        console.log(currentDate.getDate())
      } else {
        console.log(currentDate.toISOString())
      }
    }
  )
  .command(
    'add',
    'add date to current',
    (yargs) => {
      return yargs
        .option('year', {
          alias: 'y',
          type: 'number',
          description: 'add year'
        })
        .option('month', {
          alias: 'm',
          type: 'number',
          description: 'add month'
        })
        .option('date', {
          alias: 'd',
          type: 'number',
          description: 'add date'
        })
    },
    (argv) => {
      if (argv.year) {
        console.log(new Date(currentDate.setFullYear(currentDate.getFullYear() + argv.year)).toISOString())
      } else if (argv.month) {
        console.log(new Date(currentDate.setMonth(currentDate.getMonth() + argv.month)).toISOString())
      } else if (argv.date) {
        console.log(new Date(currentDate.setDate(currentDate.getDate() + argv.date)).toISOString())
      } else {
        console.log('nothing')
      }
    }
  )
  .command(
    'sub',
    'subtract date from current',
    (yargs) => {
      return yargs
        .option('year', {
          alias: 'y',
          type: 'number',
          description: 'subtract year'
        })
        .option('month', {
          alias: 'm',
          type: 'number',
          description: 'subtract month'
        })
        .option('date', {
          alias: 'd',
          type: 'number',
          description: 'subtract date'
        })
    },
    (argv) => {
      if (argv.year) {
        console.log(new Date(currentDate.setFullYear(currentDate.getFullYear() - argv.year)).toISOString())
      } else if (argv.month) {
        console.log(new Date(currentDate.setMonth(currentDate.getMonth() - argv.month)).toISOString())
      } else if (argv.date) {
        console.log(new Date(currentDate.setDate(currentDate.getDate() - argv.date)).toISOString())
      } else {
        console.log('nothing')
      }
    }
  ).argv