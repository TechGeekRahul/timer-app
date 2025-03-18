# Timer App
Deployed url : https://timer-app-cyan.vercel.app/ 

A React-based timer application that allows users to create, manage, and track multiple timers with categories. The app features a clean, modern interface with both light and dark themes.

## Features

- Create multiple timers with custom names and durations
- Organize timers by categories (Workout, Study, Break, Other)
- Filter timers by category
- Bulk actions for timers within categories (Start All, Pause All, Reset All)
- Timer completion notifications
- Halfway point alerts
- Timer history tracking
- Dark/Light theme support
- Responsive design for mobile devices
- Local storage persistence

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd timer-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Development Assumptions

### Browser Support
- The application is designed to work on modern browsers (Chrome, Firefox, Safari, Edge)
- Local storage is required for data persistence
- JavaScript must be enabled

### User Behavior
- Users will primarily use the app on desktop or mobile devices
- Users may have multiple timers running simultaneously
- Users may want to track their timer completion history
- Users may prefer different color themes based on their environment

### Technical Assumptions
- React 18+ is available in the environment
- Modern JavaScript features are supported
- Local storage is available and has sufficient space
- The device has sufficient memory to handle multiple timers
- The browser window remains open while timers are running

### Data Management
- Timer data is stored locally in the browser
- Timer history is preserved between sessions
- Timer categories are predefined and fixed
- Timer durations are in seconds and must be positive integers

### UI/UX Assumptions
- Users can read and understand English
- Users are familiar with basic timer controls (start, pause, reset)
- Users can distinguish between different colors and themes
- Users can interact with buttons and form controls
- Users may need visual feedback for timer completion

### Performance Assumptions
- The application should handle up to 20-30 timers simultaneously
- Timer accuracy should be within 1 second
- The app should remain responsive even with multiple timers running
- Local storage operations should be fast and reliable

## Project Structure

```
src/
├── components/
│   ├── AddTimer.js
│   ├── History.js
│   ├── Modal.js
│   ├── Timer.js
│   └── TimerList.js
├── context/
│   └── TimerContext.js
├── hooks/
│   └── useTimerLogic.js
├── styles/
│   └── App.css
├── App.js
└── index.js
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
