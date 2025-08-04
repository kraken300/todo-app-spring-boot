import React from 'react';
import Todos from './Components/Todos';
import { TodoContextProvider } from './Context/TodoContextProvider';
import { Bounce, ToastContainer } from 'react-toastify';

<ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick={false}
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  transition={Bounce}
/>

const App = () => {
  return (
    <>
      <ToastContainer />
      <TodoContextProvider>
        <Todos />
      </TodoContextProvider>
    </>
  )
}

export default App;
