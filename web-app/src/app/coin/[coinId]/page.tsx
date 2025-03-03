"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link"; 

const fetchCoinDetails = async (id: string) => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
  return response.data;
};

export default function CoinDetails() {
  const { coinId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["coinDetails", coinId],
    queryFn: () => fetchCoinDetails(coinId as string),
    enabled: !!coinId,
  });

  if (isLoading) {
    return <p className="text-center text-gray-500 text-lg">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500 text-lg">Error: {error?.message || "An unexpected error occurred"}</p>;
  }

 
  const formatDate = (date: string | null) => {
    if (!date) return "N/A"; 
    
    const dateObj = new Date(date);
    
    return isNaN(dateObj.getTime()) ? "Invalid Date" : dateObj.toDateString(); 
  };

  const athDate = data?.market_data?.ath_date?.usd;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md text-gray-800">
      
        <Link href="/" className="mb-4 text-blue-500 hover:underline">
          &larr; Go Back
        </Link>

        <div className="flex justify-center">
          <Image src={data?.image?.large} alt={data?.name} width={80} height={80} />
        </div>
        <h2 className="text-2xl font-bold text-center mt-4">{data?.name} ({data?.symbol?.toUpperCase()})</h2>
        <p className="text-lg text-center text-gray-600">Market Cap Rank: #{data?.market_cap_rank}</p>

        <div className="mt-4">
          <p><strong>Current Price:</strong> ${data?.market_data?.current_price?.usd?.toLocaleString()}</p>
          <p><strong>Market Cap:</strong> ${data?.market_data?.market_cap?.usd?.toLocaleString()}</p>
          <p><strong>24h High:</strong> ${data?.market_data?.high_24h?.usd}</p>
          <p><strong>24h Low:</strong> ${data?.market_data?.low_24h?.usd}</p>
          <p><strong>Price Change (24h):</strong> {data?.market_data?.price_change_percentage_24h?.toFixed(2)}%</p>
          <p><strong>Circulating Supply:</strong> {data?.market_data?.circulating_supply?.toLocaleString()}</p>
          <p><strong>All-Time High:</strong> ${data?.market_data?.ath?.usd} (on {formatDate(athDate)})</p>
        </div>
      </div>
    </div>
  );
}
