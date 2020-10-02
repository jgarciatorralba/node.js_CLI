// Bring in 'commander' dependency
const {
  program
} = require('commander');

// Add some basic info such as version and short description
program
  .version('1.0.0')
  .description('Command Line Interface for TMDb API');

// Some other commands
program
  .command('inspiration')
  .description('gives you a inspirational phrase')
  .alias('ins')
  .action(function(word='default'){
    if(word=='defaullt')console.log('you are configurable, want to program ?')
    else console.log('words have a value, how deep can you see it ?')
  })

// Test that CLI actually works
program.parse(process.argv);