import { URLS, USERTYPE } from '../utils/api';

export const getDetails = async (token: string) => {
  if (!token || !token.startsWith('e')) {
    return null;
  }
  try {
    const apiCall = await fetch(URLS[USERTYPE.GET_CONTENT], {
      method: 'GET',
      headers: {
        Authorization: ` Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await apiCall.json();
    return data?.content;
  } catch (er) {
    console.log('Caught an error while fetching data: ', er);
    return er;
  }
};
