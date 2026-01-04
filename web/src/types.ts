import { NavigationQueryResult } from "./sanity/types";

export type NavItemType = NonNullable<
  NonNullable<NavigationQueryResult>["items"]
>[number];

export type NavDropdownItem = Extract<NavItemType, { _type: "navDropdown" }>;
