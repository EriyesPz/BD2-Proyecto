'use client'

import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, InputText, TextArea, Label } from '../../../components/ui';

const Card = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
`;

const CardHeader = styled.div`
  margin-bottom: 16px;
  border-bottom: 1px solid #ddd;
`;

const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const CardContent = styled.div`
  margin-bottom: 16px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const Alert = styled.div<{ variant?: 'success' | 'error' }>`
  margin-top: 16px;
  padding: 12px;
  border-radius: 8px;
  color: ${({ variant }) => (variant === 'error' ? '#B00020' : '#004d40')};
  background-color: ${({ variant }) =>
    variant === 'error' ? '#f8d7da' : '#d1e7dd'};
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    flex-shrink: 0;
  }
`;

export const RegistroConsulta = () => {
  const [diagnostico, setDiagnostico] = useState('');
  const [prescripcion, setPrescripcion] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [documento, setDocumento] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (diagnostico && prescripcion) {
      setSuccess(true);
      setError('');
      setDiagnostico('');
      setPrescripcion('');
      setObservaciones('');
      setDocumento(null);
    } else {
      setError('Por favor, complete los campos requeridos.');
      setSuccess(false);
    }
  };

  const handleCancel = () => {
    setDiagnostico('');
    setPrescripcion('');
    setObservaciones('');
    setDocumento(null);
    setSuccess(false);
    setError('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro de Consulta Realizada</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div>
            <Label htmlFor="diagnostico">Diagnóstico</Label>
            <TextArea
              id="diagnostico"
              placeholder="Ingrese el diagnóstico"
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="prescripcion">Prescripción</Label>
            <TextArea
              id="prescripcion"
              placeholder="Ingrese la prescripción (medicamentos y dosis)"
              value={prescripcion}
              onChange={(e) => setPrescripcion(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="observaciones">Observaciones Adicionales</Label>
            <TextArea
              id="observaciones"
              placeholder="Ingrese observaciones adicionales"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="documento">Adjuntar Documentos</Label>
            <InputText
              id="documento"
              type="file"
              onChange={(e) => setDocumento(e.target.files?.[0] || null)}
            />
          </div>
          {success && (
            <Alert variant="success">
              Consulta registrada exitosamente.
            </Alert>
          )}
          {error && (
            <Alert variant="error">
              {error}
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button type="button" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
