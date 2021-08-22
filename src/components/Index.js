import '../App.css';
import TodoCard from "./TodoCard";
import {useEffect, useState} from "react";

export default function Index(props) {
    const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('test')) || []);
    let id = 0;

    function handlerClickAdd(e) {
        e.preventDefault();
        setTodoList([...todoList, { id: todoList.length, title: e.target.title.value, date: e.target.date.value, description: e.target.description.value, tags: e.target.tag.value, priority: e.target.priority.value}])
        localStorage.setItem('test', JSON.stringify([...todoList, { id: todoList.length, title: e.target.title.value, date: e.target.date.value, description: e.target.description.value, tags: e.target.tag.value, priority: e.target.priority.value}]))
        return;
    }

    function deleteHandler(e) {
        e.preventDefault();
        const todos = JSON.parse(localStorage.getItem('test'));
        const filterTodos = todos.filter(value => value.id !== Number.parseInt(e.target.id));
        setTodoList([...filterTodos]);
        localStorage.clear();
        localStorage.setItem('test', JSON.stringify([...filterTodos]));
        console.log(JSON.parse(localStorage.getItem('test')));
        return;
    }

    function updateHandler(e) {
        e.preventDefault();
        const todos = [...todoList];
        const tempTodo = todos.filter(value => value.id === id);
        id = Number.parseInt(e.target.id);
        const addForm = document.getElementsByClassName('add-todo-form')[0];
        const updateForm = document.getElementsByClassName('update-todo-form')[0];
        const inputs = document.querySelector('.edit-form').childNodes;

        inputs[0].value = tempTodo[0].title;
        inputs[1].value = tempTodo[0].date;
        inputs[2].value = tempTodo[0].priority;
        inputs[3].value = tempTodo[0].description;
        inputs[4].value = tempTodo[0].tags;

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
        localStorage.clear();
        localStorage.setItem('test', JSON.stringify([...result]));
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
                    <h2>{todoList?.length >= 1 ? `Количество активных дел: ${todoList.length}` : 'Нет активных дел'}</h2>
                    <button className={"btn-add"} type={"submit"}>
                        <span></span>
                    </button>
                </div>
                <div className={"form-flex add-form"}>
                    <input required type="text" name={"title"} placeholder={"Название дела"} style={{width: "200px", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px"}}/>
                    <input required type="date" name={"date"} placeholder={"Дата исполнения дела"}/>
                    <select name={"priority"}>
                        <option value="Высокий">Высокий</option>
                        <option value="Низкий">Низкий</option>
                    </select>
                    <input required type="text" name={"description"} placeholder={"Описание дела"} style={{width: "450px"}}/>
                    <input required type="text" name={"tag"} placeholder={"Тег"} style={{borderTopRightRadius: "5px", borderBottomRightRadius: "5px"}} />
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
                <div className={"form-flex edit-form"}>
                    <input required type="text" name={"title"} placeholder={"Название дела"} style={{width: "200px", borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px"}}/>
                    <input required type="date" name={"date"} placeholder={"Дата исполнения дела"}/>
                    <select name={"priority"}>
                        <option value="Высокий">Высокий</option>
                        <option value="Низкий">Низкий</option>
                    </select>
                    <input required type="text" name={"description"} placeholder={"Описание дела"} style={{width: "450px"}}/>
                    <input required type="text" name={"tag"} placeholder={"Тег"} style={{borderTopRightRadius: "5px", borderBottomRightRadius: "5px"}} />
                </div>
            </form>
            <ul className={"todo-item-list"}>
                {todoList?.map(value => {
                    return <li className={"todo-item"}><TodoCard value={value} id={value.id} key={value.id} updateHandler={updateHandler} deleteHandler={deleteHandler}/></li>
                })}
            </ul>
        </div>
    );
}