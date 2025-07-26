import { URLS, USERTYPE } from '../utils/api';

export const generateToken = async () => {
  const payload = {
    email: 'tushar.saini@lobb.in',
  };
  try {
    const apiCall = await fetch(URLS[USERTYPE.CREATE_TOKEN], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await apiCall.json();
    return data.token;
  } catch (er) {
    console.log('Caught an error while fethcing token: ', er);
    return er;
  }
};
