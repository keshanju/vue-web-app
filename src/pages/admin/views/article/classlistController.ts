/*
 * @Description: 文章分类
 * @Author: zhanghongwei
 * @Date: 2019-09-04 09:08:49
 * @LastEditTime: 2019-09-20 10:12:40
 * @LastEditors: Please set LastEditors
 */
import { Component, Vue, Prop } from "vue-property-decorator";
import boxDataGrid from "@/components/boxDataGrid.vue";
import BaseVue from "@/common/BaseVue";
import BoxExpress from "@/box.all";
import { ArticleClassApi } from "../../apis/ArticleApi";
import { ArticleClassModel } from '@/models/ArticleClassModel';
import my_nav from '../../components/my_nav.vue';
import { Loading } from 'element-ui';
import { ClassUtil } from '../../utils/ClassUtil';

@Component({
  components: {
    my_nav
  }
})
export default class List extends BaseVue {
  private formSearch: any = {};
  private formFilter: any = {};
  //列表
  private options: any = {
    dataSource: [],
    page: {
      pageSize: 20,
      totalCount: 0,
      pageIndex: 1
    }
  };

  //弹窗
  private dialog: any = {
    width: "800px",
    show: false,
    title: "分类编辑"
  };

  //表单
  private form: any = {};
  private title = "文章分类";
  private class_list = [];
  private article_class_api = new ArticleClassApi();

  private loading: boolean = false;

  created() {
    this.article_class_api = new ArticleClassApi();
  }

  async mounted() {
    await this.getListPager();

    let d = await this.article_class_api.getList();
    this.class_list = [{ id: 0, name: "作为一级分类" }, ...d.data];
    this.loading = false;
  }

  async sortChange() { }
  async currentChange() { }
  async getDataSelected() { }

  //#region 搜索表单
  /**
   * 表单搜索
   */
  private onSearchForm(form: any) { }
  //#endregion

  //#region 搜索过滤

  //#endregion

  //#region  工具条

  //#endregion

  //#region 数据表格开始
  /**
   * 分页大小改变
   */
  async onPageSizeChange(pageSize: number) {
    this.options.page.pageSize = pageSize;
    this.getListPager();
  }

  /**
   * 分页索引改变
   */
  async onPageCurrentChange(pageIndex: number) {
    this.options.page.pageIndex = pageIndex;
    this.getListPager();
  }

  /**
   * 数据分页
   */
  async getListPager() {
    let d = await this.article_class_api.getListPager(
      "",
      this.options.page.pageSize,
      this.options.page.pageSize * (this.options.page.pageIndex - 1)
    );
    this.options.dataSource = d.data.list;
    this.options.page.totalCount = Number(d.data.total);
  }

  /**
   * 数据编辑
   */
  async onRowEditHandler(row: ArticleClassModel) {
    this.dialog.show = true;
    this.form = row;
  }

  /**
   * 数据删除
   */
  async onRowDeleteHandler(row: ArticleClassModel) {
    this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      let d = await this.article_class_api.setDelete(row.classid);
      if (d.code == 0) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      } else {
        this.$message({
          type: 'error',
          message: '处理失败!' + d.code + "::" + d.msg
        });
      }
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });
    });
  }

  //#endregion

  //#region 表单
  /**
   * 添加表单
   */
  async onAddHandler(sender: any) {
    this.dialog.show = true;
  }
  /**
   * 表单提交
   */
  async onSubmitHandler(sender: any) {
    this.dialog.show = false;
  }
  //#endregion

  /**
 * 渲染标题
 * @param row 
 */
  public renderTitle(row: any) {
    return ClassUtil.GetTag(row.classname, row.classcode.length);
  }

}