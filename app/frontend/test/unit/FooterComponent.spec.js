import { shallowMount } from '@vue/test-utils';
import FooterComponent from '@/components/FooterComponent.vue';

describe('FooterComponent.vue', () => {
  it('renders the footer content correctly', () => {
    const wrapper = shallowMount(FooterComponent);

    const footerText = wrapper.find('p.text-sm');
    expect(footerText.text()).toBe('© 2025 Jdvanegasm - Wompi Technical Test');
  });

  it('has the correct class for the container', () => {
    const wrapper = shallowMount(FooterComponent);

    const container = wrapper.find('.container');
    expect(container.exists()).toBe(true);
  });

  it('applies the custom styles correctly', () => {
    const wrapper = shallowMount(FooterComponent);

    const footer = wrapper.find('footer');
    expect(footer.classes()).toContain('custom-card-background');
    expect(footer.classes()).toContain('text-body-text');
  });
});
