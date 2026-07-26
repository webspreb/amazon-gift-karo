'use client';

import React, { useState } from 'react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill out all fields.');
      return;
    }
    alert(`Thank you ${name}! Your message has been sent successfully.`);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div>
        <label htmlFor="name" style={{ display: 'block', font: '600 var(--text-xs) var(--font-body)', color: 'var(--theme-text-secondary)', marginBottom: 'var(--space-2)', textTransform: 'uppercase' }}>
          Full Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: 'var(--space-2) var(--space-3)', background: 'var(--theme-bg-elevated)', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-sm)', outline: 'none', color: 'var(--theme-text-primary)' }}
          required
        />
      </div>

      <div>
        <label htmlFor="email" style={{ display: 'block', font: '600 var(--text-xs) var(--font-body)', color: 'var(--theme-text-secondary)', marginBottom: 'var(--space-2)', textTransform: 'uppercase' }}>
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: 'var(--space-2) var(--space-3)', background: 'var(--theme-bg-elevated)', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-sm)', outline: 'none', color: 'var(--theme-text-primary)' }}
          required
        />
      </div>

      <div>
        <label htmlFor="message" style={{ display: 'block', font: '600 var(--text-xs) var(--font-body)', color: 'var(--theme-text-secondary)', marginBottom: 'var(--space-2)', textTransform: 'uppercase' }}>
          Your Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us what you need help with..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: '100%', padding: 'var(--space-2) var(--space-3)', background: 'var(--theme-bg-elevated)', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-sm)', outline: 'none', color: 'var(--theme-text-primary)', resize: 'vertical' }}
          required
        />
      </div>

      <button
        type="submit"
        className="btn-primary"
        style={{ width: '100%', padding: 'var(--space-3)', fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer' }}
      >
        Send Message
      </button>
    </form>
  );
}
