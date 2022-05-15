import React, { FC, useContext } from "react";
import APIContext from "../Context/APIContext";
import PairContext from "../Context/PairContext";

interface Props {
  isOpposite?: boolean;
  nominalDisable?: boolean;
}

const CurrencyBox: FC<Props> = ({
  isOpposite = false,
  nominalDisable = false,
}) => {
  const { supportedCodes } = useContext(APIContext);

  const {
    currentCurrency,
    oppositeCurrency,
    setCurrentCurrency,
    setOppositeCurrency,
  } = useContext(PairContext);

  const [currency, setCurrency] = isOpposite
    ? [oppositeCurrency, setOppositeCurrency]
    : [currentCurrency, setCurrentCurrency];

  const handleChangeNominal = (e: React.FormEvent<HTMLInputElement>) => {
    const newNominal: number = Number(e.currentTarget.value);
    if (isNaN(newNominal)) return;
    setCurrency((prev) => ({ ...prev, nominal: newNominal }));
  };

  const handleChangeCode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency((prev) => ({ ...prev, code: e.target.value }));
  };

  return (
    <div className="box">
      <div className="text-center flex-wrapper vertical align-center">
        <h4>{isOpposite ? "To" : "From"}</h4>
        <input
          className="form-control"
          name="nominal"
          pattern="[0-9]+"
          disabled={nominalDisable}
          value={currency.nominal}
          onChange={handleChangeNominal}
        />
        <select
          className="form-control"
          name="pair"
          id=""
          value={currency.code}
          onChange={handleChangeCode}
        >
          {supportedCodes.map((data, index) => (
            <option value={data[0]} key={index}>
              {data[0]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyBox;
