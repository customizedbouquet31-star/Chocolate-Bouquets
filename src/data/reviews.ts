export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  product: string;
  date: string;
}

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    rating: 5,
    text: 'Absolutely beautiful! The chocolate bouquet was exactly as pictured and the delivery was right on time for my sister\'s birthday.',
    product: 'Premium Ferrero Rocher Bouquet',
    date: '2023-10-15'
  },
  {
    id: '2',
    name: 'Rahul Verma',
    rating: 5,
    text: 'Great quality and presentation. The packaging is very premium.',
    product: 'Customized Photo Hamper',
    date: '2023-11-02'
  },
  {
    id: '3',
    name: 'Sneha Gupta',
    rating: 4,
    text: 'Loved the personalized touch. Will definitely order again for future occasions.',
    product: 'Classic Dairy Milk Arrangement',
    date: '2023-12-10'
  },
  {
    id: '4',
    name: 'Amit Patel',
    rating: 5,
    text: 'The best gifting option out there. The support team is also very responsive on WhatsApp.',
    product: 'Festive Special Box',
    date: '2024-01-22'
  }
];
