import axios from "axios";
import { createContext, useEffect, useState } from "react";

// import codesPayload from "../_mock/supportedCode.json";
// import conversionPayload from "../_mock/pairConversion.json";

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
    // production env
    const codes = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}/codes`
    );

    const supportedWithPagination = codes.data.supported_codes;
    const data: string[][] = [
      ...supportedWithPagination,
      ...supportedWithPagination,
    ];
    setSupportedCodes(data);

    // development env
    // setSupportedCodes(codesPayload.supported_codes);
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
  // Production env
  const pairConversionResult = await axios.get(
    `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}/pair/${curr}/${opp}/${amount}`
  );
  return pairConversionResult.data;

  // development env
  // return conversionPayload;
};
