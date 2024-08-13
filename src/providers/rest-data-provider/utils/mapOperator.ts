import { CrudOperators } from "@refinedev/core";

type Operator = CrudOperators

export const mapOperator = (operator: CrudOperators ): string => {
  switch (operator) {
    case "contains":
      return "[like]";
    default:
      return `[${operator}]`;
  }
};
