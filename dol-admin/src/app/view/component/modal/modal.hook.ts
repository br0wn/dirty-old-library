import { useCallback, useMemo, useState } from 'react';

export const useModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = useCallback(() => setIsOpen(true), [setIsOpen]);
	const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

	return useMemo(() => ({ isOpen, handleOpen, handleClose }), [isOpen, handleClose, handleOpen]);
};
