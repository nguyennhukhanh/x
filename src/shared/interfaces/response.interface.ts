import type { Meta } from 'src/common/class/meta';

export interface IResponse<T> {
  meta?: Meta;
  data?: T | Array<T>;
}
