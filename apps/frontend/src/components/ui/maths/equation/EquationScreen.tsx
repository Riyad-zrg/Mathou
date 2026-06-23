import { useState, useEffect } from "react";
import { Button } from "../../button";
import Header from "../Header";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import EquationAnswersGroup from "./EquationAnswersGroup";
import EquationStatement from "./EquationStatement";
import { randomIntFromInterval } from "@/src/lib/utils";

export default function EquationScreen() {
  const [number1, setNumber1] = useState(randomIntFromInterval(1, 10));
  const [number2, setNumber2] = useState(randomIntFromInterval(1, 10));
  const [number3, setNumber3] = useState(randomIntFromInterval(1, 10));
  const [number4, setNumber4] = useState(randomIntFromInterval(1, 10));
  const [isMounted, setIsMounted] = useState(false);
  const [hasUserAnswered, setHasUserAnswered] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onNextClick = () => {
    setHasUserAnswered(false);
    setNumber1(randomIntFromInterval(1, 10));
    setNumber2(randomIntFromInterval(1, 10));
    setNumber3(randomIntFromInterval(1, 10));
    setNumber4(randomIntFromInterval(1, 10));
  };

  const operation = `\(${number1}x + ${number2}\) \(${number3}x + ${number4}\)= ? `;

  const getResult = () => {
    const result = `\(${number1 * number3}x^2 + ${number1 * number4 + number2 * number3}x + ${number2 * number4}\)`;
    return result;
  };

  const generateRandomAnswer = () => {
    const result = `\(${randomIntFromInterval(1, 100)}x^2 + ${randomIntFromInterval(1, 100)}x + ${randomIntFromInterval(1, 100)}\)`;
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
