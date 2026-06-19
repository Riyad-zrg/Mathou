import { useState, useEffect } from "react";
import AnswersGroup from "./AnswersGroup";
import QuestionStatement from "./QuestionStatement";
import { Button } from "../button";

export default function QuestionScreen() {
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
    <div className="flex-1 h-screen flex-row justify-center items-center text-center questionScreen">
      <QuestionStatement number1={number1} number2={number2} />
      <AnswersGroup
        hasUserAnswered={hasUserAnswered}
        setHasUserAnswered={(boolean) => setHasUserAnswered(boolean)}
        result={number1 + number2}
      />
      {hasUserAnswered && (
        <section className="flex-1 text-center pt-10">
          <Button onClick={onNextClick}>Suivant</Button>
        </section>
      )}
    </div>
  );
}
