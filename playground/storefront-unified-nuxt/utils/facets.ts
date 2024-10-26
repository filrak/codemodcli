export const colorFacetNames = ['color', 'swatchColors', 'Color', 'c_refinementColor'] as const;
export const sizeFacetNames = ['size', 'Size', 'c_size'] as const;

export const isColorFacetName = (name: string): name is (typeof colorFacetNames)[number] =>
  [...colorFacetNames].includes(name as (typeof colorFacetNames)[number]);

export const isSizeFacetName = (name: string): name is (typeof sizeFacetNames)[number] =>
  [...sizeFacetNames].includes(name as (typeof sizeFacetNames)[number]);

export const prettify = (input: string) => decodeURIComponent(input).replace(/\+/g, ' ');
