/**
 * Parser JSON data.
 * @param data String need parser to JSON object. 
 * @param defaultValue Default value of return value if parser error.
 * @returns JSON parser data 
 */
export function parserJSON(data: string, defaultValue = {}) {
  let responseData = null;
  try {
    responseData = JSON.parse(data);
  } catch (error) {
    responseData = defaultValue;
  }
  return responseData;
}