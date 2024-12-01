import React, { useState } from "react";
import styled from "styled-components";
import { Button, InputText, Label } from "../../../components/ui";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Roboto", sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  margin-bottom: 20px;
`;

const TableHeader = styled.thead`
  background: #f4f4f4;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TableHead = styled.th`
  padding: 10px;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

type Provider = {
  id: number;
  name: string;
  contact: string;
  phone: string;
  email: string;
};

const mockProviders: Provider[] = [
  { id: 1, name: "Proveedor A", contact: "Carlos", phone: "555-1234", email: "carlos@proveedora.com" },
  { id: 2, name: "Proveedor B", contact: "María", phone: "555-5678", email: "maria@proveedorb.com" },
];

export const GestionProveedores = () => {
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Provider>>({
    id: null,
    name: "",
    contact: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (formData.id) {
      setProviders(
        providers.map((provider) =>
          provider.id === formData.id ? { ...provider, ...formData } as Provider : provider
        )
      );
    } else {
      // Add new provider
      const newProvider: Provider = {
        ...(formData as Omit<Provider, "id">),
        id: providers.length + 1,
      };
      setProviders([...providers, newProvider]);
    }
    closeModal();
  };

  const openModal = (provider: Partial<Provider> = { id: null, name: "", contact: "", phone: "", email: "" }) => {
    setFormData(provider);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setProviders(providers.filter((provider) => provider.id !== id));
  };

  return (
    <PageContainer>
      <Header>
        <Title>Gestión de Proveedores</Title>
        <Button onClick={() => openModal()}>
          <i className="icon-nuevo-proveedor"></i> Nuevo Proveedor
        </Button>
      </Header>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre del Proveedor</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <tbody>
          {providers.map((provider) => (
            <TableRow key={provider.id}>
              <TableCell>{provider.name}</TableCell>
              <TableCell>{provider.contact}</TableCell>
              <TableCell>{provider.phone}</TableCell>
              <TableCell>{provider.email}</TableCell>
              <TableCell>
                <Button className="btn-editar" onClick={() => openModal(provider)}>
                  Editar
                </Button>
                <Button className="btn-eliminar" onClick={() => handleDelete(provider.id)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {isModalOpen && (
        <ModalOverlay>
          <Modal>
            <h2>{formData.id ? "Editar Proveedor" : "Nuevo Proveedor"}</h2>
            <FormGroup>
              <Label htmlFor="name">Nombre del Proveedor</Label>
              <InputText
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="contact">Contacto</Label>
              <InputText
                id="contact"
                name="contact"
                value={formData.contact || ""}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Teléfono</Label>
              <InputText
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone || ""}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <InputText
                id="email"
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={handleInputChange}
              />
            </FormGroup>
            <ButtonGroup>
              <Button onClick={closeModal}>Cancelar</Button>
              <Button onClick={handleSave}>Guardar</Button>
            </ButtonGroup>
          </Modal>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};
