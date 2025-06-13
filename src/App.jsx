import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { routes } from '@/config/routes';
import Layout from '@/Layout';

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col overflow-hidden bg-[#FAFAFA]">
        <Routes>
          <Route path="/" element={<Layout />}>
            {Object.values(routes).map((route) => (
              <Route 
                key={route.id} 
                path={route.path} 
                element={<route.component />} 
              />
            ))}
          </Route>
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
          toastClassName="rounded-xl shadow-card"
          className="z-[9999]"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;