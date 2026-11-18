import { WhereOptions } from "sequelize";

export default <T extends object>(filters: T): WhereOptions => {
  return Object.fromEntries(
    // eslint-disable-next-line
    Object.entries(filters).filter(([_, value]) => value !== undefined),
  );
};
