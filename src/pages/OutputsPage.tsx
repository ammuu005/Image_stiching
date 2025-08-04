import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Trash2, Calendar, Image as ImageIcon, Filter, Grid, List } from 'lucide-react';

interface StitchedImage {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  createdAt: Date;
  size: string;
  dimensions: string;
  originalImages: number;
}

export default function OutputsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterBy, setFilterBy] = useState<'all' | 'recent' | 'large'>('all');

  // Mock data for stitched images
  const [stitchedImages] = useState<StitchedImage[]>([
    {
      id: '1',
      name: 'Mountain Panorama',
      url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop',
      thumbnail: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      createdAt: new Date('2024-01-15'),
      size: '2.4 MB',
      dimensions: '3840x1080',
      originalImages: 4
    },
    {
      id: '2',
      name: 'City Skyline',
      url: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop',
      thumbnail: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      createdAt: new Date('2024-01-14'),
      size: '3.1 MB',
      dimensions: '4200x1200',
      originalImages: 5
    },
    {
      id: '3',
      name: 'Beach Sunset',
      url: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop',
      thumbnail: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      createdAt: new Date('2024-01-13'),
      size: '1.8 MB',
      dimensions: '3600x900',
      originalImages: 3
    },
    {
      id: '4',
      name: 'Forest Trail',
      url: 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop',
      thumbnail: 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      createdAt: new Date('2024-01-12'),
      size: '2.7 MB',
      dimensions: '4000x1100',
      originalImages: 6
    }
  ]);

  const filteredImages = stitchedImages.filter(image => {
    if (filterBy === 'recent') {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      return image.createdAt > threeDaysAgo;
    }
    if (filterBy === 'large') {
      return parseFloat(image.size) > 2.0;
    }
    return true;
  });

  const handleDownload = (image: StitchedImage) => {
    // In a real app, this would trigger the actual download
    console.log('Downloading:', image.name);
  };

  const handleDelete = (id: string) => {
    // In a real app, this would delete the image
    console.log('Deleting image:', id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Creations</h1>
          <p className="text-gray-600 text-lg">Manage and download your stitched panoramic images</p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Images</option>
                  <option value="recent">Recent (3 days)</option>
                  <option value="large">Large Files (&gt;2MB)</option>
                </select>
              </div>
              <div className="text-sm text-gray-500">
                {filteredImages.length} image{filteredImages.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Images Grid/List */}
        {filteredImages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No images found</h3>
            <p className="text-gray-500">Try adjusting your filter or create some panoramas first!</p>
          </motion.div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={image.thumbnail}
                    alt={image.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-lg text-xs">
                    {image.originalImages} images
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{image.name}</h3>
                  <div className="space-y-1 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{image.createdAt.toLocaleDateString()}</span>
                    </div>
                    <div>{image.dimensions} • {image.size}</div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownload(image)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={image.thumbnail}
                        alt={image.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{image.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{image.createdAt.toLocaleDateString()}</span>
                        <span>{image.dimensions}</span>
                        <span>{image.size}</span>
                        <span>{image.originalImages} images</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDownload(image)}
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}