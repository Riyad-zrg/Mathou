import { useState, useEffect } from "react";
import { Button } from "../../button";
import Header from "../Header";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import FactorizationAnswersGroup from "./FactorizationAnswersGroup";
import FactorizationStatement from "./FactorizationStatement";
import { getGcd, randomIntFromInterval } from "@/src/lib/utils";

export default function FactorizationScreen() {
  const [number1, setNumber1] = useState(randomIntFromInterval(1, 10));
  const [number2, setNumber2] = useState(
    number1 * randomIntFromInterval(2, 10),
  );
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
    setNumber2(number1 * randomIntFromInterval(2, 10));
  };

  const operation = `${number1}x + ${number2}= ? `;

  const getResult = () => {
    const gcd = getGcd(number1, number2);
    const result = `${gcd} \(${number1 / gcd}x + ${number2 / gcd}\)`;
    return result;
  };

  const generateRandomAnswer = () => {
    const randomNumber1 = randomIntFromInterval(1, 10);
    const randomNumber2 = number1 * randomIntFromInterval(2, 10);

    const gcd = getGcd(randomNumber1, randomNumber2);
    const result = `${gcd} \(${randomNumber1 / gcd}x + ${randomNumber2 / gcd}\)`;
    return result;
  };

  return (
    <div className="h-screen flex flex-col justify-evenly items-center text-center questionScreen">
      <Header />
      <section className="flex-1 w-full p-5 flex-col">
        <FactorizationStatement
          operation={<InlineMath>{operation}</InlineMath>}
        />
      </section>
      <section className="flex-9 w-full p-5 flex-col">
        <FactorizationAnswersGroup
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
