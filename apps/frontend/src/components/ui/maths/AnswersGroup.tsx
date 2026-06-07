import { shuffle } from "@/src/lib/utils";
import QuestionAnswer from "./QuestionAnswer";

export default function AnswersGroup({ result }: { result: number }) {
  const resultList = [result];
  for (let i = 0; i < 3; i++) {
    let value = Math.floor(Math.random() * 100);

    while (value in resultList) {
      value = Math.floor(Math.random() * 100);
    }

    resultList.push(value);
  }

  shuffle(resultList);
  return (
    <div className="grid grid-cols-2 gap-5">
      {resultList.map((answerValue, id) => (
        <QuestionAnswer value={answerValue} key={id} />
      ))}
    </div>
  );
}
