const currencies = {
    currencyAFN: "؋",
    currencyUSD: "$"
};

// تبدیل کلید ارز به سمبل
export default function getCurrencySymbol(currencyKey) {
    return currencies[currencyKey] ||"";
}
