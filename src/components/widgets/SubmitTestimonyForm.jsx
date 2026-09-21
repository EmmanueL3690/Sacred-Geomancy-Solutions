import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { RatingStars } from './RatingStars';
import { Loader2, Send } from 'lucide-react';

export const SubmitTestimonyForm = ({ onSubmitSuccess }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ title: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { title: '', message: '' };

    if (!title.trim()) {
      newErrors.title = 'Title is required';
      hasError = true;
    }

    if (!message.trim()) {
      newErrors.message = 'Message is required';
      hasError = true;
    } else if (message.trim().length < 30) {
      newErrors.message = 'Must be at least 30 characters long';
      hasError = true;
    } else if (message.trim().length > 500) {
      newErrors.message = 'Must not exceed 500 characters';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess({
        id: `test-${Date.now()}`,
        name: 'John D.',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
        title,
        message,
        rating,
        status: 'Pending',
        createdAt: 'August 3, 2026',
        isUserSubmitted: true,
      });
      setTitle('');
      setMessage('');
      setRating(5);
      setErrors({ title: '', message: '' });
    }, 1200);
  };

  return (
    <Card className="space-y-6">
      <div className="pb-3 border-b border-gold-500/15">
        <h3 className="text-lg font-serif font-bold text-gold-300">
          Share Your Experience
        </h3>
        <p className="text-xs text-neutral-400 mt-0.5">
          Submit your testimony to inspire fellow community members upon review.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-300">
            Select Rating
          </label>
          <RatingStars
            rating={rating}
            interactive
            size="lg"
            onChange={(val) => setRating(val)}
          />
        </div>

        {/* Title Input */}
        <div className="space-y-1.5">
          <label htmlFor="testimony-title" className="text-xs font-semibold text-neutral-300">
            Testimony Title
          </label>
          <input
            id="testimony-title"
            type="text"
            placeholder="e.g. A Life-Changing Breakthrough"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: '' }));
            }}
            className={`w-full px-4 py-3 rounded-xl bg-obsidian-950 border text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none transition-all ${
              errors.title ? 'border-red-500' : 'border-gold-500/30 focus:border-gold-500'
            }`}
          />
          {errors.title && (
            <p className="text-[10px] text-red-400 font-medium">{errors.title}</p>
          )}
        </div>

        {/* Textarea Input */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="testimony-message" className="text-xs font-semibold text-neutral-300">
              Your Experience
            </label>
            <span className={`text-[10px] ${message.length > 500 ? 'text-red-400 font-bold' : 'text-neutral-500'}`}>
              {message.length} / 500
            </span>
          </div>
          <textarea
            id="testimony-message"
            rows={4}
            placeholder="Share how the spiritual guidance impacted your journey..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setErrors((prev) => ({ ...prev, message: '' }));
            }}
            className={`w-full p-4 rounded-xl bg-obsidian-950 border text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none transition-all resize-none ${
              errors.message ? 'border-red-500' : 'border-gold-500/30 focus:border-gold-500'
            }`}
          />
          {errors.message && (
            <p className="text-[10px] text-red-400 font-medium">{errors.message}</p>
          )}
        </div>

        {/* Submit Action */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isSubmitting}
          className="w-full justify-center py-3 font-serif font-bold cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Submitting Testimony...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit Testimony
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};