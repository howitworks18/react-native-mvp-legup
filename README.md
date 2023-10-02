# MVP Leg Up 🦵: React Native Starter Kit

Welcome to MVP Leg Up, your go-to React Native starter kit for quickly setting up a new mobile project with essential features and configurations.

## Features

- React navigation
- MobX
- Firebase authentication
- React Native Maps
- Stripe checkout
- Photo selection
- Test data generation
- ... and more

## Prerequisites

1. Make sure you have Node.js, Yarn, and Cocoapods installed on your machine.
2. Download the `google-services.plist` file and place it in the appropriate directory. (More on that below)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/MVP-Leg-Up.git
   ```

2. **Install Dependencies**: Navigate into the project directory and run:

   ```bash
   yarn install
   ```

3. **Install iOS Pods**: Change into the iOS directory and install the Cocoapods:

   ```bash
   cd ios && pod install
   ```

4. **Add Google Services Config**: Place your `google-services.plist` file in the `ios/YourApp/` directory. Failure to do so will result in build errors.

## Generate Test Data

Run the following command to populate the database with 100 test users:

```bash
node populateDatabase.js
```

Each document in the TestData collection will have the following schema with randomly generated data:

```
{
  "_id": "auto_generated_id",
  "date": "2023-12-30",
  "email": "jane.rodriguez66@example.com",
  "first_name": "Jane",
  "last_name": "Rodriguez",
  "location": {
    "latitude": 29.993017326035865,
    "longitude": -98.0619033564829
  },
  "profile_picture": "http://placekitten.com/200/200?image=66",
  "username": "user66"
}
```

## How to Get google-services.plist

- Go to your Firebase project in the Firebase console.
- Navigate to Project settings.
- Under the "Your apps" card, select the iOS app.
- Download the google-services.plist file.
- Place this file in the `ios/YourApp/` directory of your project.

## Stripe Integration

This starter kit is configured to use Stripe for payment processing. You'll need to add your Stripe API keys for it to work properly.

### Getting the Keys

1. Head over to your Stripe Dashboard.
2. Navigate to the API keys section.
3. You'll see two keys: `Publishable key` and `Secret key`.

### Setting up the Keys

1. **Project Root .env**: Place your `STRIPE_PUBLISHABLE_KEY` in the `.env` file located in the project's root directory.

   ```bash
   STRIPE_PUBLISHABLE_KEY=your_publishable_key_here
   ```

2. **StripeServer .env**: Place your `STRIPE_SECRET_KEY` in the `.env` file within the `StripeServer` directory.

   ```bash
   STRIPE_SECRET_KEY=your_secret_key_here
   ```

### StripeServer Setup

The `StripeServer` directory has its own dependencies, so you'll need to install those:

1.  Navigate to the `StripeServer` directory.

    ```bash
    cd StripeServer
    ```

2.  Run `yarn` to install the required packages.

    ```bash
    yarn install
    ```

3.  Start the Stripe server by running:

        ```bash
        yarn start
        ```

    Note: the Stripe server is hard coded for port 3000, you may need to change the port in your code if this is not the case in your set up.
