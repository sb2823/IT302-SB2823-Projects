#SadiaBarlas, 10/06/2024, IT302-451, Phase02 and sb2823@njit.edu.
const express = require('express');

const { MongoClient } = require('mongodb');

const app = express();

const port = 5000;


// MongoDB connection URL (replace with your MongoDB connection string)

const mongoUrl = 'mongodb://sb2823:121298@mongodb.net/it302';


// Define a function to connect to MongoDB and return the database object

async function connectToMongo() {

  const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });


  try {

    await client.connect();

    return client.db('it302');

  } catch (error) {

    console.error('Error connecting to MongoDB:', error);

    throw error;

  }

}


// Route to get films from MongoDB and return them as JSON

app.get('/films_sb2823', async (req, res) => {

  try {

    const db = await connectToMongo();


    // Remove the filter query

    const query = {};


    // Use the query object to find all films

    const films_sb2823 = await db.collection('films_sb2823').find(query).toArray();


    res.json(films_sb2823);

  } catch (error) {

    res.status(500).json({ error: 'Error fetching films from the database' });

  }

});


// Route to get films from MongDB and handle filtering based on the "title" field

app.get('/films_title_sb2823', async (req, res) => {

  try {

    const db = await connectToMongo();

   

    // Get the "title" filter from the query parameters

    const propertyTypeFilter = req.query.title;


    // Define a query object based on the filter, or an empty query if no filter is provided

    const query = propertyTypeFilter ? { title: propertyTypeFilter } : {};


    // Use the query object to find films that match the filter

    const films_sb2823 = await db.collection('films_sb2823').find(query).toArray();


    res.json(films_sb2823);

  } catch (error) {

    res.status(500).json({ error: 'Error fetching filtered films from the database' });

  }

});


// TODO Route to get films from MongoDB and handle filtering based on the "genre" field


// Start the server

app.listen(port, () => {

  console.log(`Server is running on http://localhost:${port}`);

});

