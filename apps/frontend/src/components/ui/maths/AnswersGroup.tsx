import QuestionAnswer from "./QuestionAnswer";

export default function AnswersGroup() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <QuestionAnswer value={2} />
      <QuestionAnswer value={5} />
      <QuestionAnswer value={7} />
      <QuestionAnswer value={10} />
    </div>
  );
}
