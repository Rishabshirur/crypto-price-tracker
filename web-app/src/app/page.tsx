// "use client";

// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import SearchBar from "./components/SearchBar";
// import CryptoTable from "./components/CryptoTable";

// interface CryptoPrices {
//   [key: string]: {
//     usd: number;
//     usd_24h_change: number;
//     usd_market_cap: number;
//     usd_24h_vol: number;
//     [currency: string]: number;
//   };
// }

// const fetchPrices = async (currency: string): Promise<CryptoPrices> => {
//   const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
//     params: {
//       ids: "bitcoin,ethereum,cardano,binancecoin,solana",
//       vs_currencies: currency,
//       include_market_cap: "true",
//       include_24hr_vol: "true",
//       include_24hr_change: "true",
//     },
//   });
//   return response.data;
// };

// const fetchSupportedCurrencies = async () => {
//   const response = await axios.get("https://api.coingecko.com/api/v3/simple/supported_vs_currencies");
//   return response.data;
// };

// export default function Home() {
//   const [search, setSearch] = useState("");
//   const [currency, setCurrency] = useState("usd");
//   const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>([]);

//   useEffect(() => {
//     const getCurrencies = async () => {
//       const currencies = await fetchSupportedCurrencies();
//       setSupportedCurrencies(currencies);
//     };
//     getCurrencies();
//   }, []);

//   const { data, isLoading, isError, error, refetch } = useQuery<CryptoPrices, Error>({
//     queryKey: ["cryptoPrices", currency],
//     queryFn: () => fetchPrices(currency),
//     staleTime: 1000 * 60 * 5,
//     retry: 3,
//   });

//   if (isLoading) {
//     return <p className="text-center text-gray-500 text-lg">Loading...</p>;
//   }

//   if (isError) {
//     return (
//       <div className="text-center text-red-500 text-lg">
//         <p>Error fetching data: {error instanceof Error ? error.message : "Unknown error"}</p>
//         <button
//           onClick={() => refetch()}
//           className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all mt-4"
//         >
//           🔄 Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-6">
//       <div className="w-full max-w-5xl">
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Crypto Price Tracker</h1>

//         <SearchBar
//           search={search}
//           setSearch={setSearch}
//           currency={currency}
//           setCurrency={setCurrency}
//           supportedCurrencies={supportedCurrencies}
//           refetch={refetch}
//         />

//         <CryptoTable data={data ?? {}} search={search} currency={currency} />
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import CryptoTable from "./components/CryptoTable";

interface CryptoPrices {
  [key: string]: {
    usd: number;
    usd_24h_change: number;
    usd_market_cap: number;
    usd_24h_vol: number;
    [currency: string]: number;
  };
}

const fetchPrices = async (currency: string): Promise<CryptoPrices> => {
  const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
    params: {
      ids: "bitcoin,ethereum,cardano,binancecoin,solana",
      vs_currencies: currency,
      include_market_cap: "true",
      include_24hr_vol: "true",
      include_24hr_change: "true",
    },
  });
  return response.data;
};

const fetchSupportedCurrencies = async () => {
  
  const response = await axios.get("https://api.coingecko.com/api/v3/simple/supported_vs_currencies");
  return response.data;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>([]);

  useEffect(() => {
    const getCurrencies = async () => {
      const currencies = await fetchSupportedCurrencies();
      setSupportedCurrencies(currencies);
    };
    getCurrencies();
  }, []);

  const { data, isLoading, isError, error, refetch } = useQuery<CryptoPrices, Error>({
    queryKey: ["cryptoPrices", currency],
    queryFn: () => fetchPrices(currency),
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });

  if (isLoading) {
    return <p className="text-center text-gray-500 text-lg">Loading...</p>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 text-lg">
        <p>Error fetching data: {error instanceof Error ? error.message : "Unknown error"}</p>
        <button
          onClick={() => refetch()}
          className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all mt-4"
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-6">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Crypto Price Tracker</h1>

        {/* SearchBar Component */}
        <SearchBar
          search={search}
          setSearch={setSearch}
          currency={currency}
          setCurrency={setCurrency}
          supportedCurrencies={supportedCurrencies}
          refetch={refetch}
        />

        {/* CryptoTable Component */}
        <CryptoTable data={data ?? {}} search={search} currency={currency} />
      </div>
    </div>
  );
}

