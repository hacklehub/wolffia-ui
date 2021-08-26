import LollipopHChart from "../../charts/LollipopHChart";

const data = [
  {
    "Customer Name": "Sana Super Market",
    "Total Amount": 230347.80000000005,
  },
  {
    "Customer Name": "Plus Point hyper Market",
    "Total Amount": 193800.90000000002,
  },
  {
    "Customer Name": "MK Ahmed",
    "Total Amount": 175717.37999999998,
  },
  {
    "Customer Name": "All Season Hyper Mart",
    "Total Amount": 172935.41999999998,
  },
  {
    "Customer Name": "Food palace Supermarket",
    "Total Amount": 169008.63999999998,
  },
  {
    "Customer Name": "Easy Shopping Mart",
    "Total Amount": 167033.16999999995,
  },
  {
    "Customer Name": "Aishwarya Value Mart",
    "Total Amount": 165389.8,
  },
  {
    "Customer Name": "Ashirwad Super Market",
    "Total Amount": 144989.86999999994,
  },
  {
    "Customer Name": "FOOD PALACE SUPER MARKET",
    "Total Amount": 139858.87999999998,
  },
  {
    "Customer Name": "BENISON SUPER MARKET",
    "Total Amount": 137254.99999999994,
  },
];

export default {
  title: "Ordered/Lollipop Horizontal",
  component: LollipopHChart,
  args: {
    data,
  },
};

const Template = args => <LollipopHChart {...args} />;

export const Simple = Template.bind();
Simple.storyName = "Simple Lollipop Horizontal Chart";

Simple.args = {
  id: "simple-lollipop-h",
  x: {
    key: "Total Amount",
    start: 0,
  },
  y: {
    key: "Customer Name",
  },
  marginLeft: 160,
};
