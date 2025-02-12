import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Loader2, Search, X } from "lucide-react";
import { useLocationSearch } from "../hooks/use-weather";

export default function CitySearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: locations, isLoading } = useLocationSearch(searchQuery);

  console.log(locations);

  const handleSelect = () => {};

  return (
    <Dialog.Root>
      {/* ✅ Button jo dialog open karega */}
      <Dialog.Trigger asChild>
        <button className="p-2 rounded-md border border-white/10 text-white/80 hover:bg-stone-900 flex items-center gap-2  w-[200px]">
          <Search className="" size={18} />
          <span className="hidden sm:block text-sm">Search Cities...</span>
        </button>
      </Dialog.Trigger>

      {/* ✅ Pura screen blur hone ke liye */}
      <Dialog.Overlay className="fixed inset-0 w-screen h-screen bg-black/70 backdrop-blur-sm z-[100]" />

      <Dialog.Content className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-md bg-stone-950 text-white p-4 rounded-lg shadow-lg border border-stone-800 z-[100]">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-stone-800 pb-2">
          <h2 className="text-lg font-semibold text-gray-200">Search</h2>
          <Dialog.Close asChild>
            <button className="p-1 text-gray-400 hover:text-gray-200">
              <X className="w-5 h-5" />
            </button>
          </Dialog.Close>
        </div>

        {/* Search Input */}
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Type to search..."
            className="w-full p-2 pl-10 border border-stone-800 bg-stone-900 text-white rounded-md focus:ring-2 focus:ring-gray-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Suggestions List */}

        <div className="mt-4 max-h-40 overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <p className="text-gray-500 p-2">
              <Loader2 className="h-4 w-4 animate-spin" />
            </p>
          ) : locations && locations.length > 0 ? (
            <>
              <span className="text-gray-400 text-sm block mb-2">
                Suggestions
              </span>
              <ul>
                {locations.map((location) => {
                  return (
                    <li
                      key={`${location.lat}-${location.lon}`}
                      value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                      onSelect={handleSelect}
                      className="flex items-center rounded-md cursor-pointer hover:bg-stone-800 py-2 px-3"
                    >
                      <Search className="mr-2" size={18} />
                      <span>{location.name}</span>
                      {location.state && (
                        <span className="text-sm text-white/60">
                          , {location.state}
                        </span>
                        
                      )}
                      {location.country && (
                        <span className="text-sm text-white/60">
                          , {location.country}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </>
          ) : locations ? (
            <p className="text-gray-500 p-2">No results found</p>
          ) : (
            <p className="text-gray-500 p-2">
              Start typing to see suggestions...
            </p>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
