import { useState, useEffect } from "react";
import AnswersGroup from "../AnswersGroup";
import QuestionStatement from "../QuestionStatement";
import { Button } from "../../button";
import Header from "../Header";

export default function AdditionScreen() {
  const [number1, setNumber1] = useState(Math.floor(Math.random() * 100));
  const [number2, setNumber2] = useState(Math.floor(Math.random() * 100));
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
    setNumber1(Math.floor(Math.random() * 100));
    setNumber2(Math.floor(Math.random() * 100));
  };

  return (
    <div className="h-screen flex flex-col justify-evenly items-center text-center questionScreen">
      <Header />
      <section className="flex-1 w-full p-5 flex-col">
        <QuestionStatement
          number1={number1}
          number2={number2}
          operation={`${number1} + ${number2} ?`}
        />
      </section>
      <section className="flex-9 w-full p-5 flex-col">
        <AnswersGroup
          hasUserAnswered={hasUserAnswered}
          setHasUserAnswered={(boolean) => setHasUserAnswered(boolean)}
          result={number1 + number2}
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
