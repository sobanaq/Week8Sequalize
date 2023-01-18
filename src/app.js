const yargs = require("yargs");
const { sequelize } = require("./db/connection");
const { createMovie } = require("./movies/function");

async function app(yargsInput) {
  await sequelize.sync();
  if (yargsInput.create) {
    //place code to create a movie here
    await createMovie({
      title: yargsInput.title,
      actor: yargsInput.actor,
      director: yargsInput.director,
    });
  } else if (yargsInput.read) {
    //place code to list all our movies here
  } else if (yargsInput.updateActor) {
    //place code to update actor field here
  } else if (yargsInput.updateDirector) {
    //place code to update director field here
  } else if (yargsInput.delete) {
    //place code to delete a movie from our table here
  } else {
    console.log("Unrecognized Yargs command");
  }
}

app(yargs.argv);
