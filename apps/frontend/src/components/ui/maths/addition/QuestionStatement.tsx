import { Item, ItemContent, ItemTitle } from "../../item";

interface QuestionStatementProps {
  operation: any;
}

export default function QuestionStatement({
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
