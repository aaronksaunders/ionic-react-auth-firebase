## React Project using Ionic v5 Components - Updated April 2020


> See YouTube Video with Updated Content
- https://www.youtube.com/playlist?list=PL2PY2-9rsgl3aYbgV5Y_jFkCH7WWsiP-f

>August 2020 - Updated to latest versions of ionic/react, mobx and capacitor, refactored login process to be "clearer" using mobx hooks instead of inject

>April 2020 - Updated to latest versions of ionic/react, mobx and capacitor

>October 2019 - This is a link to another sample application using Ionic Framework, Firebase and React, but this one uses react-hooks. This is sample code from the ReactJS Course I taught at [Inclusive Innovation Incubator](www.in3dc.com) as part of our #TheFutureIsWrittenInCode initiative

>[https://github.com/aaronksaunders/react-course-firebase-hooks-app/tree/capacitor-ionic](https://github.com/aaronksaunders/react-course-firebase-hooks-app/tree/capacitor-ionic)

---
<p align="center">
<img src="https://raw.githubusercontent.com/aaronksaunders/ionic-react-auth-firebase/master/screenshots/Screen%20Shot%202020-04-22%20at%206.12.57%20PM.png" width="66%" />
  </p>
  <p align="center">
  <strong><a href="https://www.youtube.com/playlist?list=PL2PY2-9rsgl3OHIMYb1AzVG5wADUxOmUW">Click To View Ionic React Video Playlist</a></strong>
  </p>
---

Responding to suggestion from Max Lynch...
> "If someone wrote a tutorial on using Ionic React with Firebase that would be pretty cool (hint hint)"

So I pulled together some of the code I was already playing with, will post more as I work on additional features

- IonTabs
  - Tabs Detail Page
- IonDatePicker
- IonModal
- IonToast
- Firebase Authentication
- Mobx State Management

Still working on 
- Firebase CRUD
- Firebase Create Account
- IonList

### Configure Firebase

```javascript
// firebaseService.js - set your own firebase project information
var firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxx.firebaseapp.com",
  databaseURL: "https://xxxxxxxxxxxx.firebaseio.com",
  projectId: "xxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxx.appspot.com",
  messagingSenderId: "xxxxxxxxxxxx"
};
```

## Screenshots
<p align="center">
 <img src="https://raw.githubusercontent.com/aaronksaunders/ionic-react-auth-firebase/master/screenshots/Screen%20Shot%202019-04-29%20at%2011.32.49%20PM.png" height="600" style="padding:10px">

 <img src="https://raw.githubusercontent.com/aaronksaunders/ionic-react-auth-firebase/master/screenshots/Screen%20Shot%202019-04-29%20at%2011.30.39%20PM.png" height="600" style="padding:10px">
 </p>

<p align="center">
 <img src="https://raw.githubusercontent.com/aaronksaunders/ionic-react-auth-firebase/master/screenshots/Screen%20Shot%202019-04-29%20at%2011.30.54%20PM.png" height="600" style="padding:10px">
  
 <img src="https://raw.githubusercontent.com/aaronksaunders/ionic-react-auth-firebase/master/screenshots/Screen%20Shot%202019-04-29%20at%2011.31.09%20PM.png" height="600" style="padding:10px">
 </p>
  

## Adding Capacitor
```
npm install --save @capacitor/cli @capacitor/core
```
next you need to build the app
```
npm run build
```
then edit the `capacitor.config.json` to point to the web directory
```json
{
  "appId": "com.aks.reactionicfb",
  "appName": "reactionicfb",
  "bundledWebRuntime": false,
  "npmClient": "npm",
  "webDir": "build" <=== make this change
}
```

Now add `ios` or `android` to the application, on ios please checkout this known issue https://github.com/ionic-team/capacitor/issues/1448
```
npx cap add ios
```
Update the `index.html` to create the safe area on devices
```html
<meta name="viewport" content="initial-scale=1,user-scalable=no, width=device-width, 
                               height=device-height, viewport-fit=cover">
```
Then to run on ios device
```
npm run build; npx cap sync
```
More information available at the capacitor website https://capacitor.ionicframework.com/docs/getting-started/

----

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
