import { FaChevronRight } from "react-icons/fa";
import { Navbar } from "../components/layouts/Navbar";
import { Hero } from "../components/layouts/home/Hero";
import { OrderCard } from "../components/fragments/OrderCard";

const HomePage = () => {
    return(
        <>
        <Navbar/>
        <div className="pt-nav pb-10 px-[5%]">
            <Hero/>
            <div className="mt-8 py-5 px-[5%] bg-white shadow-soft rounded-lg">
                <div>
                    <h1 className="text-xl text-violet-500 font-bold">Orders</h1>
                    <p className="text-sm text-neutral-500">Track, edit, and review cemilin orders</p>
                </div>
                <div className="flex flex-col gap-3 my-6">
                    <OrderCard
                        name={"Udin Petot"}
                        status={"completed"}
                        item={"Cireng"}
                        pieces={"4"}
                        price={"10.000"}
                    />
                    <OrderCard
                        name={"Udin Petot"}
                        status={"pending"}
                        item={"Cireng"}
                        pieces={"4"}
                        price={"10.000"}
                    />
                    <OrderCard
                        name={"Udin Petot"}
                        status={"canceled"}
                        item={"Cireng"}
                        pieces={"4"}
                        price={"10.000"}
                    />
                </div>
                <div className="flex justify-between items-start">
                    <div className="text-sm">
                        <h1 className="text-violet-400">Total Orders </h1>
                        <p className="text-xl font-semibold">Rp. 20.000</p>
                    </div>
                    <div className="flex text-sm gap-2 items-center text-violet-400">
                        <a href="">see all orders</a>
                        <FaChevronRight className="pt-1"/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default HomePage;