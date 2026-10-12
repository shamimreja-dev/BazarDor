'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp, signIn } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('পাসওয়ার্ড দুটি মিলছে না!');
      return;
    }

    if (password.length < 8) {
      toast.error('পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে!');
      return;
    }

    setLoading(true);

    try {
      const res = await signUp.email({
        email,
        password,
        name,
      });

      if (res.error) {
        toast.error(res.error.message || 'সাইন আপ করতে ব্যর্থ হয়েছে');
      } else {
        toast.success('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!');
        router.push('/');
        router.refresh();
      }
    } catch {
      toast.error('একটি সমস্যা হয়েছে, আবার চেষ্টা করুন');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'github') => {
    try {
      await signIn.social({
        provider,
        callbackURL: '/',
      });
    } catch {
      toast.error(`${provider} দিয়ে সাইন ইন করতে সমস্যা হয়েছে`);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col justify-center items-center py-12 px-4 bg-slate-50/50">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-slate-800">অ্যাকাউন্ট তৈরি করুন</h2>
          <p className="text-xs text-gray-500">বিনামূল্যে সাইন আপ করে আপনার বিস্তারিত তথ্য দেখুন</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">নাম</label>
              <input
                type="text"
                placeholder="যেমন: আরিয়ান রহমান"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">ইমেইল</label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">পাসওয়ার্ড</label>
              <input
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
              <input
                type="password"
                placeholder="আবার লিখুন"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-sm text-sm disabled:opacity-50"
            >
              {loading ? 'অপেক্ষা করুন...' : 'অ্যাকাউন্ট তৈরি করুন'}
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-xs text-gray-400">অথবা</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialSignIn('google')}
              type="button"
              className="flex items-center justify-center gap-2 border hover:bg-slate-50 py-2.5 rounded-xl text-xs font-semibold text-slate-700 transition-all"
            >
              <span>G</span> Google দিয়ে চালিয়ে যান
            </button>
            <button
              onClick={() => handleSocialSignIn('github')}
              type="button"
              className="flex items-center justify-center gap-2 border hover:bg-slate-50 py-2.5 rounded-xl text-xs font-semibold text-slate-700 transition-all"
            >
              <span>🐱</span> GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 pt-2">
            অ্যাকাউন্ট আছে?{' '}
            <Link href="/signin" className="text-emerald-600 font-bold hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs text-gray-400 hover:text-slate-600 transition-colors">
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}