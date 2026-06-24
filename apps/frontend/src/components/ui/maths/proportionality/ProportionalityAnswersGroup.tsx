import { isFloat, shuffle } from "@/src/lib/utils";
import { useEffect, useState } from "react";
import { InlineMath } from "react-katex";
import ProportionalityAnswer from "./ProportionalityAnswer";

interface ProportionalityAnswersGroup {
  hasUserAnswered: boolean;
  setHasUserAnswered: (boolean: boolean) => void;
  result: any;
  generateRandom: any;
}

export default function ProportionalityAnswersGroup({
  hasUserAnswered,
  setHasUserAnswered,
  result,
  generateRandom,
}: ProportionalityAnswersGroup) {
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
        <ProportionalityAnswer
          value={
            <InlineMath
              key={1}
              math={
                isFloat(answerValue)
                  ? answerValue.toFixed(2).toString()
                  : answerValue.toString()
              }
            ></InlineMath>
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
