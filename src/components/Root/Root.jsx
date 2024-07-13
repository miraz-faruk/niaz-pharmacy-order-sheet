import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Root = () => {
    return (
        <div className="container mx-auto min-w-screen">
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;