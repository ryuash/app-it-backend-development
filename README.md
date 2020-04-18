# Open Weather Map API
This is a node server that uses express and [openweathermap's](https://openweathermap.org/) api to fetch the current weather in Hong Kong.

## Quick start
###  Prerequisites
If you haven't already, go ahead and set up [Docker](https://www.docker.com/) as we will be using this to set up our environment.

Create a free account at [openweathermap](https://openweathermap.org/) to get their Apikey. We'll be needing that in our app.

Before we spin up the containers, we need to first go to the root of our project and in the terminal run `touch .env database.env`.

**.env** requires the following:
`WEATHER_APP_ID` - The Apikey given to you by [openweathermap](https://openweathermap.org/)
`NODE_ENV` - The current environment you're in. (development in this case)
`POSTGRES_PASSWORD` - For dev purposes we'll be leaving this as `password`
`POSTGRES_USER` - For dev purposes we'll be leaving this as `root`
`JWT_SECRET` - A secret string for authentication (keep this private!)

**database.env** requires the following:
`POSTGRES_PASSWORD` - For dev purposes we'll be leaving this as `password`
`POSTGRES_USER` - For dev purposes we'll be leaving this as `root`

###  Spinning up the containers
In your terminal, make sure you're in the root of your project.
Run `docker-compose up`
This will take a minute or two as this is the first time you're initializing the containers.
If you see `Winging it up on port 3000` you should be good to go!

In the event that node times out before postgres was finish setting up you can open a new terminal and run `docker ps -a`, find the container named `app-it-development` and run `docker start app-it-development`. If the container does not exist, Exit the current running containers and run `docker-compose up` again.

### Seeding data
Before we are able to use `GET /weather` we need to seed our user database.

In a new terminal run `docker ps` for a list of currently active containers. There should be a container named `app-it-development`. To enter, run `docker exec -it app-it-development /bin/sh`. 

Once inside, run `npm run seed`. Exit when you're done.

### Getting JWT token
Because our `GET /weather` api requires authentication, we're going to need to login. Prior to this step we seeded the database with a base user. We're now going to use that base user to get our JWT Token. 

In your terminal, run `curl -d "email=weather@email.com&password=123" http://localhost:3000/login`

It should response with something like: `{ "token" : [your jwt token] }`

### Using the weather api
DUN DUN DUN....We now have everything we need to use `GET /weather`!
Using the token you just aquired from `POST /login`, in you terminal, run:
`curl -H "Authorization: Bearer <token>" http://localhost:3000/weather`.

If everything went according to plan, we should see a json data returning something like this returning: 
`{
  "coord": {
    "lon": 114.16,
    "lat": 22.29
  },
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 296.34,
    "feels_like": 298.07,
    "temp_min": 295.93,
    "temp_max": 297.04,
    "pressure": 1013,
    "humidity": 78
  },
  "wind": {
    "speed": 2.24,
    "deg": 90
  },
  "clouds": {
    "all": 100
  },
  "dt": 1587218582,
  "sys": {
    "type": 3,
    "id": 47808,
    "country": "HK",
    "sunrise": 1587160844,
    "sunset": 1587206653
  },
  "timezone": 28800,
  "id": 1819729,
  "name": "Hong Kong",
  "cod": 200
}`

## Misc
If you want to have a look at your database, go to `localhost:8001` in your browser, you should be able to pull up adminer. For dev purposes the credentials are:
**system**	: PostgreSQL
**server**: postgres
**username**: root
**password**: password

## Available Scripts
In this project directory, you can run:
`npm start` 
Runs the server in production mode pointing to the build in the `dist` folder.

`npm run dev`
Runs the server in development mode on `http://localhost:3000/`.

`npm build`
Builds the server for production to the `dist` folder.

`npm test`
Runs any test in the folder marked as *.spec.ts using mocha.

`npm run seed`
Drops the current tables and reseeds.

## Overall Comments
**Features**
Start-up scripts were created and implemented to run with docker-compose in order to ease and automate the initializing as much as possible. Adminer was included in case the developer wanted to have visuals at what's happening without extra set up.

**Known Issues**
Overall the tests do work, however, there were ocassions where sequelize was trying to create the same table more than once at the same time causing a validation error. A brute force fix would be to run the tests all in the same file.
