import { LL2ListResponse, LaunchDetail, LaunchListItem } from './interfaces.js';

/**
 * Generic function to get data from any URL.
 * It's now generic (<T>) to handle different response types from various APIs.
 * @param {string} url The URL to fetch data from.
 * @returns {Promise<T>} A promise that resolves to the fetched data (type T).
 * @throws {Error} Throws an error if the network request fails or the response status is not OK.
 */
export const getData = async <T>(url: string): Promise<T> => {
  try {
    const res: Response = await fetch(url);

    // Crucial: Check if the HTTP response was successful (status 200-299)
    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`HTTP error status: ${res.status} for URL: ${url}. Response: ${errorBody}`);
      throw new Error(`Failed to fetch data from ${url}: ${res.status} ${res.statusText}`);
    }

    const data: T = await res.json();
    return data;
  } catch (error: unknown) {
    console.error(`Error in getData for URL ${url}:`, error);
    throw error;
  }
};

/**
 * Function to get all data from different URLs.
 * @param {string[]} appUrlsData An array of URL paths to fetch data from.
 * @returns {Promise<any[]>} A promise that resolves to an array of fetched data (can be mixed types).
 * @throws {Error} Throws an error if any of the fetch operations fail.
 */
export const getAllDataFromDifferentUrls = async (
  appUrlsData: string[]
): Promise<any[]> => {
  const promises: Promise<any>[] = appUrlsData.map((url: string) =>
    getData(`http://localhost:3010${url}`)
  );

  try {
    const items: any[] = await Promise.all(promises);
    return items;
  } catch (error: unknown) {
    console.error('Error in getAllDataFromDifferentUrls:', error);
    throw error;
  }
};

/**
 * Function to get data from an authenticated API.
 * NOTE: For Launch Library 2, a Bearer Token is typically NOT used for authentication.
 * If you have a premium LL2 API key, it usually requires an 'Authorization: Token <YOUR_KEY>' header.
 * For basic (rate-limited) access, no authentication header is needed for LL2.
 * This function is likely more relevant if your backend API uses JWT/Bearer tokens.
 *
 * @param {string} url The URL to fetch data from.
 * @returns {Promise<T>} A promise that resolves to the API response (type T).
 * @throws {Error} Throws an error if the network request fails or the response status is not OK.
 */
export const getDataFromAuthenticatedApi = async <T>(url: string): Promise<T> => {
  try {
    const headers: HeadersInit = {};
    // Check if BEARER_TOKEN is set in environment variables and apply it
    if (process.env.BEARER_TOKEN) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers.Authorization = `Bearer ${process.env.BEARER_TOKEN}`;
    }

    const res: Response = await fetch(url, { headers });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`HTTP error status: ${res.status} for URL: ${url}. Response: ${errorBody}`);
      throw new Error(`Failed to fetch authenticated data from ${url}: ${res.status} ${res.statusText}`);
    }

    const data: T = await res.json();
    return data;
  } catch (error: unknown) {
    console.error(`Error in getDataFromAuthenticatedApi for URL ${url}:`, error);
    throw error;
  }
};
