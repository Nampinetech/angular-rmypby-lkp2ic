import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { orderData } from './data';
import {
  FilterService,
  GridComponent,
  IFilter,
  VirtualScrollService,
} from '@syncfusion/ej2-angular-grids';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { getData } from './data';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons/src/common/common';
import { PageSettingsModel } from '@syncfusion/ej2-grids/src/grid/models/page-settings-model';
import { L10n } from '@syncfusion/ej2-base/src/l10n';
L10n.load({
  'en-US': {
    pager: {
      currentPageInfo: '',
      totalItemsInfo: '{1} to {2} of {0}',
    },
  },
});
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [FilterService, VirtualScrollService],
})
export class AppComponent {
  public dReady: boolean = false;
  public dtTime: boolean = false;
  public isDataBound: boolean = false;
  public isDataChanged: boolean = true;
  public intervalFun: any;
  public clrIntervalFun: any;
  public clrIntervalFun1: any;
  public clrIntervalFun2: any;
  public dropSlectedIndex: number = null;
  public data: Object;
  public filter: Object;
  public filterSettings: Object;
  public selectionSettings: Object;
  public height: string = '240px';
  @ViewChild('sample')
  public listObj: DropDownListComponent;
  @ViewChild('overviewgrid')
  public gridInstance: GridComponent;
  public initialPage: PageSettingsModel;
  public pageSizeOptions: {
    '5';
    10;
    All;
  };
  public ddlData: Object[] = [
    { text: '10 Rows and 11 Columns', value: '10' },
    { text: '100 Rows and 11 Columns', value: '100' },
    { text: '1,000 Rows and 11 Columns', value: '1000' },
    { text: '10,000 Rows and 11 Columns', value: '10000' },
    { text: '1,00,000 Rows and 11 Columns', value: '100000' },
  ];
  public fields: Object = { text: 'text', value: 'value' };
  public item: number[] = [1, 2, 3, 4, 5];

  public ngOnInit(): void {
    this.data = getData(100);
    this.filterSettings = { type: 'Menu' };
    this.filter = { type: 'CheckBox' };
    this.selectionSettings = {
      persistSelection: true,
      type: 'Multiple',
      checkboxOnly: true,
    };
    this.initialPage = {
      pageSizes: ['10', '20', '50'],
      pageCount: 8,
      pageSize: 10,
    };
  }

  ngAfterViewInit(args: any): void {
    this.gridInstance.on('data-ready', function () {
      this.dReady = true;
    });
  }

  valueChange(args: any): void {
    this.listObj.hidePopup();
    this.gridInstance.showSpinner();
    this.dropSlectedIndex = null;
    let index: number = this.listObj.value as number;
    clearTimeout(this.clrIntervalFun2);
    this.clrIntervalFun2 = setTimeout(() => {
      this.isDataChanged = true;
      this.gridInstance.pageSettings.currentPage = 1;
      this.gridInstance.dataSource = getData(index);
      this.gridInstance.hideSpinner();
    }, 1000);
  }
}
