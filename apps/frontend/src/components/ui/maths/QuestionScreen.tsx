import { useState, useEffect } from "react";
import AnswersGroup from "./AnswersGroup";
import QuestionStatement from "./QuestionStatement";

export default function QuestionScreen() {
  const [number1, setNumber1] = useState(Math.floor(Math.random() * 100));
  const [number2, setNumber2] = useState(Math.floor(Math.random() * 100));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <QuestionStatement number1={number1} number2={number2} />
      <AnswersGroup result={number1 + number2} />
    </div>
  );
}
