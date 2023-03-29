import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TasksList from "./components/TasksList";

// TODO Move
export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <div className="app">
      <div className="task-container">
        <TasksList />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
