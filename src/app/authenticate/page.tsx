function extractParamsFromCurrentURL(): Map<string, string> {
  const searchParams = new URLSearchParams(window.location.search);
  const params = new Map<string, string>();

  searchParams.forEach((value, key) => {
    params.set(key, value);
  });

  return params;
}

// Example usage
const params = extractParamsFromCurrentURL();

// Accessing individual parameters
console.log(params.get("param1")); // Output: value1
console.log(params.get("param2")); // Output: value2

const Authenticate = () => {
  return <div>ok</div>;
};
export default Authenticate;
