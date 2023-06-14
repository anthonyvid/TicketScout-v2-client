import { useState } from 'react';

const useDialog = () => {
    const [isOpen, setisOpen] = useState(false);

    function toggle() {
        setisOpen(!isOpen);
    }

    return {
        isOpen,
        toggle
    };
};

export default useDialog;
