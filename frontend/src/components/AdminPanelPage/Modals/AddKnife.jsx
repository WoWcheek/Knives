import { useContext, useState } from 'react';
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  ModalFormContent,
  ModalBlock,
  ModalTitle,
  SubmitButton,
  ModalInput,
  ModalSelect
} from './ModalStyles.styled';
import { EditKnifeTableContext } from '../../../core/contexts/EditKnifeTableContext';

// eslint-disable-next-line react/prop-types
const AddKnifeModal = ({ closeModal }) => {
  const {
    name,
    setName,
    description,
    setDescription,
    setImages,
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
    submitKnife,
  } = useContext(EditKnifeTableContext);

  const [imageFiles, setImageFiles] = useState([]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length <= 10) {
      setImageFiles([...imageFiles, ...files]);
    } else {
      alert('You can upload up to 10 images');
    }
  };

  const handleSubmit = async () => {
    const imageBase64Promises = imageFiles.map((file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      })
    );
  
    try {
      const imageBase64List = await Promise.all(imageBase64Promises);
      
      // Видаляємо префікс 'data:image/jpeg;base64,' з кожного зображення
      const updatedImages = imageBase64List.map((base64Data) => {
        const base64String = base64Data.split(',')[1];  // Strip the prefix
        return `data:image/jpeg;base64,${base64String}`;  // Prepend the prefix back
      });
  
      setImages((prevImages) => {
        const updatedImagesList = [...prevImages, ...updatedImages];
        submitKnifeWithImages(updatedImagesList);
        return updatedImagesList;
      });
  
      closeModal();
    } catch (error) {
      console.error('Error converting images to base64', error);
    }
  };
  
  const submitKnifeWithImages = (updatedImages) => {
    submitKnife(updatedImages);
  };
  

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        <h2>Додати ніж</h2>
        <ModalFormContent>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <ModalBlock style={{ flex: '1 1 45%' }}>
              <ModalTitle>Назва</ModalTitle>
              <ModalInput
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </ModalBlock>

            <ModalBlock style={{ flex: '1 1 45%' }}>
              <ModalTitle>Ціна (UAH)</ModalTitle>
              <ModalInput
                type="number"
                step="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </ModalBlock>

            <ModalBlock style={{ flex: '1 1 45%' }}>
              <ModalTitle>Опис</ModalTitle>
              <ModalInput
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </ModalBlock>

            <ModalBlock style={{ flex: '1 1 45%' }}>
              <ModalTitle>Бренд</ModalTitle>
              <ModalInput
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </ModalBlock>

            <ModalBlock style={{ flex: '1 1 45%' }}>
              <ModalTitle>Довжина леза</ModalTitle>
              <ModalInput
                type="number"
                step="0.1"
                value={bladeLength}
                onChange={(e) => setBladeLength(e.target.value)}
              />
            </ModalBlock>

            <ModalBlock style={{ flex: '1 1 45%' }}>
              <ModalTitle>Вага</ModalTitle>
              <ModalInput
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </ModalBlock>

            <ModalBlock style={{ flex: '1 1 45%' }}>
              <ModalTitle>Матеріал ручки</ModalTitle>
              <ModalSelect
                value={handleMaterial}
                onChange={(e) => setHandleMaterial(e.target.value)}
              >
                <option value="wood">Дерево</option>
                <option value="plastic">Пластик</option>
                <option value="metal">Метал</option>
                <option value="rubber">Резина</option>
                <option value="carbon_fiber">Вуглецеве волокно</option>
              </ModalSelect>
            </ModalBlock>

            <ModalBlock style={{ flex: '1 1 45%' }}>
              <ModalTitle>Тип сталі</ModalTitle>
              <ModalSelect
                value={steelType}
                onChange={(e) => setSteelType(e.target.value)}
              >
                <option value="stainless_steel">Нержавіюча сталь</option>
                <option value="damascus">Дамаск</option>
                <option value="carbon_steel">Вуглецева сталь</option>
                <option value="titanium">Титан</option>
                <option value="ceramic">Кераміка</option>
              </ModalSelect>
            </ModalBlock>

            <ModalBlock style={{ flex: '1 1 45%' }}>
              <ModalTitle>Зображення</ModalTitle>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
              <p>Максимум 3 зображення</p>
              <div>
                {imageFiles.map((file, index) => (
                  <p key={index}>{file.name}</p>
                ))}
              </div>
            </ModalBlock>
          </div>
          <SubmitButton onClick={handleSubmit}>Зберегти</SubmitButton>
        </ModalFormContent>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddKnifeModal;