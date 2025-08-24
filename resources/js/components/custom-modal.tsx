import React, { useEffect } from 'react';

export type CustomModalSize = 'sm' | 'lg' | 'xl';

export interface CustomModalProps {
    show: boolean;
    onHide: () => void;
    title: string;
    children: React.ReactNode;
    size?: CustomModalSize;
    className?: string;
    backdrop?: boolean | 'static';
    scrollable?: boolean;
    centered?: boolean;
    footer?: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
    show,
    onHide,
    title,
    children,
    size,
    className = '',
    backdrop = true,
    scrollable = false,
    centered = false,
    footer
}) => {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEscapeKey);
        } else {
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [show]);

    const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && backdrop !== 'static') {
            onHide();
        }
    };

    const handleBackdropClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget && backdrop !== 'static') {
            onHide();
        }
    };

    if (!show) return null;

    const modalClass = [
        'modal fade show',
        className,
    ].filter(Boolean).join(' ');

    const dialogClass = [
        'modal-dialog',
        size ? `modal-${size}` : '',
        scrollable ? 'modal-dialog-scrollable' : '',
        centered ? 'modal-dialog-centered' : '',
    ].filter(Boolean).join(' ');

    return (
        <div
            className={modalClass}
            style={{
                display: 'block',
                backgroundColor: backdrop ? 'rgba(0,0,0,0.5)' : 'transparent',
                backdropFilter: backdrop ? 'blur(2px)' : 'none'
            }}
            onClick={handleBackdropClick}
            tabIndex={-1}
            role="dialog"
        >
            <div className={dialogClass} role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        {backdrop !== 'static' && (
                            <button
                                type="button"
                                className="close"
                                onClick={onHide}
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        )}
                    </div>

                    <div className="modal-body">
                        {children}
                    </div>

                    {footer && (
                        <div className="modal-footer">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
