import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, ExternalLink, X, ChevronLeft, ChevronRight, Calendar, ArrowLeft } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Gallery() {
  const { eventSlug } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [imageLoading, setImageLoading] = useState({});

  useEffect(() => {
    fetchGalleryData();
  }, [eventSlug]);

  const fetchGalleryData = async () => {
    setLoading(true);
    try {
      // Fetch event details
      const { data: eventData, error: eventError } = await supabase
        .from('gallery_events')
        .select('*')
        .eq('slug', eventSlug)
        .maybeSingle();

      if (eventError) throw eventError;
      if (!eventData) {
        console.error('Event not found');
        setLoading(false);
        return;
      }

      setEvent(eventData);

      // Fetch photos for this event
      const { data: photosData, error: photosError } = await supabase
        .from('gallery_photos')
        .select('*')
        .eq('event_id', eventData.id)
        .order('display_order', { ascending: true });

      if (photosError) throw photosError;
      setPhotos(photosData || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (photo, index) => {
    setSelectedPhoto({ ...photo, index });
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction) => {
    if (!selectedPhoto) return;
    const newIndex = selectedPhoto.index + direction;
    if (newIndex >= 0 && newIndex < photos.length) {
      setSelectedPhoto({ ...photos[newIndex], index: newIndex });
    }
  };

  const handleImageLoad = (photoId) => {
    setImageLoading(prev => ({ ...prev, [photoId]: false }));
  };

  const handleImageLoadStart = (photoId) => {
    setImageLoading(prev => ({ ...prev, [photoId]: true }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#0052CC] mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Camera className="w-24 h-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Gallery Not Found</h2>
          <p className="text-gray-600 mb-6">The gallery you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/journey')}
            className="px-6 py-3 bg-[#0052CC] text-white rounded-full font-semibold hover:bg-[#0047b3] transition-colors"
          >
            Back to Journey
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0052CC] to-[#0066FF]">
          <div className="absolute inset-0 bg-black/40"></div>
          {event.cover_image_url && (
            <img
              src={event.cover_image_url}
              alt={event.title}
              className="w-full h-full object-cover mix-blend-overlay opacity-50"
            />
          )}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <button
            onClick={() => navigate('/journey')}
            className="absolute top-8 left-8 flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Journey</span>
          </button>

          <Camera className="w-16 h-16 mb-6 animate-pulse" />
          <h1 className="text-5xl md:text-7xl font-black mb-4 text-center tracking-tight">
            {event.title}
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl mb-6 text-white/90">
            {event.description}
          </p>
          <div className="flex items-center gap-2 text-white/80">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">
              {new Date(event.event_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {photos.length === 0 ? (
          <div className="text-center py-20">
            <Camera className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Photos Yet</h3>
            <p className="text-gray-600">Photos for this event will be added soon!</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Best Moments Captured</h2>
              <div className="w-24 h-1.5 bg-[#0052CC] mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(photo, index)}
                  className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                >
                  {imageLoading[photo.id] !== false && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                      <Camera className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <img
                    src={photo.image_url}
                    alt={photo.caption || `Photo ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onLoadStart={() => handleImageLoadStart(photo.id)}
                    onLoad={() => handleImageLoad(photo.id)}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      {photo.caption && (
                        <p className="text-white text-sm font-medium">{photo.caption}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Google Drive CTA */}
        {event.google_drive_url && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0052CC] to-[#0066FF] p-12 text-white text-center shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
            <div className="relative z-10">
              <div className="inline-block p-4 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                <Camera className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-black mb-4">Want to See More?</h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Explore our complete collection of {photos.length > 0 ? photos.length + '+' : ''} photos and high-resolution images on Google Drive
              </p>
              <a
                href={event.google_drive_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0052CC] rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <span>Open Full Gallery</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {selectedPhoto.index > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto(-1);
              }}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>
          )}

          {selectedPhoto.index < photos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto(1);
              }}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <ChevronRight className="w-12 h-12" />
            </button>
          )}

          <div
            className="max-w-7xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.image_url}
              alt={selectedPhoto.caption || 'Photo'}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            {selectedPhoto.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-4 rounded-b-lg">
                <p className="text-white text-center font-medium">{selectedPhoto.caption}</p>
              </div>
            )}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
              <p className="text-white text-sm font-medium">
                {selectedPhoto.index + 1} / {photos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
