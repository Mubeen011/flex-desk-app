import {
  ChevronDoubleDownIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function SearchBox() {
  return (
    <div>
      <div className="mt-2">
        {/* <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"> */}
        <div className="flex items-center w-full px-4 py-1 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
          {/* Search Icon */}
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search and filter here"
            className="flex-1 ml-2 text-sm bg-transparent border-none ring-0 outline-none placeholder-gray-400 focus:outline-none focus:ring-0"
          />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
