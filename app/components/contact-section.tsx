"use client";

import { ArrowRight, BadgeCheck, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";

import { projectTypes, type ProjectType } from "../contact-options";

type ContactSubmitStatus = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const [projectType, setProjectType] = useState<ProjectType>(projectTypes[0]);
  const [submitStatus, setSubmitStatus] =
    useState<ContactSubmitStatus>("idle");
  const [submitError, setSubmitError] = useState("");

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitStatus("submitting");
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message ?? "Mail sa nepodarilo odoslať. Skús to prosím znova.",
        );
      }

      form.reset();
      setProjectType(projectTypes[0]);
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Mail sa nepodarilo odoslať. Skús to prosím znova.",
      );
    }
  }

  return (
    <section
      id="kontakt"
      className="contact-transition-section px-4 py-20 sm:px-6 lg:py-28"
    >
      <div>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-surface shadow-float"
        >
          <div aria-hidden="true" className="contact-field" />
          <div className="relative grid gap-12 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-12 lg:py-14">
            <div>
              <p className="section-kicker">Prechod alebo demo</p>
              <h2 className="mt-4 max-w-xl text-4xl font-black leading-none tracking-tight text-white sm:text-5xl">
                Začnime prechodom bez chaosu.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-400">
                Napíš, z čoho dnes prechádzaš, aký hardvér riešiš a čo nesmie
                počas prepnutia spadnúť. Ozveme sa s návrhom bezplatného auditu
                prevádzky.
              </p>

              <div className="mt-8 grid gap-3">
                {[
                  "Audit prevádzky je bezplatný, aj s výstupom",
                  "Kompletný prechod z aktuálneho riešenia",
                  "Turnikety, QR skenery a záložný postup recepcie",
                  "Bez newslettera. Len odpoveď k Tap-it prechodu",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-faint text-accent-soft">
                      <BadgeCheck aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold text-slate-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {submitStatus === "success" ? (
              <div className="flex min-h-[360px] flex-col items-start justify-center rounded-3xl border border-white/10 bg-base/[0.7] p-8">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-white shadow-brand">
                  <Check aria-hidden="true" className="h-7 w-7" />
                </span>
                <p className="mt-6 text-3xl font-black leading-tight text-white">
                  Super, dopyt odišiel.
                </p>
                <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
                  Správa je odoslaná na Tap-it e-mail. Ozveme sa s návrhom
                  bezplatného auditu alebo ďalším krokom.
                </p>
              </div>
            ) : (
              <form onSubmit={submitInquiry} className="grid content-start gap-7">
                <input
                  aria-hidden="true"
                  autoComplete="off"
                  className="hidden"
                  name="company"
                  tabIndex={-1}
                  type="text"
                />
                <div className="grid gap-7 sm:grid-cols-2">
                  <label className="block">
                    <span className="field-label">Meno</span>
                    <input
                      className="editorial-input"
                      name="name"
                      placeholder="Filip Paučo"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">E-mail</span>
                    <input
                      className="editorial-input"
                      name="email"
                      type="email"
                      placeholder="filip@fitko.sk"
                      required
                    />
                  </label>
                </div>

                <fieldset>
                  <legend className="field-label">Typ záujmu</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <label key={type} className="cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value={type}
                          checked={projectType === type}
                          onChange={() => setProjectType(type)}
                          className="peer sr-only"
                        />
                        <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold text-slate-400 transition hover:border-white/25 peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-accent-soft">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="block">
                  <span className="field-label">Správa</span>
                  <textarea
                    className="editorial-input min-h-32 resize-none"
                    name="message"
                    placeholder="Z akého systému prechádzate, koľko máte členov, aký vstup alebo hardvér riešite a čo musí pri prepnutí fungovať?"
                    rows={5}
                  />
                </label>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    disabled={submitStatus === "submitting"}
                    type="submit"
                  >
                    {submitStatus === "submitting"
                      ? "Odosielam..."
                      : "Odoslať prechod"}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </button>
                  <p className="text-center text-xs font-semibold text-slate-500 sm:text-right">
                    Bez newslettera. Len odpoveď k Tap-it prechodu.
                  </p>
                </div>
                {submitStatus === "error" ? (
                  <p
                    className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200"
                    role="alert"
                  >
                    {submitError}
                  </p>
                ) : null}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
