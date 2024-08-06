## Getting Started
A website where admins can post, edit, and delete shopping items, set prices, and manage inventory, while clients can view all items and make purchases, with all activities visible to the admin.

## Project Overview
This project is a web application that integrates various technologies for a seamless user experience. The key components of the project include:

## System Requirements:
1. Node.js version 18 or above
2. npm version 10.2.3
3. MongoDB Atlas
4. AWS
5. Google Developer Console


## Technologies Used:
1. Front-end/back-end: Next.js
2. Database: MongoDB (Atlas)
3. File Storage: Amazon S3 (AWS)
4. Styling: Tailwind CSS
5. Alerts: react-sweetalert2
6. HTTP Client: axios


1. Google OAuth Authentication
Purpose: To provide secure user authentication using Google accounts.
Implementation:
Utilizes the next-auth library for authentication management.
Configured Google OAuth credentials in the Google Developer Console.
Set up authorized redirect URIs in the Google Console to handle OAuth callbacks.
Integrated with the Next.js API routes to manage sign-in and callback.


2. Image Storage on Amazon S3
Purpose: To store and manage user-uploaded images securely and efficiently.
Implementation:
Used the AWS SDK to interact with Amazon S3.
Configured AWS credentials and S3 bucket settings.
Implemented an API route in Next.js to handle file uploads and interactions with S3.


3. MongoDB for Data Storage
Purpose: To store application data such as user information and product details.
Implementation:
Utilized MongoDB for its flexible, document-oriented data model.
Integrated with Mongoose for schema definition and data management.
Connected to MongoDB using environment variables for configuration.


4. API Integration and State Management
Purpose: To fetch and manage data efficiently using APIs and state management.
Implementation:
Used Axios for making HTTP requests to the backend API.
Managed application state using React's useState and useEffect hooks.
Implemented data fetching and state updates in React components.
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## how it will work
npm install

## add .env file with this keys
GOOGLE_ID=""
GOOGLE_SECRET=""
MONGODB_URI="mongodb+srv://<>:<>@cluster0.cbzjiuy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
NODE_ENV=''
S3_ACCESS_KEY=""
S3_SECRET_ACCESS_KEY=""
AWS_REGION=""
AWS_BUCKET_NAME=""
NEXTAUTH_SECRET=""

## start
npm run dev


## for prodcution deployment
1. add the .env file or add the key:value in this file in vercel deployment 
    Steps to Add .env content in Vercel
    Go to Your Vercel Dashboard:

    Open the Vercel dashboard.
    Select your project.
    Navigate to Environment Variables:

    Go to the "Settings" tab of your project.
    Select "Environment Variables" from the sidebar.

2. add the NEXTAUTH_URL to your key:value
    Steps to Add NEXTAUTH_URL in Vercel
    Go to Your Vercel Dashboard:

    Open the Vercel dashboard.
    Select your project.
    Navigate to Environment Variables:

    Go to the "Settings" tab of your project.
    Select "Environment Variables" from the sidebar.
    Add the NEXTAUTH_URL Variable:

    Click on "Add a new variable".
    Set the "Key" to NEXTAUTH_URL.
    Set the "Value" to the URL of your deployed application, e.g., https://your-domain.vercel.app.
    Choose the environment (Production, Preview, Development) where you want this variable to be available.
    
    Adding NEXTAUTH_URL to your Vercel environment is essential for NextAuth.js to function correctly in a production environment. Here are the key reasons:

        Redirect URLs: NextAuth.js uses the NEXTAUTH_URL environment variable to generate the correct URLs for OAuth callbacks and other redirects. This ensures that after a user authenticates with an external provider (like Google), they are redirected back to the correct URL of your application.
        key NEXTAUTH_URL 
        value your vercel domain 

3. Adding https://your-domain/api/auth/callback/google to the Google Cloud Console (https://console.cloud.google.com/)
Reasons for Adding the Callback URL to Google Cloud Console
OAuth 2.0 Redirect URL:

OAuth 2.0 requires a redirect URL to be specified. This URL is where Google will send the user after they have authenticated. By registering this URL with Google, you ensure that Google will redirect authenticated users back to your application.
Security:

Google verifies that the redirect URL provided in the authentication request matches one of the authorized URLs specified in the Google Cloud Console. This prevents malicious actors from hijacking the OAuth flow and redirecting users to a different, unauthorized URL.
Consistency and Correctness:

Ensuring the correct redirect URL is essential for a smooth authentication process. If the redirect URL does not match what is registered, the authentication process will fail.
Steps to Add the Redirect URI in Google Cloud Console
Go to Google Cloud Console:

Navigate to the Google Cloud Console and select your project.
Navigate to OAuth 2.0 Credentials:

Go to the "APIs & Services" section.
Select "Credentials".
Find your OAuth 2.0 Client ID under "OAuth 2.0 Client IDs".
Edit the OAuth 2.0 Client ID:

Click on your OAuth 2.0 Client ID to edit it.
In the "Authorized redirect URIs" section, add the URL https://your-domain/api/auth/callback/google.