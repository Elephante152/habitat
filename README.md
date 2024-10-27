# Habitat Weather App

Welcome to the Habitat Weather App! This project is built using [Next.js](https://nextjs.org) and provides real-time weather information along with neighborhood discounts for businesses. The application allows users to search for weather forecasts and discover local businesses offering discounts based on neighborhood selection.

## Features

- **Real-time Weather Data**: Integrates with OpenWeatherMap API to provide current weather and a 5-day forecast.
- **Neighborhood Discounts**: Users can explore discounts offered by local businesses in selected neighborhoods.
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit.
- **Interactive Animations**: Background animations change depending on the current weather conditions (sunny, rainy, snowy, cloudy).

## Project Structure

The project follows a modular approach, with components organized for reusability and scalability:

- **src/app/components/ui/**: Houses reusable UI components such as buttons, cards, inputs, and forms.
- **src/app/components/layouts/**: Contains layout components to structure the page.
- **src/app/home-screen.tsx**: The main entry point for the Home Screen, containing logic for fetching weather data and rendering the main UI.
- **public/**: Contains static assets such as images.

## Prerequisites

To run this project locally, ensure you have the following installed:

- **Node.js** (version 14 or later)
- **npm** (version 6 or later) or **yarn**
- An API key from [OpenWeatherMap](https://openweathermap.org/api) (to fetch real-time weather data)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Elephante152/habitat
   cd habitat
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up your environment variables by creating a `.env.local` file in the root of the project:

   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweathermap_api_key
   ```

   Replace `your_openweathermap_api_key` with your OpenWeatherMap API key.

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Application Usage

- **Weather Search**: Enter the name of a city to get the current weather and 5-day forecast.
- **Neighborhood Discounts**: Select a neighborhood to view available business discounts.
- **Business Listing Form**: Businesses can list their information using the integrated form to provide discounts for app users.

## Animations

- The background changes dynamically based on the current weather conditions (e.g., clear, clouds, rain, snow).
- **Raindrop and Snowflake Animations**: These are randomized in their positions and animations to create a more natural effect.

## Environment Variables

This project uses environment variables to manage API keys. The API key for OpenWeatherMap is stored in `.env.local`, which is listed in `.gitignore` to keep sensitive information private.

```
NEXT_PUBLIC_OPENWEATHER_API_KEY=22b7b7ccb7bfcf1c5f472de875640990
```

Make sure you do not commit your API key to version control by adding `.env.local` to `.gitignore`.

## Folder Structure

```plaintext
├── .next               # Compiled output
├── node_modules        # Dependencies
├── public              # Static assets
├── src
│   ├── app
│   │   ├── components  # UI components
│   │   ├── layouts     # Layout components
│   │   └── home-screen.tsx  # Main application screen
├── .env.local          # Environment variables
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

## Technologies Used

- **Next.js**: Framework for building the app.
- **React Hook Form**: Handling form states and validation.
- **OpenWeatherMap API**: Provides real-time weather data.
- **Tailwind CSS**: For styling and responsive design.
- **TypeScript**: Adds static typing to JavaScript, enhancing maintainability.

## Custom Scripts

To ease development, the following scripts are available:

- **`npm run dev`**: Runs the development server.
- **`npm run build`**: Builds the application for production.
- **`npm run start`**: Starts the production build.
- **`npm run lint`**: Runs ESLint to catch potential code issues.

## Error Handling and Troubleshooting

- Ensure you have a valid **OpenWeatherMap API Key**.
- If temperature conversions seem incorrect, verify the temperature unit toggle and API unit settings.
- If the weather animations do not appear correctly, check for CSS styles and ensure Tailwind CSS is installed and configured properly.

## Deployment

The recommended deployment platform is [Vercel](https://vercel.com/), which seamlessly integrates with Next.js projects. For detailed deployment instructions, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please reach out or visit [https://shaunsaini.com].

