const pluralRules = new Intl.PluralRules("en-US");

const pluralize = (count, singular, plural) => {
  const grammaticalNumber = pluralRules.select(count);
  switch (grammaticalNumber) {
    case "one":
      return count + " " + singular;
    case "other":
      return count + " " + plural;
    default:
      throw new Error("Unknown: " + grammaticalNumber);
  }
};

export default pluralize;
