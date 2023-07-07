window.DataTables2 = {
  dataTable: null,
  ajaxUrl: null,
  buildDataTable: function (url) {
    this.dataTable = $("#dt2").DataTable({
      ajax: {
        url: url,
        dataSrc: "",
      },
      columns: [
        {
          data: "date",
          render: function (data, type, row, meta) {
            var dateValue = new Date(data);

            if (type === 'display') {
              return dateValue.toLocaleDateString();
            }
            else {
              return dateValue.valueOf();
            }
          }
        },
        { data: "temperatureC" },
        { data: "summary" },
      ],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.5/i18n/ja.json"
      },
      destroy: true,
      deferRender: true,
      processing: true,
      scrollCollapse: true,
      autowidth: true,
      search: {
        caseInsensitive: true
      },
      pageLength: 50,
      lengthMenu: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100, 500],
      orderMulti: true,
      orderClasses: true,
      order: [[0, 'asc']],
      dom:
        "<'row small d-flex'<'w-auto'f><'w-auto flex-grow-1'Q>>" +
        "<'row small d-flex'<'w-auto'l><'w-auto flex-grow-1'><'w-auto'B>>" +
        "<'row small d-flex'<'w-auto'i><'w-auto flex-grow-1'><'w-auto'p>>" +
        "<'row small d-flex'<Rrt>>" +
        "<'row small d-flex'<'w-auto'i><'w-auto flex-grow-1'><'w-auto'p>>",
      buttons: [
        {
          extend: 'colvis',
          text: '表示列'
        },
        'excelHtml5',
      ],
      //fixedHeader: false,   // 行ヘッダ固定を上書きする場合は、個別ページで <thead class="sticky-top"> のように指定する。
      fixedColumns: false,    // 列ヘッダ固定を上書きする場合は、個別ページで行う
      select: 'os',           // 行選択を上書きする場合は、個別ページで行う
      responsive: false,      // レスポンシブ設定を上書きする場合は、個別ページで行う
      stateSave: false,       // 状態保存設定を上書きする場合は、個別ページで行う
    });
  },
  destroyDataTable: function () {
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  },
  refreshDataTable: function (url) {
    if (this.dataTable) {
      this.dataTable.clear();
      this.dataTable.draw();
      this.dataTable.ajax.url(url).load();
    }
  }
}
