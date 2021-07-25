# invoice-generator
Custom Invoice Generator from which you can keep track of your Invoices and also mail invoice directly to the paying party.

### To start Project on your Local machine
 - First clone this repo
 - open the cloned folder in terminal and enter `cd client && npm install` to install all client side dependencies.
 - After installing all client side dependencies come out back to the cloned folder and run `npm install`
 - In the cloned folder add a file with name `.env` and in it add the following
 ```
MONGODB_DATABASE_USERNAME=YOUR_MONGODB_ATLAS_DATABSE_USERNAME
MONGODB_DATABASE_ACCESS_KEY=YOUR_MONGODB_DATABSE_KEY
EMAIL=YOUR_EMAIL_ADDRESS
EMAIL_PASSWORD=YOUR_EMAIL_PASSWORD
```
 - Also make sure you have configured your atlas database IP access and allowed less secure app access to your entered email suck=h that you can send invoices to clients directly from the app.
 - Now open two instances of terminal of cloned folder and in first terminal run `npm start` most probably if everything entered is correct you will see 
 ```
server started, listening at PORT 4000
MongoDb connected successfully
```
 - Now in other instance of terminal you opened enter `cd client && npm start` if everything worked fine you will see the React App up and working.
 - Now You can generate your Invoice.
