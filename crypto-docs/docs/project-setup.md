# Project Setup Guide

## Web App Setup

To set up and run the web application locally, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/Rishabshirur/crypto-price-tracker.git
cd web-app
   ```
2. **Install the dependencies:**

```bash
npm install
```

3. **Run the development server:**
```bash
npm run start
```


## Mobile App Setup
To run the Crypto Price Tracker mobile app, follow these steps:

Clone the repository:

```bash
git clone https://github.com/Rishabshirur/crypto-price-tracker.git
cd web-app
```

Install mobile app dependencies:

```bash
npm install
```
For Android:
```bash
npx react-native run-android
```
For iOS:
```bash
npx react-native run-ios
```
The app will open on the emulator or a connected device.

## API Integration Details

The Crypto Price Tracker fetches cryptocurrency data from a public API. We use Axios to make the API requests and update the app state accordingly.

**Fetching Data**

We use the CoinGecko API for real-time cryptocurrency prices. CoinGecko was chosen because it provides more comprehensive data, including not just prices, but also market cap, trading volume, historical data, developer activity, community engagement, and more. CoinGecko offers a free, no-authentication-required API, and supports a wider range of cryptocurrencies.

Install Axios:
```bash
npm install axios
```
## State Management
React Query was chosen for state management because:

1. **Automatic Caching and Data Synchronization:** React Query automatically caches data and keeps it synchronized across components, so when the data is refetched or changes, React Query ensures that the updated data is available throughout the app.
2. **Built-in Error Handling:** React Query handles errors gracefully, providing useful feedback to the user when the fetch fails (e.g., displaying error messages).
3. **Easy to Implement:** It simplifies the process of data fetching with hooks like useQuery and useMutation, allowing developers to focus on the UI and business logic rather than manually managing loading, error, and success states.

## Challenges & Solutions:
- **Handling Multiple API Calls:**

**Challenge:** The project makes multiple API calls for different purposes (crypto prices, supported currencies, and coin details). This could lead to issues like loading states overlapping or redundant fetches.
**Solution:** React Query handles concurrent API requests efficiently by using useQuery hooks for each data type. This ensures that all API requests are handled and displayed without blocking or interfering with one another.
Currency Switching and Filtering:

**Challenge:** When users switch currencies or type in the search bar, the displayed data needs to be updated.
**Solution:** React Query's refetch functionality and local state for search are used to handle updates. When currency changes, React Query automatically triggers a refetch for the new currency, and search state is applied to filter the displayed crypto data.

- **Error Handling:**

**Challenge:** Fetching data from third-party APIs often leads to connection issues or unexpected errors.
**Solution:** The error state provided by React Query is used to show error messages on the UI. This ensures that users are aware when something goes wrong and gives them an option to retry fetching data.
Formatting Data (e.g., Coin Details):

**Challenge:** Handling and formatting the data (like market cap, high/low values, etc.) coming from the CoinGecko API can be complex, especially when dealing with different currencies and value types.
**Solution:** Data formatting functions like toLocaleString and manual checks (e.g., isNaN) are used to ensure that the data is displayed correctly and consistently. For the all-time high (ATH) date, a formatDate function ensures a readable date format or "N/A" if the date is missing.