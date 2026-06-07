import { shuffle } from "@/src/lib/utils";
import QuestionAnswer from "./QuestionAnswer";
import { useEffect, useState } from "react";

export default function AnswersGroup({ result }: { result: number }) {
  const [hasUserAnswered, setHasUserAnswered] = useState(false);
  const [resultList, setResultList] = useState<number[]>([]);

  const handleClickOnAnswer = () => {
    setHasUserAnswered(true);
  };

  useEffect(() => {
    const resultList = [result];
    for (let i = 0; i < 3; i++) {
      let value = Math.floor(Math.random() * 100);

      while (value in resultList) {
        value = Math.floor(Math.random() * 100);
      }

      resultList.push(value);

      shuffle(resultList);
    }

    setResultList(resultList);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-5">
      {resultList.map((answerValue, id) => (
        <QuestionAnswer
          value={answerValue}
          isCorrectAnswer={answerValue === result}
          handleClickOnAnswer={handleClickOnAnswer}
          hasUserAnswered={hasUserAnswered}
          key={id}
        />
      ))}
    </div>
  );
}
