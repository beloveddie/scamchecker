import React from "react";
import { useAppContext } from "../src/AppContext";
import ResultCard from "./ResultCard";
import { Loader2 } from "lucide-react";
// import { Recaptha } from "./Recaptha";

const CheckURL = () => {
  const { state, dispatch } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });
    try {
      const response = await fetch(
        "https://phishing-urls-pred-api-lyw2.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: state.url }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      dispatch({ type: "SET_RESULT", payload: data });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "An error occurred while checking the URL. Please try again.",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="container mx-auto my-8 px-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Check URL Safety
      </h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col md:flex-col gap-2 ">
          <textarea
            type="text"
            cols="100"
            rows="5"
            value={state.url}
            onChange={(e) =>
              dispatch({ type: "SET_URL", payload: e.target.value })
            }
            placeholder="Please paste your link here"
            className="flex-grow border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B263B] resize-none"
          ></textarea>
          <div className="flex gap-4 justify-center items-center mt-8">
            <input type="checkbox" name="" id="" />
          
            <span className="md:text-base text-start">
              By submitting a URL, you agree to our Terms of Service and
              Privacy Policy. <br />
              Your URL submission may be shared with the security community
              to enhance threat detection. <br />
              Please avoid submitting any personal information, as we are not
              responsible for the contents of your submission.
            </span>
            
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-[#1B263B] text-white h-14 w-40 rounded-md hover:bg-[#1B263B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={state.isLoading}
            >
              {state.isLoading ? (
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
              ) : (
                "Check URL"
              )}
            </button>
          </div>
        </div>
      </form>
      {state.error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4"
          role="alert"
        >
          <strong className="font-bold mr-1">Error:</strong>
          <span className="block sm:inline">{state.error}</span>
        </div>
      )}
      {state.result && <ResultCard result={state.result} />}
    </div>
  );
};
export default CheckURL;


// import React, { useState } from "react";
// import { useAppContext } from "../src/AppContext";
// import ResultCard from "./ResultCard";
// import { Loader2 } from "lucide-react";
// import ReCAPTCHA from "react-google-recaptcha"; // Import the ReCAPTCHA component

// const CheckURL = () => {
//   const { state, dispatch } = useAppContext();
//   const [recaptchaToken, setRecaptchaToken] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!recaptchaToken) {
//       alert("Please complete the reCAPTCHA.");
//       return;
//     }

//     dispatch({ type: "SET_LOADING", payload: true });
//     dispatch({ type: "SET_ERROR", payload: null });

//     try {
//       const response = await fetch(
//         "https://phishing-urls-pred-api-lyw2.onrender.com/predict",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ url: state.url, recaptchaToken }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const data = await response.json();
//       dispatch({ type: "SET_RESULT", payload: data });
//     } catch (error) {
//       dispatch({
//         type: "SET_ERROR",
//         payload: "An error occurred while checking the URL. Please try again.",
//       });
//     } finally {
//       dispatch({ type: "SET_LOADING", payload: false });
//     }
//   };

//   return (
//     <div className="container mx-auto my-8 px-4 max-w-2xl">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         Check URL Safety
//       </h1>
//       <form onSubmit={handleSubmit} className="mb-8">
//         <div className="flex flex-col md:flex-col gap-6">
//           <textarea
//             cols="100"
//             rows="5"
//             value={state.url}
//             onChange={(e) =>
//               dispatch({ type: "SET_URL", payload: e.target.value })
//             }
//             placeholder="Please paste your link here"
//             className="flex-grow border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B263B] resize-none"
//           ></textarea>
//           <div className="flex gap-4 justify-center items-center mt-8">
//             <input type="checkbox" name="" id="" />
//             <span className="md:text-base text-start">
//               By submitting a URL, you agree to our Terms of Service and Privacy
//               Policy.
//               <br />
//               Your URL submission may be shared with the security community to
//               enhance threat detection.
//               <br />
//               Please avoid submitting any personal information, as we are not
//               responsible for the contents of your submission.
//             </span>
//           </div>
//           <ReCAPTCHA
//             className="flex justify-center items-center"
//             sitekey="6LcWnnEqAAAAACqwzVrieKL2XkoTOMhhOo7zOsrK"
//             onChange={setRecaptchaToken}
//           />
//           <div className="flex justify-center items-center">
//             <button
//               type="submit"
//               className="bg-[#1B263B] text-white h-14 w-40 rounded-md hover:bg-[#1B263B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//               disabled={state.isLoading}
//             >
//               {state.isLoading ? (
//                 <Loader2 className="animate-spin h-5 w-5 mr-2" />
//               ) : (
//                 "Check URL"
//               )}
//             </button>
//           </div>
//         </div>
//       </form>
//       {state.error && (
//         <div
//           className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4"
//           role="alert"
//         >
//           <strong className="font-bold mr-1">Error:</strong>
//           <span className="block sm:inline">{state.error}</span>
//         </div>
//       )}
//       {state.result && <ResultCard result={state.result} />}
//     </div>
//   );
// };

// export default CheckURL;
