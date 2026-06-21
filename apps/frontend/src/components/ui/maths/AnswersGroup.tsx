import { shuffle } from "@/src/lib/utils";
import QuestionAnswer from "./QuestionAnswer";
import { useEffect, useState } from "react";

interface AnswersGroup {
  hasUserAnswered: boolean;
  setHasUserAnswered: (boolean: boolean) => void;
  result: any;
}

export default function AnswersGroup({
  hasUserAnswered,
  setHasUserAnswered,
  result,
}: AnswersGroup) {
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
  }, [result]);

  return (
    <div className="grid grid-cols-2 h-full items-center gap-5 p-2 questionAnswer lg:px-30 lg:py-10">
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
