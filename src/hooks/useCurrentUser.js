import { useEffect, useState } from 'react';
import axios from 'axios';

const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/me', {
          headers: {
            'Authorization': `Bearer fake-super-secret-token`, // Replace with actual token management
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching current user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
};

export default useCurrentUser;
