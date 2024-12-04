import React, { useState } from "react";
import { ButtonGroup, Card, Container, FormGroup, Header, TextArea } from "./styled";
import { Button, InputDate, InputText, Label, Select } from "../../../components/ui";

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
