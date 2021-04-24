const fs = require('fs');

function generateRegexPattern(countryCode, mobileBeginWith, phoneNumberLenght) {
    const numberOfParentheses = 2;
    const countryCodeLength = countryCode.length;
    const totalPhoneNumberLength = numberOfParentheses + countryCodeLength + phoneNumberLenght;
    const mobileBeginWithLength = mobileBeginWith.length;
    const remaining = totalPhoneNumberLength - (numberOfParentheses + countryCodeLength + mobileBeginWithLength);
    return `^\\+\\(${countryCode}\\)${mobileBeginWith}([0-9()+]){${remaining}}$`;
}

function getCountryList() {
    try {
        const countriesAsRaw = fs.readFileSync('country.json');
        const countriesAsJson = JSON.parse(countriesAsRaw);
        return countriesAsJson;
    } catch(err) {
        console.log(err);
        return [];
    }
}

function findCountryByAlpha2(code) {
    const countries = getCountryList() || [];
    const filterResult = countries.filter(row => row.alpha2 === code);
    if (filterResult.length > 0) {
        return filterResult[0];
    }
    return undefined;
}

function validPhoneNumber(country, phoneNumber) {
    phoneNumber = phoneNumber.trim().split(' ').join('');
    const countryCode = country.country_code || "";
    const mobileBeginWithArray = country.mobile_begin_with ?? [];
    const phoneNumberLengthsArray = country.phone_number_lengths ?? [];

    for (let outerIndex = 0; outerIndex < mobileBeginWithArray.length; outerIndex++) {
        const mobileBegin = mobileBeginWithArray[outerIndex];
        for (let innerIndex = 0; innerIndex < phoneNumberLengthsArray.length; innerIndex++) {
            const phoneNumberLength = phoneNumberLengthsArray[innerIndex];
            const pattern = generateRegexPattern(countryCode, mobileBegin, phoneNumberLength);
            const regex = new RegExp(pattern);
            if (regex.exec(phoneNumber)) {
                return true;
            }
        }
    }
    return false;
}

module.exports = {
    validPhoneNumber: validPhoneNumber,
    findCountryByAlpha2: findCountryByAlpha2
}