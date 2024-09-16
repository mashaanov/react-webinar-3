/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    // Инициализация состояния
    this.state = {
      ...initState,
      list: initState.list.map(item => ({
        ...item,
        selectionCount: item.selectionCount || 0 // Устанавливаем selectionCount для всех записей
      }))
    };
    this.listeners = []; // Слушатели изменений состояния

    // Обновляем максимальный код на основании текущих кодов
    this.maxCode = Math.max(...this.state.list.map(item => item.code || 0), 0);
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = {
      ...newState,
      list: newState.list.map(item => ({
        ...item,
        selectionCount: item.selectionCount || 0 // Устанавливаем selectionCount для всех записей
      }))
    };
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи с уникальным кодом
   */
  addItem() {
    const newCode = this.maxCode + 1;

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись', selectionCount: 0 }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          return { 
            ...item, 
            selected: !item.selected,
            selectionCount: item.selected ? item.selectionCount : item.selectionCount + 1
          };
        }
        return { ...item, selected: false };
      }),
    });
  }
}

export default Store;
