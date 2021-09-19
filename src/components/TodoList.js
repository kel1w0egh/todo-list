import '../App.css';
import TodoCard from "./TodoCard";
import {useState} from "react";
import Modal from "./Modal";

export default function TodoList(props) {
    const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('test2')) || []);
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('test3')) || []);
    const [modalActive, setModalActive] = useState(false);

    function handlerClickAdd(e) {
        e.preventDefault();
        if (todoList.length < 1) {
            setTodoList([{id: todoList.length, title: e.target.title.value, tags: e.target.tag.value}]);
            localStorage.setItem('test2', JSON.stringify([{id: todoList.length, title: e.target.title.value, tags: e.target.tag.value}]))
            return;
        }

        alert('У Вас уже есть созданное дело. Для создания нового дела, удалите текущее дело и повторите попытку');
    }

    function deleteList(e) {
        e.preventDefault();
        setTodoList([]);
        localStorage.setItem('test2', null);
        return;
    }

    function addTodoToList(e) {
        const select = document.querySelector('.todos-for-list');
        if (select.value >= 0) {
            const todo = JSON.parse(localStorage.getItem('test')).filter(value => {
                if (select.value == value.id) {
                    return value;
                }
            })[0];
            // select.options[select.selectedIndex].style.display = 'none'
            setTodos([...todos, {
                id: todo.id,
                title: todo.title,
                description: todo.description,
                date: todo.date,
                priority: todo.priority,
                tag: todo.tag,
                status: 'Выполняется'
            }]);
            localStorage.setItem('test3', JSON.stringify([...todos, {
                id: todo.id,
                title: todo.title,
                description: todo.description,
                date: todo.date,
                priority: todo.priority,
                tag: todo.tag,
                status: 'Выполняется'
            }]))
        }
    }

    function completeTodo(e, id) {
        let tempTodos = [...todos];
        let updateTodos = tempTodos.map(value => {
            if (value.id == id) {
                value.status = 'Выполнено';
                return value;
            } else {
                return value;
            }
        });

        setTodos([...updateTodos]);
        localStorage.setItem('test3', JSON.stringify([...updateTodos]));
        e.target.parentNode.parentNode.classList.add('complete-todo');
    }

    function deleteTodo(e, id) {
        let tempTodos = [...todos];
        let updateTodos = tempTodos.filter(value => {
            if (value.id != id) {
                return value;
            }
        })

        setTodos([...updateTodos]);
        localStorage.setItem('test3', JSON.stringify([...updateTodos]));
    }

    return(
        <div style={{padding: "0 20px"}}>
            <form onSubmit={handlerClickAdd} className={"add-todo-list-form"}>
                <div style={{display: "flex", columnGap: "15px"}}>
                    <h2>{todoList?.length >= 1 ? `Активный список дел: ${todoList[0]?.title}` : 'Нет созданного списка дел'}</h2>
                    <button className={"btn-add"} type={"submit"}>
                        <span></span>
                    </button>
                    <button className={todoList.length >= 1 ? "btn-delete active" : "btn-delete disabled"} type={"button"} onClick={deleteList}>
                        <span></span>
                    </button>
                </div>
                <div className={"form-flex add-form"}>
                    <input required type="text" name={"title"} placeholder={"Название дела"} style={{flex: '1 1 auto', borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px"}}/>
                    <input required type="text" name={"tag"} placeholder={"Теги"} style={{flex: '1 1 auto', borderTopRightRadius: "5px", borderBottomRightRadius: "5px"}} />
                </div>
            </form>
            {todoList.length >= 1 ?
                <div className={"todo-list-container"}>
                <div className={"todo-list-header"}>
                    <span>Заголовок списка дел: {todoList[0]?.title}</span>
                    <span>Теги списка дел: {todoList[0]?.tags}</span>
                </div>
                <div className={"todo-list-body"}>
                    <div className={"body-add-container"}>
                        <select className={"todos-for-list"} style={{flex: '1 1 auto', padding: '10px'}}>
                            <option disabled selected>--Выберите дело для добавления в список--</option>
                                {JSON.parse(localStorage.getItem('test')).map(value => {
                                    return <option value={value.id}>{value.title}</option>
                                })}
                        </select>
                        <div>
                            <button type={"button"} style={{padding: '10px'}} onClick={addTodoToList}>Добавить дело в список дел</button>
                        </div>
                    </div>
                    <div className={"body-todos-container"}>
                        <ul style={{display: "flex", flexDirection: "column", columnGap: "20px"}}>
                            {todos.map(value => {
                                return <li>
                                    <div className={value.status == 'Выполнено' ? "complete-todo" : ""} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div><span>{value.title}</span></div>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <button onClick={(event) => {
                                            completeTodo(event, value.id);
                                        }}>
                                            Отметить как выполненое
                                        </button>
                                        <button onClick={(e) => deleteTodo(e, value.id)}>
                                            Удалить
                                        </button>
                                        <button onClick={() => setModalActive(true)}>
                                            Полная информация о деле
                                        </button>
                                        <div>Статус: <span>{value.status}</span></div>
                                    </div>
                                    </div>
                                    <Modal active={modalActive} setActive={setModalActive}>
                                        <div><h3>{value.title}</h3></div>
                                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                            <h4>Статистические данные о деле</h4>
                                            <div>
                                                <p>Срок выполнения: {value.date}</p>
                                                <p>Приоритет: {value.priority}</p>
                                                <p>Статус дела: {value.status}</p>
                                            </div>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                            <h4>Описание дела</h4>
                                            <div>
                                                <p>{value.description}</p>
                                            </div>
                                        </div>
                                    </Modal>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div> : null}
        </div>
    );
}