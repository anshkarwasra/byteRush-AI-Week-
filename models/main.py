import google.generativeai as genAi
import pandas as pd
from sklearn.model_selection import train_test_split
import joblib
import numpy as np
from flask import Flask,request,jsonify,redirect, session
from flask_cors import CORS
import cv2
import numpy as np
from keras.models import load_model
from werkzeug.utils import secure_filename
import os
import requests
import base64

apiKey = "AIzaSyAuJavM1Ott6ValfT5d2J_pR60M_CXC8E0"
genAi.configure(api_key=apiKey)
modelGen = genAi.GenerativeModel("gemini-1.5-flash")


modelFace=load_model('model_file_30epochs.h5')
faceDetect=cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
labels_dict={0:'Angry',1:'Disgust', 2:'Fear', 3:'Happy',4:'Neutral',5:'Sad',6:'Surprise'}
video=cv2.VideoCapture(0)

unUploadToken = 'MTI2NDIzMzAxOTI2MzE2MDQwMw.GHRw8D.Z6kKMPirJEyfyYuGvaDPBFVOEi_LwoQVlii2cI'
permissionInteger = 2048

def faceDetector():
    
    while True:
        ret,frame=video.read()
        gray=cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces= faceDetect.detectMultiScale(gray, 1.3, 3)
        for x,y,w,h in faces:
            sub_face_img=gray[y:y+h, x:x+w]
            resized=cv2.resize(sub_face_img,(48,48))
            normalize=resized/255.0
            reshaped=np.reshape(normalize, (1, 48, 48, 1))
            result=modelFace.predict(reshaped)
            label=np.argmax(result, axis=1)[0]
            print(label)
            cv2.rectangle(frame, (x,y), (x+w, y+h), (0,0,255), 1)
            cv2.rectangle(frame,(x,y),(x+w,y+h),(50,50,255),2)
            cv2.rectangle(frame,(x,y-40),(x+w,y),(50,50,255),-1)
            cv2.putText(frame, labels_dict[label], (x, y-10),cv2.FONT_HERSHEY_SIMPLEX,0.8,(255,255,255),2)
            
        cv2.imshow("Frame",frame)
        k=cv2.waitKey(1)
        if k==ord('q'):
            break
        if k==ord('c'):
            emotion = label

    video.release()
    cv2.destroyAllWindows()
    return emotion


cryptoData = pd.read_csv('crypto.csv')
cryptoData['TIMESTAMP'] = pd.to_datetime(cryptoData['TIMESTAMP'], unit='s')
cryptoData.set_index('TIMESTAMP', inplace=True)

cryptoData = cryptoData[['OPEN', 'HIGH', 'LOW', 'CLOSE', 'VOLUME']]
# print(cryptoData.index)

cryptoData['CLOSE_LAG_1'] = cryptoData['CLOSE'].shift(1)
cryptoData['MA_5'] = cryptoData['CLOSE'].rolling(window=5).mean()

cryptoData.dropna(inplace=True)




X = cryptoData[['OPEN', 'HIGH', 'LOW', 'CLOSE_LAG_1', 'VOLUME', 'MA_5']]
y=  cryptoData['CLOSE']

print("--------------------------xs index--------------------")
# print(X.iloc[1].index)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


model = joblib.load('crypto_prediction_model.joblib')
print("model loaded")


print("executed sucessfully")

app = Flask(__name__)
CORS(app=app)

app.config['UPLOADER_FOLDER'] = 'E:\\Programming\\byteRush-AI-Week-\\models\\uploadedFiles'

SPOTIFY_CLIENT_ID = 'eabfbc2c1b0c41069e24bb3750e18e39'
SPOTIFY_CLIENT_SECRET = 'd8e44402f62f40bc9391b40513e9a510'
SPOTIFY_REDIRECT_URI = 'http://localhost:5000/callback'

@app.route('/get-song')
def get_song():
    mood = request.args.get('mood')
    token = request.headers.get('Authorization')  # Frontend must send the token here

    if not token:
        return jsonify({'error': 'Authorization token is missing'}), 401

    search_url = 'https://api.spotify.com/v1/search'
    headers = {
        'Authorization': token  # Token sent from the frontend
    }
    params = {
        'q': mood,
        'type': 'track',
        'limit': 1
    }
    
    response = requests.get(search_url, headers=headers, params=params)
    
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch song'}), response.status_code

    track = response.json()['tracks']['items'][0]
    return jsonify({
        'title': track['name'],
        'artist': track['artists'][0]['name'],
        'spotify_uri': track['uri']
    })






@app.route("/getCryptoPredictions" , methods = ['GET','POST'])
def getCryptoPredictions():
    if request.method == 'POST':
        predictionList = []

        lastRow = X.iloc[-2].values
        last_timestamp = X.index[-2]
        future_dates = pd.date_range(start=last_timestamp, periods=6, freq='D')[1:]
        for _ in range(5):
            nextInput = np.array(lastRow).reshape(1,-1)

            nextPrediction = model.predict(nextInput)

            predictionList.append(nextPrediction[0])

            lastRow = np.roll(lastRow,-1)
            lastRow[-1] = nextPrediction
        print("yesssssssssssssssssssssssssss")
        return jsonify({
            'dates':future_dates.tolist(),
            'prices':predictionList
        })
    return "Get outta here"

@app.route('/AI',methods = ['GET','POST'])
def AI():
    if request.method == 'POST':
        query = request.form.get('prompt')
        response = modelGen.generate_content(query)
        return jsonify(response.text)

@app.route('/AITutor',methods = ['GET','POST'])
def AITutor():
    if request.method == 'POST':
        query = request.form.get('prompt')
        try:
            f = request.files['file']
            print(f)
            f.save(os.path.join(app.config['UPLOADER_FOLDER'],secure_filename(f.filename)))
            myPythonFile=  genAi.upload_file(os.path.join(app.config['UPLOADER_FOLDER'],secure_filename(f.filename)))

            response = modelGen.generate_content([
                "summarize this pdf",myPythonFile
                    ])
        except:
            response = modelGen.generate_content('generate a sorry response that file was not uploaded')
        return jsonify(response.text)
def get_token():
    auth_url = 'https://accounts.spotify.com/api/token'
    auth_header = base64.b64encode(f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode()).decode()
    headers = {
        'Authorization': f'Basic {auth_header}'
    }
    data = {
        'grant_type': 'client_credentials'
    }
    response = requests.post(auth_url, headers=headers, data=data)
    return response.json().get('access_token')

@app.route('/facedetect',methods=['GET','POST'])
def facedetect():
    if request.method=='POST':
        mood = faceDetector()
        token = get_token()
        mood = labels_dict[mood]
        search_url = 'https://api.spotify.com/v1/search'
        headers = {
            'Authorization': f'Bearer {token}'
        }
        params = {
            'q': mood,
            'type': 'track',
            'limit': 1
        }
        response = requests.get(search_url, headers=headers, params=params)
        
        if response.status_code != 200:
            return jsonify({'error': 'Failed to fetch song'}), response.status_code
        
        track = response.json()['tracks']['items'][0]
        return jsonify({
            'title': track['name'],
            'artist': track['artists'][0]['name'],
            'preview_url': track['preview_url']
        })

@app.route('/botGenerator',methods=['GET','POST'])
def botGenerator():
    if request.method=='POST':
        botType = request.form['type']
        print(botType)
        if botType=='simple':
            return 'https://discord.com/oauth2/authorize?client_id=1264233019263160403&permissions=2048&integration_type=0&scope=bot'
        else:
            return 'https://discord.com/oauth2/authorize?client_id=1264493559478878250&permissions=1689934340028480&integration_type=0&scope=bot'
app.run(debug=True,port=5000)