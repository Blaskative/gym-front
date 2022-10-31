import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Layout from './pages/components/Layout';
import Missing from './pages/components/Missing';
import Unauthorized from './pages/components/Unauthorized';
import Admin from './pages/home/Admin';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import RequireAuth from './pages/RequireAuth';

const ROLES = {
  'User': 2001,
  'Admin': 5150
}

function App() {

  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes  */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes*/}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        {/* Non-existent pages */}
        <Route path="*" element={<Missing />} />
      </Route>
     
    </Routes>
    </AuthProvider>
  );
}

export default App;