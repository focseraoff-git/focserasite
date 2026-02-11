import { useState, useEffect, useRef } from 'react';
import { X, Check, Loader2, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
// @ts-ignore
import L from 'leaflet';

// Fix for default marker icon in Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapPickerProps {
    initialLat?: number;
    initialLng?: number;
    onClose: () => void;
    onConfirm: (address: string) => void;
}

export default function MapPicker({ initialLat, initialLng, onClose, onConfirm }: MapPickerProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);

    // Default to Hyderabad if no location provided
    const defaultPosition = { lat: initialLat || 17.3850, lng: initialLng || 78.4867 };
    const [address, setAddress] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    // Initialize Map
    useEffect(() => {
        if (!mapContainerRef.current) return;

        // If map already exists, just return (or update view if needed, but here we just init once)
        if (mapInstanceRef.current) return;

        const map = L.map(mapContainerRef.current).setView([defaultPosition.lat, defaultPosition.lng], 13);
        mapInstanceRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add initial marker if we have an initial position
        // We start with a marker at default position
        const initialMarker = L.marker([defaultPosition.lat, defaultPosition.lng]).addTo(map);
        markerRef.current = initialMarker;

        // Try to get current location if no specific location was passed (i.e. if using defaults)
        if (!initialLat && !initialLng && navigator.geolocation) {
            setIsFetching(true);
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const newLatLng = new L.LatLng(latitude, longitude);

                    // Fly to user location
                    map.setView(newLatLng, 15);

                    // Update marker
                    if (markerRef.current) {
                        markerRef.current.setLatLng(newLatLng);
                    } else {
                        markerRef.current = L.marker(newLatLng).addTo(map);
                    }

                    // Fetch address for this location
                    fetchAddress(latitude, longitude);
                    setIsFetching(false);
                },
                (err) => {
                    console.error("Geolocation failed in MapPicker:", err);
                    setIsFetching(false);
                }
            );
        }

        // Map Click Event
        map.on('click', (e: any) => {
            const { lat, lng } = e.latlng;

            // Update marker position
            if (markerRef.current) {
                markerRef.current.setLatLng([lat, lng]);
            } else {
                markerRef.current = L.marker([lat, lng]).addTo(map);
            }

            // Fly to new location
            map.flyTo([lat, lng], map.getZoom());

            // Fetch Address
            fetchAddress(lat, lng);
        });

        // Cleanup on unmount
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    const fetchAddress = async (lat: number, lng: number) => {
        setIsFetching(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`);
            const data = await response.json();

            // Extract relevant address components
            const addr = data.address;
            const area = addr.suburb ||
                addr.neighbourhood ||
                addr.residential ||
                addr.village ||
                addr.town ||
                addr.city_district ||
                addr.road; // Added road as fallback for area

            const city = addr.city || addr.state_district || addr.state;

            // Construct readable address
            let formattedAddress = area || '';

            if (city && city !== area) {
                formattedAddress = formattedAddress ? `${formattedAddress}, ${city}` : city;
            }

            // Fallback to display_name if construction fails
            if (!formattedAddress) {
                formattedAddress = data.display_name.split(',').slice(0, 2).join(',');
            }

            setAddress(formattedAddress || 'Selected Location');
        } catch (error) {
            console.error("Error fetching address:", error);
            setAddress("Unknown Location");
        } finally {
            setIsFetching(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#1a1a1a] w-full max-w-2xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col h-[70vh]">

                {/* Header */}
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/50">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                        <MapPin className="text-orange-500" size={20} />
                        Select Location
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>

                {/* Map Area */}
                <div className="flex-1 relative z-0">
                    <div
                        ref={mapContainerRef}
                        style={{ height: '100%', width: '100%' }}
                        className="z-0"
                    />

                    {/* Location Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-md p-4 rounded-xl border border-white/10 z-[1000] shadow-lg">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Selected Area</p>
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 overflow-hidden">
                                {isFetching ? (
                                    <span className="text-white flex items-center gap-2 text-sm">
                                        <Loader2 size={16} className="animate-spin text-orange-500" />
                                        Fetching area details...
                                    </span>
                                ) : (
                                    <span className="text-white font-medium text-lg truncate block">
                                        {address || "Tap on map to select area"}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => onConfirm(address)}
                                disabled={!address || isFetching}
                                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-black font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm shrink-0"
                            >
                                <Check size={16} />
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
