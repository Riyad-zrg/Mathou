import { Item, ItemContent, ItemTitle } from "../item";

interface QuestionStatementProps {
  number1: number;
  number2: number;
  operation: any;
}

export default function QuestionStatement({
  number1,
  number2,
  operation,
}: QuestionStatementProps) {
  return (
    <div className="questionStatement">
      <Item variant="outline_full_h">
        <ItemContent>
          <ItemTitle>{operation}</ItemTitle>
        </ItemContent>
      </Item>
    </div>
  );
}
