const ValidationManagerJS = require('../index');

test('should return Turkey country when input TR alpha2 code', () => {
    const alpha2 = "TR";
    const country = ValidationManagerJS.findCountryByAlpha2(alpha2);
    expect(country).not.toBe(undefined);
    expect(country['country_code']).toBe('90');
    expect(country['country_name']).toBe('Turkey');
});

test('should return USA country when input US alpha2 code', () => {
    const alpha2 = "US";
    const country = ValidationManagerJS.findCountryByAlpha2(alpha2);
    expect(country).not.toBe(undefined);
    expect(country['country_code']).toBe('1');
    expect(country['country_name']).toBe('United States');
});


test('should return undefined when input 123 alpha2 code', () => {
    const alpha2 = "123";
    const country = ValidationManagerJS.findCountryByAlpha2(alpha2);
    expect(country).toBe(undefined);
});

test('should returns true when input correctly TR phone number', () => {
    const alpha2 = "TR";
    const country = ValidationManagerJS.findCountryByAlpha2(alpha2);
    const isValidPhoneNumber = ValidationManagerJS.validPhoneNumber(country, "+(90)5551112233 ");
    expect(isValidPhoneNumber).toBe(true);
});

test('should returns true when input correctly USA phone number', () => {
    const alpha2 = "US";
    const country = ValidationManagerJS.findCountryByAlpha2(alpha2);
    const isValidPhoneNumber = ValidationManagerJS.validPhoneNumber(country, "+(1)2011112233 ");
    expect(isValidPhoneNumber).toBe(true);
});