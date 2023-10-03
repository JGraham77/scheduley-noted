export const isTruthy = (val: any) => !!val;
export const isString = (val: any) => typeof val === "string";
export const maxLength = (val: string, maxLen: number) => val.length <= maxLen;

export const stringCheck = (val: any, maxLen: number) => isTruthy(val) && isString(val) && maxLength(val, maxLen);

export const checkForMissingProperties = (props: { [key: string]: any }) => {
    const missing: string[] = [];

    Object.entries(props).forEach(([key, value]) => {
        if (value === undefined) missing.push(key);
    });

    if (missing.length) {
        return missing.join(", ");
    } else {
        return null;
    }
};

export const allStringsAreGood = (pairs: [str: string, max: number][]) => {
    return pairs.every((pair) => stringCheck(pair[0], pair[1]));
};

export const isEmail = (email: string) => {
    const emailPattern =
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const results = email.match(emailPattern);
    return results;
};

export default {
    isTruthy,
    isString,
    maxLength,
    stringCheck,
    checkForMissingProperties,
    allStringsAreGood,
    isEmail,
};
