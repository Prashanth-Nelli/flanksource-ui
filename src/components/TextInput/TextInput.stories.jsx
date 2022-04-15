import { TextInput } from "./index";

// export default required by storybook
// eslint-disable-next-line import/no-default-export
export default {
  title: "TextInput",
  component: TextInput
};

const Template = (arg) => <TextInput {...arg} />;

export const Variant1 = Template.bind({});
Variant1.args = {
  id: "email1",
  label: "Email",
  error: "just your name for now",
  type: "email"
};
