import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { MessageError, MessageSuccess } from '../../components/Alert';

export const DealContext = createContext();

// eslint-disable-next-line react/prop-types
export const DealProvider = ({ children }) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Нова');
  const [amount, setAmount] = useState(0);
  const [clientId, setClientId] = useState('');
  const [selectedDealId, setSelectedDealId] = useState(null);

  // New state for storing the total number of deals and total amount
  const [totalDeals, setTotalDeals] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const loadDeals = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.backendUrl}/getAllDeals`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setDeals(response.data);

      // Update totalDeals based on the length of the fetched data
      setTotalDeals(response.data.length);

      // Calculate the total amount by summing the 'amount' field in the fetched data
      const sumAmount = response.data.reduce((acc, deal) => acc + deal.amount, 0);
      setTotalAmount(sumAmount);

    } catch (error) {
      MessageError('Не вдалося завантажити угоди.');
    } finally {
      setLoading(false);
    }
  };

  const createDeal = async () => {
    try {
      await axios.post(
        `${config.backendUrl}/createDeal`,
        { name, description, status, clientId, amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setName('');
      setStatus('Нова');
      setAmount(0);
      setClientId('');
      MessageSuccess('Угоду успішно створено.');
      loadDeals();
    } catch (error) {
      MessageError('Не вдалося створити угоду.');
    }
  };

  const updateDeal = async (id) => {
    try {
      await axios.put(
        `${config.backendUrl}/updateDeal/${id}`,
        { name, status, amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      await axios.put(
        `${config.backendUrl}/updateDealStatus`,
        { id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      MessageSuccess('Угоду успішно оновлено.');
      loadDeals();
    } catch (error) {
      MessageError('Не вдалося оновити угоду.');
    }
  };

  const deleteDeal = async (id) => {
    try {
      await axios.delete(`${config.backendUrl}/deleteDeal/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      MessageSuccess('Угоду успішно видалено.');
      loadDeals();
    } catch (error) {
      MessageError('Не вдалося видалити угоду.');
    }
  };

  const selectDealForEdit = (deal) => {
    setSelectedDealId(deal.id);
    setName(deal.name);
    setStatus(deal.status);
    setAmount(deal.amount);
    setClientId(deal.clientId);
  };

  useEffect(() => {
    loadDeals();
  }, []);

  return (
    <DealContext.Provider
      value={{
        deals,
        loading,
        loadDeals,
        createDeal,
        updateDeal,
        deleteDeal,
        selectDealForEdit,
        name,
        setName,
        description,
        setDescription,
        status,
        setStatus,
        amount,
        setAmount,
        clientId,
        setClientId,
        selectedDealId,
        totalDeals, // Provide totalDeals in context
        totalAmount, // Provide totalAmount in context
      }}
    >
      {children}
    </DealContext.Provider>
  );
};
