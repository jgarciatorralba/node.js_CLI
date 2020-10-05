#!/usr/bin/env node

// Bring in 'commander' dependency
const { program } = require("commander");

// Add some basic info such as version and short description
program.version("1.0.0").description("Command Line Interface for TMDb API");

// Implement command 'get-persons'
program
  .command("get-persons")
  .description("Make a network request to fetch the most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption(
    "--page <page>",
    "The page of persons data results to fetch",
    1 // Default value set to page 1
  )
  .action((command) => {
    // Get required page
    let page = command.page;
    // Bring in the API Key from '.env' file
    require("dotenv/config");
    let apiKey = process.env.API_KEY;
    // Base URL
    let url = "https://api.themoviedb.org/3/person/";
    // let url = "https://api.themovied"; // Wrong url to force error
    if (command.popular) url += "popular?";
    url += "page=" + page + "&" + "api_key=" + apiKey;

    // Require dependency 'ora'
    const ora = require("ora");
    // Require dependency 'chalk'
    const chalk = require("chalk");
    // Start spinner
    const spinner = ora(
      chalk.yellowBright("Fetching the popular person's data...\n")
    ).start();
    // Bring in the 'http' module
    const https = require("https");
    https
      .get(url, (resp) => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          let parsedData = JSON.parse(data);
          if (parsedData.success !== undefined && !parsedData.success) {
            spinner.warn(parsedData.status_message);
          } else {
            let currentPg = parsedData.page;
            let totalPgs = parsedData.total_pages;
            let persons = parsedData.results;
            // Page number
            if (totalPgs > currentPg) {
              console.info(
                chalk.white("\n----------------------------------------")
              );
              console.info(
                chalk.white("Page " + currentPg + " of " + totalPgs)
              );
            }
            // Persons data
            persons.forEach((person) => {
              console.info(
                chalk.white("----------------------------------------\n")
              );
              console.info(chalk.white("Person:\n"));
              console.info(chalk.white("ID: " + person.id));
              console.info(`Name: ${chalk.blue.bold(person.name)}`);
              if (person.known_for_department === "Acting") {
                console.info(
                  `Department: ${chalk.magenta(person.known_for_department)}`
                );
              }
              // Movies data
              let movies = person.known_for;
              let noMoviesWithTitle = true;
              movies.forEach((movie) => {
                if (movie.title !== undefined) {
                  noMoviesWithTitle = false;
                }
              });
              if (noMoviesWithTitle) {
                console.info(
                  "\n" +
                  chalk.redBright(
                    `${person.name} doesn't appear in any movie`
                  ) +
                  "\n"
                );
              } else {
                console.info(chalk.white("\nAppearing in movies:"));
                movies.forEach((movie) => {
                  if (movie.title !== undefined) {
                    console.info(chalk.white("\n\tMovie:"));
                    console.info(chalk.white("\tID: " + movie.id));
                    console.info(
                      chalk.white("\tRelease date: " + movie.release_date)
                    );
                    console.info(chalk.white("\tTitle: " + movie.title + "\n"));
                  }
                });
              }
            });
            // Ending spinner
            console.info(chalk.white("\n"));
            spinner.succeed(chalk.white("Popular Persons data loaded\n"));
          }
        });
      })
      .on("error", (e) => {
        // Handle http error with 'ora.fail()'
        spinner.fail(chalk.bgRed("Error: " + e.message));
      });
  });

//------------------------------Person details------------------------------------------
program.command('get-person')
  .description('Make a network request to fetch the data of a single person')
  .requiredOption('i, --id <num>', 'The id of the person',)
  .action((cli) => {
    const chalk = require('chalk')
    const ora = require('ora')
    const spinner = ora(chalk.yellowBright('Fetching the person data...')).start()
    const https = require('https')
    require('dotenv/config')
    // const url = 'https://api.themoviedb.org/3/person/' + cli.id + '?api_key=1a20d213f4f948df52672a96ed05965a'
    const url = 'https://api.themoviedb.org/3/person/' + cli.id + '?api_key=' + process.env.API_KEY
    https
      .get(url, (resp) => {
        let data = ""
        resp.on('data', (d) => {
          data += d
        })
        resp.on('end', () => {
          const dataObj = JSON.parse(data)
          if (dataObj.success == false) {
            spinner.warn(chalk.bgYellow(chalk.black(dataObj.status_message)))
          } else {
            console.log(chalk.white('\n----------------------------------------'))
            console.log(chalk.white('Person: \n'))
            console.log(chalk.white('ID: ' + dataObj.id))
            console.log(chalk.white('Name: ') + chalk.green(dataObj.name))
            console.log(chalk.white('Birthday: ' + dataObj.birthday + ' | ' + dataObj.place_of_birth))
            console.log(chalk.white('Department: ') + chalk.redBright(dataObj.known_for_department))
            console.log(chalk.green('Biography: ' + dataObj.biography))
            console.log(chalk.white('Also known as: \n'))
            console.log(chalk.white(dataObj.also_known_as[0]))
            spinner.succeed(chalk.bgGreen('Person data loaded !'))
          }
        })
      })
      .on("error", (e) => {
        spinner.fail(chalk.bgRed(chalk.black('oh no somethings wrong, that is going on here ?')))
        console.log(chalk)
      })
  })
program
  .command('get-movies')
  .description('Make a network request to fetch movies')
  .requiredOption('--page <number>', 'The page of movies data results to fetch')
  .option('-p, --popular', 'Fetch the popular movies')
  .option('-n, --now-playing', 'Fetch the movies that are playing now')
  .action((cli)=>{
    const ora = require('ora')
    const spinner = ora('Fetching the movies data...\n').start()
    const chalk = require('chalk')
    require('dotenv/config')
    const options = {
      hostname: 'api.themoviedb.org',
      port: 443,
      path: '/3/movie/popular?page='+cli.page+'&api_key='+process.env.API_KEY,
      method: 'GET'
    }
    let message = 'Popular movies data loaded'
    // let url = 'https://api.themoviedb.org/3/movie/popular?page='+cli.page+'&api_key='+process.env.API_KEY
    if(cli.nowPlaying){
      // url = 'https://api.themoviedb.org/3/movie/now_playing?page='+cli.page+'&api_key='+process.env.API_KEY
      options.path = '/3/movie/now_playing?page='+cli.page+'&api_key='+process.env.API_KEY
      message = 'Movies playing now data loaded'
    }
    const https = require('https')
    let data = ""
    https.request(options, req=>{
      req.on('data', (res)=>{
        data += res
      })
      req.on('end', ()=>{
        const dataObj = JSON.parse(data)
        dataObj.results.forEach(movie=>{
          console.log(chalk.white('Movie: \n'))
          console.log(chalk.white('ID: ' + movie.id))
          console.log(chalk.white('Title: ') + chalk.blue(movie.title))
          console.log(chalk.white(`Relese Date: ${movie.release_date}
          
          
          `))
        })
        if(dataObj.total_pages > dataObj.page){
          console.log(chalk.white('----------------------------------------'))
          console.log(chalk.white('Page: ' + dataObj.page + " of: " + dataObj.total_pages + '\n'))
        }
        spinner.succeed(chalk.bgGreen.black(message))
      })
    }).end()
  })
program
  .command('get-movie')
  .description('Make a network request to fetch data of a single movie')
  .requiredOption('-i, --id <id>', 'The id of the movie')
  .option('-r, -reviews', 'Fetch the reviews of the movie')
  .action(cli=>{
    const ora = require('ora')
    const spinner = ora('Fetching the movie data...\n')
    spinner.spinner = ('unicorn')
    spinner.color = ('yellow')
    spinner.start()
    require('dotenv/config')
    let url = 'https://api.themoviedb.org/3/movie/' + cli.id
    if(cli.reviews){
      url = 'https://api.themoviedb.org/3/movie/' + cli.id + '/reviews'
    }
    url += '?api_key=' + process.env.API_KEY
    const options = new URL(url)
    const https = require('https')
    https.request(options, (req)=>{
      let data = ''
      const chalk = require('chalk')
      req.on('data', (d)=>{
        data += d
      })
      req.on('error', err=>{
        spinner.fail(err)
      })
      req.on('end', ()=>{
        const dataObj = JSON.parse(data)
        if(dataObj.success == false){
          spinner.warn(dataObj.status_message)
        }else{
          console.log('------------------------------------------------------------\n\n')
          console.log(chalk.white('ID: ' +dataObj.id))
          console.log(chalk.white('Title :') + chalk.blue(dataObj.title))
          console.log(chalk.white('Release Date :' +dataObj.release_date))
          console.log(chalk.white('Runtime :' +dataObj.runtime))
          console.log(chalk.white('Vote Count :' +dataObj.vote_count))
          console.log(chalk.white('Overview :' +dataObj.overview + '\n\n'))
          console.log(chalk.white('Genres :\n'))
          if(dataObj.genres.length < 0){
            console.log(chalk.yellow('The movie does not have a declared genre'))
          }else{
            dataObj.genres.forEach(genre => {
              console.log(chalk.white(genre.name))
            })
          }
          console.log(chalk.white('\n'))
          if(dataObj.spoken_languages.length < 0){
            console.log(chalk.yellow('The movie ' + dataObj.title + ' does not have a declared genre'))
          }else{
            dataObj.spoken_languages.forEach(language => {
              console.log(chalk.white(language.name))
            })
          }
          console.log(chalk.white('\n'))
          // console.log(dataObj)
          spinner.succeed('Movie data loaded !')
        }
      })
    })
    .end()
    
  })
  // Catch all arguments passed by the command line
  program.parse(process.argv);
