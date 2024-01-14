/*
* Request Builder v2

* КОНФИГ ЗАПРОСА
{
   url: "/:{routeFoo}/url", // строка адреса метода API. В любое место строки можно передать параметр в обертке ":{}"
   type: "get", // тип метода API
   queryKeys: ["foo"], // перечень ключей, которые принимает метод в query строку
   jsonKeys: ["foo"],  // перечень ключей, которые принимает метод в payload
   formDataWrapper: true, // оборачивает содержимое POST пейлоада в обертку формы. Нужно для передачи картинок.
   routerKeys: ["foo"], // перечень ключей используемых в url без ":{}"
   pagination: true, // активирует пажинацию. В queryKeys добавлять page и per_page при этом не нужно
}

* ПАРАМЕТРЫ ЗАПРОСА
{
   queryPayload: { //перечень значений для добавления в query (?foo=bar)
     foo: "bar",
   },
   jsonPayload: { //перечень значений добавляемый в payload
     foo: "bar"
   }
   routerPayload: { // перечень значений для параметров API адреса
     foo: "bar"
   }
}
*/

import backend from "@/06-shared/api/rest";

export async function createRequest(configInit = {}, params = {}) {
  const config = JSON.parse(JSON.stringify(configInit));
  function errorObject(error) {
    return { frontendError: error };
  }

  function checkKeysCompatibility(
    keysArray = [],
    payloadObject = {},
    diclineObjects = false
  ) {
    const checkingSet = new Set();
    keysArray.forEach((key) => {
      checkingSet.add(key);
    });

    const errors = [];
    let payloadObjectKeys = Object.keys(payloadObject);
    payloadObjectKeys.forEach((key) => {
      if (!checkingSet.has(key)) errors.push(key);
    });
    if (diclineObjects)
      Object.values(payloadObject).forEach((value, index) => {
        if (typeof value === "object") errors.push(payloadObjectKeys[index]);
      });
    if (errors.length > 0) {
      console.error(
        "Request builder error: obtained payload is invalid.",
        errors
      );
      return false;
    } else return true;
  }

  return new Promise((resolve, reject) => {
    // query params logic
    let queryString = "";
    if (config.pagination) {
      config.queryKeys.push("page", "per_page");
    }
    if (config.queryKeys?.length > 0) {
      if (!checkKeysCompatibility(config.queryKeys, params.queryPayload, true))
        reject(errorObject("Request builder error: query"));

      config.queryKeys.forEach((key) => {
        if (params.queryPayload && params.queryPayload[key])
          queryString += `&${key}=${params.queryPayload[key]}`;
      });

      if (queryString.length > 0) queryString = "?" + queryString.slice(1);
    }

    // router params logic
    if (config.routerKeys?.length > 0) {
      if (
        !checkKeysCompatibility(config.routerKeys, params.routerPayload, true)
      )
        reject(errorObject("Request builder error: router"));

      config.routerKeys.forEach((key) => {
        config.url = config.url.replace(`:{${key}}`, params.routerPayload[key]);
      });
    }

    //json payload logic
    if (!checkKeysCompatibility(config.jsonKeys, params.jsonPayload))
      reject(errorObject("Request builder error: json"));

    let payloadObject = {};
    if (!config.formDataWrapper && config.jsonKeys)
      payloadObject = params.jsonPayload;

    //form data wrapper logic
    let additionalHeaders = {};
    if (config.formDataWrapper && config.jsonKeys && params.jsonPayload) {
      additionalHeaders["Content-Type"] = "multipart/form-data";
      payloadObject = new FormData();
      Object.keys(params.jsonPayload).forEach((key) => {
        payloadObject.append(key, params.jsonPayload[key]);
      });
    }

    //Request sending
    backend[config.type](
      config.url + queryString,
      payloadObject,
      additionalHeaders
    )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
