import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export const ContactSection: React.FC = () => {
  const { data } = useSiteData();
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!data) return null;

  const { contact, general } = data;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Ad və soyad daxil edilməlidir.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-poçt ünvanı daxil edilməlidir.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Düzgün e-poçt ünvanı daxil edin.';
    }

    const digitsOnly = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon nömrəsi daxil edilməlidir.';
    } else if (digitsOnly.length < 7) {
      newErrors.phone = 'Telefon nömrəsi ən azı 7 rəqəmdən ibarət olmalıdır.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mesaj daxil edilməlidir.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const recipientEmail = general.contactEmail;

    if (recipientEmail && recipientEmail.trim()) {
      const subject = encodeURIComponent(`Yeni Müraciət — ${formData.name}`);
      const body = encodeURIComponent(
        `Ad Soyad: ${formData.name}\nE-poçt: ${formData.email}\nTelefon: ${formData.phone}\n\nMesaj:\n${formData.message}`
      );

      const mailtoUrl = `mailto:${recipientEmail.trim()}?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    }, 800);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Əlaqə"
          heading={contact.heading}
          subtitle={contact.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                Əlaqə Məlumatları
              </h3>

              {/* Address */}
              {general.contactAddress && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {contact.addressLabel || 'Ünvan'}
                    </h4>
                    <p className="text-base font-semibold text-slate-800 mt-1">
                      {general.contactAddress}
                    </p>
                  </div>
                </div>
              )}

              {/* Phone */}
              {general.contactPhone && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {contact.phoneLabel || 'Telefon'}
                    </h4>
                    <a
                      href={`tel:${general.contactPhone}`}
                      className="text-base font-semibold text-slate-800 hover:text-primary-600 transition-colors mt-1 block"
                    >
                      {general.contactPhone}
                    </a>
                  </div>
                </div>
              )}

              {/* Email */}
              {general.contactEmail && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {contact.emailLabel || 'E-poçt'}
                    </h4>
                    <a
                      href={`mailto:${general.contactEmail}`}
                      className="text-base font-semibold text-slate-800 hover:text-primary-600 transition-colors mt-1 block"
                    >
                      {general.contactEmail}
                    </a>
                  </div>
                </div>
              )}

              {/* Working Hours */}
              {general.workingHours && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      İş Vaxtı
                    </h4>
                    <p className="text-base font-semibold text-slate-800 mt-1">
                      {general.workingHours}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/80 shadow-md">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                {contact.formTitle}
              </h3>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-emerald-900">Uğurla Göndərildi!</h4>
                  <p className="text-sm text-emerald-700 max-w-md mx-auto">
                    {contact.formSuccessMessage}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Yeni Mesaj Göndər
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Ad Soyad <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={contact.formNamePlaceholder}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.name ? 'border-red-500 bg-red-50/30' : 'border-slate-300 focus:border-primary-500'
                      } focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors text-slate-900`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1 font-medium">{errors.name}</p>}
                  </div>

                  {/* Grid Email and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        E-poçt <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={contact.formEmailPlaceholder}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.email ? 'border-red-500 bg-red-50/30' : 'border-slate-300 focus:border-primary-500'
                        } focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors text-slate-900`}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1 font-medium">{errors.email}</p>}
                    </div>

                    {/* Phone (Strictly Required) */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Telefon <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={contact.formPhonePlaceholder}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.phone ? 'border-red-500 bg-red-50/30' : 'border-slate-300 focus:border-primary-500'
                        } focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors text-slate-900`}
                      />
                      {errors.phone && <p className="text-xs text-red-500 mt-1 font-medium">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Mesaj <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={contact.formMessagePlaceholder}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.message ? 'border-red-500 bg-red-50/30' : 'border-slate-300 focus:border-primary-500'
                      } focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors text-slate-900 resize-none`}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1 font-medium">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-5 h-5" />}
                    className="w-full"
                  >
                    {contact.formSubmitButton || 'Göndər'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
