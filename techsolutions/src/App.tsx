import { ProjetosProvider } from './context/Projetos';
import './index.css';
import './styles/dashboard.css';
import './styles/project.css';
import './styles/task.css';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <ProjetosProvider>
      <Dashboard />
    </ProjetosProvider>
  );
}

export default App
