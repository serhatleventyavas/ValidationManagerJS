declare module 'validation-manager-js' {

    export interface Country {
        alpha2: string;
        alpha3: string;
        country_code: string;
        country_name: string;
        mobile_begin_with: string[];
        phone_number_lengths: number[];
    }

    export function validPhoneNumber(phoneNumber: string): boolean;
    export function findCountryByAlpha2(alpha2: string): Country | undefined;
    export function findCountryByAlpha3(alpha3: string): Country | undefined;
    export function validPhoneNumberWithCountry(country: Country, phoneNumber: string): boolean;
    export function guessCountryWithPhoneNumber(phoneNumber: string): Country[];
    export function findCountryByCountryCode(countryCode: string): Country | undefined;
}