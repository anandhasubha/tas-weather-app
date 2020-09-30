import React from "react";
import { shallow } from "enzyme";
import WeatherCard from "../Component/WeatherCard";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
describe("Weather Card", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WeatherCard error="" currentWeather={{}} />);
  });
  it("renders Weather card", () => {
    expect(wrapper.find(".card")).toBeDefined();
  });
  it("should not render component when error is passed as props", () => {
    wrapper = shallow(
      <WeatherCard error="Error: Location not found" currentWeather={{}} />
    );
    expect(wrapper.find(".card")).toEqual({});
  });
  it("should render weather details where there is no error", () => {
    const props = {
      currentWeather: {
        city: "Denver",
        country: "US",
        date: 1601283762000,
        humidity: 65,
        iconId: 803,
        temperature: 5.27,
        description: "broken clouds",
        windSpeed: 9,
        condition: 200,
        icon: "04n",
        max: 6.11,
        min: 4.44
      },
      error: ""
    };
    wrapper = shallow(<WeatherCard {...props} />);
    expect(wrapper.html()).toContain("Denver, US");
  });
});
