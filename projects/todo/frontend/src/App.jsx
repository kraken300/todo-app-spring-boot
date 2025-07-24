import React from 'react';
import Todos from './Components/Todos';
import { TodoContextProvider } from './Context/TodoContextProvider';

const App = () => {
  return (
    <TodoContextProvider>
      <Todos />
    </TodoContextProvider>
  )
}

export default App;
