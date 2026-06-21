import { Item, ItemContent, ItemTitle } from "../item";

interface QuestionStatementProps {
  number1: number;
  number2: number;
}

export default function QuestionStatement({
  number1,
  number2,
}: QuestionStatementProps) {
  return (
    <div className="questionStatement">
      <Item variant="outline_full_h">
        <ItemContent>
          <ItemTitle>
            {number1} + {number2} ?
          </ItemTitle>
        </ItemContent>
      </Item>
    </div>
  );
}
