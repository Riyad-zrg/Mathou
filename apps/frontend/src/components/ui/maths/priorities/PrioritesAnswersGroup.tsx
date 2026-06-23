import { shuffle } from "@/src/lib/utils";
import { useEffect, useState } from "react";
import { InlineMath } from "react-katex";
import PrioritiesAnswer from "./PrioritesAnswer";

interface PrioritiesAnswersGroup {
  hasUserAnswered: boolean;
  setHasUserAnswered: (boolean: boolean) => void;
  result: any;
  generateRandom: any;
}

export default function PrioritiesAnswersGroup({
  hasUserAnswered,
  setHasUserAnswered,
  result,
  generateRandom,
}: PrioritiesAnswersGroup) {
  const [resultList, setResultList] = useState<number[]>([]);

  const handleClickOnAnswer = () => {
    setHasUserAnswered(true);
  };

  useEffect(() => {
    const resultList = [result];
    for (let i = 0; i < 3; i++) {
      let value = generateRandom();

      while (value in resultList) {
        value = generateRandom();
      }

      resultList.push(value);

      shuffle(resultList);
    }

    setResultList(resultList);
  }, [result]);

  return (
    <div className="grid grid-cols-2 h-full items-center gap-5 p-2 questionAnswer lg:px-30 lg:py-10">
      {resultList.map((answerValue, id) => (
        <PrioritiesAnswer
          value={
            <InlineMath key={1} math={answerValue.toString()}></InlineMath>
          }
          isCorrectAnswer={answerValue === result}
          handleClickOnAnswer={handleClickOnAnswer}
          hasUserAnswered={hasUserAnswered}
          key={id}
        />
      ))}
    </div>
  );
}
