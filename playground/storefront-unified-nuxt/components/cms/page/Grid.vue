<template>
  <div class="grid auto-cols-fr" data-testid="grid">
    <slot name="items" />
    <slot />
  </div>
</template>

<style scoped lang="scss">
$grid-areas: a b c d e f g h i j k l m n;

@each $area in $grid-areas {
  $i: index($grid-areas, $area);

  /**
   * Creates grid areas for each child element of the grid container.
   * The grid areas are named after the grid-areas variable, so the first child
   * will have the grid area a, the second child will have the grid area b, etc.
  */
  .grid > *:nth-of-type(#{$i}) {
    grid-area: #{$area};
  }
}
</style>
