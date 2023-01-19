const yargs = require("yargs");
console.log("yargs imported");
const { sequelize } = require("./db/connection");
console.log("connection made");
const { createMovie } = require("./movies/function");
const Movie = require("./movies/table");
console.log("create movie imported");

async function app(yargsInput) {
  console.log("entering app");
  await sequelize.sync({ alter: true });
  console.log("sync complete");
  if (yargsInput.create) {
    console.log("entering create");
    //place code to create a movie here
    await createMovie({
      title: yargsInput.title,
      actor: yargsInput.actor,
      director: yargsInput.director,
    });
    //------------------------------------------------------------------------------------------------------
  } else if (yargsInput.read) {
    //place code to list all our movies here
    const results = await Movie.findAll({});
    // console.log(results);
    const newArray = [];
    //Firstly, you need to create a for loop, type for and in VSC list of options select second 'for' with the box icon.
    //This brings up a for loop with 'let index'.
    //Replace the word array in the statement (appear twice) with result as we want a list element of results, 
    //This is an ARRAY represented by [].
    //We then want to find some fields and list them. we therefore const 'FIELD' = results[index].'FIELD'
    //try the command 'node src/app.js --read'. This will list everthing in those fields. We want it neat in a table now.
    //Secondly,we need to create a new array for the results to be put into a table. SEE BELOW.
  }
  for (let index = 0; index < results.length; index++) {
    const element = results[index];
    const title = results[index].title;
    const actor = results[index].actor;
    const director = results[index].director;
    newArray.push({ title: title, actor: actor, director: director });
    //This is a new array where we are saying find title, actor and director and push this data
    //onto the new array. Then we use console.table(newArray-this is what we called the new array see line 25).
    //The data pushed onto the newArray now displays as a neat table.
    // console.log(title, actor, director);
  }
  console.table(newArray);
    //------------------------------------------------------------------------------------------------------
  } else if (yargsInput.updateActor) {
    //place code to update actor field here
    const updateActor = await Movie.findOne({
      where: { title: yargsInput.title },
    });
    if (updateActor) {
      updateActor.actor = yargsInput.actor;
      await updateActor.save();
      console.log("Actor updated");
    } else {
      console.log("Not found");
    }
    //------------------------------------------------------------------------------------------------------
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
    //------------------------------------------------------------------------------------------------------
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

app(yargs.argv);
