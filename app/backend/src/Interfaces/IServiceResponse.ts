export interface ServiceResponse<T> {
  status: 'SUCCESSFUL';
  data: T;
}

export default ServiceResponse;
