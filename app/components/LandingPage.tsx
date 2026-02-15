'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useTranslation } from 'react-i18next';
import SkillRadar from './SkillRoader';

export default function LandingPage() {
  const router = useRouter();
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation('common');
  const [mounted, setMounted] = useState(false);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    setMounted(true);
    if (accessToken && user) {
      if (user.role === 'candidate') {
        router.push('/dashboard/candidate');
      } else if (user.role === 'employer') {
        router.push('/dashboard/employer');
      }
    }
  }, [accessToken, user, router]);

  return (
    <div className="bg-linear-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t('landing.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('landing.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/login"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {t('navbar.login')}
            </a>
            <a
              href="/register"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              {t('navbar.register')}
            </a>
          </div>
        </div>
      </section>
      <SkillRadar />

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:py-32 bg-white">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          {t('landing.whyUs')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 border-2 border-blue-100 rounded-lg hover:shadow-lg transition">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {t('landing.features.fast.title')}
            </h3>
            <p className="text-gray-600">
              {t('landing.features.fast.desc')}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 border-2 border-blue-100 rounded-lg hover:shadow-lg transition">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {t('landing.features.jobs.title')}
            </h3>
            <p className="text-gray-600">
              {t('landing.features.jobs.desc')}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 border-2 border-blue-100 rounded-lg hover:shadow-lg transition">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {t('landing.features.trusted.title')}
            </h3>
            <p className="text-gray-600">
              {t('landing.features.trusted.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:py-32">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          {t('landing.howItWorks')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Candidates */}
          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t('landing.forCandidates.title')}
            </h3>
            <ol className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold">
                  1
                </span>
                <div>
                  <p className="font-semibold text-gray-900">
                    {t('landing.forCandidates.step1')}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {t('landing.forCandidates.step1Desc')}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold">
                  2
                </span>
                <div>
                  <p className="font-semibold text-gray-900">
                    {t('landing.forCandidates.step2')}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {t('landing.forCandidates.step2Desc')}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold">
                  3
                </span>
                <div>
                  <p className="font-semibold text-gray-900">
                    {t('landing.forCandidates.step3')}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {t('landing.forCandidates.step3Desc')}
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* For Employers */}
          <div className="bg-green-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t('landing.forEmployers.title')}
            </h3>
            <ol className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold">
                  1
                </span>
                <div>
                  <p className="font-semibold text-gray-900">
                    {t('landing.forEmployers.step1')}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {t('landing.forEmployers.step1Desc')}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold">
                  2
                </span>
                <div>
                  <p className="font-semibold text-gray-900">
                    {t('landing.forEmployers.step2')}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {t('landing.forEmployers.step2Desc')}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold">
                  3
                </span>
                <div>
                  <p className="font-semibold text-gray-900">
                    {t('landing.forEmployers.step3')}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {t('landing.forEmployers.step3Desc')}
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            {t('landing.ready')}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {t('landing.readyDesc')}
          </p>
          <a
            href="/register"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            {t('landing.startToday')}
          </a>
        </div>
      </section>
    </div>
  );
}
