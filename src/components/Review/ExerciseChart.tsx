"use client"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
    Legend,
    Title,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);
import React from "react";

interface data {
    weight: string,
    sets: number,
    reps: number,
    rpe: number,
    log: string,
    date_recorded: string
}
const ExerciseChart = ({ id}: { id: number }) => {

    const [data, setData] = React.useState<data[]>([])
    const getData = async () => {
        const res = await fetch(`/api/weights/exercises/chart/${id}`, {
            method: 'GET'
        })
        if (!res.ok) {
            throw new Error('There was an Error fetching exercise Data')
        }

        const data = await res.json()
        setData(data)
    }

    React.useEffect(() => {
        getData()
    }, [])

    return (
        <div className="md:grid md:grid-cols-2 gap-3 w-full w-max-screen">
            <div>
                <h4 className="text-center text-white font-bold text-lg py-3">Weight Graph</h4>
                <Line
                    className="p-1 rounded-xl bg-slate-800"
                    
                    data={{
                        labels: data.map(entree => new Date(Date.parse(entree.date_recorded)).toLocaleDateString()),
                        datasets: [
                            {
                                label: 'Weight',
                                data: data.map(entree => entree.weight),
                                backgroundColor: "purple",
                                borderColor: 'purple',
                            },
                        ],
                    }}
                />
            </div>
            <div>
                <h4 className="text-center text-white font-bold text-lg py-3 ">Sets Reps And RPE Graph</h4>
                <Line
                    className=" p-1 rounded-xl bg-slate-800"
                    data={{

                        labels: data.map(entree => new Date(Date.parse(entree.date_recorded)).toLocaleDateString()),
                        datasets: [
                            {
                                label: "Sets",
                                data: data.map(entree => entree.sets.toString()),
                                backgroundColor: "green",
                                borderColor: 'green'
                            },
                            {
                                label: "Reps",
                                data: data.map(entree => entree.reps.toString()),
                                backgroundColor: "blue",
                                borderColor: 'blue'
                            },
                            {
                                label: "RPE",
                                data: data.map(entree => entree.rpe.toString()),
                                backgroundColor: "red",
                                borderColor: 'red'
                            },
                        ],
                    }}
                />
            </div>

        </div>
    );
}


export default ExerciseChart