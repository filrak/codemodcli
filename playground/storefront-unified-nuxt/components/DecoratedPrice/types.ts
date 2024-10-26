export type ClassNameVariants = {
  regular?: string;
  special?: string;
};

export interface DecoratedPriceProps {
  regular: string;
  special?: string;
  className?: string;
  classNameVariants?: ClassNameVariants;
}
