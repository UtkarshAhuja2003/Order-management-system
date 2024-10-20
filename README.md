# Order Management System

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Backend Setup (Django)](#backend-setup-django)
  - [Frontend Setup (Next.js)](#frontend-setup-nextjs)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Demo Video](#demo-video)
- [Screenshots](#screenshots)

## Features
- **Order Management**: Create, update status, view, and delete orders.
- **Order Statuses**: Orders can have different statuses: CONFIRMED, REJECTED, PREPARING, or READY.
- **Email Notifications**: Sends email notifications when the order status is updated, using Django signals to trigger the email sending process.
- **REST API**: Exposes endpoints for managing orders.

## Environment Variables

You will need to configure the following environment variables for both the backend (Django) and the frontend (Next.js) projects.

### Backend (Django)
- `SENDGRID_API_KEY`: Your SendGrid API key for sending order status updates via email.
- `SENDGRID_FROM_EMAIL`: The email address from which the order notifications will be sent.
- `CORS_ALLOWED_ORIGINS`: The origin(s) that are allowed to access the API. For local development, set this to `http://localhost:3000` (your Next.js frontend).

### Frontend (Next.js)
- `BACKEND_URI`: The URL of your Django backend API (for local development, use `http://localhost:8000`).


## Tech Stack

### Backend (Django)
- **Django**: REST API framework
- **SQLITE**: Database
- **SendGrid**: For sending email notifications
- **Django REST Framework**: For building RESTful APIs

### Frontend (Next.js)
- **Next.js**: React-based framework for the frontend
- **TailwindCSS**: For styling the frontend

## Installation

Clone the repository:

```bash
git clone https://github.com/UtkarshAhuja2003/Order-management-system.git
cd Order-management-system
```
### Backend Setup (Django)
1. Navigate to the api directory:
    ```bash
    cd api
    ```
2. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```
3. Copy the sample environment file and configure your environment variables:
    ```bash
    cp .env.sample .env
    ```
4. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```
5. Apply migrations:
    ```bash
    python manage.py migrate
    ```
6. Run the development server:
    ```bash
    python manage.py runserver
    ```

### Frontend Setup (Next.js)
1. Navigate to the frontend directory:
    ```bash
    cd client
    ```
2. Copy the sample environment file and configure your environment variables:
    ```bash
    cp .env.sample .env
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Run the development server:
    ```bash
    npm run dev
    ```

## Usage
- After setting up both backend and frontend, you can access the frontend at `http://localhost:3000` and the backend at `http://localhost:8000`.

## Project Structure


```bash
/
├── api/                    # Django backend
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   ├── orders/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── email_service.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── signals.py
│   │   ├── urls.py
│   │   ├── views.py
│   ├── venv/
│   ├── .env
│   ├── .env.sample
│   ├── .gitignore
│   ├── manage.py
│   ├── requirements.txt
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── api/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── interfaces/
│   │   ├── utils/
│   ├── .env.
│   ├── .env.sample
│   ├── .gitignore
│   ├── package.json
│   ├── README.md
├── LICENSE 
├── README.md               # Project documentation

```
## API Endpoints

### Orders Endpoints

- **GET /orders/**: Retrieve a list of all orders.
    - Response: A list of orders with their details (order ID, customer email, status, and timestamps).
  
- **POST /orders/**: Create a new order.
    - Request: JSON object with order details (e.g., `customer_email`, `status`).
    - Response: The newly created order data if successful, or validation errors if the input data is invalid.

- **GET /orders/{id}/**: Retrieve a specific order by its ID.
    - Response: The order details for the given order ID.

- **PATCH /orders/{id}/**: Update the status of a specific order by its ID.
    - Request: JSON object with the fields to update (e.g., `status`).
    - Response: The updated order data if successful, or validation errors if the update fails.

- **DELETE /orders/{id}/**: Delete a specific order by its ID.
    - Response: A `204 No Content` status if the deletion is successful, or an error message if the order is not found.

### Error Handling
- **400 Bad Request**: Returned when there are validation errors in the request payload.
- **404 Not Found**: Returned when the requested order does not exist.
- **500 Internal Server Error**: Returned for any unhandled server-side exceptions.

## Demo Video
[![Watch the demo](https://cdn.loom.com/sessions/thumbnails/8df821af51de4c98bef5d172415e995c-61ff02ec52bc69bb-full-play.gif)](https://www.loom.com/share/8df821af51de4c98bef5d172415e995c?sid=ed6b8c4f-ab1a-4d95-a4e0-21b5f58d6fbf)



## Screenshots
![image](https://github.com/user-attachments/assets/84b28527-d4e9-45f7-ad9d-dbaba947cab5)
![image](https://github.com/user-attachments/assets/e9c6c851-32d7-45ff-87df-e6d858e0c22e)
![image](https://github.com/user-attachments/assets/56cf352d-3128-47f7-bb72-ee134fb655f4)
<img src="https://github.com/user-attachments/assets/3b3ea3ce-f75d-4cd3-a34b-e3c92dbf98b0" alt="Image 1" height="500">
<img src="https://github.com/user-attachments/assets/a74beb1c-8491-4b8a-a239-7f1d738fee3a" alt="Image 2" height="500">



