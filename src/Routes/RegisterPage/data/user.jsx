import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const userAPI = () => {
  const [signup, setSignup] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLogin = async () => {
      try {
        setError(null);
        setSignup(null);
        setLoading(true);
        const response = await axios.get(
          'http://192.168.0.63:8080/account/signUp'
        );
        setSignup(response.data.result);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchLogin();
    console.log(signup);
  }, []);
};
