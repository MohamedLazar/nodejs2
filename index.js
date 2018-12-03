#!/usr/bin/env node

//Modules
const program = require('commander')
const inquirer = require('inquirer')

//Initialisation des variables
var api = require('marvel-api')
var marvel = api.createClient({
  publicKey: 'aca2d23f5a7b7daad9c7b61f1069afa6',
  privateKey: 'e7f4caec2d1d2ab015e90fe14f6f0485b74212ac'
})

//On enumere les options
program
  .version('1.0.0')
  .option('-c, --character', 'Affiche un personnage')
  .option('-a --all', 'Afficher tous les personnages')
program.parse(process.argv)

//MAIN
if (program.character) {
  inquirer.prompt([
    {
     type:'input',
     message:'Saisissez le nom du personnage : ',
     name:'charname'
    }
  ]).then((answers)=>{	  
    marvel.characters.findByName(answers.charname)
	      .then(console.log)
	      .fail(console.error)
	      .done()
  })
}

else if(program.all) {
  marvel.characters.findAll()
	  .then(console.log)
	  .fail(console.error)
	  .done()
}
else {
  program.help()
}   

