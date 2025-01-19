import { shallowMount } from '@vue/test-utils';
import HeaderComponent from '@/components/HeaderComponent.vue';

describe('HeaderComponent.vue', () => {
  it('renders header correctly', () => {
    const wrapper = shallowMount(HeaderComponent);
    expect(wrapper.find('h1').text()).toContain('Wompi Technical Test');
  });
});