export type CategoryTreeItem = {
  name: string;
  count?: number;
  href: string;
};

export type CategoryTreeProps = {
  parent?: CategoryTreeItem;
  currentCategory?: CategoryTreeItem;
  categories: CategoryTreeItem[];
  maxToShow?: number;
};

export type CategoryTreeItemType = {
  name: string;
  href: string;
  selected?: boolean;
};
