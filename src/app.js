const yargs = require("yargs");
const { sequelize } = require("./db/connection");
const { createMovie } = require("./movies/function");

async function app(yargsInput) {
  await sequelize.sync({ alter: true });
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
    const updateDirector = await Movie.findOne({
      where: { director: yargsInput.director },
    });
    if (newDirector) {
      updateDirector.actor = yargsInput.director;
      await updateDirector.save();
      console.log("Director updated");
    } else {
      console.log("Not found");
    }
  } else if (yargsInput.delete) {
    //place code to delete a movie from our table here
    const movieDelete = await Movie.findOne({
      where: { title: yargsInput.title },
    });
    if (deletedMovie) {
      movieDelete.actor = yargsInput.title;
      await movieDelete.save();
      console.log("Movie deleted.");
    } else {
      console.log("Not found");
    }
  } else {
    console.log("Unrecognized Yargs command");
  }
}

app(yargs.argv);
