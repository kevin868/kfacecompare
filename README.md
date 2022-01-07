# KFaceCompare

Select 2 or 3 pictures of people to calculate how similar they are.

This tool uses dlib, OpenCV for face detection, and [OpenFace](http://cmusatyalab.github.io/openface/) pre-trained neural net models to compute a 128-dimensional face representation.

Privacy Note: Our server does not store any of the photos you submit. 

Tracking provided by Google Analytics (gtag.js).


## Deployment on Google Cloud

1) On Google Container-optimized OS
`docker build -t kopenface .`
2) Deploy mapping public port 443 to webservers listening to 8089
`docker run -p 443:8089 -it kopenface`

Configure Gunicorn to host an SSL certificate, in order to reference from another HTTPS site
1) Convert Google ephemeral IP to static
2) Generate free cert from sslforfree.com
3) Use Google Static IP ex. 35.194.12.145
4) deploy with certificate.crt and private.key (step 2 above)

## Local Development

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
