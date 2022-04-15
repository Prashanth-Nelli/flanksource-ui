import { StatCard } from "./index";

// export default required by storybook
// eslint-disable-next-line import/no-default-export
export default {
  title: "StatCard",
  component: StatCard
};

const Template = (arg) => <StatCard {...arg} />;

export const Variant1 = Template.bind({});
Variant1.args = {
  title: "StatCard",
  value: "value"
};
