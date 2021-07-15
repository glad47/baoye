import React, {useRef} from 'react';
import HistoryAddress from "./HistoryAddress";
import EditAddress from "./EditAddress";
import '../../../styles/process-two-addr.css'

const ProcessTwoForAddr = () => {
    const editRef = useRef(null);
    const handleEdit = () => {
        // @ts-ignore
        editRef?.current.uiHandlerEditing();
    }
    return (
        <>
            <HistoryAddress handleEdit={handleEdit}/>
            <EditAddress cRef={editRef}/>
        </>
    )
}

export default ProcessTwoForAddr;