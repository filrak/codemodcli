<template>
  <SfScrollable
    class="items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    :buttons-placement="buttonsPlacement"
    :direction="direction"
    :drag="drag"
    :wrapper-class="$attrs.class ?? ''"
    data-testid="slider"
  >
    <slot name="items" />
    <slot />
  </SfScrollable>
</template>

<script lang="ts" setup>
import type { AgnosticCmsScrollableProps } from '@vsf-enterprise/cms-components-utils';

type ScrollableProps = AgnosticCmsScrollableProps;

defineProps<ScrollableProps>();

defineOptions({
  inheritAttrs: false,
});
</script>
