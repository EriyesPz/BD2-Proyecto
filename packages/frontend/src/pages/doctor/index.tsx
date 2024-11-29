import styled from "styled-components";
import { Button, Label, Chart } from "../../components/ui";

const chartData = [
  { month: "Ene", consultas: 65 },
  { month: "Feb", consultas: 59 },
  { month: "Mar", consultas: 80 },
  { month: "Abr", consultas: 81 },
  { month: "May", consultas: 56 },
  { month: "Jun", consultas: 55 },
];

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const CardHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #555;
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  color: #777;
`;

const HighlightText = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: #333;
`;

const Calendar = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  height: 300px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DoctorPerfil = () => {
  return (
    <Container>
      <Header>
        <h1>Doctor Profile</h1>
        <Button>New Appointment</Button>
      </Header>
      <Grid>
        <Card>
          <CardHeader>Doctor Information</CardHeader>
          <AvatarContainer>
            <Avatar>JP</Avatar>
            <div>
              <HighlightText>Dr. Juan Pérez</HighlightText>
              <Text>Email: juan.perez@hospital.com</Text>
              <Text>Phone: +34 123 456 789</Text>
            </div>
          </AvatarContainer>
        </Card>
        <Card>
          <CardHeader>Specialty & Fees</CardHeader>
          <Text>Specialty: Cardiology</Text>
          <Grid>
            <div>
              <Text>Consultation Fee:</Text>
              <HighlightText>$150</HighlightText>
            </div>
            <div>
              <Text>Surgery Fee:</Text>
              <HighlightText>$1,500</HighlightText>
            </div>
          </Grid>
        </Card>
      </Grid>
      <Grid>
        {/* Calendario */}
        <Card>
          <CardHeader>Appointments Calendar</CardHeader>
          <Calendar>
            <Label>Calendar Placeholder</Label>
          </Calendar>
          <div style={{ textAlign: "right", marginTop: "16px" }}>
            <Button>New Appointment</Button>
          </div>
        </Card>
        <Card>
          <CardHeader>Statistics</CardHeader>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <div>
              <Text>Completed Consultations:</Text>
              <HighlightText>396</HighlightText>
            </div>
            <div>
              <Text>Total Fees:</Text>
              <HighlightText>$59,400</HighlightText>
            </div>
          </div>
          <Chart
            data={chartData}
            xKey="month"
            yKey="consultas"
            barColor="#0ea5e9"
            title="Monthly Consultations"
          />
        </Card>
      </Grid>
    </Container>
  );
}
