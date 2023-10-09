/**
 * HTTP response status codes
 */
export enum HTTP_RESPONSE_STATUS_CODES {
  OK = 200,
  NO_CONTENT = 204,

  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  NOT_ACCEPTABLE = 406,

  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  VARIANT_ALSO_NEGOTIATES = 506,
  INSUFFICIENT_STORAGE = 507,
  LOOP_DETECTED = 508,
  NOT_EXTENDED = 510,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}

/**
 * time sleep app when reset routes but navigation ref not ready
 */
export const TIME_SLEEP_WAIT_NAVIGATION_REF = 300;

/**
 * time sleep app to show toast
 */
export const TIME_SLEEP_SHOW_TOAST = 500;

/**
 * type image
 */
export enum TYPE_IMAGE {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
}

/**
 * colors default
 */
export const COLORS = {
  WHITE: 'rgba(255, 255, 255, 1)',
  BLACK: 'rgba(0, 0, 0, 1)',
  ERROR: 'rgba(255, 0, 0, 1)',
  PLACEHOLDER: 'rgba(123, 138, 127, 1)',
  BACKGROUND_INPUT: 'rgba(23, 26, 34, 1)',
};

/**
 * custom fonts
 */
export enum FONTS {}

/**
 * type input for validate tooltip
 */
export enum TYPE_INPUT {
  ARRAY = 'array',
  FILE = 'file',
  NUMERIC = 'numeric',
  STRING = 'string',
}

/**
 * type date time
 */
export enum TYPE_DATE_TTME {
  YYYY_MM_DD = 'YYYY/MM/DD',
  Y = 'Y',
  M = 'M',
  D = 'D',
  mm_ss = 'mm:ss',
  HH_mm_ss = 'HH:mm:ss',
  YYYY_MM_DD_HYPHEN = 'YYYY-MM-DD',
  DD_MM_YYYY_HH_mm_ss = 'DD-MM-YYYY HH:mm:ss',
  YYYY_MM_DD_HH_mm = 'YYYY-MM-DD HH:mm',
  YYYY_MM_DD_HH_mm_ss = 'YYYY-MM-DD HH:mm:ss',
  HH_mm = 'HH:mm',
  YY_MM_DD = 'YY/MM/DD',
  YYYY_MM_DD_HYPHEN_HH_mm = 'YYYY/MM/DD HH:mm',
  YYYY_MM_DD_HYPHEN_HH_mm_ss = 'YYYY/MM/DD HH:mm:ss',
  YYYY = 'YYYY',
  YY = 'YY',
  MM = 'MM',
  DD = 'DD',
}

/**
 * custom fonts
 */
export enum FONTS {
  MONTSERRAT_BLACK = 'Montserrat-Black',
  MONTSERRAT_BLACKITALIC = 'Montserrat-BlackItalic',
  MONTSERRAT_BOLD = 'Montserrat-Bold',
  MONTSERRAT_BOLDITALIC = 'Montserrat-BoldItalic',
  Montserrat_ExtraBold = 'Montserrat-ExtraBold',
  MONTSERRAT_EXTRABOLDITALIC = 'Montserrat-ExtraBoldItalic',
  MONTSERRAT_EXTRALIGHT = 'Montserrat-ExtraLight',
  MONTSERRAT_EXTRALIGHTITALIC = 'Montserrat-ExtraLightItalic',
  MONTSERRAT_ITALIC = 'Montserrat-Italic',
  MONTSERRAT_LIGHT = 'Montserrat-Light',
  MONTSERRAT_LIGHTITALIC = 'Montserrat-LightItalic',
  MONTSERRAT_MEDIUM = 'Montserrat-Medium',
  MONTSERRAT_MEDIUMITALIC = 'Montserrat-MediumItalic',
  MONTSERRAT_REGULAR = 'Montserrat-Regular',
  MONTSERRAT_SEMIBOLD = 'Montserrat-SemiBold',
  MONTSERRAT_SEMIBOLDITALIC = 'Montserrat-SemiBoldItalic',
  MONTSERRAT_THIN = 'Montserrat-Thin',
  MONTSERRAT_THINITALIC = 'Montserrat-ThinItalic',
}
