# Restaurant List


## Pictures
![image](https://github.com/angushyx/Restaurant-Express/blob/main/public/image/hmoePage.png?raw=true)
![image](https://github.com/angushyx/Restaurant-Express/blob/main/public/image/loginPage.png?raw=true)

## Features
:star2: Shows all restaurants in homepage.  
:star2: Click for further information of each restaurant.  
:star2: Search restaurants by keywords(Use comma to separate keywords).  
:star2: Sort restaurants by name, category, location or rating.  
:star2: Add, edit, delete restaurants if needed.  
:star2: Click to get google map of the restaurant.
:star2: Support MongoDB to manage data.  
:star2: Member authentication system by Usage Database.

### homePage
- searching restaurants by name and category
- click on the desired restaurant to view detailed information
- click on login button to login page
### restaurant detail page
- show detail of the restaurant
- link restaurant location to google map
### login page
- login function
- login in by social media


### Installing

:heavy_check_mark: Clone or download the project to your local machine.  

1. open the terminal and clone this project to your local machine
```bash
git clone <folder_name> https://github.com/angushyx/Restaurant-Express.git
```

2. Open the terminal and go to the folder where this file is stored
```bash
cd Restaurant-Express
```
:heavy_check_mark: Get into your project folder by `Terminal` and run:  
```bash
npm install
```
### HOW TO USE

:heavy_check_mark: Create a .env file for storing environment variables
Copy the connection string from MongoDB Atlas and place it in .env file
```bash
MONGODB_URI=<your connection string>
```
:heavy_check_mark:  Run the following command after install finished.  
```bash
# seeder for test data (8 seeds provided)
npm run seed

# start the app
# Be sure your current working directory is root, or it might cause .env loading error!
npm run dev
```
:heavy_check_mark:  Open browser to the URL if you see following message in console.  
```bash
Practice Express on http://localhost3000
mongodb connected!
```

### Now you can type in any browser http://localhost3000 to use this project

## Development tools
- Node.js @ 10.15.0
- Express @ 4.17.3
- Express-Handlebars @ 3.0.0
- Bootstrap @ v5.1.3
- Font-awesome @ 6.0
- body-parser @ 1.20.0
- cookie-parser @ 1.4.6
- mongoose @ 6.3.0

[angushyx](https://github.com/angushyx)