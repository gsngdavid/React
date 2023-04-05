import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useFetch from './hooks/use-fetch';

function App() {
  const [tasks, setTasks] = useState([]);

  const {isLoading, error, sendRequest} = useFetch();

  useEffect(() => {
    const requestObj = {
      url: 'https://react-http-b74b6-default-rtdb.firebaseio.com/tasks.json',
      method: 'GET'
    }
    const processData = (data) => {
      const loadedTasks = [];
  
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
        setTasks(loadedTasks);
      }
    }
    sendRequest(requestObj, processData);
  }, [sendRequest]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
