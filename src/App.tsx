import { Refine, type AuthProvider, Authenticated } from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayoutV2,
  ErrorComponent,
  AuthPage,
  RefineThemes,
  Create,
  ThemedTitleV2,
} from "@refinedev/antd";
import {
  GoogleOutlined,
  GithubOutlined,
  DashboardOutlined,
  UserSwitchOutlined,
  BarsOutlined,
  BulbOutlined,
} from "@ant-design/icons";

import { dataProvider } from "./rest-data-provider";
import routerProvider, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { App as AntdApp, ConfigProvider } from "antd";

import "@refinedev/antd/dist/reset.css";

import { UserList, UserEdit, UserShow, UserCreate } from "./pages/users";
import { NamesList, NameEdit, NameShow } from "./pages/names";
import { DashboardPage } from "../src/pages/dashboard";
import { Buffer } from "buffer";
import { axiosInstance } from "./rest-data-provider/utils";
import { NameEntriesCreate } from "./pages/names/create";

const API_URL = "https://localhost:32770/api/v1";

/**
 *  mock auth credentials to simulate authentication
 */
const authCredentials = {
  email: "test@gmail.com",
  password: "string",
};

const App: React.FC = () => {
  const authProvider: AuthProvider = {
    login: async ({ providerName, email, password }) => {
      console.log(email);
      console.log(password);
      const encodedEmailandPassword = Buffer.from(
        `${email}:${password}`
      ).toString("base64");

      const authToken = `Basic ${encodedEmailandPassword}`;
      const response = await axiosInstance.post(
        `${API_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        }
      );
      if (response.status == 200) {
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("IsAuthenticated", "true");
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("token", authToken);
        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
        error: {
          message: "Login failed",
          name: "Invalid email or password",
        },
      };
    },
    // register: async (params) => {
    //   if (params.email === authCredentials.email && params.password) {
    //     localStorage.setItem("email", params.email);
    //     return {
    //       success: true,
    //       redirectTo: "/",
    //     };
    //   }
    // return {
    //   success: false,
    //   error: {
    //     message: "Register failed",
    //     name: "Invalid email or password",
    //   },
    // };
    // },
    updatePassword: async (params) => {
      if (params.password === authCredentials.password) {
        //we can update password here
        return {
          success: true,
        };
      }
      return {
        success: false,
        error: {
          message: "Update password failed",
          name: "Invalid password",
        },
      };
    },
    forgotPassword: async (params) => {
      if (params.email === authCredentials.email) {
        //we can send email with reset password link here
        return {
          success: true,
        };
      }
      return {
        success: false,
        error: {
          message: "Forgot password failed",
          name: "Invalid email",
        },
      };
    },
    logout: async () => {
      localStorage.removeItem("email");
      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return { error };
    },
    check: async () =>
      localStorage.getItem("email")
        ? {
            authenticated: true,
          }
        : {
            authenticated: false,
            error: {
              message: "Check failed",
              name: "Not authenticated",
            },
            logout: true,
            redirectTo: "/login",
          },
    getPermissions: async (params) => params?.permissions,
    getIdentity: async () => ({
      id: 1,
      name: localStorage.getItem("username"),
      avatar:
        "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
    }),
  };

  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Yellow}>
        <AntdApp>
          <Refine
            authProvider={authProvider}
            dataProvider={dataProvider(API_URL)}
            routerProvider={routerProvider}
            resources={[
              {
                name: "dashboard",
                list: "/",
                meta: {
                  label: "Dashboard",
                  icon: <BulbOutlined />,
                },
              },
              {
                name: "auth/users",
                list: "/users",
                show: "/users/show/:id",
                edit: "/users/edit/:id",
                create: "/users/new",
                meta: { label: "Users", icon: <UserSwitchOutlined /> },
              },
              {
                name: "names",
                list: "/names",
                show: "/names/show/:id",
                edit: "/names/edit/:id",
                create: "names/new",
                meta: {
                  label: "Names",
                },
              },
            ]}
            notificationProvider={useNotificationProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <ThemedLayoutV2
                      Title={({ collapsed }) => (
                        <ThemedTitleV2
                          // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
                          collapsed={collapsed}
                          //icon={collapsed ? <MySmallIcon /> : <MyLargeIcon />}
                          text="YorubaName Dashboard"
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route index element={<DashboardPage />} />

                <Route path="/users">
                  <Route index element={<UserList />} />
                  <Route path="edit/:id" element={<UserEdit />} />
                  <Route path="show/:id" element={<UserShow />} />
                  <Route path="new" element={<UserCreate />} />
                </Route>
                <Route path="/names">
                  <Route index element={<NamesList />} />
                  <Route path="edit/:id" element={<NameEdit />} />
                  <Route path="show/:id" element={<NameShow />} />
                  <Route path="new" element={<NameEntriesCreate />} />
                </Route>
              </Route>

              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="names" />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      formProps={{
                        initialValues: {
                          ...authCredentials,
                        },
                      }}
                    />
                  }
                />
                <Route
                  path="/register"
                  element={<AuthPage type="register" />}
                />
                <Route
                  path="/forgot-password"
                  element={<AuthPage type="forgotPassword" />}
                />
                <Route
                  path="/update-password"
                  element={<AuthPage type="updatePassword" />}
                />
              </Route>

              <Route
                element={
                  <Authenticated key="catch-all">
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
