import React from "react";
import { shallow } from "enzyme";
import WeatherForm from "../Component/WeatherForm";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
describe("Weather form", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WeatherForm />);
  });
  it("renders Weather form", () => {
    expect(wrapper.find("#city")).toBeDefined();
  });
  it("Update input field", () => {
    const mock = jest.fn();
    wrapper = shallow(<WeatherForm onCityChange={mock} error="" city="" />);
    wrapper.find("#city").simulate("change", { target: { value: "fremont" } });
    setTimeout(() => {
      expect(mock).toHaveBeenCalled();
    });
  });
});
