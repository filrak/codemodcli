export function useReviewsAccordion() {
  const state = useState('reviewsAccordion', () => ({
    isOpen: false,
  }));

  const isAccordionOpen = computed(() => state.value.isOpen);

  const toggleAccordion = () => {
    state.value.isOpen = !state.value.isOpen;
  };

  const calculateScrollDistance = () => {
    const reviewsAccordion = document.querySelector('#customer-reviews');
    const currentScrollPosition = window.scrollY;
    const currentAccordionTopPosition = reviewsAccordion?.getBoundingClientRect().top ?? 0;
    const safeMargin = 100;
    return currentAccordionTopPosition + currentScrollPosition - safeMargin;
  };

  const scrollToAndOpenAccordion = () => {
    window.scrollTo({ top: calculateScrollDistance(), behavior: 'smooth' });
    state.value.isOpen = true;
  };

  return {
    scrollToAndOpenAccordion,
    isAccordionOpen,
    toggleAccordion,
  };
}
