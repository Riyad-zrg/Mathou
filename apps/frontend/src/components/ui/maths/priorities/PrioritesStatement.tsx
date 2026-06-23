import { Item, ItemContent, ItemTitle } from "../../item";

interface PrioritiesStatementProps {
  operation: any;
}

export default function PrioritiesStatement({
  operation,
}: PrioritiesStatementProps) {
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
