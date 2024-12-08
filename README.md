# Habitat Weather App – Mobile Version

Welcome to the Habitat Weather App – now transitioned into a mobile-first Android app using Expo and React Native. This project integrates weather forecasts via the OpenWeather API and provides local neighborhood discounts.

The journey involved resolving issues during the setup with Expo, Android SDK, and TailwindCSS integration. This README documents the features, challenges, and the steps taken to ensure project functionality.

**Project Highlights**

Real-time Weather Data: Fetches current weather and a 5-day forecast using the OpenWeatherMap API.

Neighborhood Discounts: Allows users to discover local businesses offering discounts.

Responsive Design: Implemented with NativeWind, a TailwindCSS solution for React Native.

Dynamic Animations: Background animations reflect weather conditions (rain, snow, sunny).

Navigation: Managed using React Navigation for smooth screen transitions.

**Project Evolution and Challenges**

Original Version: Web-Based Next.js Application
The project initially used Next.js for web development. Key features such as weather API integration and TailwindCSS styling were implemented successfully.

Migration to Mobile: React Native and Expo

The project was migrated to React Native using Expo to adapt it for Android mobile development. During the transition, the following challenges arose:

1. Android SDK Configuration Issues
Problem: Expo could not locate the Android SDK path (spawn adb ENOENT error).
Solution: Installed the Android SDK via Android Studio and set the ANDROID_HOME and PATH variables in .zshrc.

2. TailwindCSS Parsing Errors
Problem: ESLint threw parsing errors for tailwind.config.ts as it was not included in tsconfig.json.
Solution: Updated tsconfig.json to explicitly include tailwind.config.ts and fixed the ESLint configuration.

3. Next.js Dependencies
Problem: Leftover browser-specific dependencies (e.g., next, react-dom) caused build failures.
Solution: Removed unused dependencies and reorganized the project to align with Expo and React Native standards.

4. EAS Build Failures
Problem: Builds using Expo Application Services (EAS) failed due to misconfigured file paths.
Solution: Resolved file structure issues by ensuring App.js is the root entry point.

**Features**

Weather Search: Enter a city name to fetch real-time weather data.
Neighborhood Discounts: View business listings and discounts based on location.
Interactive Animations: Background dynamically reflects the current weather.
Navigation: Uses React Navigation for smooth transitions between screens.

**Prerequisites**

Ensure the following tools are installed:

Node.js (version 16 or higher)
Expo CLI (latest version)
Android Studio (to run the Android emulator or AVD)
OpenWeatherMap API Key (Get your API Key)

**Setup Instructions**

1. Clone the Repository
git clone https://github.com/Elephante152/habitat-mobile-android
cd habitat-mobile-android

2. Install Dependencies
npm install

3. Set Environment Variables

Create a .env file in the root directory:

env
OPENWEATHER_API_KEY=your_openweathermap_api_key
Replace your_openweathermap_api_key with your API key.

4. Run the Development Server

To run on Android:
npx expo start
Press a to open on an Android emulator.

Alternatively, scan the QR code using the Expo Go app on your Android device.

**Folder Structure**

habitat-mobile-android/
├── assets/                # Static assets (icons, images)
├── src/
│   ├── app/               # Global styles and layouts
│   ├── components/        # Reusable UI components
│   ├── lib/               # Utility functions
│   ├── navigation/        # Navigation setup
│   └── screens/           # App screens (Home, Discounts)
├── App.js                 # Root entry file
├── tailwind.config.ts     # TailwindCSS configuration for NativeWind
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation

**Technologies Used**

Expo: Framework for developing cross-platform React Native apps.
React Native: Mobile development framework.
NativeWind: TailwindCSS implementation for React Native.
React Navigation: For in-app navigation.
OpenWeatherMap API: For fetching weather data.

**Known Issues**

EAS Build Stability:
Builds occasionally fail due to inconsistencies in the environment or Expo configuration. Additional testing is needed for long-term stability.

Android-Specific Testing:
Primary testing has been conducted on emulators, with limited physical device testing.

API Key Management:
Ensure the .env file is properly configured, and sensitive keys are not committed to version control.

**Testing**

Local Testing:

Use npx expo start and test on the Android emulator or a physical device using Expo Go.

EAS Build Testing:

To create a production-ready build for Android:

eas build --platform android --profile preview

**Future Improvements**

Error Handling: Add better API error handling and fallback UI for failed requests.
Enhanced UI: Improve the UI for a smoother user experience across all devices.
iOS Compatibility: Extend testing and deployment to iOS devices.
Unit Testing: Implement unit tests for components and API integration.

**Contributing**

I welcome contributions to improve the project. Follow these steps:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature-name).
Commit changes (git commit -am "Add feature XYZ").
Push the branch (git push origin feature/your-feature-name).
Submit a pull request.

**License**

This project is licensed under the MIT License.

**Contact**

For questions, feedback, or collaboration opportunities, visit https://shaunsaini.com.