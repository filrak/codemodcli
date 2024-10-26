<template>
  <template v-if="Array.isArray(item)">
    <component
      :is="RenderCmsContent"
      v-for="component in item"
      :key="component.id"
      :item="component"
    />
  </template>
  <div
    v-else-if="hidden"
    :id="item.uniqueClass"
    style="height: 30px"
  />
  <component
    :is="getComponent(item.component)"
    v-else-if="getComponent(item.component)"
    v-bind="getComponentProps(item)"
    :key="item.id"
    :class="item.uniqueClass"
  >
    <template
      v-for="{ key, value } in nestedComponentProperties"
      #[key]
      :key="key"
    >
      <component
        :is="RenderCmsContent"
        :item="value"
      />
    </template>
    <slot />
  </component>
</template>

<script lang="ts" setup>
import type { AgnosticCmsComponent } from '@vsf-enterprise/cms-components-utils';
import RenderCmsContent from '~/components/cms/wrappers/RenderCmsContent.vue';

const components: Record<string, any> = {
  Banner: defineAsyncComponent(() => import('~/components/cms/page/Banner.vue')),
  Card: defineAsyncComponent(() => import('~/components/cms/page/Card.vue')),
  CategoryCard: defineAsyncComponent(() => import('~/components/cms/page/CategoryCard.vue')),
  Accordion: defineAsyncComponent(() => import('~/components/cms/page/Accordion.vue')),
  Editorial: defineAsyncComponent(() => import('~/components/cms/page/Editorial.vue')),
  Gallery: defineAsyncComponent(() => import('~/components/cms/page/Gallery.vue')),
  Hero: defineAsyncComponent(() => import('~/components/cms/page/Hero.vue')),
  NewsletterBox: defineAsyncComponent(() => import('~/components/cms/page/NewsletterBox.vue')),
  ProductCard: defineAsyncComponent(() => import('~/components/cms/page/ProductCard.vue')),
  Scrollable: defineAsyncComponent(() => import('~/components/cms/page/Scrollable.vue')),
  Grid: defineAsyncComponent(() => import('~/components/cms/page/Grid.vue')),
  ProductList: defineAsyncComponent(() => import('~/components/cms/page/ProductList.vue')),
};

interface RenderCmsContentProps {
  item: AgnosticCmsComponent | AgnosticCmsComponent[];
  hidden?: boolean;
}

const props = defineProps<RenderCmsContentProps>();

const isHidden = ref(props.hidden);

function getComponent(name: string) {
  const component = components[name];
  if (!component) {
    console.warn(`Component "${name}" not found`);
  }
  return component || null;
}

function observeComponent() {
  if (Array.isArray(props.item)) return;

  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      observer.disconnect();
      isHidden.value = false;
    }
  });

  observer.observe(document.getElementById(props.item.uniqueClass) as HTMLElement);
}

function isRenderCmsContentProp(prop: unknown): prop is AgnosticCmsComponent | AgnosticCmsComponent[] {
  return (
    (!!prop && typeof prop === 'object' && 'component' in (prop as any)) ||
    (Array.isArray(prop) && prop.every((someProp) => isRenderCmsContentProp(someProp)))
  );
}

function getComponentProps(agnosticComponent: AgnosticCmsComponent) {
  const { id, styles, component, uniqueClass, ...properties } = agnosticComponent;

  return Object.entries(properties).reduce((acc, [key, value]) => {
    if (!isRenderCmsContentProp(key) && key !== 'styles') {
      acc[key] = value;
    }
    return acc;
  }, {} as AgnosticCmsComponent);
}

const nestedComponentProperties = computed(() => {
  if (Array.isArray(props.item)) {
    return [];
  }

  return Object.entries(props.item).reduce<
    Array<{ key: string; value: AgnosticCmsComponent | AgnosticCmsComponent[] }>
  >((acc, [key, value]) => {
    if (isRenderCmsContentProp(value)) {
      acc.push({ key, value });
    }
    return acc;
  }, []);
});

watch(
  () => props.item,
  () => {
    if (!Array.isArray(props.item) && props.item.styles) {
      const { id, styles } = props.item;
      useHead({ style: [{ key: id, textContent: styles }] });
    }
  },
  {
    immediate: true,
  },
);

onMounted(async () => {
  if (isHidden.value) observeComponent();
});
</script>
