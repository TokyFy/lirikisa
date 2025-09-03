import {ReactNode, useRef, useState} from "react";

export function DraggableFrame({children}: { children: ReactNode }) {
    const [pos, setPos] = useState<{ x: number; y: number }>({x: 24, y: 24});
    const draggingRef = useRef(false);
    const offsetRef = useRef<{ x: number; y: number }>({x: 0, y: 0});

    const onDocumentPointerMove = (e: PointerEvent) => {
        if (!draggingRef.current) return;
        const nextX = e.clientX - offsetRef.current.x;
        const nextY = e.clientY - offsetRef.current.y;

        const maxX = window.innerWidth - 40;
        const maxY = window.innerHeight - 40;
        setPos({
            x: Math.max(0, Math.min(nextX, maxX)),
            y: Math.max(0, Math.min(nextY, maxY)),
        });
    };

    const onDocumentPointerUp = () => {
        draggingRef.current = false;
        document.body.style.userSelect = '';
        document.removeEventListener('pointermove', onDocumentPointerMove);
        document.removeEventListener('pointerup', onDocumentPointerUp);
    };

    const onPointerDown = (e: React.PointerEvent) => {
        if (e.button !== 0) return;
        draggingRef.current = true;
        document.body.style.userSelect = 'none';
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        offsetRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        document.addEventListener('pointermove', onDocumentPointerMove);
        document.addEventListener('pointerup', onDocumentPointerUp);
    };

    return (
        <div
            style={{
                position: 'absolute',
                left: pos.x,
                top: pos.y,
                width: 'fit-content',
                minWidth: 512
            }}
            aria-label="Draggable window"
        >
            <div
                onPointerDown={onPointerDown}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 12,
                    cursor: 'move',
                    zIndex: 10
                }}
                aria-label="Drag handle"
            />
            {children}
        </div>
    );
}
