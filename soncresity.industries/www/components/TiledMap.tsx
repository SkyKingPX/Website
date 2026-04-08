"use client"

import {useState, useRef, useEffect} from 'react';
import {MinusIcon, PlusIcon} from "lucide-react";

interface TiledMapProps {
    tileSize: number;
    tiles: string[][];
}

export function TiledMap({tileSize, tiles}: TiledMapProps) {
    const [transform, setTransform] = useState({x: 0, y: 0, scale: 1});
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const lastPosition = useRef({x: 0, y: 0});
    // Pinch zoom state
    const pinchZooming = useRef(false);
    const lastPinchDistance = useRef(0);
    const lastPinchScale = useRef(1);
    const ZOOM_STEP = 0.1;
    const MIN_ZOOM = 0.5;
    const MAX_ZOOM = 1.5;

    const [tileDimensions, setTileDimensions] = useState<{width: number, height: number}>({
        width: tileSize,
        height: tileSize
    });

    // Loading state for all tiles
    const totalTiles = tiles.reduce((acc, row) => acc + row.length, 0);
    const [tilesLoaded, setTilesLoaded] = useState(0);
    const [allLoaded, setAllLoaded] = useState(false);
    const loadedTilesRef = useRef(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const unmountedRef = useRef(false);

    useEffect(() => {
        loadedTilesRef.current = 0;
        setTilesLoaded(0);
        setAllLoaded(false);
        unmountedRef.current = false;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        // Fallback: hide loader after 10s
        timeoutRef.current = setTimeout(() => {
            if (!unmountedRef.current) setAllLoaded(true);
        }, 10000);
        return () => {
            unmountedRef.current = true;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [tiles]);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            const maxDimension = 256;
            let newWidth, newHeight;

            if (img.naturalWidth > img.naturalHeight) {
                newWidth = maxDimension;
                newHeight = (maxDimension * img.naturalHeight) / img.naturalWidth;
            } else {
                newHeight = maxDimension;
                newWidth = (maxDimension * img.naturalWidth) / img.naturalHeight;
            }

            setTileDimensions({
                width: newWidth,
                height: newHeight
            });
        };
        img.src = `/map/${tiles[0][0]}`;
    }, [tiles]);


    // Mouse drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        lastPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        const deltaX = e.clientX - lastPosition.current.x;
        const deltaY = e.clientY - lastPosition.current.y;
        setTransform(prev => ({
            ...prev,
            x: prev.x + deltaX,
            y: prev.y + deltaY
        }));
        lastPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };


    // Touch drag and pinch-zoom handlers for mobile
    const getDistance = (touches: React.TouchList) => {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };
    const getMidpoint = (touches: React.TouchList) => {
        return {
            x: (touches[0].clientX + touches[1].clientX) / 2,
            y: (touches[0].clientY + touches[1].clientY) / 2
        };
    };

    const pinchMidpoint = useRef({x: 0, y: 0});
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            isDragging.current = true;
            lastPosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else if (e.touches.length === 2) {
            pinchZooming.current = true;
            lastPinchDistance.current = getDistance(e.touches);
            lastPinchScale.current = transform.scale;
            // Store midpoint for focal point
            pinchMidpoint.current = getMidpoint(e.touches);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (pinchZooming.current && e.touches.length === 2) {
            const newDistance = getDistance(e.touches);
            const scaleChange = newDistance / lastPinchDistance.current;
            let newScale = lastPinchScale.current * scaleChange;
            newScale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, newScale));
            const rect = containerRef.current?.getBoundingClientRect();
            const midpoint = getMidpoint(e.touches);
            if (rect) {
              // Calculate map's top-left offset in the container (centered)
              const mapDisplayWidth = totalWidth * transform.scale;
              const mapDisplayHeight = totalHeight * transform.scale;
              const mapLeft = (rect.width - mapDisplayWidth) / 2 + transform.x;
              const mapTop = (rect.height - mapDisplayHeight) / 2 + transform.y;
              // Focal point relative to map's top-left
              const focalX = (midpoint.x - rect.left - mapLeft) / transform.scale;
              const focalY = (midpoint.y - rect.top - mapTop) / transform.scale;
              setTransform(prev => {
                const scaleRatio = newScale / prev.scale;
                const newX = prev.x - (focalX * (scaleRatio - 1)) * prev.scale;
                const newY = prev.y - (focalY * (scaleRatio - 1)) * prev.scale;
                return {
                  ...prev,
                  scale: newScale,
                  x: newX,
                  y: newY
                };
              });
            } else {
              setTransform(prev => ({ ...prev, scale: newScale }));
            }
            e.preventDefault();
        } else if (isDragging.current && e.touches.length === 1) {
            // Drag
            const touch = e.touches[0];
            const deltaX = touch.clientX - lastPosition.current.x;
            const deltaY = touch.clientY - lastPosition.current.y;
            setTransform(prev => ({
                ...prev,
                x: prev.x + deltaX,
                y: prev.y + deltaY
            }));
            lastPosition.current = { x: touch.clientX, y: touch.clientY };
        }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (e.touches.length === 0) {
            isDragging.current = false;
            pinchZooming.current = false;
        } else if (e.touches.length === 1) {
            pinchZooming.current = false;
            // Continue dragging if finger remains
            lastPosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
    };

    // Wheel zoom handler for PC (zoom towards mouse pointer)
    const handleWheel = (e: React.WheelEvent) => {
        if (e.ctrlKey) return; // Let browser handle pinch-zoom
        e.preventDefault();
        const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
        setTransform(prev => {
            const newScale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev.scale + delta));
            if (newScale === prev.scale) return prev;
            // Get mouse position relative to map container
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return { ...prev, scale: newScale };
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            // Calculate the new x/y so the zoom focal point stays under the mouse
            const scaleRatio = newScale / prev.scale;
            const newX = (prev.x - mouseX) * scaleRatio + mouseX;
            const newY = (prev.y - mouseY) * scaleRatio + mouseY;
            return {
                ...prev,
                scale: newScale,
                x: newX,
                y: newY
            };
        });
    };

    const handleZoom = (delta: number) => {
        setTransform(prev => ({
            ...prev,
            scale: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev.scale + delta))
        }));
    };

    const totalWidth = tileDimensions.width * tiles[0].length;
    const totalHeight = tileDimensions.height * tiles.length;

    return (
        <div className="relative p-8">
            <div className="absolute right-12 top-12 z-10 flex flex-col gap-2">
                <button
                    onClick={() => handleZoom(ZOOM_STEP)}
                    className="bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center border border-gray-200"
                >
                    <PlusIcon className="h-4 w-4 invert-on-dark"/>
                </button>
                <button
                    onClick={() => handleZoom(-ZOOM_STEP)}
                    className="bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center border border-gray-200"
                >
                    <MinusIcon className="h-4 w-4 invert-on-dark"/>
                </button>
            </div>
            <div
                ref={containerRef}
                className="relative w-full h-[80vh] overflow-hidden border border-gray-300 rounded-lg"
                style={{ minHeight: '600px', cursor: isDragging.current ? 'grabbing' : 'grab', touchAction: 'none' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onWheel={handleWheel}
            >
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <div
                        style={{
                            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                            position: 'relative',
                            width: `${totalWidth}px`,
                            height: `${totalHeight}px`,
                            transformOrigin: '0 0', // top-left
                            willChange: 'transform'
                        }}
                    >
                        {tiles.map((row, rowIndex) =>
                            row.map((tile, colIndex) => {
                                const imgRef = useRef<HTMLImageElement>(null);
                                useEffect(() => {
                                    const img = imgRef.current;
                                    if (img && img.complete) {
                                        // Already loaded from cache
                                        loadedTilesRef.current += 1;
                                        setTilesLoaded(loadedTilesRef.current);
                                        if (loadedTilesRef.current === totalTiles && !unmountedRef.current) {
                                            setAllLoaded(true);
                                        }
                                    }
                                    // eslint-disable-next-line react-hooks/exhaustive-deps
                                }, []);
                                return (
                                    <img
                                        key={`${rowIndex}-${colIndex}`}
                                        ref={imgRef}
                                        src={`/map/${tile}`}
                                        alt={`Map tile ${rowIndex+1}-${colIndex+1}`}
                                        style={{
                                            position: 'absolute',
                                            top: `${rowIndex * tileDimensions.height}px`,
                                            left: `${colIndex * tileDimensions.width}px`,
                                            width: `${tileDimensions.width}px`,
                                            height: `${tileDimensions.height}px`,
                                            objectFit: 'fill',
                                            border: '1px solid rgba(0,0,0,0.1)',
                                            backgroundColor: 'rgba(200,200,200,0.2)',
                                            userSelect: 'none',
                                            pointerEvents: 'none'
                                        }}
                                        loading="lazy"
                                        onLoad={() => {
                                            loadedTilesRef.current += 1;
                                            setTilesLoaded(loadedTilesRef.current);
                                            if (loadedTilesRef.current === totalTiles && !unmountedRef.current) {
                                                setAllLoaded(true);
                                            }
                                        }}
                                        onError={() => {
                                            loadedTilesRef.current += 1;
                                            setTilesLoaded(loadedTilesRef.current);
                                            if (loadedTilesRef.current === totalTiles && !unmountedRef.current) {
                                                setAllLoaded(true);
                                            }
                                        }}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
                <div className="absolute left-4 bottom-4 bg-white/80 px-3 py-1 rounded-md shadow-sm border border-gray-200">
                    <span className="text-sm text-primary">Sodonia World Map</span>
                    <p className="text-xs text-muted-foreground">By Soncresity Industries</p>
                </div>
                {!allLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                            <span className="text-sm text-gray-700">Loading map... {tilesLoaded}/{totalTiles}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
