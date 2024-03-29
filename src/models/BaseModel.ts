
/**
 *返回基本信息
 *
 * @export
 * @interface BaseResult
 */
export interface BaseResult {
    code?: number;
    msg?: string;
}

/**
 *返回基本模型
 *
 * @export
 * @interface BaseModel
 * @template T
 */
export interface BaseModel<T> {
    status?: number;
    message?: string;
    data?: T
}

export class DataModel<T> implements BaseModel<T> {
    public status = 200;
    public message = '';
    public data: any = null;
}

/**
 *返回列表模型
 *
 * @export
 * @interface BaseArray
 * @template T
 */
export interface BaseArray<T> {
    code?: number;
    msg?: string;
    data?: T[]
}

/**
 *返回分页模型
 *
 * @export
 * @interface BasePager
 * @template T
 */
export interface BasePager<T> {
    code?: number;
    msg?: string;
    data?: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        page_count:number;
        list: T[]
    }
}