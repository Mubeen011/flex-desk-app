// import { useLocation } from "react-router-dom";

// export default function ErrorP() {
//   const location = useLocation();

//   const params = new URLSearchParams(location.search);
//   const message = params.get("message") || "Something went wrong!"; // Default message if not found

//   return (
//     <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
//       <div className="text-center">
//         <p className="text-base font-semibold text-indigo-600">404</p>
//         <p className="mt-4 text-sm font-semibold tracking-tight text-gray-900 sm:text-xl">
//           {message}
//         </p>
//         <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl">
//           Sorry, we couldn’t find the page you’re looking for.
//         </p>
//         <div className="mt-10 flex items-center justify-center gap-x-6">
//           <button
//             onClick={() => {
//               window.location.href = "https://dkzty2qkr8xff.cloudfront.net";
//             }}
//             className="text-lg font-semibold bg-blue-600 text-white p-2 rounded-md hover:bg-blue-800"
//           >
//             Login Again <span aria-hidden="true">&rarr;</span>
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }
