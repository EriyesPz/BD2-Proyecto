import React, { useState } from "react";
import { Label, InputText, Button, Select } from "../../components/ui";
import styled from "styled-components";

const specialties = [
  { value: "Cardiology", label: "Cardiology" },
  { value: "Dermatology", label: "Dermatology" },
  { value: "Neurology", label: "Neurology" },
  { value: "Pediatrics", label: "Pediatrics" },
  { value: "Orthopedics", label: "Orthopedics" },
  { value: "General Medicine", label: "General Medicine" },
];

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const RegistarDoctor = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    specialty: "",
    type: "",
    consultationFee: "",
    surgeryFee: "",
    phone: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const handleChange = (field: string, value: string) => {
    if (field.includes("address.")) {
      const addressField = field.split(".")[1];
      setFormValues((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Doctor registered:", formValues);
  };

  return (
    <Container>
      <Header>Register New Doctor</Header>
      <Form onSubmit={handleSubmit}>
        {/* Nombres */}
        <FieldGroup>
          <Label>First Name</Label>
          <InputText
            placeholder="Enter first name"
            value={formValues.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Last Name</Label>
          <InputText
            placeholder="Enter last name"
            value={formValues.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </FieldGroup>

        {/* Especialidad y Tipo */}
        <FieldGroup>
          <Label>Specialty</Label>
          <Select
            options={specialties}
            onChange={(value) => handleChange("specialty", value)}
            placeholder="Select a specialty"
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Type</Label>
          <Select
            options={[
              { value: "internal", label: "Internal" },
              { value: "external", label: "External" },
            ]}
            onChange={(value) => handleChange("type", value)}
            placeholder="Select type"
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Consultation Fee</Label>
          <InputText
            type="number"
            placeholder="Enter consultation fee"
            value={formValues.consultationFee}
            onChange={(e) => handleChange("consultationFee", e.target.value)}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Surgery Fee</Label>
          <InputText
            type="number"
            placeholder="Enter surgery fee"
            value={formValues.surgeryFee}
            onChange={(e) => handleChange("surgeryFee", e.target.value)}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Phone</Label>
          <InputText
            type="tel"
            placeholder="Enter phone number"
            value={formValues.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Email</Label>
          <InputText
            type="email"
            placeholder="Enter email address"
            value={formValues.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Street Address</Label>
          <InputText
            placeholder="Enter street address"
            value={formValues.address.street}
            onChange={(e) => handleChange("address.street", e.target.value)}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>City</Label>
          <InputText
            placeholder="Enter city"
            value={formValues.address.city}
            onChange={(e) => handleChange("address.city", e.target.value)}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>State</Label>
          <InputText
            placeholder="Enter state"
            value={formValues.address.state}
            onChange={(e) => handleChange("address.state", e.target.value)}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>ZIP Code</Label>
          <InputText
            placeholder="Enter ZIP code"
            value={formValues.address.zipCode}
            onChange={(e) => handleChange("address.zipCode", e.target.value)}
          />
        </FieldGroup>
        <ButtonGroup>
          <Button type="button" onClick={() => console.log("Cancelled")}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
}
