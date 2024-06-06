import EleventyFetch from "@11ty/eleventy-fetch";

const url = new URL("https://api.open-meteo.com/v1/forecast");

const params = {
  latitude: 33.767,
  longitude: -118.1892,
  current: "temperature_2m,weather_code",
  temperature_unit: "fahrenheit",
};

for (let prop in params) {
  url.searchParams.append(prop, params[prop]);
}

const weatherCodes = [
  {
    label: "sunny",
    codes: [0, 1],
  },
  {
    label: "partly cloudy",
    codes: [2],
  },
  {
    label: "overcast",
    codes: [3],
  },
  {
    label: "foggy",
    codes: [45, 48],
  },
  {
    label: "rainy",
    codes: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  },
  {
    label: "snowing",
    codes: [71, 73, 75, 77, 85, 86],
  },
  {
    label: "stormy",
    codes: [95, 96, 99],
  },
];

const getWeatherStatus = (code) => {
  let status = weatherCodes.find((obj) => obj.codes.includes(code));

  if (!status) return;

  return status.label;
};

export default async () => {
  let res = await EleventyFetch(url.toString(), {
    duration: "1h",
    type: "json",
  });

  let temp = Math.round(res.current.temperature_2m);
  let unit = res.current_units.temperature_2m;
  let code = res.current.weather_code;

  return {
    temperature: temp + unit,
    status: getWeatherStatus(code),
  };
};
