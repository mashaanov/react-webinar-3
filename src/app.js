import React from 'react';
import './styles.css';

function App({ store }) {
  const list = store.getState().list;

  function getSelectionCountText(count) {
    if (count === 1) {
      return `Выделяли ${count} раз`;
    } else if (count >= 2 && count <= 4) {
      return `Выделяли ${count} раза`;
    } else {
      return `Выделяли ${count} раз`;
    }
  }

  return (
    <div className="App">
      <div className="App-head">
        <h1>Название приложения</h1> {/* Замените на нужный заголовок */}
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}</div>
                {item.selectionCount > 0 && (
                  <div className="Item-selectionCount">
                    {getSelectionCountText(item.selectionCount)}
                  </div>
                )}
                <div className="Item-actions">
                  <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
