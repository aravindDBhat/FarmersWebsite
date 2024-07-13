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

3. Start Frontend

```bash
cd frontend
npm install
#setup .env
cp sample-env .env
npm start
```

Application runs from localhost:3000.

# How it works

- [Demo](https://www.loom.com/share/e8e20b94c8804a84ae539bc4a72934e1?sid=5a28f808-f0be-49dd-b027-254877303760)
- [Live](https://chatapp-065s.onrender.com)
