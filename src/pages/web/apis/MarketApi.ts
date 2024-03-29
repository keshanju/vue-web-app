import { AxiosUtil } from '../../../utils/AxiosUtil';
import { MarketsResModel } from '@/models/MarketModel';
import { BaseApi } from './BaseApi';
import { VerCodeModel } from '@/models/ToolsModel';

export class MarketsApi extends BaseApi {

    public async getList(options){
        let url = "/api_web/order/markets";
        let d =  await AxiosUtil.get<MarketsResModel>(url, options);
        return d;
    }
}