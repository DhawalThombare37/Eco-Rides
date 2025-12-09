import { useState } from 'react';
import { HelpCircle, MessageSquare, Phone, Mail, FileText, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Help() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', { ...feedback, rating });
    alert('Thank you for your feedback!');
    setFeedback({ name: '', email: '', message: '' });
    setRating(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedback(prev => ({ ...prev, [name]: value }));
  };

  const faqs = [
    {
      question: "How do I earn Green Points?",
      answer: "You can earn Green Points by sharing rides, using eco-friendly transportation, and participating in community events. Each action has different point values."
    },
    {
      question: "How do I join a Safe Community?",
      answer: "You can join a Safe Community by verifying your identity and completing the community guidelines. Once approved, you'll have access to verified members and exclusive features."
    },
    {
      question: "What are Smart Routes?",
      answer: "Smart Routes are optimized paths that help reduce carbon emissions by suggesting the most efficient routes and encouraging carpooling."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Help & Support</h1>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
          <MessageSquare className="h-6 w-6" />
          <span>Live Chat</span>
        </Button>
        <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
          <Phone className="h-6 w-6" />
          <span>Call Support</span>
        </Button>
        <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
          <Mail className="h-6 w-6" />
          <span>Email Us</span>
        </Button>
      </div>

      {/* Feedback Form */}
      <div className="bg-white p-8 rounded-lg shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Share Your Feedback</h2>
        <form onSubmit={handleFeedbackSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={feedback.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={feedback.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`focus:outline-none ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                >
                  <Star className="h-6 w-6" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Your Feedback
            </label>
            <textarea
              id="message"
              name="message"
              value={feedback.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Share your thoughts about EcoRides..."
              required
            ></textarea>
          </div>
          <Button type="submit" className="w-full">
            Submit Feedback
          </Button>
        </form>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full flex justify-between items-center text-left"
              >
                <h3 className="font-medium text-gray-900">{faq.question}</h3>
                {activeFaq === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {activeFaq === index && (
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Customer Support</h3>
            <p className="text-gray-600">Available 24/7</p>
            <p className="text-gray-600">support@ecorides.com</p>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Business Inquiries</h3>
            <p className="text-gray-600">Monday - Friday, 9AM - 5PM</p>
            <p className="text-gray-600">business@ecorides.com</p>
            <p className="text-gray-600">+1 (555) 555-9876</p>
          </div>
        </div>
      </div>
    </div>
  );
} 