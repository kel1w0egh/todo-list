import '../App.css';
import TodoCard from "./TodoCard";
import {useState} from "react";

export default function Index(props) {
    const [todoList, setTodoList] = useState([]);
    let id = 0;

    function handlerClickAdd(e) {
        e.preventDefault();
        setTodoList([...todoList, { id: todoList.length, title: e.target.title.value, date: e.target.date.value, description: e.target.description.value, tags: e.target.tag.value, priority: e.target.priority.value}])
    }

    function deleteHandler(e) {
        e.preventDefault();
        const todos = [...todoList];
        const tempTodos = todos.filter(value => value.id !== Number.parseInt(e.target.id));
        setTodoList([...tempTodos]);
    }

    function updateHandler(e) {
        e.preventDefault();
        id = Number.parseInt(e.target.id);
        const addForm = document.getElementsByClassName('add-todo-form')[0];
        const updateForm = document.getElementsByClassName('update-todo-form')[0];

        addForm.classList.add('disabled');
        updateForm.classList.remove('disabled');
        updateForm.classList.add('active');
    }

    function updateTodo(e) {
        e.preventDefault();
        const addForm = document.getElementsByClassName('add-todo-form')[0];
        const updateForm = document.getElementsByClassName('update-todo-form')[0];
        const todos = [...todoList];
        const tempTodo = todos.filter(value => value.id === id);

        const result = todos.map(value => {
            if (value.id === id) {
                tempTodo[0].title = e.target.title?.value;
                tempTodo[0].date = e.target.date?.value;
                tempTodo[0].description = e.target.description?.value;
                tempTodo[0].tags = e.target.tag?.value;
                tempTodo[0].priority = e.target.priority?.value;

                return value = {id: value.id, title: tempTodo[0].title, date: tempTodo[0].date, description: tempTodo[0].description, tags: tempTodo[0].tags, priority: tempTodo[0].priority};
            }

            return value;
        });

        setTodoList([...result]);
        addForm.classList.remove('disabled');
        updateForm.classList.add('disabled');
        updateForm.classList.remove('active');

    }

    function cancelHandler(e) {
        const addForm = document.getElementsByClassName('add-todo-form')[0];
        const updateForm = document.getElementsByClassName('update-todo-form')[0];

        addForm.classList.remove('disabled');
        updateForm.classList.add('disabled');
        updateForm.classList.remove('active');
    }

    return (
        <div style={{padding: "0 20px"}}>
            <form onSubmit={handlerClickAdd} className={"add-todo-form"}>
                <div style={{display: "flex", columnGap: "15px"}}>
                    <h2>{todoList.length >= 1 ? `Количество активных дел: ${todoList.length}` : 'Нет активных дел'}</h2>
                    <button className={"btn-add"} type={"submit"}>
                        <span></span>
                    </button>
                </div>
                <div className={"form-flex"}>
                    <input type="text" name={"title"} placeholder={"Название дела"} style={{width: "200px", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px"}}/>
                    <input type="date" name={"date"} placeholder={"Дата исполнения дела"}/>
                    <select name={"priority"}>
                        <option value="Высокий">Высокий</option>
                        <option value="Низкий">Низкий</option>
                    </select>
                    <input type="text" name={"description"} placeholder={"Описание дела"} style={{width: "450px"}}/>
                    <input type="text" name={"tag"} placeholder={"Тег"} style={{borderTopRightRadius: "5px", borderBottomRightRadius: "5px"}} />
                </div>
            </form>
            <form onSubmit={updateTodo} className={"update-todo-form disabled"}>
                <div style={{display: "flex", columnGap: "15px"}}>
                    <h2>Редактирование дела</h2>
                    <button className={"btn-edit"} type={"submit"}>
                        <span></span>
                    </button>
                    <button className={"btn-cancel"} type={"button"} onClick={cancelHandler}>
                        <span></span>
                    </button>
                </div>
                <div className={"form-flex"}>
                    <input type="text" name={"title"} placeholder={"Название дела"} style={{width: "200px", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px"}}/>
                    <input type="date" name={"date"} placeholder={"Дата исполнения дела"}/>
                    <select name={"priority"}>
                        <option value="Высокий">Высокий</option>
                        <option value="Низкий">Низкий</option>
                    </select>
                    <input type="text" name={"description"} placeholder={"Описание дела"} style={{width: "450px"}}/>
                    <input type="text" name={"tag"} placeholder={"Тег"} style={{borderTopRightRadius: "5px", borderBottomRightRadius: "5px"}} />
                </div>
            </form>
            <ul className={"todo-item-list"}>
                {todoList.map(value => {
                    return <li className={"todo-item"}><TodoCard value={value} id={value.id} key={value.id} updateHandler={updateHandler} deleteHandler={deleteHandler}/></li>
                })}
            </ul>
        </div>
    );
}