import { Item, ItemContent, ItemTitle } from "../../item";

interface FactorizationStatementProps {
  operation: any;
}

export default function FactorizationStatement({
  operation,
}: FactorizationStatementProps) {
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
