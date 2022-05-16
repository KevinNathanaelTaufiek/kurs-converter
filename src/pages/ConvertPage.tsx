import { useContext } from "react";
import ButtonConvert from "../components/Button";
import CurrencyBox from "../components/CurrencyBox";
import PairContext, { PairItem } from "../Context/PairContext";
import { FaExchangeAlt } from "react-icons/fa";
import { getPairConvertResult } from "../Context/APIContext";

const ConvertPage = () => {
  const {
    currentCurrency,
    oppositeCurrency,
    setCurrentCurrency,
    setOppositeCurrency,
  } = useContext(PairContext);

  const handleSwap = () => {
    const tempOpposite = oppositeCurrency;
    setOppositeCurrency(currentCurrency);
    setCurrentCurrency(tempOpposite);
  };

  const handleConvert = () => {
    getPairConvertResult(
      currentCurrency.code,
      oppositeCurrency.code,
      currentCurrency.nominal
    )
      .then((res) => {
        const pairItem: PairItem = {
          code: res.target_code,
          nominal: res.conversion_result,
        };
        setOppositeCurrency(pairItem);
      })
      .catch((rej) => {})
      .finally(() => {});
  };

  return (
    <div className="flex-wrapper justify-center vertical text-center">
      <h1>Welcome to KConverter</h1>
      <p>Kurs Converter yang mudah dan terpercaya 💰</p>
      <div className="text-center">
        <div className="flex-wrapper justify-center align-center">
          <CurrencyBox />
          <button className="btn-small" onClick={handleSwap}>
            <FaExchangeAlt />
          </button>
          <CurrencyBox isOpposite nominalDisable />
        </div>
        <ButtonConvert handleClick={handleConvert}>
          Convert Currency
        </ButtonConvert>
      </div>
    </div>
  );
};

export default ConvertPage;
