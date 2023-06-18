const toCamelize = (status: string) => status.split('_')
  .reduce((string, curr) => (string + curr)).toLocaleLowerCase();

export default function mapStatusHTTP(status: string) {
  const statusCamelized = toCamelize(status);

  const statusHTTPMap: Record<string, number> = {
    successful: 200,
    notfound: 404,
  };
  return statusHTTPMap[statusCamelized] ?? 500;
}
