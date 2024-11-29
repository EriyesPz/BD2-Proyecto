import React from "react";
import styled from "styled-components";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
`;

interface ChartProps {
  data: Array<{ [key: string]: any }>;
  xKey: string;
  yKey: string;
  barColor?: string;
  title?: string;
}

export const Chart: React.FC<ChartProps> = ({
  data,
  xKey,
  yKey,
  barColor = "#0ea5e9",
  title,
}) => {
  return (
    <ChartContainer>
      {title && <h3 style={{ textAlign: "center", marginBottom: "16px" }}>{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={yKey} fill={barColor} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
