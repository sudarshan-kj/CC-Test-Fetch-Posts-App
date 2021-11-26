import "./List.css";

const List = ({ stories, handleDeleteItem }) => {
  return (
    <div>
      <ol>
        {stories.map(function (item, index) {
          return (
            <Item key={index} item={item} handleDeleteItem={handleDeleteItem} />
          );
        })}
      </ol>
    </div>
  );
};

const Item = ({ item, handleDeleteItem }) => (
  <li>
    <span className="item">
      <a className="title" href={item.url}>
        {item.title}
      </a>
    </span>
    <span className="item">{item.author}</span>
    <span className="item">{item.num_comments}</span>
    <span className="item">{item.points}</span>
    <span>
      <DeleteButton onClickHandler={() => handleDeleteItem(item)} />
    </span>
  </li>
);

const DeleteButton = ({ label, onClickHandler }) => {
  return (
    <button className="button button_small" onClick={onClickHandler}>
      Delete
    </button>
  );
};

export default List;

export { Item };
