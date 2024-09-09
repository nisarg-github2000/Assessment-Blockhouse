# Web Application with Next.js and Django

## Overview

This project is a web application that features a dashboard with multiple charts, built using Next.js for the frontend and Django for the backend. The application integrates these technologies to display dynamic chart data fetched from the Django API.

## Features

- **Dashboard Page**: Displays four types of charts:

  - Candlestick Chart
  - Line Chart
  - Bar Chart
  - Pie Chart
    
- **Data**: The data for these charts is provided via a Django API and is currently hardcoded.

## Technologies Used

### Frontend:
- [Next.js](https://nextjs.org/) (React Framework)
- [ApexCharts](https://apexcharts.com/) (Charting Library)
- [Tailwind CSS](https://tailwindcss.com/) (CSS Framework)
- [React Router](https://reactrouter.com/) (Routing)

### Backend:
- [Django](https://www.djangoproject.com/) (Web Framework)
- [Django REST Framework](https://www.django-rest-framework.org/) (API Framework)

### Testing:
- Unit tests for Django using Django’s test framework

## Setup Instructions

### Prerequisites
- Python 3.8+ (for Django backend)
- Node.js 14+ (for Next.js frontend)
- Docker (optional, for containerization)

### Backend Setup

1. **Clone the Repository**:
   ```
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo/backend

   ```
2. **Create a Virtual Environment**:
```
python3 -m venv venv
source venv/bin/activate
```
3. **Install Dependencies**:
```
pip install -r requirements.txt
```
4. **Run Migrations**:
```
python manage.py migrate
```
5. **Start the Django Server**:
```
python manage.py runserver
```

### Frontend Setup
1. **Navigate to Frontend Directory**:
```
cd ../frontend
```
2. **Install Dependencies**:
```
npm install
```
3. **Run the Development Server**:
```
npm run dev
```
4. **Access the Application: Open your browser and go to http://localhost:3000.**

## API Endpoints

The Django API provides the following endpoints:

- /api/candlestick-data/: Returns JSON data for the Candlestick chart.
- /api/line-chart-data/: Returns JSON data for the Line chart.
- /api/bar-chart-data/: Returns JSON data for the Bar chart.
- /api/pie-chart-data/: Returns JSON data for the Pie chart.

## Data Structures

**Candlestick Data**:
```
{
  "data": [
    {"x": "2023-01-01", "open": 30, "high": 40, "low": 25, "close": 35},
    {"x": "2023-01-02", "open": 35, "high": 45, "low": 30, "close": 40}
    // Additional data points
  ]
}
```
**Line Chart Data**:
```
{
  "labels": ["Jan", "Feb", "Mar", "Apr"],
  "data": [10, 20, 30, 40]
}
```
**Bar Chart Data**:
```
{
  "labels": ["Product A", "Product B", "Product C"],
  "data": [100, 150, 200]
}
```
**Pie Chart Data**:
```
{
  "labels": ["Red", "Blue", "Yellow"],
  "data": [300, 50, 100]
}
```

## Approach & Thought Process

### Frontend:

- Used Next.js for server-side rendering and routing.
- Integrated ApexCharts to display different types of charts.
- Tailwind CSS was used for styling to ensure responsiveness and a clean interface.
- Data fetching was handled using fetch API, and the chart data was dynamically rendered.

### Backend:

- Created a Django API to serve hardcoded data for the charts.
- Django REST Framework was employed to simplify API creation and management.

### Testing:

- Unit tests were written for the Django API to validate data handling and API responses.

### Future Scope

- TypeScript: Implementing TypeScript in the Next.js frontend for better type safety.
- Docker: Setting up Docker for containerized deployment of the backend and frontend.
- Jest: Adding Jest for unit and integration testing to cover both frontend and backend logic.

## Contributing

Feel free to submit issues or pull requests to suggest improvements or new features.

## License

[MIT](https://choosealicense.com/licenses/mit/)
