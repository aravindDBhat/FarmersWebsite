# Farmer friendly website (Krushika Mitra)
 FarmerFriendly is a comprehensive web application designed to assist farmers in predicting plant diseases using leaf images and to provide a platform for farmers to post their issues and receive solutions from volunteers.
# Table of Content
- Features
- Technologies Used
- Installation
- Usage
- Contributing
- License
# Features
- Plant Disease Prediction: Farmers can upload images of plant leaves to predict diseases using the ResNet model.
- Issue Posting: Farmers can post their problems or issues they are facing.
- Volunteer Solutions: Volunteers can view the posted issues and provide solutions.
- weather forecast
# Technologies Used
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Machine Learning: ResNet model
- API Deployment: FastAPI
# Installation

Make sure you have Node.js and npm install.

1.  Clone or Download the repository

```bash
    git clone https://github.com/aravindDBhat/FarmersWebsite.git
    cd FarmersWebsite
```
2. Set up the MongoDB database:

```basg
Ensure MongoDB is installed and running on your local machine or use a cloud-based MongoDB service.
Create a .env file in the backend directory and add your MongoDB connection string
```
3. Start Backend

```bash
cd backend
npm install
#set .env
cp sample-env .env (create mogodb account and create db and save that as showed in env file
node server.js
```

4. Start Frontend

```bash
cd frontend
npm install
#setup .env
cp sample-env .env
npm start
```
5. ResNet Model
```bash
Run ResNet_Model.ipynb file in google colab and download the pretrained model.
set up the path of pretrained model in main.py.
install all the packages which is mentioned in requirements.txt.
run the main.py file.
```


# How it works

- [Live](https://farmers-website-rbwm.vercel.app)
