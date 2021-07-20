import '../App.css';

export default function TodoCard(props) {
    return (
        <div className={"todo-card"}>
            <span className={"todo-card-line"}></span>
            <div className={"card-navigation"}>
                <button className={"card-btn-edit"} onClick={props.updateHandler} id={props.id}>Редактировать</button>
                <button className={"card-btn-delete"} onClick={props.deleteHandler} id={props.id}>Удалить</button>
            </div>
            <div className={"card-header"}>
                <span>Название: {props.value.title}</span>
                <span>Дата исполнения: {props.value.date}</span>
            </div>
            <div className={"card-main"}>
                <p>{props.value.description}</p>
            </div>
            <div className={"card-footer"}>
                <span>Приоритет: {props.value.priority}</span>
                <span>Теги: {props.value.tags}</span>
            </div>
        </div>
    );
}