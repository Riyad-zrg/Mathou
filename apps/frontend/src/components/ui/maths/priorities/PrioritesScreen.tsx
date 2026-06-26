import { useState, useEffect } from "react";
import { Button } from "../../button";
import Header from "../MathHeader";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import PrioritiesAnswersGroup from "./PrioritesAnswersGroup";
import PrioritiesStatement from "./PrioritesStatement";
import { randomIntFromInterval, shuffle } from "@/src/lib/utils";

export default function PrioritiesScreen() {
  const [number1, setNumber1] = useState(randomIntFromInterval(1, 10));
  const [number2, setNumber2] = useState(randomIntFromInterval(1, 10));
  const [number3, setNumber3] = useState(randomIntFromInterval(1, 10));
  const [operation, setOperation] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [hasUserAnswered, setHasUserAnswered] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const listeOperateurs = ["+", "-", "/", "*"];
    shuffle(listeOperateurs);
    const operation = `${number1} ${listeOperateurs.pop()} ${number2} ${listeOperateurs.pop()} ${number3} = ?`;
    setOperation(operation);
  }, [number1, number2, number3]);

  if (!isMounted) {
    return null;
  }

  const onNextClick = () => {
    setHasUserAnswered(false);
    setNumber1(randomIntFromInterval(1, 10));
    setNumber2(randomIntFromInterval(1, 10));
    setNumber3(randomIntFromInterval(1, 10));
  };

  const getResult = () => {
    let result = "";
    if (operation) {
      result = eval(operation.replace(" = ?", ""));
    }
    return result;
  };

  const generateRandomAnswer = () => {
    const listeOperateurs = ["+", "-", "/", "*"];
    shuffle(listeOperateurs);
    const result = `${randomIntFromInterval(1, 10)} ${listeOperateurs.pop()} ${randomIntFromInterval(1, 10)} ${listeOperateurs.pop()} ${randomIntFromInterval(1, 10)}`;
    return Number(eval(result));
  };

  return (
    <div className="h-screen flex flex-col justify-evenly items-center text-center questionScreen">
      <Header />
      <section className="flex-1 w-full p-5 flex-col">
        <PrioritiesStatement operation={<InlineMath>{operation}</InlineMath>} />
      </section>
      <section className="flex-9 w-full p-5 flex-col">
        <PrioritiesAnswersGroup
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
