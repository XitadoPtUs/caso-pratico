import { ProjetosProvider } from './context/Projetos';
import './App.css'
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <>
    <ProjetosProvider>
      <Dashboard />
    </ProjetosProvider>
    </>
  );
}

export default App
