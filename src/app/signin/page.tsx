'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      const msg = 'অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড প্রদান করুন।';
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res.error) {
        const errorText = res.error.message || 'ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।';
        setErrorMessage(errorText);
        toast.error(errorText);
      } else {
        toast.success('সফলভাবে লগইন হয়েছে!');
        router.push('/');
        router.refresh();
      }
    } catch {
      const fallbackMsg = 'লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।';
      setErrorMessage(fallbackMsg);
      toast.error(fallbackMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      await signIn.social({
        provider,
        callbackURL: '/',
      });
      toast.success(`${provider} এর মাধ্যমে লগইন হচ্ছে...`);
    } catch {
      toast.error('সোশ্যাল লগইনে সমস্যা হয়েছে।');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-8 font-sans">
      <div className="bg-white border rounded-3xl p-6 sm:p-8 shadow-sm max-w-md w-full space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 font-black rounded-2xl flex items-center justify-center mx-auto text-xl shadow-xs">
            🛒
          </div>
          <h1 className="text-2xl font-black text-slate-800">লগইন করুন</h1>
          <p className="text-xs text-gray-500">আপনার বাজারে আসার জন্য অ্যাকাউন্ট সাইন ইন করুন</p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold p-3 rounded-xl text-center">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ইমেইল ঠিকানা</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>লগইন হচ্ছে...</span>
              </>
            ) : (
              'লগইন করুন'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-3 text-[10px] text-gray-400 font-bold uppercase">অথবা</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSocialLogin('google')}
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
          >
            <span>Google</span>
          </button>
          <button
            onClick={() => handleSocialLogin('github')}
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
          >
            <span>GitHub</span>
          </button>
        </div>

        {/* Link to Register */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-500 font-medium">
            অ্যাাকাউন্ট নেই?{' '}
            <Link href="/signup" className="text-emerald-600 font-bold hover:underline">
              নতুন অ্যাকাউন্ট তৈরি করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}