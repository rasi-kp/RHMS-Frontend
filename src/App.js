import './App.css';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './store';

import Routes from './routes';
function App() {
  return (
    <Provider store={store}>
      <div>
        <Routes />
      </div>
    </Provider>

  );
}

export default App;
