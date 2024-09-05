export default defineAppConfig({
  BAR: 'app-config-value',
  scrap: {
    page: {
      top: {
        articleTypeSlug: 'top',
        mainListName: 'carNewsMain',
        mainSliderSlug: 'slider_car_news_top',
        // 後はアプリケーションで自由に使う
        listTitle: 'カーニュース一覧 in play',
        listSubTitle: 'カーニュースの検索結果です',
        detailTitle: 'カーニュース詳細',
      },
      detail: {
        articleTypeSlug: 'drive',
        mainListName: 'driveMain',
        mainSliderSlug: 'slider_drive_top',
      },
    },

    // 記事リスト設定
    listDefault: {
      pageSize: 30,
      cacheTtl: 30 * 60 * 1000,
    },
    list: {
      carNewsMain: {
        articleTypeSlug: 'car_news',
        head: {
          title: 'カーニュース一覧',
        },
        selectColumns: [
          'open_date',
          'user_favorite_count',
          'alliance',
        ],
        query: {
          cat: {
            column: 'CATEGORY',
          },
          tag: {
            column: 'TAG',
          },
          s: {
            column: 'FREEWORD',
          },
        },
        sort: {
          default: {
            label: '新着順',
            value: [
              {
                column: 'open_date',
                order: 'DESC',
              },
            ],
          },
          pv: {
            label: '人気順',
            value: [
              {
                column: 'pv_last_week',
                order: 'DESC',
              },
            ],
          },
        },
      },
      driveMain: {
        articleTypeSlug: 'drive',
        head: {
          title: 'ドライブ・旅行一覧',
        },
        selectColumns: [
          'open_date',
          'user_favorite_count',
          'alliance',
        ],
        query: {
          cat: {
            column: 'CATEGORY',
          },
          pref: {
            column: 'CATEGORY',
          },
          tag: {
            column: 'TAG',
          },
          s: {
            column: 'FREEWORD',
          },
        },
        sort: {
          default: {
            label: '新着順',
            value: [
              {
                column: 'open_date',
                order: 'DESC',
              },
            ],
          },
          pv: {
            label: '人気順',
            value: [
              {
                column: 'pv_last_week',
                order: 'DESC',
              },
            ],
          },
        },
      },
    },
  },
})
