import React, {useState} from "react";
import SeatPicker from "react-seat-picker";


export default function PlacePicker(props){
    const [loading, setLoading] = useState(false);

    const processSeatAction = async (action, callback, row, number, id, delay) => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, delay));
        console.log(`${action} seat ${number}, row ${row}, id ${id}`);
        callback(row, number, id, `tooltip for id-${id} added by callback`);
        setLoading(false);
    };
    const addSeatCallbackContinousCase = async (
        {row, number, id},
        addCb,
        params,
        removeCb
    ) => {
        props.setPlace(true)
        setLoading(true)
        if (removeCb) {
            await new Promise(resolve => setTimeout(resolve, 750));
            console.log(
                `Removed seat ${params.number}, row ${params.row}, id ${params.id}`
            );
            removeCb(params.row, params.number);
        }
        await new Promise(resolve => setTimeout(resolve, 750));
        console.log(`Added seat ${number}, row ${row}, id ${id}`);
        const newTooltip = `tooltip for id-${id} added by callback`;
        addCb(row, number, id, newTooltip);
        setLoading(false)

    };

    const addSeatCallback = ({ row, number, id }, addCb) => {
        processSeatAction("Added", addCb, row, number, id, 1500);
    };

    const removeSeatCallback = ({ row, number, id }, removeCb) => {
        processSeatAction("Removed", removeCb, row, number, id, 1500);
    };

    const rows = [
        [
            { id: 1, number: 1, tooltip: "Free" },
            { id: 2, number: 2, tooltip: "Free" },
            null,
            {
                id: 3,
                number: "3",
                isReserved: true,
                orientation: "east",
                tooltip: "Reserved by Rogger"
            },
            { id: 4, number: "4", orientation: "west" },
            null,
            { id: 5, number: 5 },
            { id: 6, number: 6 }
        ],
        [
            {
                id: 7,
                number: 1,
                isReserved: true,
                tooltip: "Reserved by Matthias Nadler"
            },
            { id: 8, number: 2, isReserved: true },
            null,
            { id: 9, number: "3", isReserved: true, orientation: "east" },
            { id: 10, number: "4", orientation: "west" },
            null,
            { id: 11, number: 5 },
            { id: 12, number: 6 }
        ],
        [
            { id: 13, number: 1 },
            { id: 14, number: 2 },
            null,
            { id: 15, number: 3, isReserved: true, orientation: "east" },
            { id: 16, number: "4", orientation: "west" },
            null,
            { id: 17, number: 5 },
            { id: 18, number: 6 }
        ],
        [
            { id: 19, number: 1, tooltip: "Free" },
            { id: 20, number: 2 },
            null,
            { id: 21, number: 3, orientation: "east" },
            { id: 22, number: "4", orientation: "west" },
            null,
            { id: 23, number: 5 },
            { id: 24, number: 6 }
        ],
        [
            { id: 25, number: 1, isReserved: true },
            { id: 26, number: 2, orientation: "east" },
            null,
            { id: 27, number: "3", isReserved: true },
            { id: 28, number: "4", orientation: "west" },
            null,
            { id: 29, number: 5, tooltip: "Free" },
            { id: 30, number: 6, isReserved: true }
        ]
    ];
    return (
        <div>
            <div>
                <SeatPicker
                    addSeatCallback={addSeatCallbackContinousCase}
                    removeSeatCallback={removeSeatCallback}
                    rows={rows}
                    maxReservableSeats={3}
                    alpha
                    visible
                    selectedByDefault
                    loading={loading}
                    tooltipProps={{ multiline: true }}
                    continuous
                />
            </div>
        </div>
    );
}
