import React from "react";
import Link from "next/link";

interface CryptoTableProps {
  data: Record<string, any>;
  search: string;
  currency: string;
}

const CryptoTable: React.FC<CryptoTableProps> = ({ data, search, currency }) => {
  const filteredCryptos = Object.entries(data ?? {}).filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border border-gray-200 text-gray-800">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">24h</th>
            <th className="p-3">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {filteredCryptos.map(([name, price]) => (
            <tr key={name} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="p-3 font-semibold">
                <Link href={`/coin/${name.toLowerCase()}`} className="text-blue-600 hover:underline">
                  {name.toUpperCase()}
                </Link>
              </td>
              <td className="p-3">
                {currency === "usd"
                  ? `$${(price as any).usd.toFixed(2)}`
                  : `${currency.toUpperCase()} ${(price as any)[currency]?.toFixed(2)}`}
              </td>
              <td className="p-3">
                <span
                  className={`${
                    (price as any)[currency + "_24h_change"] >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {(price as any)[currency + "_24h_change"] !== undefined
                    ? `${
                        (price as any)[currency + "_24h_change"] >= 0
                          ? `+${(price as any)[currency + "_24h_change"].toFixed(2)}%`
                          : `${(price as any)[currency + "_24h_change"].toFixed(2)}%`
                      }`
                    : "N/A"}
                </span>
              </td>
              <td className="p-3">
                {currency === "usd"
                  ? `$${(price as any).usd_market_cap.toLocaleString()}`
                  : `${currency.toUpperCase()} ${(price as any)[currency + "_market_cap"]?.toLocaleString()}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
