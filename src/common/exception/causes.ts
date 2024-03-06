import { HttpException, HttpStatus } from '@nestjs/common';

function createHttpException(
  { name, message }: { name?: string; message?: string },
  status: HttpStatus,
): HttpException {
  return new HttpException(name ?? message, status);
}

export class Causes {
  public static CONTINUE = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} continue`, message },
      HttpStatus.CONTINUE,
    );

  public static SWITCHING_PROTOCOLS = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} switching protocols`, message },
      HttpStatus.SWITCHING_PROTOCOLS,
    );

  public static PROCESSING = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} processing`, message },
      HttpStatus.PROCESSING,
    );

  public static EARLYHINTS = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} earlyhints`, message },
      HttpStatus.EARLYHINTS,
    );

  public static OK = ({ name, message }: { name?: string; message?: string }) =>
    createHttpException({ name: `${name} ok`, message }, HttpStatus.OK);

  public static CREATED = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} created`, message },
      HttpStatus.CREATED,
    );

  public static ACCEPTED = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} accepted`, message },
      HttpStatus.ACCEPTED,
    );

  public static NON_AUTHORITATIVE_INFORMATION = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} non authoritative information`, message },
      HttpStatus.NON_AUTHORITATIVE_INFORMATION,
    );

  public static NO_CONTENT = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} no content`, message },
      HttpStatus.NO_CONTENT,
    );

  public static RESET_CONTENT = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} reset content`, message },
      HttpStatus.RESET_CONTENT,
    );

  public static PARTIAL_CONTENT = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} partial content`, message },
      HttpStatus.PARTIAL_CONTENT,
    );

  public static AMBIGUOUS = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} ambiguous`, message },
      HttpStatus.AMBIGUOUS,
    );

  public static MOVED_PERMANENTLY = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} moved permanently`, message },
      HttpStatus.MOVED_PERMANENTLY,
    );

  public static FOUND = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException({ name: `${name} found`, message }, HttpStatus.FOUND);

  public static SEE_OTHER = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} see other`, message },
      HttpStatus.SEE_OTHER,
    );

  public static NOT_MODIFIED = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} not modified`, message },
      HttpStatus.NOT_MODIFIED,
    );

  public static TEMPORARY_REDIRECT = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} temporary redirect`, message },
      HttpStatus.TEMPORARY_REDIRECT,
    );

  public static PERMANENT_REDIRECT = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} permanent redirect`, message },
      HttpStatus.PERMANENT_REDIRECT,
    );

  public static BAD_REQUEST = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} bad request`, message },
      HttpStatus.BAD_REQUEST,
    );

  public static UNAUTHORIZED = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} unauthorized`, message },
      HttpStatus.UNAUTHORIZED,
    );

  public static PAYMENT_REQUIRED = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} payment required`, message },
      HttpStatus.PAYMENT_REQUIRED,
    );

  public static FORBIDDEN = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} forbidden`, message },
      HttpStatus.FORBIDDEN,
    );

  public static NOT_FOUND = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} not found`, message },
      HttpStatus.NOT_FOUND,
    );

  public static METHOD_NOT_ALLOWED = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} method not allowed`, message },
      HttpStatus.METHOD_NOT_ALLOWED,
    );

  public static NOT_ACCEPTABLE = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} not acceptable`, message },
      HttpStatus.NOT_ACCEPTABLE,
    );

  public static PROXY_AUTHENTICATION_REQUIRED = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} proxy authentication required`, message },
      HttpStatus.PROXY_AUTHENTICATION_REQUIRED,
    );

  public static REQUEST_TIMEOUT = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} request timeout`, message },
      HttpStatus.REQUEST_TIMEOUT,
    );

  public static CONFLICT = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} conflict`, message },
      HttpStatus.CONFLICT,
    );

  public static GONE = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) => createHttpException({ name: `${name} gone`, message }, HttpStatus.GONE);

  public static LENGTH_REQUIRED = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} length required`, message },
      HttpStatus.LENGTH_REQUIRED,
    );

  public static PRECONDITION_FAILED = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} precondition failed`, message },
      HttpStatus.PRECONDITION_FAILED,
    );

  public static PAYLOAD_TOO_LARGE = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} payload too large`, message },
      HttpStatus.PAYLOAD_TOO_LARGE,
    );

  public static URI_TOO_LONG = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} uri too long`, message },
      HttpStatus.URI_TOO_LONG,
    );

  public static UNSUPPORTED_MEDIA_TYPE = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} unsupported media type`, message },
      HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    );

  public static REQUESTED_RANGE_NOT_SATISFIABLE = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} requested range not satisfiable`, message },
      HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE,
    );

  public static EXPECTATION_FAILED = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} expectation failed`, message },
      HttpStatus.EXPECTATION_FAILED,
    );

  public static I_AM_A_TEAPOT = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} i am a teapot`, message },
      HttpStatus.I_AM_A_TEAPOT,
    );

  public static MISDIRECTED = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} misdirected`, message },
      HttpStatus.MISDIRECTED,
    );

  public static UNPROCESSABLE_ENTITY = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} unprocessable entity`, message },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

  public static FAILED_DEPENDENCY = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} failed dependency`, message },
      HttpStatus.FAILED_DEPENDENCY,
    );

  public static PRECONDITION_REQUIRED = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} precondition required`, message },
      HttpStatus.PRECONDITION_REQUIRED,
    );

  public static TOO_MANY_REQUESTS = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} too many requests`, message },
      HttpStatus.TOO_MANY_REQUESTS,
    );

  public static INTERNAL_SERVER_ERROR = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} internal server error`, message },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );

  public static NOT_IMPLEMENTED = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} not implemented`, message },
      HttpStatus.NOT_IMPLEMENTED,
    );

  public static BAD_GATEWAY = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} bad gateway`, message },
      HttpStatus.BAD_GATEWAY,
    );

  public static SERVICE_UNAVAILABLE = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} service unavailable`, message },
      HttpStatus.SERVICE_UNAVAILABLE,
    );

  public static GATEWAY_TIMEOUT = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} gateway timeout`, message },
      HttpStatus.GATEWAY_TIMEOUT,
    );

  public static HTTP_VERSION_NOT_SUPPORTED = ({
    name,
    message,
  }: {
    name?: string;
    message?: string;
  }) =>
    createHttpException(
      { name: `${name} http version not supported`, message },
      HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    );
}
