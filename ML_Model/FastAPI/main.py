from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import cv2

app = FastAPI()

MODEL = tf.keras.models.load_model("ML_Model/pretrained_model/my_model.h5")
CLASS_NAMES=['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy', 
             'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
             'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_', 
             'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot', 
             'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
             'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy', 
             'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 
             'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy', 
             'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy', 
             'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold', 
             'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite', 
             'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 
             'Tomato___healthy']

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    image=cv2.resize(image, (70,70))
    return image
@app.get("/ping")
async def ping():
    return "hello"
@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    
    image = read_file_as_image(await file.read())
    print(image)
    image = image.astype("float32")
    image = image/255.0
   
    image = np.reshape(image, [1, 70, 70, 3])
    print("working or not")
    predictions = MODEL.predict(image)
    print(predictions, "/n")
    
    predicted_class_index = np.argmax(predictions)
    predicted_class = CLASS_NAMES[predicted_class_index]
    print("predicted class : ", predicted_class, " at index : ", predicted_class_index)

    
    confidence = np.max(predictions)
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }

    print(img_batch)
if __name__ == "__main__":
    uvicorn.run(app,host='localhost',port=8000)