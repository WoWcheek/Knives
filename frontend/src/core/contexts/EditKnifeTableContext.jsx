import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { MessageError, MessageSuccess } from '../../components/Alert';

export const EditKnifeTableContext = createContext();

// eslint-disable-next-line react/prop-types
export const EditKnifeTableProvider = ({ children }) => {
  // State for managing knives table and modal
  const [stateEditUserModal, setStateEditUserModal] = useState(false);
  const [editKnifeTable, setEditKnifeTable] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fields for a knife
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [bladeLength, setBladeLength] = useState('');
  const [weight, setWeight] = useState('');
  const [handleMaterial, setHandleMaterial] = useState('');
  const [steelType, setSteelType] = useState('');
  const [images, setImages] = useState([]);
  const [selectedKnifeId, setSelectedKnifeId] = useState(null);

  const [totalKnives, setTotalKnives] = useState(0);

  // Load knife data from the server
  const loadKnifeData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.backendUrl}/knives?loadAll=true`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEditKnifeTable(response.data.knives);
      setTotalKnives(response.data.knives.length);
    } catch (error) {
      // Handle error (optional)
      // MessageError('Failed to load knife data');
    } finally {
      setLoading(false);
    }
  };


  const paginateKnifeData = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.backendUrl}/knives?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEditKnifeTable(response.data.knives);
      setTotalKnives(response.data.length);
    } catch (error) {
      // Handle error (optional)
      // MessageError('Failed to load knife data');
    } finally {
      setLoading(false);
    }
  };

  // Submit new knife
  const submitKnife = async (updatedImages) => {
    try {
      await axios.post(
        `${config.backendUrl}/knives`,
        { 
          name, 
          price, 
          description, 
          brand, 
          blade_length: bladeLength, 
          weight, 
          handle_material: handleMaterial, 
          steel_type: steelType, 
          images: updatedImages // Используем обновлённые images
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      resetForm();
      MessageSuccess('Ніж додано успішно.');
      loadKnifeData();
    } catch (error) {
      MessageError('Не вдалося додати ніж.');
    }
  };

  // Edit knife data
  const editKnife = async (id, updatedImages) => {
    try {
      await axios.put(
        `${config.backendUrl}/knives/${id}`,
        { name, price, description, brand, blade_length: bladeLength, weight, handle_material: handleMaterial, steel_type: steelType, images: updatedImages },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      MessageSuccess('Дані ножа оновлено успішно.');
      loadKnifeData();
    } catch (error) {
      MessageError('Не вдалося оновити дані ножа.');
    }
  };

  // Delete knife
  const deleteKnife = async (id) => {
    try {
      await axios.delete(`${config.backendUrl}/knives/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      MessageSuccess('Ніж успішно видалено.');
      loadKnifeData();
    } catch (error) {
      MessageError('Не вдалося видалити ніж.');
    }
  };

  // Select knife for editing
  const selectKnifeForEdit = (knife) => {
    setSelectedKnifeId(knife.id);
    setName(knife.name);
    setDescription(knife.description);
    setPrice(knife.price);
    setBrand(knife.brand);
    setBladeLength(knife.blade_length);
    setWeight(knife.weight);
    setHandleMaterial(knife.handle_material);
    setSteelType(knife.steel_type);
    setImages(knife.images);
    openEditUserModal();
  };

  // Reset the form
  const resetForm = () => {
    setName('');
    setDescription('');
    setBrand('');
    setBladeLength('');
    setWeight('');
    setHandleMaterial('');
    setSteelType('');
    setImages([]);
  };

  const closeEditUserModal = () => {
    setStateEditUserModal(false);
    resetForm();
  };

  const openEditUserModal = () => setStateEditUserModal(true);

  useEffect(() => {
    loadKnifeData();
  }, []);

  return (
    <EditKnifeTableContext.Provider
      value={{
        openEditUserModal,
        closeEditUserModal,
        editKnifeTable,
        loading,
        loadKnifeData,
        stateEditUserModal,
        name,
        setName,
        description,
        setDescription,
        price,
        setPrice,
        brand,
        setBrand,
        bladeLength,
        setBladeLength,
        weight,
        setWeight,
        handleMaterial,
        setHandleMaterial,
        steelType,
        setSteelType,
        images,
        setImages,
        submitKnife,
        editKnife,
        selectKnifeForEdit,
        selectedKnifeId,
        deleteKnife,
        totalKnives,
        paginateKnifeData
      }}
    >
      {children}
    </EditKnifeTableContext.Provider>
  );
};
