## Getting Started
A website where admins can post, edit, and delete shopping items, set prices, and manage inventory, while clients can view all items and make purchases, with all activities visible to the admin.

## Project Overview
This project is a web application that integrates various technologies for a seamless user experience. The key components of the project include:

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



First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
