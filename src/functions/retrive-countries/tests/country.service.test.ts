import CountryService from "../service/country.service";

const http = {
  makeRequest: jest.fn(),
};

const countryService = new CountryService(http);

test("Get countries successfully with full data", async () => {
  // Arrange
  http.makeRequest.mockReturnValue({
    data: [
      {
        name: {
          common: "Uzbekistan",
          official: "Republic of Uzbekistan",
          nativeName: { rus: [Object], uzb: [Object] },
        },
        currencies: { UZS: { name: "Uzbekistani soʻm", symbol: "so'm" } },
        capital: ["Tashkent"],
        languages: { rus: "Russian", uzb: "Uzbek" },
        area: 447400,
        continents: ["Asia"],
      },
    ],
  });
  // Act
  const countries = await countryService.getCountries();
  // Assert
  expect(http.makeRequest).toBeCalled();
  expect(countries).toMatchObject([
    {
      area: 447400,
      capital: "Tashkent",
      continents: "Asia",
      currencies: "Uzbekistani soʻm",
      languages: "Russian",
      name: "Uzbekistan",
    },
  ]);
});

test("Get countries successfully with country that have missed data", async () => {
  // Arrange
  http.makeRequest.mockReturnValue({
    data: [
      {
        name: undefined,
        currencies: undefined,
        capital: undefined,
        languages: undefined,
        area: undefined,
        continents: undefined,
      },
    ],
  });
  // Act
  const countries = await countryService.getCountries();
  // Assert
  expect(http.makeRequest).toBeCalled();
  expect(countries).toMatchObject([
    {
      area: undefined,
      capital: undefined,
      continents: undefined,
      currencies: undefined,
      languages: undefined,
      name: undefined,
    },
  ]);
});

test("Get countries successfully without countries", async () => {
  // Arrange
  http.makeRequest.mockReturnValue({
    data: [],
  });
  // Act
  const countries = await countryService.getCountries();
  // Assert
  expect(http.makeRequest).toBeCalled();
  expect(countries).toMatchObject([]);
});
