# ZLI - Mobile-Applikationen realisieren - yumME - a food delivery app

<p align = "center">
<img src="https://github.com/marco-karpf/yum-me/blob/master/resources/icon.png" width="350" alt="app icon">
</p>

yuME is a food delivery app that allows users to quickly and easily order and deliver food from their favorite restaurants. 
It was built with Ionic, Capacitor and Angular. The app offers the following features:

- see the restaurants that are near you (currently only mock data)
- select Items from a specific restaurant and add to you shopping cart
- filter menus by vegetarian
- make an order (currently no payment gateway implemented)
- manage multiple addresses on your proile
- add new address with google maps and geolocation of your phone
- search for restaurant by name

## Setup
The following steps need to be performed to install the app locally:

1. Create a copy (fork) of this project.
2. Make sure you NodeJS, Angular and Ionic CLI as well as Android Studio installed, 
3. Install the dependencies by navigating to the project directory and running `npm install`.

## Startup
To run the app on your local device, follow these steps:

1. Start the development server by running `ionic serve` in the project directory.
2. Open the app in a browser by navigating to `http://localhost:8100`.
3. To run the app on a mobile device, you'll need to set up Capacitor. Follow the instructions on the [Capacitor website](https://capacitorjs.com/docs/android) for more information

## For Android

1. Build the app by running `ionic build`.
2. Generate a native Android project by running `ionic cap add android`.
3. Develop the app and sync it to the native project `ionic cap copy android`.
4. Start a live reload session by running `ionic cap run android -l --external`.

## For IOS

1. Build the app by running `ionic build`.
2. Generate a native IOS project by running `ionic cap add ios`.
3. Develop the app and sync it to the native project `ionic cap copy ios`.
4. Start a live reload session by running `ionic cap run ios -l --external`.
