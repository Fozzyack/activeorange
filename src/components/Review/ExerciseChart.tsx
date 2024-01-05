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
    Legend,
    Title
);
import React from "react";
import { getLiftData } from "@/functions/functions";
import { exerciseData, exercises } from "@/types/types";

const ExerciseChart = ({ id, selectedExercises }: { id: number, selectedExercises: exercises | null }) => {
    const [data, setData] = React.useState<exerciseData[]>([])

    async function getData() {
        setData(await getLiftData(id))
    }

    if (selectedExercises) {
        React.useLayoutEffect(() => {
            getData()
        }, [selectedExercises])
    } else {
        React.useLayoutEffect(() => {
            getData()
        }, [])
    }

    if (data.length === 0) {
        return (
            <div className="w-full flex text-center justify-center text-white">
                <h1>No Data to display for this exercise</h1>
            </div>
        )
    }

    return (
        <div className="w-full">
            <p className="text-center text-[0.7rem] text-slate-500">Note: Click the labels to Hide or Show Values</p>
            {/* <div>
                <h4 className="text-center text-white font-bold text-lg py-3">Weight Graph</h4>
                <Line
                    className="p-1 rounded-xl bg-[#1B1F38]"
                    options={{
                        animations: {
                            tension: {

                            }
                        }
                    }}  
                    data={{
                        labels: data.map(entree => new Date(Date.parse(entree.date_recorded)).toLocaleDateString()),
                        datasets: [
                            {
                                label: 'Weight',
                                data: data.map(entree => entree.weight),
                                backgroundColor: "#F87D12",
                                borderColor: '#F87D12',
                            },
                        ],
                    }}
                />
            </div> */}
            <div>
                <h4 className="text-center text-white font-bold text-lg py-3 ">Performance Graph</h4>
                <Line
                    className=" p-1 rounded-xl bg-[#1B1F38]"
                    data={{

                        labels: data.map(entree => new Date(Date.parse(entree.date_recorded)).toLocaleDateString()),
                        datasets: [
                            {
                                label: "Sets",
                                data: data.map(entree => entree.sets.toString()),
                                backgroundColor: "#E5D352",
                                borderColor: '#E5D352',
                                hidden: true
                            },
                            {
                                label: "Reps",
                                data: data.map(entree => entree.reps.toString()),
                                backgroundColor: "#AC3931",
                                borderColor: '#AC3931',
                                hidden: true
                            },
                            {
                                label: "RPE",
                                data: data.map(entree => entree.rpe.toString()),
                                backgroundColor: "#F87D12",
                                borderColor: '#F87D12',
                                hidden: true
                            },
                            {
                                label: 'Weight',
                                data: data.map(entree => entree.weight),
                                backgroundColor: "#690500",
                                borderColor: '#690500',
                                hidden: false
                            },
                        ],
                    }}
                />
            </div>

        </div>
    );
}


export default ExerciseChart