# simpleRestfulApi
A simple restful api using Node, Express and MySQL.  This project creates a restful api, allowing users to create lists of cities they have visited.

#Getting Started
1. In terminal, navigate to the root project folder and run npm install
2. Create a mySQL database and import the seed data from the data folder
3. In the /config folder, rename config_example.json to config.json and add your database credentials
4. Enjoy!
5. 
#API
1. List all cities in a state.  {state} = State's abbreviation.  
	- `GET /v1/states/{state}/cities`
	- example: Get California cities.
	- http://yourdomain.com/v1/states/ca/cities

2. List cities within an N mile radius
	- `GET /v1/states/{state}/cities/{city}?radius=SOMEDISTANCE`
	- example: Get cities within 100mi of San Francisco.
	- http://yourdomain.com /v1/states/ca/cities/san%20francisco?radius=100
 
3. Allow a user to update a row of data to indicate they have visited a particular city. {user} = The user's id.
	- `POST /v1/users/{user}/visits`
	- example: Add San Francisco to user's list with user id = 20
	- http://yourdomain.com/v1/users/20/visits
	- Post Data
	```
	{
		"city": "San Francisco",
		"state": "CA"
	}
	```
4. Return a list of cities the user has visited. {user} = The user's id.
	- `GET /v1/users/{user}/visits`
	- example: Get all visited cities for user with id = 20
	- http://yourdomain.com/v1/users/20/visits
	

