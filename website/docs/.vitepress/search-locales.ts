import navigation from './navigation.json' with { type: 'json' }

interface SearchDialog {
  displayDetails: string
  resetButtonTitle: string
  backButtonTitle: string
  noResultsText: string
  footer: {
    selectText: string
    selectKeyAriaLabel: string
    navigateText: string
    navigateUpKeyAriaLabel: string
    navigateDownKeyAriaLabel: string
    closeText: string
    closeKeyAriaLabel: string
  }
}

const dialogs: Record<keyof typeof navigation, SearchDialog> = {
  en: {
    displayDetails: 'Display detailed results', resetButtonTitle: 'Clear search',
    backButtonTitle: 'Close search', noResultsText: 'No results for',
    footer: {
      selectText: 'to select', selectKeyAriaLabel: 'Enter',
      navigateText: 'to navigate', navigateUpKeyAriaLabel: 'Up arrow', navigateDownKeyAriaLabel: 'Down arrow',
      closeText: 'to close', closeKeyAriaLabel: 'Escape',
    },
  },
  zh: {
    displayDetails: '显示详细搜索结果', resetButtonTitle: '清空搜索', backButtonTitle: '关闭搜索', noResultsText: '未找到相关结果',
    footer: {
      selectText: '选择', selectKeyAriaLabel: '回车键', navigateText: '切换结果',
      navigateUpKeyAriaLabel: '上方向键', navigateDownKeyAriaLabel: '下方向键', closeText: '关闭', closeKeyAriaLabel: '退出键',
    },
  },
  de: {
    displayDetails: 'Detaillierte Ergebnisse anzeigen', resetButtonTitle: 'Suche zurücksetzen',
    backButtonTitle: 'Suche schließen', noResultsText: 'Keine Ergebnisse für',
    footer: {
      selectText: 'zum Auswählen', selectKeyAriaLabel: 'Eingabetaste', navigateText: 'zum Navigieren',
      navigateUpKeyAriaLabel: 'Pfeiltaste nach oben', navigateDownKeyAriaLabel: 'Pfeiltaste nach unten',
      closeText: 'zum Schließen', closeKeyAriaLabel: 'Escape-Taste',
    },
  },
  es: {
    displayDetails: 'Mostrar resultados detallados', resetButtonTitle: 'Borrar la búsqueda',
    backButtonTitle: 'Cerrar la búsqueda', noResultsText: 'Sin resultados para',
    footer: {
      selectText: 'para seleccionar', selectKeyAriaLabel: 'Intro', navigateText: 'para navegar',
      navigateUpKeyAriaLabel: 'Flecha arriba', navigateDownKeyAriaLabel: 'Flecha abajo',
      closeText: 'para cerrar', closeKeyAriaLabel: 'Escape',
    },
  },
  fr: {
    displayDetails: 'Afficher les résultats détaillés', resetButtonTitle: 'Effacer la recherche',
    backButtonTitle: 'Fermer la recherche', noResultsText: 'Aucun résultat pour',
    footer: {
      selectText: 'pour sélectionner', selectKeyAriaLabel: 'Entrée', navigateText: 'pour naviguer',
      navigateUpKeyAriaLabel: 'Flèche vers le haut', navigateDownKeyAriaLabel: 'Flèche vers le bas',
      closeText: 'pour fermer', closeKeyAriaLabel: 'Échap',
    },
  },
  ja: {
    displayDetails: '詳しい検索結果を表示', resetButtonTitle: '検索をクリア',
    backButtonTitle: '検索を閉じる', noResultsText: '検索結果が見つかりません',
    footer: {
      selectText: 'で選択', selectKeyAriaLabel: 'エンターキー', navigateText: 'で移動',
      navigateUpKeyAriaLabel: '上矢印キー', navigateDownKeyAriaLabel: '下矢印キー',
      closeText: 'で閉じる', closeKeyAriaLabel: 'エスケープキー',
    },
  },
  pt: {
    displayDetails: 'Mostrar resultados detalhados', resetButtonTitle: 'Limpar a pesquisa',
    backButtonTitle: 'Fechar a pesquisa', noResultsText: 'Nenhum resultado para',
    footer: {
      selectText: 'para selecionar', selectKeyAriaLabel: 'Enter', navigateText: 'para navegar',
      navigateUpKeyAriaLabel: 'Seta para cima', navigateDownKeyAriaLabel: 'Seta para baixo',
      closeText: 'para fechar', closeKeyAriaLabel: 'Escape',
    },
  },
  ru: {
    displayDetails: 'Показать подробные результаты', resetButtonTitle: 'Очистить поиск',
    backButtonTitle: 'Закрыть поиск', noResultsText: 'Ничего не найдено по запросу',
    footer: {
      selectText: 'выбрать', selectKeyAriaLabel: 'Ввод', navigateText: 'перейти к результату',
      navigateUpKeyAriaLabel: 'Стрелка вверх', navigateDownKeyAriaLabel: 'Стрелка вниз',
      closeText: 'закрыть', closeKeyAriaLabel: 'Клавиша Escape',
    },
  },
}

export const searchLocales = Object.fromEntries(
  (Object.keys(dialogs) as (keyof typeof dialogs)[]).map((code) => [
    code === 'en' ? 'root' : code,
    {
      translations: {
        button: { buttonText: navigation[code].search, buttonAriaLabel: navigation[code].search },
        modal: dialogs[code],
      },
    },
  ]),
)
