import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url, {
          method: "get",
          mode: "cors",
          headers: { "content-type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) {
          setError("failed to fetch");
          alert("failed to fetch");
        }
        const result = await res.json();
        console.log(result)
        setData(result);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    error,
    loading,
  };
};

export default useFetch;
