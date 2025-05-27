# Weather App

This is a simple weather application that allows users to search for weather information based on city names. It uses the OpenWeatherMap API to fetch current weather data.

## Features

- Search for weather by city name
- Display current temperature, humidity, and weather conditions
- Responsive design for mobile and desktop

## Technologies Used

- React
- TypeScript
- OpenWeatherMap API
- Shadcn UI for dark mode switching
- Redux Toolkit for state management
- CSS for styling
- Vite for development server
- Axios for API requests
- luxon for Date and time formatting

## Approach

1. **Setup**: The project is set up using Vite with React and TypeScript. Dependencies like Axios for API requests and luxon for date formatting are installed.

2. **API Integration**: The OpenWeatherMap API is integrated to fetch weather data based on user input. The API key is stored in a `.env` file for security.

3. **Components**: The application is structured into components:
    - `WeatherDisplay`: Displays the weather information.
    - `WeatherInput`: Handles user input for city search.
    - `WeatherError`: Displays error messages for invalid inputs or API errors.

4. **State Management**: Redux Toolkit is used to manage the application state, including the weather data and error messages.
5. **Styling**: The application uses CSS for styling, with a focus on responsive design to ensure usability on both mobile and desktop devices.
6. **Dark Mode**: Shadcn UI is used to implement dark mode functionality, allowing users to switch between light and dark themes.

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/mazam5/Weather-React-App
   ```

2. Navigate to the project directory:

   ```bash
    cd Weather-React-App
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add your OpenWeatherMap API key:

   ```plaintext
   VITE_API_KEY=your_api_key_here
   VITE_API_BASE_URL=https://api.openweathermap.org/data/2.5/
   ```

5. Start the development server:

   ```bash
    npm run dev
    ```

6. Open your browser and go to `http://localhost:5173` to view the application.
