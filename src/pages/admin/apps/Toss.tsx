import { useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";

const Toss = () => {
    const [angle, setAngle] = useState<number>(0);

    const flipCoin = () => {
        if (Math.random() < 0.5) {
            setAngle((prev) => prev + 540);
        } else {
            setAngle((prev) => prev + 720);
        }
    };

    return (
        <div className="adminContainer">
            <AdminSidebar />
            <main className="dashboardAppContainer">
                <h1>Toss</h1>
                <section>
                    <article
                        className="tossContainer"
                        onClick={flipCoin}
                        style={{ transform: `rotateY(${angle}deg)` }}
                    >
                        <div></div>
                        <div></div>
                    </article>
                </section>
            </main>
        </div>
    );
};

export default Toss;
