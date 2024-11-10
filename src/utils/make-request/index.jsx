import { Api} from "../api-url/api";

export const makeRequest = async (
    method,
    url,
    queryParams = {},
    bodyRequest = null,
    isFormData = false
) => {
    const myHeaders = new Headers();

    if (!isFormData && bodyRequest) {
        myHeaders.append("Content-Type", "application/json");
    }

    myHeaders.append("Accept-Language", "da");

    let body = null;
    if (isFormData) {
        body = new FormData();
        for (const key in bodyRequest) {
            if (bodyRequest.hasOwnProperty(key)) {
                body.append(key, bodyRequest[key]);
            }
        }
    } else if (bodyRequest) {
        body = JSON.stringify(bodyRequest);
    }

    const requestOptions = {
        method: method,
        headers: myHeaders,
        body: method.toLowerCase() !== "get" ? body : null,
        redirect: "follow",
    };

    const endpoint = Api.baseurl(url, queryParams);

    try {
        const response = await fetch(endpoint, requestOptions);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
