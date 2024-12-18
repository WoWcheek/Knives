import { useContext, useState } from 'react';

import {
  ClientsTable,
  Table,
  TableRow,
  TableHeader,
  TableBody,
  Title,
  TableHeading,
  TableCell,
} from './TableStyles.styled';

import { Button, Header } from '../AdminPanelPage.styled';

import AddKnifeModal from '../Modals/AddKnife';
import EditKnifeModal from '../Modals/EditKnife';
import { EditKnifeTableContext } from '../../../core/contexts/EditKnifeTableContext';

const KnifeTableCon = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const {
    selectKnifeForEdit,
    closeEditUserModal,
    editKnifeTable,
    loading,
    stateEditUserModal,
    setHandleMaterial,
    setSteelType,
    setImages,
  } = useContext(EditKnifeTableContext);

  const openModal = () => {
      setHandleMaterial('wood');
      setSteelType('stainless_steel');
      setModalOpen(true);
    }
  const closeModal = () => {
    setImages([]);
    setModalOpen(false);
  }

  return (
    <>
      <ClientsTable>
        <Header>
          <Title>Ножі</Title>
          <Button onClick={openModal}>Додати ніж</Button>
        </Header>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeading>ID</TableHeading>
              <TableHeading>Назва</TableHeading>
              <TableHeading>Бренд</TableHeading>
              <TableHeading>Ціна</TableHeading>
              <TableHeading>Довжина леза</TableHeading>
              <TableHeading>Вага</TableHeading>
              <TableHeading>Матеріал рукоятки</TableHeading>
              <TableHeading>Тип сталі</TableHeading>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan="7">Завантаження...</TableCell>
              </TableRow>
            ) : (
              editKnifeTable.map((knife) => (
                <TableRow
                  key={knife.id}
                  onClick={() => selectKnifeForEdit(knife)}
                >
                  <TableCell>{knife.id}</TableCell>
                  <TableCell>{knife.name}</TableCell>
                  <TableCell>{knife.price}</TableCell>
                  <TableCell>{knife.brand}</TableCell>
                  <TableCell>{knife.blade_length} см</TableCell>
                  <TableCell>{knife.weight} г</TableCell>
                  <TableCell>{knife.handle_material}</TableCell>
                  <TableCell>{knife.steel_type}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ClientsTable>
      {isModalOpen && <AddKnifeModal closeModal={closeModal} />}
      {stateEditUserModal && <EditKnifeModal close={closeEditUserModal} />}
    </>
  );
};

const KnifeTable = () => {
  return (
      <>
      <KnifeTableCon />
    </>
  );
};

export default KnifeTable;
