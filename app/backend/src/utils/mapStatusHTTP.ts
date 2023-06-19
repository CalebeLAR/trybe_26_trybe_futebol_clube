const toCamelize = (status: string) => status.split('_')
  .reduce((string, curr) => (string + curr)).toLocaleLowerCase();

export default function mapStatusHTTP(status: string) {
  const statusCamelized = toCamelize(status);

  const statusHTTPMap: Record<string, number> = {
    notfound: 404,
    unauthorized: 401,
    successful: 200,
  };
  return statusHTTPMap[statusCamelized] ?? 500;
}
