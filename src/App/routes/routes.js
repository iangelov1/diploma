
import { lazy } from "react";
const LandingPage = lazy(() => import("../Components/Pages/LandingPage/LandingPage"))
const Books = lazy(() => import("../Components/Pages/Books/Books"))
const LogIn = lazy(() => import("../Components/Pages/LogIn/LogIn"))
const ForgottenPassword = lazy(() => import("../Components/Pages/LogIn/ForgottenPassword"))
const SignUp = lazy(() => import("../Components/Pages/SignUp/SignUp"))
const Admin = lazy(() => import("../Components/Pages/Admin/Admin"))
const AddBook = lazy(() => import("../Components/Pages/Admin/AddBook"))
const Profile = lazy(() => import("../Components/Pages/Profile/Profile"))
const ChangePassword = lazy(() => import("../Components/Pages/Profile/PasswordChange"))
const Category = lazy(() => import("../Components/Pages/Books/Category/Category"))
const BookItem = lazy(() => import("../Components/Pages/Books/BookItem/BookItem"))
const Users = lazy(() => import("../Components/Pages/Admin/UserList"))
const UserItem = lazy(() => import("../Components/Pages/Admin/UserItem"))
const EditBookItem = lazy(() => import("../Components/Pages/Books/BookItem/EditBookItem"))

export default [
    { path: "/", name: "Home", component: LandingPage },
    { path: "/books", name: "Books", component: Books },
    { path: "/login", name: "LogIn", component: LogIn },
    { path: "/signup", name: "SignUp", component: SignUp },
    { path: "/admin", name: "Admin", component: Admin },
    { path: "/profile", name: "Profile", component: Profile },
    { path: "/addBook", name: "AddBook", component: AddBook },
    { path: '/books/:id', name: 'BookItem', component: BookItem },
    { path: '/category/:id', name: 'Category', component: Category },
    { path: '/category', name: 'Category', component: Books },
    { path: '/users', name: 'Users', component: Users },
    { path: '/users/:id', name: 'UserItem', component: UserItem },
    { path: '/editbook/:id', name: 'BookItem', component: EditBookItem },
    { path: '/changePassword', name: 'ChangePassword', component: ChangePassword },
    { path: '/forgottenPassword', name: 'ForgottenPassword', component: ForgottenPassword },
];