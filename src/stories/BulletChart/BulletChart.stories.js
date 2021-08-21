import BulletChart from "../../charts/BulletChart";

export default {
  title: "Gauges/Bullet Chart",
  component: BulletChart,
};

const Template = args => <BulletChart {...args} />;

export const Simple = Template.bind();
Simple.storyName = "Simple BulletChart";

Simple.args = {
  id: "bullet-feb",
  className: " ",
  classNameData: "text-blue-700 dark:text-blue-800 ",
  label: "Actual vs target",
  data: 111,
  base: 90,
  target: 102,
  threshold: 110,
  max: 120,
};
