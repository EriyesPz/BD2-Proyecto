import React, { useState } from "react";
import styled from "styled-components";
import { Button, InputDate, InputText, Label, Select } from "../../../components/ui";

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
  resize: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const Pago = () => {
  const [monto, setMonto] = useState(100);
  const [metodoPago, setMetodoPago] = useState("Efectivo");
  const [fechaPago, setFechaPago] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  });
  const [observaciones, setObservaciones] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ monto, metodoPago, fechaPago, observaciones });
    setSuccess(true);
  };

  if (success) {
    return (
      <Container>
        <Card>
          <Header>Pago registrado exitosamente</Header>
          <p>Se ha registrado el pago correctamente.</p>
          <Button onClick={() => setSuccess(false)}>Registrar otro pago</Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Header>Registro de Pago</Header>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Monto a Pagar</Label>
            <InputText
              type="number"
              step="0.01"
              value={monto}
              onChange={(e) => setMonto(parseFloat(e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <Label>Método de Pago</Label>
            <Select
              options={[
                { value: "Efectivo", label: "Efectivo" },
                { value: "Tarjeta", label: "Tarjeta" },
                { value: "Transferencia", label: "Transferencia" },
              ]}
              onChange={(value) => setMetodoPago(value)}
              placeholder="Seleccione el método de pago"
            />
          </FormGroup>
          <FormGroup>
            <Label>Fecha de Pago</Label>
            <InputDate value={fechaPago} onChange={(value) => setFechaPago(value)} />
          </FormGroup>
          <FormGroup>
            <Label>Observaciones</Label>
            <TextArea
              placeholder="Observaciones opcionales"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              rows={4}
            />
          </FormGroup>
          <ButtonGroup>
            <Button type="button" onClick={() => window.location.reload()}>
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </ButtonGroup>
        </form>
      </Card>
    </Container>
  );
}
