import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackgeList from "./PackgeList";
import Stats from "./Stats";

function App() {
  const [items, setItems] = useState([]);

  function handleClearList() {
    let emptyList = items.length;
    let confirmed;

    if (emptyList > 0) {
      confirmed = window.confirm("Are you sure you want delete all items?");
      confirmed && setItems([]);
    }
  }

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackgeList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
