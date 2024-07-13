const formatVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
};

const parseParams = (params, name) => {
    const keys = Object.keys(params);
    let options = "";

    keys.forEach((key) => {
        const isParamTypeObject = typeof params[key] === "object";
        const isParamTypeArray = isParamTypeObject && params[key].length >= 0;

        if (!isParamTypeObject) {
            options += `${name}=${params[key]}&`;
        }

        if (isParamTypeObject && isParamTypeArray) {
            params[key].forEach((element) => {
                options += `${name}=${element}&`;
            });
        }
    });

    return options ? options.slice(0, -1) : options;
};
const getInitials = (name) => {
    if (!name) return "";
    const initials = name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
    return initials.slice(0, 2);
};
export { formatVND, parseParams, getInitials };
