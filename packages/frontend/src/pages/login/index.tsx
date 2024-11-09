import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import Lock from "@mui/icons-material/Lock";
import { Button, InputText, Label } from "../../components/ui";
import {
  ButtonWrapper,
  FormContainer,
  InputGroup,
  LoginContainer,
  Subtitle,
  Title,
} from "./styled";
import Logo  from "../../assets/health.svg";

export const LoginForm: React.FC = () => {
  return (
    <LoginContainer>
      <FormContainer>
      <img src={Logo} alt="Centro Médico La Paz" style={{ width: "70px", height: "70px", margin: "0 auto" }} />
        <Title>Centro Médico La Paz</Title>
        <Subtitle>Ingrese sus credenciales para acceder al sistema</Subtitle>
        <InputGroup>
          <Label htmlFor="user">Nombre de usuario</Label>
          <InputText
            placeholder="Ingrese su nombre de usuario"
            iconComponent={<PersonIcon />}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Contraseña</Label>
          <InputText
            placeholder="Ingrese su contraseña"
            iconComponent={<Lock />}
            type="password"
          />
        </InputGroup>
        <ButtonWrapper>
          <Button>Iniciar sesión</Button>
        </ButtonWrapper>
      </FormContainer>
    </LoginContainer>
  );
};
