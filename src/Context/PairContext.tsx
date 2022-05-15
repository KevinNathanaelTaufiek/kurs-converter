import { createContext, FC, useState } from "react";

export interface PairItem {
  code: string;
  nominal: number;
}

interface CurrencyPairState {
  currentCurrency: PairItem;
  oppositeCurrency: PairItem;
  setCurrentCurrency: React.Dispatch<React.SetStateAction<PairItem>>;
  setOppositeCurrency: React.Dispatch<React.SetStateAction<PairItem>>;
}

const defaultValue: CurrencyPairState = {
  currentCurrency: {
    code: "",
    nominal: 0,
  },
  oppositeCurrency: {
    code: "",
    nominal: 0,
  },
  setCurrentCurrency: () => {},
  setOppositeCurrency: () => {},
};

const PairContext = createContext(defaultValue);
export default PairContext;

interface ProviderProps {
  children: JSX.Element;
}

export const PairContextProvider: FC<ProviderProps> = ({ children }) => {
  const [current, setCurrent] = useState<PairItem>({
    code: "IDR",
    nominal: 0,
  });
  const [opposite, setOpposite] = useState<PairItem>({
    code: "USD",
    nominal: 0,
  });
  return (
    <PairContext.Provider
      value={{
        currentCurrency: current,
        oppositeCurrency: opposite,
        setCurrentCurrency: setCurrent,
        setOppositeCurrency: setOpposite,
      }}
    >
      {children}
    </PairContext.Provider>
  );
};
