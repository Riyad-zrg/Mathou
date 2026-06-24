import { Item, ItemContent, ItemTitle } from "../../item";

interface ProportionalityStatementProps {
  operation: any;
}

export default function ProportionalityStatement({
  operation,
}: ProportionalityStatementProps) {
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
