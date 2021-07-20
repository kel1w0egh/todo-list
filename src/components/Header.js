import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import '../App.css';
import Index from "./Index";

export default function Header(props) {
    return (
        <Router>
            <header>
                <nav>
                    <ul className={"header-nav-list"}>
                        <li>
                            <Link to={"/"}>Главная</Link>
                        </li>
                        <li>
                            <Link to={"/todo-lists"}>Списки дел</Link>
                        </li>
                        <li>
                            <Link to={"/todo-projects"}>Проекты дел</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <Switch>
                <Route exact path={"/"}>
                    <Index />
                </Route>
                <Route path={"/todo-lists"}>
                    <h1>Списки дел</h1>
                </Route>
                <Route path={"/todo-projects"}>
                    <h1>Проекты дел</h1>
                </Route>
            </Switch>
        </Router>
    );
}