import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";

const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const hoursString = hours.toString().padStart(2, "0");
    const minutesString = minutes.toString().padStart(2, "0");
    const secondsString = seconds.toString().padStart(2, "0");

    return `${hoursString}: ${minutesString}: ${secondsString}`;
};
const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const resetHandler = () => {
        setTime(0);
        setIsRunning(false);
    };

    useEffect(() => {
        let intervalId: number;

        if (isRunning) {
            intervalId = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning]);

    return (
        <div className="adminContainer">
            <AdminSidebar />
            <main className="dashboardAppContainer">
                <h1>Stopwatch</h1>
                <section>
                    <div className="stopwatch">
                        <h2>{formatTime(time)}</h2>
                        <button onClick={() => setIsRunning(!isRunning)}>
                            {isRunning ? "Stop" : "Start"}
                        </button>
                        <button onClick={resetHandler}>Reset</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Stopwatch;
