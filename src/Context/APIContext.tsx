import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface APIContextModel {
  supportedCodes: string[][];
}

const defaultValue: APIContextModel = {
  supportedCodes: [],
};

const APIContext = createContext(defaultValue);
export default APIContext;

interface ProviderProps {
  children: JSX.Element;
}

export const APIContextProvider = ({ children }: ProviderProps) => {
  const [supportedCodes, setSupportedCodes] = useState<string[][]>([]);

  const getSupportedCodes = async () => {
    const codes = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}/codes`
    );
    const supportedWithPagination = codes.data.supported_codes;
    const data: string[][] = [
      ...supportedWithPagination,
      ...supportedWithPagination,
    ];
    setSupportedCodes(data);
  };

  useEffect(() => {
    getSupportedCodes();
  }, []);

  return (
    <APIContext.Provider value={{ supportedCodes }}>
      {children}
    </APIContext.Provider>
  );
};

export const getPairConvertResult = async (
  curr: string,
  opp: string,
  amount: number
) => {
  const pairConversionResult = await axios.get(
    `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}/pair/${curr}/${opp}/${amount}`
  );

  return pairConversionResult;
};
