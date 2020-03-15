export enum ErrorNameEnum {
  HTTPError = 'HTTPError',
  ValidationError = 'ValidationError',
  WebsocketError = 'WebsocketError',
  Error = 'Error'
}
export type ErrorResponse = {
  error: {
    message: string;
    name: ErrorNameEnum;
  };
};
