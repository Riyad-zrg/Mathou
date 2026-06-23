import { useState, useEffect } from "react";
import { Button } from "../../button";
import Header from "../Header";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import EquationAnswersGroup from "./EquationAnswersGroup";
import EquationStatement from "./EquationStatement";
import { isFloat, randomIntFromInterval, shuffle } from "@/src/lib/utils";

export default function EquationScreen() {
  const [number1, setNumber1] = useState(randomIntFromInterval(-10, 10, [0]));
  const [number2, setNumber2] = useState(randomIntFromInterval(-10, 10, [0]));
  const [number3, setNumber3] = useState(randomIntFromInterval(-10, 10, [0]));
  const [number4, setNumber4] = useState(randomIntFromInterval(-10, 10, [0]));
  const [isMounted, setIsMounted] = useState(false);
  const [hasUserAnswered, setHasUserAnswered] = useState<boolean>(false);
  const [operation, setOperation] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const operation = `${number1}x ${number2 < 0 ? "" : "+"} ${number2} = ${number3}x ${number4 < 0 ? "" : "+"} ${number4}`;
    setOperation(operation);
  }, [number1, number2, number3, number4]);

  if (!isMounted) {
    return null;
  }

  const onNextClick = () => {
    setHasUserAnswered(false);
    setNumber1(randomIntFromInterval(-10, 10, [0]));
    setNumber2(randomIntFromInterval(-10, 10, [0]));
    setNumber3(randomIntFromInterval(-10, 10, [0]));
    setNumber4(randomIntFromInterval(-10, 10, [0]));

    if (number1 - number3 === 0) {
      setNumber1(randomIntFromInterval(-10, 10, [0]));
      setNumber2(randomIntFromInterval(-10, 10, [0]));
      setNumber3(randomIntFromInterval(-10, 10, [0]));
      setNumber4(randomIntFromInterval(-10, 10, [0]));
    }
  };

  const getResult = () => {
    const solution = (number4 - number2) / (number1 - number3);
    const result = `x = ${isFloat(solution) ? solution.toFixed(2) : solution}`;
    return result;
  };

  const generateRandomAnswer = () => {
    const solution =
      (randomIntFromInterval(-10, 10, [0]) -
        randomIntFromInterval(-10, 10, [0])) /
      (randomIntFromInterval(-10, 10, [0]) -
        randomIntFromInterval(-10, 10, [0]));
    const result = `x = ${isFloat(solution) ? solution.toFixed(2) : solution}`;
    return result;
  };

  return (
    <div className="h-screen flex flex-col justify-evenly items-center text-center questionScreen">
      <Header />
      <section className="flex-1 w-full p-5 flex-col">
        <EquationStatement operation={<InlineMath>{operation}</InlineMath>} />
      </section>
      <section className="flex-9 w-full p-5 flex-col">
        <EquationAnswersGroup
          hasUserAnswered={hasUserAnswered}
          setHasUserAnswered={(boolean) => setHasUserAnswered(boolean)}
          result={getResult()}
          generateRandom={generateRandomAnswer}
        />
      </section>
      <div className="flex-2">
        <section className="text-center">
          <Button
            onClick={onNextClick}
            size={"xl"}
            className={
              "text-lg lg:text-3xl " + (!hasUserAnswered ? "hidden" : "")
            }
          >
            Suivant
          </Button>
        </section>
      </div>
    </div>
  );
}
