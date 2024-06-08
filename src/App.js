import { useEffect, useState } from "react";
import { Spinner } from "./Components/Spinner";

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://randomuser.me/api/?page=1&results=1&seed=abc"
      );
      const jsonResponse = await response.json();
      if (jsonResponse && jsonResponse.results?.length > 0) {
        setUserDetails(jsonResponse.results[0]);
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  console.log(userDetails);

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="container mx-auto p-16">
      {loading ? (
        <Spinner />
      ) : (
        <div className="border-4 border-black">
          {userDetails && (
            <div className="grid gap-4 grid-cols-2 p-16">
              <div className="grid place-items-center border-4 border-black p-8">
                <img
                  className="w-96 h-96"
                  src={userDetails?.picture?.large}
                  alt={`${userDetails?.name?.first}_${userDetails?.name?.last}`}
                />
              </div>
              <div className="grid gap-4 h-32 grid-cols-2 grid-rows-3">
                <h1>
                  <strong>First Name:</strong> {userDetails?.name?.first}
                </h1>
                <h1>
                  <strong>Last Name:</strong> {userDetails?.name?.last}
                </h1>
                <h1>
                  <strong>Gender:</strong> {userDetails?.gender}
                </h1>
                <br />
                <h1>
                  <strong>Phone:</strong> {userDetails?.phone}
                </h1>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
