import { Stock, DetailedStock } from '../types/stockTypes';
import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/stocks';

const getFavoriteStocks = async () => {
  const response = await axios.get<DetailedStock[] | []>(
    `${baseUrl}/favourites/real-time`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const postFavoriteStock = async ({ ticker }: { ticker: string }) => {
  const response = await axios.post<Stock>(
    `${baseUrl}/favourites`,
    { ticker },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const deleteFavoriteStock = async (stockId: number) => {
  const response = await axios.delete<Stock>(
    `${baseUrl}/favourites/${stockId}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
export default { getFavoriteStocks, postFavoriteStock, deleteFavoriteStock };
