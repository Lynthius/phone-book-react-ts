import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { ClientsPage } from "./pages/ClientsPage";
import { ClientPage } from "./pages/ClientPage";
import { AddClientPage } from "./pages/AddClientPage";
import { EditClientPage } from "./pages/EditClientPage";
import { OrdersPage } from "./pages/OrdersPage";
import { OrderPage } from "./pages/OrderPage";
import { InvoicesPage } from "./pages/InvoicesPage";
import { PostsPage } from "./pages/PostsPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ROUTES } from "./routes";

import { ThemeContext } from "./context/ThemeContext";

import { QueryClient, QueryClientProvider, QueryCache } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className={`App ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === "development" && <ReactQueryDevtools position="bottom" initialIsOpen={false} />}
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.home} element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path={ROUTES.page404} element={<NotFoundPage />} />
              <Route path={ROUTES.clients} element={<ClientsPage />} />
              <Route path={ROUTES.clientAdd} element={<AddClientPage />} />
              <Route path={ROUTES.clientId(":id")} element={<ClientPage />} />
              <Route path={ROUTES.clientEdit(":id")} element={<EditClientPage />} />
              <Route path={ROUTES.orders} element={<OrdersPage />} />
              {/* <Route path={ROUTES.ordersAdd} element={<OrdersPage />} /> */}
              <Route path={ROUTES.orderId(":id")} element={<OrderPage />} />
              <Route path={ROUTES.invoices} element={<InvoicesPage />} />
              <Route path={ROUTES.posts} element={<PostsPage />} />
              <Route path={ROUTES.login} element={<LoginPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
