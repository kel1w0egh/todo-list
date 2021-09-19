import "../App.css";
import {useState} from "react";

export default function TodoProject() {
    const [todoProject, setTodoProject] = useState([]);
    const [todos, setTodos] = useState([]);

    function handlerAddProject(e) {
        e.preventDefault();
        if (todoProject.length < 1) {
            setTodoProject([{id: todoProject.length, title: e.target.title.value}]);
            return;
        }

        alert('У Вас уже есть созданный проект. Для создания нового проекта, удалите текущий проект и повторите попытку');
    }

    function handlerDeleteProject(e) {
        e.preventDefault();
        setTodoProject([]);
        return;
    }

    function handlerAddTodo(e, status) {
        e.preventDefault();
        setTodos([...todos, {id: todos.length, title: e.target.title.value, status: status}]);
    }

    function handlerChangeStatus(e, status, id) {
        e.preventDefault();
        const tempList = todos.map(value => {
            if (value.id == id) {
                value.status = e.target.status.value;
                return value;
            }
            return value;
        });
        setTodos([...tempList]);
        return;
    }

    return (
        <div style={{padding: "0 20px"}}>
            <form onSubmit={(e) => handlerAddProject(e)} className={"add-todo-project-form"}>
                <div style={{display: "flex", columnGap: "15px"}}>
                    <h2>{todoProject.length >= 1 ? `Активный проект дел: ${todoProject[0]?.title}` : "Нет активного проекта дел"}</h2>
                    <button className={"btn-add"} type={"submit"}>
                        <span></span>
                    </button>
                    <button onClick={(e) => handlerDeleteProject(e)}
                            className={todoProject.length >= 1 ? "btn-delete active" : "btn-delete disabled"}
                            type={"button"}>
                        <span></span>
                    </button>
                </div>
                <div className={"form-flex add-form"}>
                    <input required type="text" name={"title"} placeholder={"Название дела"}
                           style={{flex: '1 1 auto', borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px"}}/>
                </div>
            </form>
            {todoProject.length >= 1 ?
                <div className={"todo-project-container"} style={{display: 'flex', columnGap: '20px'}}>
                    <div className={"container-upcoming"}>
                        <h4>Предстоящие</h4>
                        <form onSubmit={(e) => handlerAddTodo(e, 'Предстоящее')}>
                            <div style={{display: 'flex', alignItems: 'center', columnGap: '20px'}}>
                                <button style={{padding: '10px'}}>Добавить дело</button>
                                <input style={{padding: '10px'}} type="text" name={"title"} required={"required"}
                                       placeholder={"Название дела"}/>
                            </div>
                        </form>
                        <div className={"todos-container"}>
                            {todos.map(value => {
                                if (value.status == 'Предстоящее') {
                                    return <div>
                                        <p>{value.title}</p>
                                        <form onSubmit={e => handlerChangeStatus(e, value.status, value.id)}>
                                            <div className={"status-block"}>
                                                <select name={"status"}>
                                                    <option disabled selected> --Статус--</option>
                                                    <option value={"Предстоящее"}>Предстоящее</option>
                                                    <option value={"В процессе"}>В процессе</option>
                                                    <option value={"Выполненно"}>Выполненно</option>
                                                </select>
                                                <button type={"submit"}>Переместить</button>
                                            </div>
                                        </form>
                                    </div>
                                }
                            })}
                        </div>
                    </div>
                    <div className={"container-in-proccess"}>
                        <h4>В процессе</h4>
                        <form onSubmit={(e) => handlerAddTodo(e, 'В процессе')}>
                            <div style={{display: 'flex', alignItems: 'center', columnGap: '20px'}}>
                                <button style={{padding: '10px'}}>Добавить дело</button>
                                <input style={{padding: '10px'}} type="text" name={"title"} required={"required"}
                                       placeholder={"Название дела"}/>
                            </div>
                        </form>
                        <div className={"todos-container"}>
                            {todos.map(value => {
                                if (value.status == 'В процессе') {
                                    return <div>
                                        <p>{value.title}</p>
                                        <form onSubmit={e => handlerChangeStatus(e, value.status, value.id)}>
                                            <div className={"status-block"}>
                                                <select name={"status"}>
                                                    <option disabled selected> --Статус--</option>
                                                    <option value={"Предстоящее"}>Предстоящее</option>
                                                    <option value={"В процессе"}>В процессе</option>
                                                    <option value={"Выполненно"}>Выполненно</option>
                                                </select>
                                                <button type={"submit"}>Переместить</button>
                                            </div>
                                        </form>
                                    </div>
                                }
                            })}
                        </div>
                    </div>
                    <div className={"container-done"}>
                        <h4>Выполненно</h4>
                        <form onSubmit={(e) => handlerAddTodo(e, 'Выполненно')}>
                            <div style={{display: 'flex', alignItems: 'center', columnGap: '20px'}}>
                                <button style={{padding: '10px'}}>Добавить дело</button>
                                <input style={{padding: '10px'}} type="text" name={"title"} required={"required"}
                                       placeholder={"Название дела"}/>
                            </div>
                        </form>
                        <div className={"todos-container"}>
                            {todos.map(value => {
                                if (value.status == 'Выполненно') {
                                    return <div>
                                        <p>{value.title}</p>
                                        <form onSubmit={e => handlerChangeStatus(e, value.status, value.id)}>
                                            <div className={"status-block"}>
                                                <select name={"status"}>
                                                    <option disabled selected> --Статус--</option>
                                                    <option value={"Предстоящее"}>Предстоящее</option>
                                                    <option value={"В процессе"}>В процессе</option>
                                                    <option value={"Выполненно"}>Выполненно</option>
                                                </select>
                                                <button type={"submit"}>Переместить</button>
                                            </div>
                                        </form>
                                    </div>
                                }
                            })}
                        </div>
                    </div>
                </div>
                : null}
        </div>
    );
}