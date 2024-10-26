import { ref } from 'vue';
import { groupBy, uniqBy } from 'lodash-es';
import type { SfAttribute, SfProduct } from '~/types';

/**
 * @description Composable for operating on product attributes data.
 *
 * @template TAttribute - The type of the attribute names.
 *
 * @param {SfProduct} product - The product object.
 * @param {TAttribute[]} [attributesNames=[]] - An array of attribute names to include in the returned object.
 *
 * @returns {{
 *   getAttributeList: (attributeName: TAttribute) => SfAttribute[];
 *   getAttribute: (attributeName: TAttribute) => string | null;
 *   setAttribute: (attributeName: TAttribute, attributeValue: string) => void;
 * }} An object with methods to get and set product attributes.
 *
 * @example
 * const { getAttributeList, getAttribute, setAttribute } = useProductAttribute(product, ['color', 'size']);
 */
export function useProductAttribute<TAttribute extends string>(product: SfProduct, attributesNames: TAttribute[] = []) {
  const attributes = groupBy(
    uniqBy(
      (product?.variants || []).flatMap((variant) =>
        variant.attributes.map((attribute) => ({ ...attribute, sku: variant.sku, slug: variant.slug })),
      ),
      'value',
    ),
    'name',
  );

  const mapAttribute = (attributes: SfAttribute[] = []) => {
    const defaults = attributesNames.map((attribute) => ({ name: attribute, value: null }));

    return Object.fromEntries([...defaults, ...attributes].map(({ name, value }) => [name, value]));
  };

  const selectedAttrs = ref(mapAttribute(product.attributes));

  return {
    getAttributeList: (attributeName: TAttribute) => attributes[attributeName] || [],
    getAttribute: (attributeName: TAttribute) => selectedAttrs.value[attributeName],
    setAttribute: (attributeName: TAttribute, attributeValue: string) => {
      selectedAttrs.value = {
        ...selectedAttrs.value,
        [attributeName]: attributeValue,
      };
    },
  };
}

/**
 * @description This function is used to guess the color value of the color attribute.
 * Some commerces set is as a valueLabel, some as a value.
 * @param {SfAttribute} attribute - The color attribute.
 */
export function guessAttributeColor(attribute: SfAttribute) {
  const isValueStringNumber = !Number.isNaN(Number(attribute.value));
  const guessedColor = isValueStringNumber ? attribute.valueLabel : attribute.value;
  return guessedColor.toLowerCase();
}
