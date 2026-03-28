import axios, { CancelToken } from 'axios';
import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setData(null);
    const source = CancelToken.source();

    axios(url, { cancelToken: source.token })
      .then((res) => {
        setIsLoading(false);
        if (res.data) setData(res.data.data);
        setIsRequestSuccess(true);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsRequestSuccess(false);
        console.error(error);
      });

    return () => {
      source.cancel();
    };
  }, []);

  return { data, isLoading, isRequestSuccess };
};
