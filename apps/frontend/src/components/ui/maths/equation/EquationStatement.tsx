import { Item, ItemContent, ItemTitle } from "../../item";

interface EquationStatementProps {
  operation: any;
}

export default function EquationStatement({
  operation,
}: EquationStatementProps) {
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
