<h1 align="center">
  <br>
<img src="https://github.com/Leelu55/Articulus/blob/5ed5f08f66639473249d777a8ba858e1921cab7b/assets/logo_raw.png" alt="Articulus" width="200">
  <br>
  Articulus
  <br>
</h1>
<h4 align="center">An Audiobased Learning App for Android</h4>

<p align="center">

<a href="#react-native-and-typescript">React Native and TypeScript</a>
<a href="#app-structure-and-screens">App Structure and Screens</a>
<a href="#data">Data</a>
<a href="#state-machine">State Machine</a>
<a href="#state-management-with-mobx">State Management with MobX</a>
<a href="#speech-to-text-and-text-to-speech">Speech-To-Text and Text-To-Speech</a>
<a href="#animations">Animations</a>
<a href="#data-visualizations">Data Visualization</a>
<a href="#react-navigation">React Navigation</a>
<a href="#displaying-svgs">Displaying SVGS</a>
<a href="#learning-algorithm">Learning Algorithm</a>
<a href="#cdn-with-statically-and-github">CDN with Statically and Github</a>
<a href="#cd-and-ci-with-bitrise">CD and CI with Bitrise</a>
<a href="#license">License</a>

</p>

## React Native and TypeScript

This app was created using React Native with TypeScript.

## App Structure and Screens

The starting point for the app is [index.js](./index.js)
registering [App.tsx](./components/App.tsx) as the main component.

All React Native components reside in [./components](./components)

![App Structure](./doc/appStructure.svg)

## Data

## State Machine

The flow of the Articulus app is controlled by a simple state engine. It makes sure only valid state transitions happen:

![State Engine](./doc/stateTransitions.svg)

For the implementation of the state engine see <a href="https://github.com/Leelu55/Articulus/blob/99ec9166bd0d1331d684998d30879f7bffea8528/stores/UIStore.ts#L6">here</a>, <a href="https://github.com/Leelu55/Articulus/blob/99ec9166bd0d1331d684998d30879f7bffea8528/stores/UIStore.ts#L19">here</a> and <a href="https://github.com/Leelu55/Articulus/blob/99ec9166bd0d1331d684998d30879f7bffea8528/stores/UIStore.ts#L128">here</a>.

## State Management with MobX

## Speech-To-Text and Text-To-Speech

## Animations

## Data Visualization

## Displaying SVGS

## Learning Algorithm

## CDN with Statically and Github

## CD and CI with Bitrise

## License

### Setup React Native

Minimal prerequisites are

- <a href="http://openjdk.java.net/">JDK</a>,
- <a href="https://developer.android.com/studio">Android Studio</a> and
- <a href="https://nodejs.org/en/download/package-manager/">Node.js</a>

For setting up the React Native developement environment, follow the <a href="https://reactnative.dev/docs/environment-setup">setup steps</a>

### Installing npm Packages:

To install all necessary libraries run `npm install`

### Run on Device

1. USB-connect your Android phone to the computer and <a href="https://developer.android.com/studio/debug/dev-options"> configure the developer mode</a>
2. Run `npm start` to start the Metro JS bundler
3. In a second terminal run `npm run android` inside the project folder or run the app directly from Android Studio

## Download

You can download Articulus in the <a href="https://play.google.com/store/apps/details?id=com.derdiedas">Google Play Store</a>

<div align="left"><a href="https://play.google.com/store/apps/details?id=com.derdiedas"><img src="https://raw.githubusercontent.com/Leelu55/Articulus/master/assets/google-play-badge.png"
  alt="Get it on Google Play"
  width="288" height="124"></a></div>

## Credits

- Thank you for all the :blue_heart: beautiful Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>

- The word images are all free images from <a href="https://pixabay.com/" title="Pixabay">Pixabay</a>.
  :pray: :heart_eyes_cat: to all the creators!

- Loading images :running: :running: :running: superfast was made possible with <a href="https://statically.io/">Statically</a> as CDN serving from the <a href="https://github.com/Leelu55/Articulus/tree/master/model/images">Articulus Github repo</a>

- State management was done with the :superhero: superpowers of <a href="https://mobx.js.org/README.html">MobX</a>

<b>Special thanks go out to the developers of:</b>

- <a href="https://reactjs.org/">React</a> and <a href="https://reactnative.dev/">React Native</a> for making mobile app development so much fun

- <a href="https://github.com/ak1394/react-native-tts">React Native TTS</a> and <a href="https://github.com/react-native-voice/voice">React Native Voice</a> for the Text-To-Speech and Speech-To-Text libraries

- <a href="https://github.com/FormidableLabs/victory-native"> Victory Native</a> for their great chart and data visualization components library

- <a href="https://github.com/react-native-svg/react-native-svg">react-native-svg</a> for SVG support library and <a href="https://github.com/gregberge/svgr">SVGR</a> for their SVG-to-JSX <a href="https://react-svgr.com/playground/">Playground</a>

- <a href="https://fontawesome.com/">Font Awesome</a> for their icon set

- <a href="https://github.com/software-mansion/react-native-reanimated">React Native Reanimated</a> for enabling really cool animations

## License

**[MIT Licensed](https://github.com/Leelu55/Articulus/blob/master/LICENSE)**
