import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 200px;
  font-family: "Roboto", sans-serif;
`;

export const SelectButton = styled.button`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: #bbb;
  }
`;

export const DropdownIcon = styled.span`
  font-size: 14px;
  color: #333;
`;

export const OptionsList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 10;
`;

export const Option = styled.li<{ selected: boolean }>`
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#f5f5f5" : "transparent")};
  color: ${({ selected }) => (selected ? "#000" : "#333")};

  &:hover {
    background-color: #eef6fc;
  }
`;