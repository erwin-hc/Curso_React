export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>🎒 Starting Adding Items!</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((i) => i.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? " 🏕️ You got everything! Read to go!"
          : ` 🎒 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%) `}
      </em>
    </footer>
  );
}
