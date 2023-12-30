'use client'
import React from 'react'

const FEATURES = [
    {
        name: 'Workout Ideas',
        description: 'Out of workout ideas? Browse through highly effective workouts.',
        image: <svg width="50px" height="50px" viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M9 14H15M4.6 10H19.4C19.9601 10 20.2401 10 20.454 9.89101C20.6422 9.79513 20.7951 9.64215 20.891 9.45399C21 9.24008 21 8.96005 21 8.4V5.6C21 5.03995 21 4.75992 20.891 4.54601C20.7951 4.35785 20.6422 4.20487 20.454 4.10899C20.2401 4 19.9601 4 19.4 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V8.4C3 8.96005 3 9.24008 3.10899 9.45399C3.20487 9.64215 3.35785 9.79513 3.54601 9.89101C3.75992 10 4.03995 10 4.6 10ZM5 10H19V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H8.2C7.07989 20 6.51984 20 6.09202 19.782C5.71569 19.5903 5.40973 19.2843 5.21799 18.908C5 18.4802 5 17.9201 5 16.8V10Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    },
    {
        name: 'Track Your Lifts',
        description: 'Track All your important lifts to see your improvement',
        image: <svg width="50px" height="50px" viewBox="0 0 24 24" fill="#FFFFFF">
            <path d="M8 5.00005C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5.00005M8 5.00005V7H16V5.00005M8 5.00005V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5.00005M12 11H9M15 15H9" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    },
    {
        name: 'Simple Calorie tracker',
        description: 'Totals your calories for the day so you dont have to',
        image: <svg fill="#FFFFFF" width="40px" height="40px" viewBox="0 -3.84 122.88 122.88" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">

            <g>

                <path d="M29.03,100.46l20.79-25.21l9.51,12.13L41,110.69C33.98,119.61,20.99,110.21,29.03,100.46L29.03,100.46z M53.31,43.05 c1.98-6.46,1.07-11.98-6.37-20.18L28.76,1c-2.58-3.03-8.66,1.42-6.12,5.09L37.18,24c2.75,3.34-2.36,7.76-5.2,4.32L16.94,9.8 c-2.8-3.21-8.59,1.03-5.66,4.7c4.24,5.1,10.8,13.43,15.04,18.53c2.94,2.99-1.53,7.42-4.43,3.69L6.96,18.32 c-2.19-2.38-5.77-0.9-6.72,1.88c-1.02,2.97,1.49,5.14,3.2,7.34L20.1,49.06c5.17,5.99,10.95,9.54,17.67,7.53 c1.03-0.31,2.29-0.94,3.64-1.77l44.76,57.78c2.41,3.11,7.06,3.44,10.08,0.93l0.69-0.57c3.4-2.83,3.95-8,1.04-11.34L50.58,47.16 C51.96,45.62,52.97,44.16,53.31,43.05L53.31,43.05z M65.98,55.65l7.37-8.94C63.87,23.21,99-8.11,116.03,6.29 C136.72,23.8,105.97,66,84.36,55.57l-8.73,11.09L65.98,55.65L65.98,55.65z" />

            </g>

        </svg>
    },

]
const KeyFeatures = () => {
    return (
        <div  className='flex flex-col md:grid md:grid-cols-5 w-full items-center mt-24 gap-4'>
            <div className='col-span-2'>
                <h1 className='text-transparent bg-clip-text bg-[#E84000] text-5xl font-bold text-center'>
                    What This Does
                </h1>
            </div>
            <div className='bg-gradient-to-t from-[#E84000] from-60% to-[#fc8000] rounded-xl p-8 md:flex-row flex-col gap-3 items-center justify-center col-span-3 shodow-xl flex'>
                <div>
                    {FEATURES[0].image}
                    <h3 className='text-lg font-bold'>
                        {FEATURES[0].name}
                    </h3>
                    <p>
                        {FEATURES[0].description}
                    </p>
                </div>
                <div className='bg-[#161A23] p-4 shadow-xl rounded-xl'>
                    {FEATURES[1].image}
                    <h3 className='text-lg font-bold'>
                        {FEATURES[1].name}
                    </h3>
                    <p>
                        {FEATURES[1].description}
                    </p>
                </div>
                <div>
                    {FEATURES[2].image}
                    <h3 className='text-lg font-bold'>
                        {FEATURES[2].name}
                    </h3>
                    <p>
                        {FEATURES[2].description}
                    </p>
                </div>
            </div>

        </div>
    )
}

export default KeyFeatures